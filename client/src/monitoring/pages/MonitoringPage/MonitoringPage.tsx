import React, { useState } from "react";
import { LogFilter } from "../../components";


type Tab = {
  label: string,
  id: string,
  component: React.ReactNode,
}

const tabs: Tab[] = [
  {
    label: 'Logs',
    id: 'tab1',
    component: <LogFilter />,
  },
  {
    label: 'Log Rotation',
    id: 'tab2',
    component: null,
  }
]

const MonitoringPage = () => {
  const [activeTab, setTab] = useState(tabs[0].id);

  const handleTabClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const tab = event.currentTarget.dataset['tab'] as Tab['label']
    setTab(tab)
  }

  const component = tabs.find((item) => item.id === activeTab)?.component

  return (
    <div id="root" style={{ display: 'flex', columnGap: '16p', padding: '16px' }}>
      <div className="left-panel" style={{ flex: 1, marginRight: '16px' }}>
        <nav className="navigation" style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
          {tabs.map((item) => {
            return (
              <button
                key={item.id}
                className='tab-button'
                data-tab={item.id}
                onClick={handleTabClick}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
      <div className="tab-content" style={{ flex: 8 }}>
        {component}
      </div>
    </div>
  );
};

export { MonitoringPage };
