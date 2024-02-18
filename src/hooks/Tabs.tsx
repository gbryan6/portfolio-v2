'use client'

import React, { createContext, useState, useContext } from 'react';

type Tab = {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  active: boolean;
};

type TabsContextType = {
  tabs: Tab[];
  setActiveTab: (tabId: string) => void;
};

interface ITabsContextProvider {
  children: React.ReactNode
}

const TabsContext = createContext<TabsContextType>({
  tabs: [],
  setActiveTab: () => {},
});

export const TabsProvider: React.FC<ITabsContextProvider> = ({
  children,
}) => {
  const [tabs, setTabs] = useState<Tab[]>([]);

  const setActiveTab = (tabId: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      active: tab.id === tabId,
    }));
    setTabs(updatedTabs);
  };

  return (
    <TabsContext.Provider value={{ tabs, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
