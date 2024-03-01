import { useState, useEffect } from 'react'

const useTypewriter = (text: string, time = 100, delay = 5000) => {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const handleTyping = () => {
      let index = 0
      const intervalId = setInterval(() => {
        if (index < text.length) {
          const letter = text.charAt(index)
          console.log(letter)
          setTypedText((prevLetter) => prevLetter + letter)
          index++
        } else {
          clearInterval(intervalId)
        }
      }, time)
    }

    const timeoutId = setTimeout(() => {
      handleTyping()
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text, time, delay])

  return typedText
}

export default useTypewriter
