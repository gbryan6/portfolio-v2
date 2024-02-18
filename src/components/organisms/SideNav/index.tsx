import React from 'react'
import { Container } from './styles'
import Accordion from '@/components/molecules/Accordion'
import SideFolder from '@/components/molecules/SideFolder'
import IconText from '@/components/molecules/IconText'
import { AiFillFileText } from 'react-icons/ai'
import { RiTerminalBoxFill } from 'react-icons/ri'
import { FaGamepad } from 'react-icons/fa6'

function SideNav() {
  return (
    <Container>
      <div className="side-nav_left">
        <RiTerminalBoxFill />
        <FaGamepad width={20} height={20} />
      </div>
      <div className="side-nav_right">
        <Accordion title="informações-pessoais">
          <SideFolder color="#E99287" title="bio">
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
          </SideFolder>
          <SideFolder color="#43D9AD" title="interesses">
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
            <IconText text="sobre-mim" icon={AiFillFileText} />
          </SideFolder>
          <SideFolder color="#3A49A4" title="faculdade">
            <IconText text="sobre-mim" icon={AiFillFileText} />
          </SideFolder>
        </Accordion>
        <Accordion title="contato">
          <IconText text="31 982786211" icon={AiFillFileText} />
        </Accordion>
      </div>
    </Container>
  )
}

export default SideNav
