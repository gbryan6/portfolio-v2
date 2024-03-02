import Image from "next/image";
import { Container, ButtonCv } from "./styles";
import { Text } from "@/components/atoms";
import { useState } from "react";

interface ISideBox {
  onClickButton: () => void
}

function SideBox({ onClickButton }: ISideBox) {
  const [clicked, setClicked] = useState(false)

  function handleClick() {
    setClicked(true)
    onClickButton()
  }
  return (
    <Container className="slide-in">
      <Image fill={true} alt="bottom of box up left" className="bottom-up-left bottom" src="/assets/application/bolt-up-left.svg" />
      <Image fill={true}  alt="bottom of box up right" className="bottom-up-right bottom" src="/assets/application/bolt-up-left.svg" />
      <Image fill={true}  alt="bottom of box down left" className="bottom-down-left bottom" src="/assets/application/bolt-up-left.svg" />
      <Image fill={true}  alt="bottom of box down right" className="bottom-down-right bottom" src="/assets/application/bolt-up-left.svg" />
      <Image fill={true}  alt="Pessoa escrevendo no computador" className="typing-ilustration" src="/assets/application/typing-ilustration.svg" />
      <ButtonCv disabled={clicked} onClick={handleClick}><Text font="snippet" color="activeTitle" tag="span">baixar-curriculo</Text></ButtonCv>
    </Container>
  );
}

export default SideBox;