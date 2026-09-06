import { Text } from '@/components/atoms'
import Button from '@/components/molecules/Button'
import { Container } from './styles'

interface IProjectsEmptyStateProps {
  onClear: () => void
}

export default function ProjectsEmptyState({
  onClear,
}: IProjectsEmptyStateProps) {
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
