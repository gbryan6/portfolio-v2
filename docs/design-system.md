# Design System — Guia de Codificação

> Documento de referência para humanos **e LLMs** que vão manter ou evoluir a UI
> deste portfólio. Descreve os tokens, como consumi-los e as convenções para
> criar/alterar componentes. Onde o código atual diverge da convenção, está
> marcado como **débito técnico** — não copie esses padrões.

---

## 1. Stack e princípios

- **Next.js 14 (App Router)** + **TypeScript** + **styled-components v6** (SWC plugin ligado em `next.config.js`).
- **Motion** (`motion` ≥ 13, ex-Framer Motion) para animação — sempre pelo módulo `src/components/motion/` (§6.5). O kit `motion-ai` está instalado em `.claude/skills/motion/` + `.mcp.json`.
- UI imita um editor VS Code (file tree, tabs, painéis de código, typewriter, movimento de IDE). Conteúdo em **português**.
- **Atomic Design**: `src/components/{atoms,molecules,organisms}/` (+ `motion/` para as primitivas de animação).
- Todo componente de UI é **Client Component** (`'use client'`) — styled-components e os hooks de contexto exigem cliente.
- **Nenhum valor visual é hardcoded**: cor, tipografia e espaçamento saem de tokens ou da escala `rem`.

### Base de medidas

`src/styles/GlobalStyles.ts` define `html { font-size: 62.5% }` → **`1rem` = `10px`**.
Sempre dimensione em `rem` (`1.6rem` = 16px, `3.2rem` = 32px). Exceções aceitáveis: bordas de `1px`, `0`.

Fonte única: **Fira Code**, carregada em `src/app/layout.tsx` como a CSS var `--font-fira-code` e aplicada globalmente no reset (`* { font-family: var(--font-fira-code) }`). Não importe outras fontes.

---

## 2. Tokens

Fonte da verdade: **`src/styles/theme.ts`**. Tipo em **`src/app/types/styled.d.ts`** (que também faz `augment` do `DefaultTheme` do styled-components, então `theme` é tipado dentro de qualquer `styled`).

Há dois objetos de tema, `dark` (padrão) e `light`, com **as mesmas chaves**.

### 2.1 Cores — `theme.colors`

| Token | dark | light | Uso pretendido |
|---|---|---|---|
| `activeTitle` | `#FFFFFF` | `#000000` | Texto/ícone em estado ativo ou hover; maior contraste |
| `activeBackground` | `#011E35` | `#E8E8E8` | Fundo de item ativo/hover (tab ativa, botão hover) |
| `backgroundContent` | `#011627` | `#FFFFFF` | Fundo das áreas de conteúdo (painéis, cards) |
| `background` | `#010C15` | `#616161` | Fundo da aplicação / borda externa |
| `buttonColor` | `#1C2B3A` | `#D1D5DB` | Fundo de botões |
| `fontPrimary` | `#607B96` | `#607B96` | Cor de texto padrão (idêntica nos dois temas) |
| `fontSecondary` | `#E5E9F0` | `#505A64` | Texto de ênfase secundária |
| `line` | `#1E2D3D` | `#607B96` | Bordas, divisórias, linhas de grade |
| `accent` | `#43D9AD` | `#43D9AD` | Teal de destaque: cobrinha/comida, dots, checkbox marcado, hover de ícone, marcadores de estado ativo |
| `highlight` | `#FEA55F` | `#FEA55F` | Laranja de ação primária (`start-game`), sublinhado de rota ativa, marcador de tab ativa |
| `codeEntity` | `#4D5BCE` | `#3B3F9E` | "Project N" no heading do card de projeto (roxo-azulado). Promoveu o `.snippet-purple` de `home.ts` |
| `codeString` | `#7FB0FF` | `#2F6BD6` | `_slug` no heading do card (azul claro, distinto do teal do `accent`) |
| `neonPink` | `#FF4D9D` | `#D6206F` | Borda quente da aberração cromática do mascote (`Astronaut`) — o par com `neonCyan` |
| `neonCyan` | `#4DE1FF` | `#0B93B8` | Borda fria da mesma aberração; também a tela do celular do mascote |
| `visorGlass` | `#0B1020` | `#1E2A38` | Vidro do capacete e moldura do celular. **Escuro nos dois temas de propósito** — visor é vidro, não superfície de UI, então não inverte |

### 2.2 Tipografia — `theme.typograph`

Escala compartilhada pelos dois temas (só tamanho de fonte; sem line-height/weight tokenizados).

| Chave | Valor | Uso |
|---|---|---|
| `head` | `62px` | Título principal de página (hero) |
| `subHead` | `32px` | Subtítulo |
| `pageTitle` | `26px` | Título de seção/página |
| `body` | `18px` | Texto corrido |
| `label` | `16px` | Labels, itens de menu, nomes de arquivo |
| `snippet` | `14px` | Código, tabs, chrome do editor |

> Os valores estão em `px` (não `rem`). É assim hoje; ao consumir via `Text` isso é transparente.

### 2.3 Como adicionar um token

Ordem obrigatória (senão o TS quebra ou o tema fica assimétrico):

1. **`src/app/types/styled.d.ts`** — adicione a chave em `Theme.colors` (ou `Theme.typograph`).
2. **`src/styles/theme.ts`** — adicione o valor em **`dark`**.
3. **`src/styles/theme.ts`** — adicione o valor em **`light`**.

Nunca adicione um token em só um dos temas. Nunca use um hex "solto" no lugar de criar token.

### 2.4 Tokens de movimento

Valores de animação **não** ficam em `theme.ts` — ficam em **`src/components/motion/tokens.ts`** como `const`s exportados: `spring` (`enter` / `layout` / `snappy`), `tween` (`fast` / `base` / `slow`), `routeEnter`, `stagger` (`base 0.06` / `grid 0.045` / `cap 8`), `travel` (`sm 6` / `md 10` px), `ambient` (`food 1.8`s).

Por quê fora do `theme.ts`: não têm variação dark/light, são lidos em JS (props do Motion, não interpolação `styled`), e o `MotionProvider` fica **acima** do `ThemeProvider` na árvore — um `theme.motion` seria ilegível ali. Adicione novos valores de movimento só nesse arquivo; é o espelho do procedimento de cor da §2.3.

Há também 3 CSS custom properties no `:root` (em `GlobalStyles.ts`) para transições feitas em CSS puro: `--motion-fast` (150ms), `--motion-base` (250ms) e `--editor-content-height` (`calc(100vh - 206px)`, altura da área de conteúdo do editor, consumida por `TabContentEditor` e `ProjectGrid`).

---

## 3. Consumindo tokens

### 3.1 Texto → sempre o átomo `Text`

`src/components/atoms/Text/index.tsx` é a primitiva de tipografia. **Prefira-o a qualquer texto estilizado à mão.**

```tsx
import { Text } from '@/components/atoms'

<Text tag="p" font="snippet" color="fontPrimary">_olá</Text>
```

| Prop | Tipo | Descrição |
|---|---|---|
| `tag` | `keyof JSX.IntrinsicElements` | Elemento renderizado (`p`, `span`, `pre`, `h1`…) |
| `font` | `keyof Theme['typograph']` | Chave da escala tipográfica |
| `color` | `keyof Theme['colors']` | Chave de cor do tema |
| `className` | `string?` | Para posicionamento/ajustes pelo pai |

Padrão de cor condicional (muito usado em Accordion/SideFolder):

```tsx
<Text tag="span" font="label" color={isOpen ? 'activeTitle' : 'fontPrimary'}>
```

> **Débito técnico:** `Text` chama `styled(tag)` **dentro do render**. Isso recria a classe a cada render e derruba memoização. Ao evoluir o átomo, mova para um mapa estático de componentes por tag (`const map = { p: styled.p`…`, ... }`) — sem mudar a API pública (`tag`/`font`/`color`).

### 3.2 Dentro de `styled` → função de tema

```ts
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundContent};
  border: 1px solid ${({ theme }) => theme.colors.line};
  font-size: ${({ theme }) => theme.typograph.snippet};
`
```

`theme` é tipado (via o augment em `styled.d.ts`) — o autocomplete lista as chaves válidas.

### 3.3 Botão e campo → primitivas únicas

Dois componentes cobrem **toda** ação e entrada do site. Não crie um `styled.button`
ou `styled.input` novo — estenda estes.

`molecules/Button` — `variant` `solid` (caixa com borda: formulários, ações) ou
`pill` (chip arredondado: `view-project`). Passar `href` renderiza `<a>`, senão
`<button>`. `whileTap` + preset `snappy` já vêm de fábrica. A borda existe sempre
(transparente no `pill`), então o hover nunca desloca o layout em 1px.

```tsx
<Button onClick={onClear}>limpar-filtro</Button>
<Button variant="pill" href={href} target="_blank" rel="noopener noreferrer">view-project</Button>
<Button id="submit-message" type="submit" disabled={sending} color="fontPrimary">enviar-mensagem</Button>
```

`molecules/Input` — label + campo + slot de erro (altura reservada, então a
mensagem não empurra o resto). `multiline` troca `<input>` por `<textarea>`.

O **label é uma configuração de `Text`**, não uma string solta — o call site
reestiliza sem o componente ganhar uma prop nova a cada pedido. Omitir
`font`/`color` reproduz o visual padrão de formulário (`label` / `fontPrimary`):

```tsx
<Input id="name" label={{ text: '_nome:' }} … />
<Input id="name" label={{ text: 'Nome', font: 'body', color: 'fontSecondary' }} … />
```

`Button` também expõe `font`/`color` para o rótulo pela mesma razão.

> Ambos são **moléculas**, não átomos: compõem o átomo `Text` (§1 — átomo é o que
> não depende de outro componente). É por isso que `Checkbox` pode ser átomo — ele
> não renderiza texto.

### 3.4 Proibido

- Hex/rgb/hsl literais no lugar de um token existente.
- `px` para tamanhos (use `rem`).
- Texto estilizado à mão quando `Text` resolve.

> **Débitos técnicos existentes (não replicar):** hex soltos em `home.ts` (`.snippet-green` / `-orange` / `-red`), `IconText/styles.ts` (`#81A1C1`), `Tab/styles.ts` (`#ea4835`, hover do botão de fechar). Quando tocar nesses arquivos, promova os valores a tokens. Já resolvidos: `SideBox` foi **deletado** (era código morto — `background-color: red` foi junto); `.snippet-purple` virou o token `codeEntity`; o teal `#43d9ad` e o laranja de ação são os tokens `accent` / `highlight`.

---

## 4. Theming em runtime

`src/hooks/Theme.tsx` — `ThemeSwitcherProvider` / `useTheme()`.

```tsx
const { theme, toggleTheme } = useTheme()
// theme.title === 'dark' | 'light'
```

- `toggleTheme()` alterna `dark` ⇄ `light` e persiste **só o nome** (`'dark'` | `'light'`) em `localStorage['theme']` **e** num cookie `theme` (`max-age` 1 ano, `SameSite=Lax`).
- **SSR seed:** `src/app/layout.tsx` (server component) lê o cookie via `next/headers` `cookies()` e passa `initialThemeName` por `<Providers>` → `<ThemeSwitcherProvider initialThemeName>`. O servidor pinta o tema correto no primeiro paint — sem flash para quem volta no tema claro. (Custo: as rotas viram `λ` dynamic em vez de estáticas.)
- Na montagem, um `useEffect` reconcilia com `localStorage` caso o cookie esteja ausente/desatualizado; tolera valores legados que guardavam o objeto inteiro (faz `JSON.parse` defensivo e lê `.title`).
- `useTheme()` continua expondo `{ theme, toggleTheme }` — assinatura inalterada.

> **Débito técnico restante:** `toggleTheme` escreve `document.cookie` / `localStorage` sem guarda de SSR (ok por ser handler de clique; cuidado ao reusar).

---

## 5. Anatomia de um componente

```
src/components/<nível>/<Nome>/
  index.tsx     # componente React; 'use client' quando usar hook/estado
  styles.ts     # styled-components co-locados; exporta `Container` (+ outros)
```

Convenções observadas no código:

- Export **default** do componente em `index.tsx`.
- `styles.ts` exporta **`Container`** como raiz; partes extras com nomes próprios (`ButtonCv`, `LineNumbers`, `TextContent`).
- Estrutura interna via `className` semântico com prefixo do componente: `accordion-head`, `side-folder_content`, `tab-button_close`.
- Interfaces de props nomeadas `I<Nome>Props` (componente) e `I<Nome>StylesProps` / `I<Nome>Styles` (styles).
- Ícones: **`react-icons`** (`IconType` para receber ícone por prop).

### Barrels e imports

Cada nível tem um barrel (`atoms/index.tsx`, `molecules/index.ts`, `organisms/index.ts`), **mas eles estão incompletos**:

- `atoms` exporta só `Text`.
- `molecules` exporta só `NavButton`.
- `organisms` exporta `Header`, `Footer`.

Regra: **importe do barrel se o componente estiver lá; senão use o caminho completo** com o alias `@/*` → `src/*`.

```tsx
import { Text } from '@/components/atoms'                 // no barrel
import SideBox from '@/components/molecules/SideBox'       // não está no barrel
```

Ao criar um componente, **adicione-o ao barrel do nível** para reduzir esse débito.

---

## 6. Convenções para styled-components

### 6.1 Transient props (`$`) para toda prop de estilo — regra dura

Props que existem **só para estilização** devem ser prefixadas com `$`. O styled-components consome `$props` e **não as repassa para o DOM**.

Por quê: `styled(ComponenteCustomizado)` (ex.: `styled(Link)`) **repassa todas as props desconhecidas** para o elemento final. Sem `$`, isso gera warnings do React (`React does not recognize the prop…` / atributo não-booleano) e polui o HTML. `styled.div` & cia. filtram parte disso automaticamente, mas **a regra `$` vale para todos os casos** — é a única forma consistente.

```tsx
// ❌ antes — vaza para o <a> do Link
export const Container = styled(Link)<{ active?: boolean; iconOnly?: boolean }>`
  ${({ active }) => active && css` ... `}
`
<Container active={active} iconOnly={iconOnly} {...rest} />

// ✅ depois
export const Container = styled(Link)<{ $active?: boolean; $iconOnly?: boolean }>`
  ${({ $active }) => $active && css` ... `}
`
<Container $active={active} $iconOnly={iconOnly} {...rest} />
```

A **API pública** do componente pode continuar sem `$` (`<NavButton active iconOnly />`); só o repasse interno para o `styled` usa `$`.

> **Débito técnico:** `Tab` (`active`, `noAction`), `Accordion`/`SideFolder` (`isOpen`), `IconText` (`active`), `SideFolder` (`color`) ainda passam props de estilo cruas. Migre para `$` ao tocar nesses arquivos.

### 6.2 Blocos condicionais → helper `css`

```ts
import styled, { css } from 'styled-components'

export const Container = styled.div<{ $active?: boolean }>`
  ${({ $active }) => $active && css`
    color: ${({ theme }) => theme.colors.activeTitle};
  `}
`
```

Use `css` sempre que o bloco condicional tiver interpolação (necessário para o SWC/plugin processar corretamente).

### 6.3 Animação: CSS `keyframes` vs Motion

Regra de decisão:

- **CSS `keyframes` local** — transição de estado simples, autocontida e **não interrompível** (ex.: glow ambiente, `pulse` de fundo). Fica no `styles.ts` do componente; global reutilizável em `GlobalStyles.ts`.
- **Motion (`motion/react`)** — entrada / saída / reordenação / `layout` / gesto / sequência orquestrada. Tudo isso passa pelo módulo `src/components/motion/` (§6.5).

Import: **só `motion/react`** em arquivos client — nunca `framer-motion`, nunca `motion` puro. Ponte com styled-components: `styled(motion.div)` (ou `motion.create(StyledComponent)`), **nunca** a fábrica `motion(Component)` (deprecada). Props só-de-estilo continuam com `$` — o Motion também repassa props desconhecidas pro DOM, igual `styled(Link)`.

### 6.4 SSR / registry / ordem dos providers

`src/app/lib/registry.tsx` (`StyledComponentsRegistry`) injeta o CSS no SSR via `useServerInsertedHTML` e **precisa ser o provider mais externo**. Ordem em `src/hooks/Providers.tsx`:

```
StyledComponentsRegistry → GlobalStyles → MotionProvider → ThemeSwitcherProvider → TabsProvider
```

`MotionProvider` (§6.5) renderiza **só contexto** (`MotionConfig` + `LayoutGroup`) — sem DOM, sem injeção de estilo — então não perturba a coleta de CSS nem a ordem. Não reordene.

### 6.5 Movimento — o módulo `src/components/motion/`

Toda animação de estado do site sai de um único módulo, para se mover como um sistema só.

| Export | Papel |
|---|---|
| `tokens.ts` (`motionTokens`) | Os valores crus (§2.4). Consumidos por `MotionProvider` e `template.tsx`; o resto passa por `useMotionPreset`. |
| `useMotionPreset(name, overrides?)` | **O único lugar** onde um objeto `Transition` é montado. `name` ∈ `enter` / `layout` / `snappy` / `collapse` / `routeEnter` / `fast` / `base`. Chama `useReducedMotion()` internamente e devolve `{ duration: 0 }` em todos os presets quando "reduzir movimento" está ligado. Nunca inline um `duration`/`spring` num componente. |
| `<Reveal>` | Entrada no mount (opacity 0→1 + `translateY` pequeno). Substitui a classe `.slide-in`. `initial={false}` para conteúdo já presente no HTML do servidor. |
| `<Stagger>` / `<StaggerItem>` | Orquestração de irmãos (hero, listas). `Stagger` seta `staggerChildren`/`delayChildren`; `StaggerItem` expõe variants `hidden`/`show`. |
| `<Presence>` | `AnimatePresence` com `initial={false}` por padrão (o re-render pós-hidratação do tema nunca replaya entrada/saída). Um só ponto para add/remove de tab, troca de painel CT, grid↔empty, tab de filtro, ícone do toggle de tema. |
| `variants` | Vocabulário compartilhado: `fade`, `revealUp`, `cardItem`, `paneSwap`, `collapse`, `tabItem`. Quando precisa de transição por-estado (enter spring, exit tween), monte o objeto no call site a partir de `useMotionPreset`. |
| `reduceVariant(v, reduced)` | Tira `x`/`y`/`scale`/`width`/`height`/`rotate`, deixa `opacity` — para os poucos call sites que passam variant direto pro elemento. |
| `MotionProvider` | `<MotionConfig reducedMotion="user">` + `<LayoutGroup>` (hospeda os marcadores `layoutId` compartilhados: `nav-underline`, `tab-active`, `rail-active`). |

**Orçamento de movimento** — as ~7 mudanças de estado que ganham animação: tab add/remove/reorder, troca do painel de conteúdo, reflow do grid de filtro, abrir/fechar de disclosure, marcadores de estado ativo, entrada de rota, cascata do hero. Todo o resto é instantâneo ou um fade ≤150ms. No máximo **um loop ambiente por superfície**.

Uma escala de spring (`enter` / `layout` / `snappy`, bounce ≤ 0.2, zero overshoot — é uma UI de IDE "séria") + uma de tween (`fast` / `base` / `slow`).

### 6.6 Acessibilidade de movimento

Três camadas, escritas uma vez:

1. `<MotionConfig reducedMotion="user">` no `MotionProvider` — o Motion suprime `transform`/`layout` em todo `motion.*`, mantém `opacity`, e torna saídas do `AnimatePresence` instantâneas.
2. `useMotionPreset` ramifica em `useReducedMotion()` → `{ duration: 0 }`; `reduceVariant()` para os call sites de variant direto.
3. **Um** bloco `@media (prefers-reduced-motion: reduce)` por seletor em `GlobalStyles.ts` (`.slide-in`) + guarda por-componente nos loops decorativos infinitos (`pulse` em `layout.ts`). **Nunca** um `* { animation: none }` global.

Loops ambientes (`FoodBit` do `SnakeGame`) leem `useReducedMotion()` e renderizam o valor estático; `useTypewriter` resolve a string inteira na hora quando `enabled` é `false` **ou** "reduzir movimento" está ligado.

---

## 7. Padrões visuais recorrentes

Reproduza estes ao criar componentes novos, para manter coerência:

- **Hover:** texto e `svg` vão para `theme.colors.activeTitle`; fundo (quando houver) para `theme.colors.activeBackground`. Transição via `--motion-fast`/`--motion-base` na regra base (não só no `:hover`, senão só suaviza a entrada).
- **Estado ativo:** um marcador `<motion.span layoutId="...">` compartilhado que **desliza** entre os irmãos (`nav-underline` no Header, `tab-active` na TabBar, `rail-active` na trilha dev/hobbies do SideNav) — nunca um `::after` animado por `keyframes`.
- **Abrir/fechar (Accordion, SideFolder):** `<Presence>` + `variants.collapse` (`height: 0` ↔ `'auto'` + `opacity`), `overflow: hidden` no elemento animado, `padding` num `div` interno; seta gira com `animate={{ rotate: isOpen ? 180 : 0 }}` + `useMotionPreset('snappy')`.
- **Interação:** `whileHover` / `whileTap` + `useMotionPreset('snappy')` (ex.: card sobe `y: -4`, pill `scale: 0.97`).
- **Divisórias:** `1px solid ${({ theme }) => theme.colors.line}`.
- **Ícones inline com texto:** `svg` ~`1.5rem`–`2rem`, `margin-right` ~`0.8rem`, `flex-shrink: 0`.

---

## 8. Sistema de tabs (contexto de UI, não é token)

`src/hooks/Tabs.tsx` — `TabsProvider` / `useTabs()`: modelo global de "abas de editor" (`tabs[]`, `activeInfo: 'dev' | 'hobbies'`, `addTab` / `removeTab` / `setActiveTab`). `removeTab` reatribui `active` a um vizinho quando fecha a aba ativa (o painel CD nunca fica órfão). Valor do contexto e setters memoizados (`useMemo`/`useCallback`). A página `about-me` alimenta isso a partir de `_data.tsx`. Componentes: `SideNav` (abre), `TabBar` (renderiza), `TabContentEditor` (mostra o conteúdo como linhas numeradas).

**Página `projects`** usa um modelo **local** (`useState<TechId[]>` em `projects/page.tsx`, **não** passa pelo `useTabs`), alimentado por `projects/_data.tsx` (`techFilters`, `projects`, `techById`, `TechId`). Filtro **ANY-match** (projeto aparece se tem ≥1 tech marcada; sem seleção mostra tudo). A "aba" de resumo `React; CSS; Vue` é um `<Tab>` sintético; `molecules/Tab` ganhou `onClose?: () => void` — quando passado, o `x` chama ele em vez do `removeTab` global (limpa toda a seleção). Componentes novos: `molecules/ProjectCard`, `molecules/ProjectsEmptyState`, `organisms/ProjectGrid`.

Dados estáticos por página ficam em `_data.tsx` co-locado (prefixo `_` para o App Router ignorar como rota).

---

## 9. Checklist para criar / evoluir um componente

1. **Nível certo?** átomo (sem dependência de outro componente), molécula (compõe átomos), organismo (seção de página).
2. Pasta `Nome/` com `index.tsx` + `styles.ts`. `'use client'` se usar hook/estado.
3. Props tipadas: `I<Nome>Props` no componente, `I<Nome>StylesProps` no styles.
4. Todo texto via `<Text tag font color />`. Toda cor/tipografia via `theme.*`. Toda medida em `rem`.
5. Precisou de uma cor nova? Crie **token** nos 3 lugares (§2.3). Não use hex solto.
6. Props só-de-estilo passadas ao `styled` com prefixo **`$`** (§6.1). API pública pode ficar sem `$`.
7. Blocos condicionais com `css`. Animação: `keyframes` local só para loop simples não-interrompível; senão Motion (§6.3).
8. Em listas (`.map`), `key` estável no **elemento raiz** retornado; `<React.Fragment key>` quando precisar de fragment (shorthand `<>` não aceita `key`).
9. Exporte o componente e **registre-o no barrel** do nível.
10. `npm run lint` limpo e **zero warnings de prop no DOM** no console do dev server.
11. Animou algo? Use uma primitiva de `src/components/motion/` e um preset de `useMotionPreset` — **nunca** um `transition`/`spring` inline. `prefers-reduced-motion` já é tratado pelo preset; loops ambientes desligam via `useReducedMotion`. Sob `AnimatePresence`/`popLayout`, o componente-filho precisa de `forwardRef` e `key` estável (nunca índice).

---

## 10. Débitos técnicos conhecidos (não replicar)

| Local | Problema | Estado |
|---|---|---|
| `atoms/Text/index.tsx` | `styled(tag)` criado no render | ✅ Resolvido — cache `Map` de styled por tag |
| `hooks/Theme.tsx` | `localStorage` guardava o tema inteiro serializado | ✅ Resolvido — guarda só `title` + cookie + SSR seed (§4) |
| `molecules/SideBox` | `background-color: red`, hex soltos | ✅ Resolvido — componente deletado (era código morto) |
| `IconText`, `Tab`, `Accordion`, `SideFolder`, `NavButton` | props de estilo sem `$` | ✅ Resolvido — migrados p/ transient; `NavButton::after` `orange` virou marcador `layoutId` (`highlight`) |
| `organisms/SideNav/index.tsx` | `<Accordion title="contato">` dentro do `.map` | ✅ Resolvido — fora do loop |
| Barrels `atoms`/`molecules`/`organisms` | Quase vazios | Parcial — `molecules`/`organisms` agora exportam os componentes novos; `atoms` ainda só `Text` |
| `GlobalStyles` `.slide-in` sem guarda `prefers-reduced-motion` | — | ✅ Resolvido — coberto pela §6.6 |
| `TabContentEditor/styles.ts` `height: calc(100vh - 206px)` mágico | — | ✅ Resolvido — `var(--editor-content-height)` |
| `styles/pages/home.ts` | `.snippet-green` / `-orange` / `-red` com hex literais | Aberto — tokens de "syntax highlight" (`.snippet-purple` já virou `codeEntity`) |
| `IconText/styles.ts` `#81A1C1`; `Tab/styles.ts` `#ea4835` | hex soltos | Aberto — tokenizar |
| `atoms/Checkbox` | `input` com `display: none` + `readOnly`, e `TechCheckbox` com `onClick` no wrapper — o clique na caixa disparava 2× (clique direto + clique sintético que o `<label>` manda pro input) e se anulava; o input também não era alcançável por teclado | ✅ Resolvido — input real, controlado, invisível mas focável por cima da caixa; a linha inteira é o `<label>` e o `onChange` do input é o único handler |
| `theme.ts` `light.background` = `#616161` | Cinza destoa da paleta | Aberto — revisar contraste do tema claro |
| Rotas viraram `λ` dynamic | `cookies()` no root layout (SSR seed do tema) | Aceito — troca consciente para eliminar o flash de tema |
