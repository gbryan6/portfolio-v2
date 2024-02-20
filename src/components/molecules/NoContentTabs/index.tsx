import { Text } from "@/components/atoms";
import { Container } from "./styles";

export default function NoContentTabs() {
  return (
    <Container>
      <div className="no-content_top">
        <Text tag="p"  font="pageTitle" color="activeTitle">Woops! 🤭</Text>
      </div>
      <div className="no-content_bottom">
        <Text tag="p"  font="body" color="fontPrimary">Parece que você ainda não adicionou nenhum documento sobre mim.</Text>
        <Text tag="p"  font="body" color="fontPrimary">Use o menu ao lado para me conhecer um pouco mais</Text>
      </div>
    </Container>
  );
}
