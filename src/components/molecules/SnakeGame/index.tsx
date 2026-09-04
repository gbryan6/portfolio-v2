'use client'

/* eslint-disable @next/next/no-img-element -- decorative local SVGs, no optimization needed */

import { useEffect, useRef, useState } from 'react'
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io'

import { Text } from '@/components/atoms'
import {
  Board,
  Cell,
  Container,
  Dot,
  Dots,
  FoodBit,
  Instructions,
  Overlay,
  Pad,
  PadButton,
  Side,
  SkipButton,
  StartButton,
} from './styles'

const COLS = 13
const ROWS = 25
const TOTAL_FOOD = 5
const TICK_MS = 120

type Point = { x: number; y: number }
type Status = 'idle' | 'running' | 'over' | 'won'

const INITIAL_SNAKE: Point[] = [
  { x: 6, y: 4 },
  { x: 6, y: 3 },
  { x: 6, y: 2 },
]
const INITIAL_DIR: Point = { x: 0, y: 1 }
const INITIAL_FOOD: Point = { x: 6, y: 18 }

const same = (a: Point, b: Point) => a.x === b.x && a.y === b.y

function randomFood(snake: Point[]): Point {
  let candidate: Point
  do {
    candidate = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    }
  } while (snake.some((segment) => same(segment, candidate)))
  return candidate
}

interface ISnakeGame {
  /** Chamado quando o visitante desiste (skip) ou zera o jogo (won). */
  onFinish?: (reason: 'skip' | 'won') => void
}

export default function SnakeGame({ onFinish }: ISnakeGame) {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Point>(INITIAL_FOOD)
  const [eaten, setEaten] = useState(0)
  const [status, setStatus] = useState<Status>('idle')

  const snakeRef = useRef(snake)
  const foodRef = useRef(food)
  const eatenRef = useRef(eaten)
  const statusRef = useRef(status)
  const directionRef = useRef<Point>(INITIAL_DIR)
  const queuedRef = useRef<Point>(INITIAL_DIR)
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    snakeRef.current = snake
  }, [snake])
  useEffect(() => {
    foodRef.current = food
  }, [food])
  useEffect(() => {
    eatenRef.current = eaten
  }, [eaten])
  useEffect(() => {
    statusRef.current = status
  }, [status])

  function turn(next: Point) {
    const current = directionRef.current
    const isReverse = next.x === -current.x && next.y === -current.y
    const isSame = next.x === current.x && next.y === current.y
    if (isReverse || isSame) return
    queuedRef.current = next
  }

  function start() {
    directionRef.current = INITIAL_DIR
    queuedRef.current = INITIAL_DIR
    snakeRef.current = INITIAL_SNAKE
    const nextFood = randomFood(INITIAL_SNAKE)
    foodRef.current = nextFood
    eatenRef.current = 0

    setSnake(INITIAL_SNAKE)
    setFood(nextFood)
    setEaten(0)
    setStatus('running')
  }

  function handleArrow(next: Point) {
    if (status === 'idle') start()
    turn(next)
  }

  // game loop
  useEffect(() => {
    if (status !== 'running') return

    const id = window.setInterval(() => {
      directionRef.current = queuedRef.current
      const dir = directionRef.current
      const prev = snakeRef.current
      const head = prev[0]
      const nextHead = { x: head.x + dir.x, y: head.y + dir.y }

      const hitWall =
        nextHead.x < 0 ||
        nextHead.x >= COLS ||
        nextHead.y < 0 ||
        nextHead.y >= ROWS
      if (hitWall) {
        setStatus('over')
        return
      }

      const willEat = same(nextHead, foodRef.current)
      const body = willEat ? prev : prev.slice(0, -1)

      if (body.some((segment) => same(segment, nextHead))) {
        setStatus('over')
        return
      }

      const nextSnake = [nextHead, ...body]
      snakeRef.current = nextSnake
      setSnake(nextSnake)

      if (willEat) {
        const nextEaten = eatenRef.current + 1
        eatenRef.current = nextEaten
        setEaten(nextEaten)

        if (nextEaten >= TOTAL_FOOD) {
          setStatus('won')
          onFinishRef.current?.('won')
        } else {
          const nextFood = randomFood(nextSnake)
          foodRef.current = nextFood
          setFood(nextFood)
        }
      }
    }, TICK_MS)

    return () => window.clearInterval(id)
  }, [status])

  // keyboard controls (only while playing, so arrow keys still scroll otherwise)
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (statusRef.current !== 'running') return
      const moves: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      }
      const next = moves[event.key]
      if (!next) return
      event.preventDefault()
      turn(next)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const remaining = TOTAL_FOOD - eaten
  const isEndState = status === 'over' || status === 'won'
  const overlayMessage =
    status === 'over'
      ? 'gameOver()'
      : status === 'won'
      ? 'curriculo.baixado()'
      : null
  const buttonLabel = status === 'idle' ? 'start-game' : 'jogar-de-novo'

  return (
    <Container className="slide-in">
      <img className="bolt bolt--tl" src="/assets/application/bolt-up-left.svg" alt="" />
      <img className="bolt bolt--tr" src="/assets/application/bolt-up-left.svg" alt="" />
      <img className="bolt bolt--bl" src="/assets/application/bolt-up-left.svg" alt="" />
      <img className="bolt bolt--br" src="/assets/application/bolt-up-left.svg" alt="" />

      <Board>
        {snake.map((segment, index) => (
          <Cell
            key={`${segment.x}-${segment.y}`}
            $head={index === 0}
            style={{
              left: `${(segment.x / COLS) * 100}%`,
              top: `${(segment.y / ROWS) * 100}%`,
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
            }}
          />
        ))}

        <FoodBit
          style={{
            left: `${(food.x / COLS) * 100}%`,
            top: `${(food.y / ROWS) * 100}%`,
            width: `${100 / COLS}%`,
            height: `${100 / ROWS}%`,
          }}
        />

        {status !== 'running' && (
          <Overlay $center={isEndState}>
            {overlayMessage && (
              <Text tag="span" font="snippet" color="accent">
                {overlayMessage}
              </Text>
            )}
            <StartButton type="button" onClick={start}>
              <Text tag="span" font="snippet" color="background">
                {buttonLabel}
              </Text>
            </StartButton>
          </Overlay>
        )}
      </Board>

      <Side>
        <Instructions>
          <Text tag="span" font="snippet" color="fontSecondary">
            {'// use o teclado'}
          </Text>
          <Text tag="span" font="snippet" color="fontSecondary">
            {'// ou as setas'}
          </Text>

          <Pad>
            <PadButton
              type="button"
              className="up"
              aria-label="mover para cima"
              onClick={() => handleArrow({ x: 0, y: -1 })}
            >
              <IoIosArrowUp />
            </PadButton>
            <PadButton
              type="button"
              className="left"
              aria-label="mover para a esquerda"
              onClick={() => handleArrow({ x: -1, y: 0 })}
            >
              <IoIosArrowBack />
            </PadButton>
            <PadButton
              type="button"
              className="down"
              aria-label="mover para baixo"
              onClick={() => handleArrow({ x: 0, y: 1 })}
            >
              <IoIosArrowDown />
            </PadButton>
            <PadButton
              type="button"
              className="right"
              aria-label="mover para a direita"
              onClick={() => handleArrow({ x: 1, y: 0 })}
            >
              <IoIosArrowForward />
            </PadButton>
          </Pad>
        </Instructions>

        <div className="food-left">
          <Text tag="span" font="snippet" color="fontSecondary">
            {'// Frutas faltando'}
          </Text>
          <Dots>
            {Array.from({ length: TOTAL_FOOD }).map((_, index) => (
              <Dot key={index} $on={index < remaining} />
            ))}
          </Dots>
        </div>

        {onFinish && (
          <SkipButton type="button" onClick={() => onFinish('skip')}>
            <Text tag="span" font="snippet" color="fontSecondary">
              skip
            </Text>
          </SkipButton>
        )}
      </Side>
    </Container>
  )
}
