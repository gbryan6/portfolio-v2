'use client'

import React, { createContext, useState, useContext, useMemo } from 'react'

export type Tab = {
  id: string
  title: string
  content: string
  active: boolean
}

type TabsContextType = {
  tabs: Tab[]
  activeInfo: 'dev' | 'hobbies'
  activeTab: Tab | undefined
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
    const tabExists = tabs.some((tab) => tab.id === newTab.id)

    if (tabExists) {
      const updatedTabs = tabs.map((tab) => ({
        ...tab,
        active: tab.id === newTab.id,
      }))
      setTabs(updatedTabs)
    } else {
      setTabs([
        ...tabs.map((tab) => ({ ...tab, active: false })),
        { ...newTab, active: true },
      ])
    }
  }

  const removeTab = (tabId: string) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId)
    console.log(updatedTabs)
    setTabs(updatedTabs)
  }

  const activeTab = useMemo(() => {
    return tabs.find((tab) => tab.active);
  }, [tabs])

  return (
    <TabsContext.Provider
      value={{
        tabs,
        activeInfo,
        activeTab,
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
