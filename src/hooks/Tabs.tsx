'use client'

import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react'

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
  reorderTabs: (orderedIds: string[]) => void
  /** True while a file is being dragged from the sidebar towards the tab/content drop zone. */
  isDraggingFile: boolean
  setDraggingFile: (value: boolean) => void
}

interface ITabsContextProvider {
  children: React.ReactNode
}

const TabsContext = createContext<TabsContextType>({} as TabsContextType)

export const TabsProvider: React.FC<ITabsContextProvider> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeInfo, setActiveInfoState] = useState<'dev' | 'hobbies'>('dev')
  const [isDraggingFile, setDraggingFile] = useState(false)

  const setActiveTab = useCallback((tabId: string) => {
    setTabs((prev) => prev.map((tab) => ({ ...tab, active: tab.id === tabId })))
  }, [])

  const setActiveInfo = useCallback((info: 'dev' | 'hobbies') => {
    setActiveInfoState(info)
  }, [])

  const addTab = useCallback((newTab: Tab) => {
    setTabs((prev) => {
      if (prev.some((tab) => tab.id === newTab.id)) {
        return prev.map((tab) => ({ ...tab, active: tab.id === newTab.id }))
      }
      return [
        ...prev.map((tab) => ({ ...tab, active: false })),
        { ...newTab, active: true },
      ]
    })
  }, [])

  const removeTab = useCallback((tabId: string) => {
    setTabs((prev) => {
      const index = prev.findIndex((tab) => tab.id === tabId)
      if (index === -1) return prev

      const wasActive = prev[index].active
      const next = prev.filter((tab) => tab.id !== tabId)

      // keep a tab focused: hand `active` to a neighbour (previous, else next)
      if (wasActive && next.length > 0) {
        const neighbour = Math.min(index, next.length - 1)
        return next.map((tab, i) => ({ ...tab, active: i === neighbour }))
      }
      return next
    })
  }, [])

  const reorderTabs = useCallback((orderedIds: string[]) => {
    setTabs((prev) => {
      const byId = new Map(prev.map((tab) => [tab.id, tab]))
      const next = orderedIds
        .map((id) => byId.get(id))
        .filter((tab): tab is Tab => Boolean(tab))
      return next.length === prev.length ? next : prev
    })
  }, [])

  const activeTab = useMemo(() => tabs.find((tab) => tab.active), [tabs])

  const value = useMemo(
    () => ({
      tabs,
      activeInfo,
      activeTab,
      setActiveTab,
      setActiveInfo,
      addTab,
      removeTab,
      reorderTabs,
      isDraggingFile,
      setDraggingFile,
    }),
    [
      tabs,
      activeInfo,
      activeTab,
      setActiveTab,
      setActiveInfo,
      addTab,
      removeTab,
      reorderTabs,
      isDraggingFile,
    ]
  )

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

export const useTabs = () => useContext(TabsContext)
