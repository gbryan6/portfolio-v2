import { Container } from "./styles"
import Tab from '../Tab'
interface ITabBar {
  tabs: string
}

export default function TabBar({
  tabs
}: ITabBar) {
  return (
    <Container>
      <Tab title="sobre-mim.txt" />
      <Tab title="experiencias.txt" />
      <Tab title="front-end.txt" />
      <Tab title="back-end.txt" />
      <Tab title="ADS.txt" />
    </Container>
  )
}