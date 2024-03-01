'use client'

import { Text } from '@/components/atoms'
import useTypewriter from '@/hooks/useTypewriter'
import { Container, Content } from '@/styles/pages/home'
import { useState } from 'react'

export default function Home() {
  const [downloadCv, setDownloadCV] = useState(false)

  const hello = useTypewriter('Olá 👋. Eu sou', 50, 0)
  const name = useTypewriter('Gabriel Bryan', 50, 700)
  const role = useTypewriter('> Front-end developer', 50, 1400)
  const infoText1 = useTypewriter('// Pressione o botão ao lado', 50, 2550)
  const infoText2 = useTypewriter('// para baixar o meu curriculo.', 50, 3950)

  function TextDowload() {
    const lineOneType = useTypewriter('const ', 50, 0)
    const lineOneVar = useTypewriter('curriculo ', 50, 300)
    const lineOneEquals = useTypewriter('= ', 50, 380)
    const lineOneOpenBracket = useTypewriter('{', 50, 430)
    const lineTwoAttribute = useTypewriter('    download', 50, 450)
    const lineTwoColon = useTypewriter(': ', 50, 1050)
    const lineTwoString = useTypewriter(
      '“gbryandev.com.br/curriculo”,',
      50,
      1150
    )
    const lineTwoCloseBracket = useTypewriter('}', 50, 2450)
    const downloadCVlabel = useTypewriter('curriculo.', 50, 2500)
    const downloadCVbutton = useTypewriter('download', 50, 3000)

    return (
      <Text tag="p" font="label" color="activeTitle" className="snippet">
        <Text
          tag="span"
          font="label"
          color="activeTitle"
          className="snippet-purple"
        >
          {lineOneType}
          <Text
            tag="span"
            font="label"
            color="activeTitle"
            className="snippet-green"
          >
            {lineOneVar}
            <Text tag="span" font="label" color="activeTitle">
              {lineOneEquals}
              <Text tag="span" font="label" color="activeTitle">
                {lineOneOpenBracket}
              </Text>
            </Text>
          </Text>
        </Text>
        <Text
          tag="span"
          font="label"
          color="activeTitle"
          className="snippet-break-column"
        >
          {lineTwoAttribute}
          <Text
            tag="span"
            font="label"
            color="activeTitle"
            className="snippet-red"
          >
            {lineTwoColon}
            <Text
              tag="span"
              font="label"
              color="activeTitle"
              className="snippet-orange"
            >
              {lineTwoString}
            </Text>
          </Text>
        </Text>
        <Text tag="span" font="label" color="activeTitle">
          {lineTwoCloseBracket}
        </Text>
        <Text
          tag="span"
          font="label"
          color="activeTitle"
          className="snippet-green"
        >
          {downloadCVlabel}
          <a href="" className="snippet-download">
            {downloadCVbutton}
          </a>
        </Text>
      </Text>
    )
  }

  return (
    <Container>
      <Content>
        <div className="writer">
          <div className="writer-top">
            <Text tag="span" font="body" color="fontSecondary">
              {hello}
            </Text>
            <Text
              tag="span"
              font="head"
              color="fontSecondary"
              className="dev-name"
            >
              {name}
            </Text>
            <Text
              tag="span"
              font="subHead"
              color="fontPrimary"
              className="snippet-purple"
            >
              {role}
            </Text>
          </div>
          <div className="writer-bottom">
            <Text tag="span" font="label" color="fontPrimary">
              {infoText1}
            </Text>
            <Text tag="span" font="label" color="fontPrimary">
              {infoText2}
            </Text>
            {downloadCv && <TextDowload />}
          </div>
        </div>
      </Content>
    </Container>
  )
}
