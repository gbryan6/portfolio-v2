'use client'

import Accordion from '@/components/molecules/Accordion';
import { RiTerminalBoxFill } from "react-icons/ri";
import { FaGamepad } from "react-icons/fa6";
import { Container, SideNav } from '@/styles/pages/aboutMe'
import SideFolder from '@/components/molecules/SideFolder';
import IconText from '@/components/molecules/IconText';

import { AiFillFileText } from "react-icons/ai";

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <SideNav>
        <div className='side-nav_left'>
          <RiTerminalBoxFill />
          <FaGamepad width={20} height={20} />
        </div>
        <div className='side-nav_right'>
          <Accordion title='informações-pessoais'>
            <SideFolder color='#E99287' title='bio'>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
            </SideFolder>
            <SideFolder color='#43D9AD' title='interesses'>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
            </SideFolder>
            <SideFolder color='#3A49A4' title='faculdade'>
              <IconText text='sobre-mim' icon={AiFillFileText}/>
            </SideFolder>
          </Accordion>
          <Accordion title='contato'>
            <IconText text='31 982786211' icon={AiFillFileText}/>
          </Accordion>
        </div>
        
      </SideNav>
    </Container>
  );
}

