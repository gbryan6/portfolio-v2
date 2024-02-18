'use client'

import React, { createContext, useState, useContext } from 'react'

export type Tab = {
  id: string
  title: string
  content: React.ReactNode
  active: boolean
}

type TabsContextType = {
  tabs: Tab[]
  activeInfo: 'dev' | 'hobbies'
  setActiveTab: (tabId: string) => void
  setActiveInfo: (info: 'dev' | 'hobbies') => void
  addTab: (newTab: Tab) => void
  removeTab: (tabId: string) => void
}

interface ITabsContextProvider {
  children: React.ReactNode
}

const TabsContext = createContext<TabsContextType>({} as TabsContextType)

export const TabsProvider: React.FC<ITabsContextProvider> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeInfo, setActiveInfo] = useState<'dev' | 'hobbies'>('dev')

  const setActiveTab = (tabId: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      active: tab.id === tabId,
    }))
    setTabs(updatedTabs)
  }

  const addTab = (newTab: Tab) => {
    setTabs([...tabs, newTab])
  }

  const removeTab = (tabId: string) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId)
    setTabs(updatedTabs)
  }

  return (
    <TabsContext.Provider
      value={{
        tabs,
        activeInfo,
        setActiveTab,
        setActiveInfo,
        addTab,
        removeTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export const useTabs = () => useContext(TabsContext)
