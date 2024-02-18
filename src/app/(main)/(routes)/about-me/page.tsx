'use client'

import Accordion from '@/components/molecules/Accordion';
import { RiTerminalBoxFill } from "react-icons/ri";
import { FaGamepad } from "react-icons/fa6";
import { Container, TabsContainer } from '@/styles/pages/aboutMe'
import SideFolder from '@/components/molecules/SideFolder';
import IconText from '@/components/molecules/IconText';

import { AiFillFileText } from "react-icons/ai";
import SideNav from '@/components/organisms/SideNav';

export default function AboutMe() {
  return (
    <Container>
      <SideNav />
      <TabsContainer>
        {/* <Tab />
        {Conteudo da tab ativa} */}
      </TabsContainer>
    </Container>
  );
}

