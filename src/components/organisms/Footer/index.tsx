import { Text } from '@/components/atoms'
import { NavButton } from '@/components/molecules'
import { Container } from './styles'
import { RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri'
import { FaSquareDribbble } from "react-icons/fa6";

function Footer() {
  return (
    <Container>
      <div className="left">
        <Text tag="p" font="snippet" color="fontPrimary">
          me encontre no:
        </Text>
        <NavButton iconOnly href="#">
          <Text tag="p" font="snippet" color="fontPrimary">
            <RiLinkedinBoxFill />
          </Text>
        </NavButton>
        <NavButton iconOnly href="#">
          <Text tag="p" font="snippet" color="fontPrimary">
            <RiGithubFill />
          </Text>
        </NavButton>
      </div>
      <div className="right">
      <NavButton iconOnly href="https://dribbble.com/YankaD" target='_blank' icon={FaSquareDribbble} textIcon >
        <Text tag="p" font="snippet" color="fontPrimary">
          designed by: @YankaD
        </Text>
      </NavButton>
      </div>
    </Container>
  )
}

export default Footer
