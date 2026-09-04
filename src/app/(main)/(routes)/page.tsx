'use client'

import { Text } from '@/components/atoms'
import SnakeGame from '@/components/molecules/SnakeGame'
import useTypewriter from '@/hooks/useTypewriter'
import { Container, Content } from '@/styles/pages/home'
import { useState } from 'react'

const CV_URL = 'https://gbryandev.com.br/curriculo'

export default function Home() {
  const [downloadCv, setDownloadCV] = useState(false)
  const [cvReason, setCvReason] = useState<'skip' | 'won' | null>(null)

  const hello = useTypewriter('Olá 👋. Eu sou', 50, 0)
  const name = useTypewriter('Gabriel Bryan', 50, 700)
  const role = useTypewriter('> Front-end developer', 50, 1400)
  const infoText1 = useTypewriter(
    '// Vença a cobrinha comendo todas as frutas',
    50,
    2550
  )
  const infoText2 = useTypewriter(
    '// ou aperte "skip" para baixar o meu curriculo.',
    50,
    3950
  )

  function handleFinish(reason: 'skip' | 'won') {
    setCvReason(reason)
    setDownloadCV(true)
    window.open(CV_URL, '_blank', 'noopener,noreferrer')
  }

  function CvNote() {
    const note = useTypewriter(
      cvReason === 'won'
        ? '// Boa! Você zerou o jogo — currículo liberado 🎉'
        : '// Beleza, aqui está o meu currículo 👇',
      50,
      0
    )

    return (
      <Text tag="span" font="snippet" color="fontPrimary">
        {note}
      </Text>
    )
  }

  function TextDowload() {
    const lineOneType = useTypewriter('const ', 50, 0)
    const lineOneVar = useTypewriter('curriculo ', 50, 300)
    const lineOneEquals = useTypewriter('= ', 50, 380)
    const lineOneOpenBracket = useTypewriter('{', 50, 430)
    const lineTwoAttribute = useTypewriter('download', 50, 450)
    const lineTwoColon = useTypewriter(': ', 50, 1050)
    const lineTwoString = useTypewriter(
      '() => "gbryandev.com.br/curriculo",',
      50,
      1150
    )
    const lineTwoCloseBracket = useTypewriter('}', 50, 2450)
    const downloadCVlabel = useTypewriter('curriculo.', 50, 2500)
    const downloadCVbutton = useTypewriter('download()', 50, 3000)

    return (
      <Text tag="p" font="snippet" color="activeTitle" className="snippet">
        <Text
          tag="span"
          font="snippet"
          color="activeTitle"
          className="snippet-purple"
        >
          {lineOneType}
          <Text
            tag="span"
            font="snippet"
            color="activeTitle"
            className="snippet-green"
          >
            {lineOneVar}
            <Text tag="span" font="snippet" color="activeTitle">
              {lineOneEquals}
              <Text tag="span" font="snippet" color="activeTitle">
                {lineOneOpenBracket}
              </Text>
            </Text>
          </Text>
        </Text>
        <Text
          tag="span"
          font="snippet"
          color="activeTitle"
          className="snippet-break-column"
        >
          {lineTwoAttribute}
          <Text
            tag="span"
            font="snippet"
            color="activeTitle"
            className="snippet-red"
          >
            {lineTwoColon}
            <Text
              tag="span"
              font="snippet"
              color="activeTitle"
              className="snippet-orange"
            >
              {lineTwoString}
            </Text>
          </Text>
        </Text>
        <Text tag="span" font="snippet" color="activeTitle">
          {lineTwoCloseBracket}
        </Text>
        <Text
          tag="span"
          font="snippet"
          color="activeTitle"
          className="snippet-green"
        >
          {downloadCVlabel}
          <Text tag="span" font="snippet" color="activeTitle">
            {downloadCVbutton}
          </Text>
        </Text>
      </Text>
    )
  }

  return (
    <Container>
      <Content>
        <section className="writer">
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
            <Text tag="span" font="snippet" color="fontPrimary">
              {infoText1}
            </Text>
            <Text tag="span" font="snippet" color="fontPrimary">
              {infoText2}
            </Text>
            {downloadCv && (
              <>
                <CvNote />
                <TextDowload />
              </>
            )}
          </div>
        </section>
        <SnakeGame onFinish={handleFinish} />
      </Content>
    </Container>
  )
}
