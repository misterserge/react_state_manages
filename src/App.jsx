import { useState } from 'react'
import ReactStateExample from './examples/react-state/ReactStateExample'
import ZustandExample from './examples/zustand/ZustandExample'
import ReduxExample from './examples/redux/ReduxExample'
import RTKExample from './examples/rtk/RTKExample'
import JotaiExample from './examples/jotai/JotaiExample'

const App = () => {
  const [activeTab, setActiveTab] = useState('react-state')

  const tabs = [
    { id: 'react-state', label: 'React State + Context' },
    { id: 'zustand', label: 'Zustand' },
    { id: 'jotai', label: 'Jotai' },
    { id: 'redux', label: 'Redux Classic' },
    { id: 'rtk', label: 'Redux Toolkit' },
  ]

  const renderExample = () => {
    switch (activeTab) {
      case 'react-state':
        return <ReactStateExample />
      case 'zustand':
        return <ZustandExample />
      case 'jotai':
        return <JotaiExample />
      case 'redux':
        return <ReduxExample />
      case 'rtk':
        return <RTKExample />
      default:
        return <ReactStateExample />
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>⚛️ React State Management Comparison</h1>
        <p>Сравнение различных подходов к управлению состоянием в React</p>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="example-container">
        {renderExample()}
      </div>
    </div>
  )
}

export default App

