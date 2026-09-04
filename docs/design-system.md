# Design System — Guia de Codificação

> Documento de referência para humanos **e LLMs** que vão manter ou evoluir a UI
> deste portfólio. Descreve os tokens, como consumi-los e as convenções para
> criar/alterar componentes. Onde o código atual diverge da convenção, está
> marcado como **débito técnico** — não copie esses padrões.

---

## 1. Stack e princípios

- **Next.js 14 (App Router)** + **TypeScript** + **styled-components** (SWC plugin ligado em `next.config.js`).
- UI imita um editor VS Code (file tree, tabs, painéis de código, typewriter). Conteúdo em **português**.
- **Atomic Design**: `src/components/{atoms,molecules,organisms}/`.
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
| `accent` | `#43D9AD` | `#43D9AD` | Teal de destaque: cobrinha/comida, dots, hover de ícone |
| `highlight` | `#FEA55F` | `#FEA55F` | Laranja de ação primária (botão `start-game`) |

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

### 3.3 Proibido

- Hex/rgb/hsl literais no lugar de um token existente.
- `px` para tamanhos (use `rem`).
- Texto estilizado à mão quando `Text` resolve.

> **Débitos técnicos existentes (não replicar):** `background-color: red` em `SideBox/styles.ts`; hex soltos em `home.ts` (`.snippet-purple` etc.), `IconText/styles.ts` (`#81A1C1`), `Tab/styles.ts` (`#ea4835`), `SideBox` (gradiente/`#43d9ad`). Quando tocar nesses arquivos, promova os valores a tokens. O teal `#43d9ad` e o laranja de ação já viraram os tokens `accent` / `highlight` (ver `SnakeGame`) — reutilize-os.

---

## 4. Theming em runtime

`src/hooks/Theme.tsx` — `ThemeSwitcherProvider` / `useTheme()`.

```tsx
const { theme, toggleTheme } = useTheme()
// theme.title === 'dark' | 'light'
```

- `toggleTheme()` alterna `dark` ⇄ `light` e persiste em `localStorage['theme']` **o objeto de tema serializado inteiro** (não só o nome).
- Na montagem, reidrata de `localStorage`; se não houver, usa `dark`.

> **Débitos técnicos:** (a) persistir o objeto inteiro significa que mudanças em `theme.ts` não chegam a usuários com valor salvo — o ideal é salvar só `title` e derivar o objeto. (b) `toggleTheme` acessa `localStorage` sem guarda de SSR (ok hoje por ser handler de clique, cuidado ao reusar). Preserve a assinatura de `useTheme()` ao corrigir.

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

### 6.3 Animações → `keyframes` local

```ts
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; max-height: 0; }
  to   { opacity: 1; max-height: 500px; }
`

export const Container = styled.div<{ $isOpen: boolean }>`
  animation-name: ${({ $isOpen }) => $isOpen && fadeIn};
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
`
```

Animação global reutilizável (`.slide-in` / `slideIn`) vive em `GlobalStyles.ts`. Adicione ali só o que for realmente compartilhado.

### 6.4 SSR / registry

`src/app/lib/registry.tsx` (`StyledComponentsRegistry`) injeta o CSS no SSR via `useServerInsertedHTML` e **precisa ser o provider mais externo** (ver `src/hooks/Providers.tsx`: `StyledComponentsRegistry` → `GlobalStyles` → `ThemeSwitcherProvider` → `TabsProvider`). Não reordene.

---

## 7. Padrões visuais recorrentes

Reproduza estes ao criar componentes novos, para manter coerência:

- **Hover:** texto e `svg` vão para `theme.colors.activeTitle`; fundo (quando houver) para `theme.colors.activeBackground`.
- **Estado ativo:** mesmo tratamento do hover, muitas vezes com um marcador extra (ex.: `::after` laranja animado com `growAnimation` no `NavButton`).
- **Abrir/fechar (Accordion, SideFolder):** `max-height`/`height` 0 → valor + `opacity` via `keyframes`, `overflow: hidden`, `animation-fill-mode: forwards`; seta gira com `transform: rotate(180deg)`.
- **Divisórias:** `1px solid ${({ theme }) => theme.colors.line}`.
- **Ícones inline com texto:** `svg` ~`1.5rem`–`2rem`, `margin-right` ~`0.8rem`, `flex-shrink: 0`.

---

## 8. Sistema de tabs (contexto de UI, não é token)

`src/hooks/Tabs.tsx` — `TabsProvider` / `useTabs()`: modelo global de "abas de editor" (`tabs[]`, `activeInfo: 'dev' | 'hobbies'`, `addTab` / `removeTab` / `setActiveTab`). A página `about-me` alimenta isso a partir de `_data.tsx`. Componentes: `SideNav` (abre), `TabBar` (renderiza), `TabContentEditor` (mostra o conteúdo como linhas numeradas).

Dados estáticos por página ficam em `_data.tsx` co-locado (prefixo `_` para o App Router ignorar como rota).

---

## 9. Checklist para criar / evoluir um componente

1. **Nível certo?** átomo (sem dependência de outro componente), molécula (compõe átomos), organismo (seção de página).
2. Pasta `Nome/` com `index.tsx` + `styles.ts`. `'use client'` se usar hook/estado.
3. Props tipadas: `I<Nome>Props` no componente, `I<Nome>StylesProps` no styles.
4. Todo texto via `<Text tag font color />`. Toda cor/tipografia via `theme.*`. Toda medida em `rem`.
5. Precisou de uma cor nova? Crie **token** nos 3 lugares (§2.3). Não use hex solto.
6. Props só-de-estilo passadas ao `styled` com prefixo **`$`** (§6.1). API pública pode ficar sem `$`.
7. Blocos condicionais com `css`; animações com `keyframes` local.
8. Em listas (`.map`), `key` estável no **elemento raiz** retornado; `<React.Fragment key>` quando precisar de fragment (shorthand `<>` não aceita `key`).
9. Exporte o componente e **registre-o no barrel** do nível.
10. `npm run lint` limpo e **zero warnings de prop no DOM** no console do dev server.

---

## 10. Débitos técnicos conhecidos (não replicar)

| Local | Problema | Direção |
|---|---|---|
| `atoms/Text/index.tsx` | `styled(tag)` criado no render | Mapa estático de styled por tag |
| `hooks/Theme.tsx` | `localStorage` guarda o tema inteiro serializado | Guardar só `title` e derivar |
| `molecules/SideBox/styles.ts` | `background-color: red`, gradiente e hex soltos | Tokenizar; remover cor de debug |
| `styles/pages/home.ts` | `.snippet-*` com hex literais | Tokens de "syntax highlight" |
| `IconText`, `Tab`, `Accordion`, `SideFolder` | props de estilo sem `$` | Migrar para transient props |
| `organisms/SideNav/index.tsx` | `<Accordion title="contato">` dentro do `.map` | Mover para fora do loop |
| Barrels `atoms`/`molecules` | Quase vazios | Exportar todos os componentes |
| `theme.ts` `light.background` = `#616161` | Cinza destoa da paleta | Revisar contraste do tema claro |
