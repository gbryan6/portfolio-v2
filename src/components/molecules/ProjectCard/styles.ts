'use client'

import styled from 'styled-components'
import { motion } from 'motion/react'

export const Heading = styled.h3`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem;

  margin-bottom: 1.2rem;

  .n {
    font-weight: 700;
  }
`

export const CardBody = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.activeBackground};

  overflow: hidden;

  transition: border-color var(--motion-fast) ease;
`

export const Thumb = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`

export const Badge = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.6rem;

  display: grid;
  place-items: center;

  background-color: ${({ theme }) => theme.colors.buttonColor};

  > svg {
    width: 1.6rem;
    height: 1.6rem;
    color: ${({ theme }) => theme.colors.fontSecondary};
  }
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding: 1.6rem 2rem;

  .desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export const Pill = styled(motion.a)`
  align-self: flex-start;

  background-color: ${({ theme }) => theme.colors.buttonColor};
  border-radius: 999rem;

  padding: 0.8rem 1.6rem;

  text-decoration: none;
`

export const Container = styled(motion.article)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  &:hover ${CardBody} {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`
