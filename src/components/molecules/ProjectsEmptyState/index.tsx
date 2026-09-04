import { Text } from '@/components/atoms'
import { Container, ClearButton } from './styles'

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
      <ClearButton type="button" onClick={onClear}>
        <Text tag="span" font="snippet" color="activeTitle">
          limpar-filtro
        </Text>
      </ClearButton>
    </Container>
  )
}
