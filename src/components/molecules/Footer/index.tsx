import { NavButton, Text } from '@/components/atoms'
import { Container } from './styles'
import { RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri'

function Footer() {
  return (
    <Container>
      <div className="left">
        <Text tag="p" font="label" color="fontPrimary">
          me encontre no:
        </Text>
        <NavButton iconOnly href="#">
          <Text tag="p" font="label" color="fontPrimary">
            <RiLinkedinBoxFill />
          </Text>
        </NavButton>
      </div>
      <div className="right">
      <NavButton iconOnly href="https://github.com/gbryan6" target='_blank' icon={RiGithubFill} textIcon >
        <Text tag="p" font="label" color="fontPrimary">
          @gbryan6
        </Text>
      </NavButton>
      </div>
    </Container>
  )
}

export default Footer
