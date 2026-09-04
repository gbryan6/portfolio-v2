'use client'

import React from 'react'
import { motion } from 'motion/react'
import type { Variants } from 'motion/react'

import { Container } from './styles'
import Accordion from '@/components/molecules/Accordion'
import SideFolder from '@/components/molecules/SideFolder'
import IconText from '@/components/molecules/IconText'
import { AiFillFileText } from 'react-icons/ai'
import { RiTerminalBoxFill } from 'react-icons/ri'
import { FaGamepad } from 'react-icons/fa6'
import { useTabs } from '@/hooks/Tabs'
import { Presence, useMotionPreset } from '@/components/motion'

interface ISections {
  title: string
  folders: {
    title: string
    color: string
    tabs: {
      id: string
      title: string
      content: string
      active: boolean
    }[]
  }[]
}

interface ISideNavProps {
  hasLeft?: boolean
  sections?: ISections[]
  children?: React.ReactNode
}

const RAIL = [
  { info: 'dev', Icon: RiTerminalBoxFill },
  { info: 'hobbies', Icon: FaGamepad },
] as const

function SideNav({ sections, hasLeft = false, children }: ISideNavProps) {
  const { activeInfo, setActiveInfo, addTab } = useTabs()

  const enter = useMotionPreset('base')
  const exit = useMotionPreset('fast')
  const rail = useMotionPreset('layout')

  const swap: Variants = {
    hidden: { opacity: 0, x: 8 },
    show: { opacity: 1, x: 0, transition: enter },
    exit: { opacity: 0, x: -8, transition: exit },
  }

  return (
    <Container>
      {hasLeft && (
        <div className="side-nav_left">
          {RAIL.map(({ info, Icon }) => {
            const active = activeInfo === info
            return (
              <span
                key={info}
                className={
                  active
                    ? 'side-nav_left-button active'
                    : 'side-nav_left-button'
                }
                onClick={() => setActiveInfo(info)}
              >
                {active && (
                  <motion.span
                    layoutId="rail-active"
                    className="side-nav_left-indicator"
                    transition={rail}
                  />
                )}
                <Icon />
              </span>
            )
          })}
        </div>
      )}

      <div className="side-nav_right">
        {sections && (
          <Presence mode="wait" initial={false}>
            <motion.div
              key={activeInfo}
              variants={swap}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {sections.map((section) => (
                <Accordion title={section.title} key={section.title}>
                  {section.folders.map((folder) => (
                    <SideFolder
                      color={folder.color}
                      title={folder.title}
                      key={folder.title}
                    >
                      {folder.tabs.map((tab) => (
                        <IconText
                          text={tab.title}
                          icon={AiFillFileText}
                          key={tab.id}
                          onClick={() => addTab(tab)}
                          className="file-folder"
                        />
                      ))}
                    </SideFolder>
                  ))}
                </Accordion>
              ))}
            </motion.div>
          </Presence>
        )}

        {sections && (
          <Accordion title="contato">
            <IconText
              text="31 982786211"
              icon={AiFillFileText}
              className="label-button"
            />
            <IconText
              text="gabrielsalmi2011@gmail.com"
              icon={AiFillFileText}
              className="label-button"
            />
          </Accordion>
        )}

        {children}
      </div>
    </Container>
  )
}

export default SideNav
