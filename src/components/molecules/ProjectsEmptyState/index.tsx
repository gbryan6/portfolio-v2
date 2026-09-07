import { Text } from '@/components/atoms'
import Button from '@/components/molecules/Button'
import { Container } from './styles'

/**
 * `catalog` — nothing published yet, so there is nothing to clear.
 * `filter`  — the selection excluded everything; offer a way back.
 */
export type EmptyReason = 'catalog' | 'filter'

interface IProjectsEmptyStateProps {
  reason: EmptyReason
  onClear: () => void
}

export default function ProjectsEmptyState({
  reason,
  onClear,
}: IProjectsEmptyStateProps) {
  if (reason === 'catalog') {
    return (
      <Container>
        <Text tag="p" font="pageTitle" color="activeTitle">
          Woops! 🛠️
        </Text>
        <Text tag="p" font="body" color="fontPrimary">
          Ainda não publiquei nenhum projeto por aqui.
        </Text>
        <Text tag="p" font="body" color="fontPrimary">
          Estou reunindo os melhores — volte em breve.
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <Text tag="p" font="pageTitle" color="activeTitle">
        Nada por aqui 🔍
      </Text>
      <Text tag="p" font="body" color="fontPrimary">
        Nenhum projeto usa essa combinação de tecnologias.
      </Text>
      <Button onClick={onClear} className="empty-state_action">
        limpar-filtro
      </Button>
    </Container>
  )
}
