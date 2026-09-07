'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, Reorder } from 'motion/react'
import type { PanInfo } from 'motion/react'

import { Container } from './styles'
import Accordion from '@/components/molecules/Accordion'
import SideFolder from '@/components/molecules/SideFolder'
import IconText from '@/components/molecules/IconText'
import { TerminalMascot } from '@/components/molecules'
import { AiFillFileText } from 'react-icons/ai'
import { RiTerminalBoxFill } from 'react-icons/ri'
import { FaGamepad } from 'react-icons/fa6'
import { useTabs, Tab as TabType } from '@/hooks/Tabs'
import { Presence, useMotionPreset } from '@/components/motion'
import type { Variants } from 'motion/react'

interface IFolder {
  title: string
  color: string
  tabs: TabType[]
}

interface ISections {
  title: string
  folders: IFolder[]
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
  const { activeInfo, setActiveInfo, addTab, setDraggingFile } = useTabs()

  const enter = useMotionPreset('base')
  const exit = useMotionPreset('fast')
  const rail = useMotionPreset('layout')
  const lift = useMotionPreset('snappy')

  // Local, reorderable copy of the sidebar tree — the source data in _data.tsx
  // stays the fixed order; dragging only rearranges this render-time copy.
  const [orderedSections, setOrderedSections] = useState(sections)

  useEffect(() => {
    setOrderedSections(sections)
  }, [sections])

  // Reorder.Item follows the cursor while dragging, so on release the pointerup
  // (and the click right behind it) still land on the same folder head — without
  // this guard, every drag-to-reorder also toggles the folder open/closed.
  const suppressFolderClick = useRef(false)

  // Bumped on every sidebar action so the astronaut mascot waves.
  const [waveTrigger, setWaveTrigger] = useState(0)
  const wave = () => setWaveTrigger((v) => v + 1)

  const swap: Variants = {
    hidden: { opacity: 0, x: 8 },
    show: { opacity: 1, x: 0, transition: enter },
    exit: { opacity: 0, x: -8, transition: exit },
  }

  function handleReorderFolders(sectionTitle: string, order: string[]) {
    setOrderedSections((prev) =>
      prev?.map((section) => {
        if (section.title !== sectionTitle) return section
        const byTitle = new Map(section.folders.map((folder) => [folder.title, folder]))
        const nextFolders = order
          .map((title) => byTitle.get(title))
          .filter((folder): folder is IFolder => Boolean(folder))
        return { ...section, folders: nextFolders }
      })
    )
  }

  // Dragging a file towards the tab bar / content pane opens it — same as
  // clicking it, just via VS Code's "drag from explorer" gesture.
  function handleFileDragEnd(tab: TabType, info: PanInfo) {
    setDraggingFile(false)
    const target = document.elementFromPoint(info.point.x, info.point.y)
    if (target?.closest('[data-drop-zone="tab-area"]')) {
      addTab(tab)
      wave()
    }
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
                onClick={() => {
                  setActiveInfo(info)
                  wave()
                }}
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
        {orderedSections && (
          <Presence mode="wait" initial={false}>
            <motion.div
              key={activeInfo}
              variants={swap}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {orderedSections.map((section) => (
                <Accordion title={section.title} key={section.title} onToggle={wave}>
                  <Reorder.Group
                    as="div"
                    axis="y"
                    values={section.folders.map((folder) => folder.title)}
                    onReorder={(order) =>
                      handleReorderFolders(section.title, order as string[])
                    }
                  >
                    {section.folders.map((folder) => (
                      <Reorder.Item
                        as="div"
                        key={folder.title}
                        value={folder.title}
                        style={{ position: 'relative' }}
                        onDragStart={() => {
                          suppressFolderClick.current = true
                        }}
                        onDragEnd={() => {
                          setTimeout(() => {
                            suppressFolderClick.current = false
                          }, 0)
                        }}
                        onClickCapture={(event) => {
                          if (suppressFolderClick.current) {
                            event.stopPropagation()
                            suppressFolderClick.current = false
                          }
                        }}
                      >
                        <SideFolder
                          color={folder.color}
                          title={folder.title}
                          onToggle={wave}
                        >
                          {folder.tabs.map((tab) => (
                            <motion.div
                              key={tab.id}
                              drag
                              dragSnapToOrigin
                              dragElastic={0.12}
                              dragMomentum={false}
                              whileDrag={{
                                scale: 1.05,
                                zIndex: 30,
                                boxShadow: '0 0.8rem 1.6rem rgba(0, 0, 0, 0.35)',
                              }}
                              transition={lift}
                              onDragStart={() => setDraggingFile(true)}
                              onDragEnd={(_, info) => handleFileDragEnd(tab, info)}
                              style={{ position: 'relative' }}
                            >
                              <IconText
                                text={tab.title}
                                icon={AiFillFileText}
                                onClick={() => {
                                  addTab(tab)
                                  wave()
                                }}
                                className="file-folder"
                              />
                            </motion.div>
                          ))}
                        </SideFolder>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </Accordion>
              ))}
            </motion.div>
          </Presence>
        )}

        {children}

        {hasLeft && <TerminalMascot trigger={waveTrigger} />}
      </div>
    </Container>
  )
}

export default SideNav
