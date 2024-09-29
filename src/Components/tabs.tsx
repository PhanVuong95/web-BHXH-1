import { useState, ReactNode, ReactElement } from "react";

interface TabsProps {
  children: ReactElement[]; // Array of React elements (assuming all are Tab components)
}

export function Tabs({ children }: TabsProps) {
  function findActiveTab(a: any) {
    return a.reduce((accumulator: any, currentValue: any, i: any) => {
      if (currentValue.props.active) {
        return i;
      }

      return accumulator;
    }, 0);
  }

  function tabValidator(tab: any) {
    return tab.type.displayName === "Tab" ? true : false;
  }

  const [activeTab, setActiveTab] = useState(findActiveTab(children));
  return (
    <>
      <div className="flex gap-2 justify-center bg-pink-500 p-2">
        {children.map((item: any, i: any) => {
          return (
            <>
              {tabValidator(item) && (
                <Tab
                  key={`tab-{i}`}
                  currentTab={i}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                >
                  {item.props.children}
                </Tab>
              )}
            </>
          );
        })}
      </div>
      <div className="p-5">
        {children.map((item: any, i: any) => {
          return (
            <div className={` ${i === activeTab ? "visible" : "hidden"}`}>
              {item.props.component}
            </div>
          );
        })}
      </div>
    </>
  );
}

interface TabProps {
  children: ReactNode; // Fix: Add ReactNode import
  activeTab: string;
  currentTab: string;
  setActiveTab: (tab: string) => void;
}

// ... rest of the code

export function Tab({
  children,
  activeTab,
  currentTab,
  setActiveTab,
}: TabProps) {
  return (
    <>
      <div
        className={`px-5 py-3 rounded cursor-pointer
      ${activeTab === currentTab ? "bg-white" : "bg-pink-400 text-white"}`}
        onClick={() => setActiveTab(currentTab)}
      >
        {children}
      </div>
    </>
  );
}

Tab.displayName = "Tab";
