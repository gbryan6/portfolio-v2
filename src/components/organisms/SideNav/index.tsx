import React from 'react'
import { Container } from './styles'
import Accordion from '@/components/molecules/Accordion'
import SideFolder from '@/components/molecules/SideFolder'
import IconText from '@/components/molecules/IconText'
import { AiFillFileText } from 'react-icons/ai'
import { RiTerminalBoxFill } from 'react-icons/ri'
import { FaGamepad } from 'react-icons/fa6'
import { useTabs } from '@/hooks/Tabs'

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

interface ISideNav {
  hasLeft?: boolean
  sections?: ISections[]
  children?: React.ReactNode
}

function SideNav({ sections, hasLeft = false, children }: ISideNav) {
  const { activeInfo, setActiveInfo, addTab } = useTabs()

  return (
    <Container>
      {hasLeft && (
        <div className="side-nav_left">
          <span
            className={
              activeInfo === 'dev'
                ? 'side-nav_left-button active'
                : 'side-nav_left-button'
            }
            onClick={() => setActiveInfo('dev')}
          >
            <RiTerminalBoxFill />
          </span>
          <span
            className={
              activeInfo === 'hobbies'
                ? 'side-nav_left-button active'
                : 'side-nav_left-button'
            }
            onClick={() => setActiveInfo('hobbies')}
          >
            <FaGamepad width={10} height={10} />
          </span>
        </div>
      )}
      <div className="side-nav_right">
        {sections &&
          sections.map((section) => {
            const { folders, title } = section

            return (
              <>
                <Accordion title={title} key={title}>
                  {folders.map((folder) => {
                    const { tabs } = folder

                    return (
                      <SideFolder
                        color={folder.color}
                        title={folder.title}
                        key={folder.title}
                      >
                        {tabs.map((tab) => {
                          return (
                            <IconText
                              text={tab.title}
                              icon={AiFillFileText}
                              key={tab.id}
                              onClick={() => addTab(tab)}
                              className="file-folder"
                            />
                          )
                        })}
                      </SideFolder>
                    )
                  })}
                </Accordion>
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
              </>
            )
          })}
        {children}
      </div>
    </Container>
  )
}

export default SideNav
