import { CounterProvider, useCounter } from './CounterContext'

const CounterDisplay = () => {
  const { count } = useCounter()
  return <div className="counter-display">{count}</div>
}

const CounterControls = () => {
  const { increment, decrement, reset, incrementAsync, loading } = useCounter()
  
  return (
    <div className="buttons">
      <button className="increment" onClick={increment} disabled={loading}>
        +1
      </button>
      <button className="decrement" onClick={decrement} disabled={loading}>
        -1
      </button>
      <button className="reset" onClick={reset} disabled={loading}>
        Reset
      </button>
      <button className="async-btn" onClick={incrementAsync} disabled={loading}>
        {loading ? 'Loading...' : 'Async +1'}
      </button>
    </div>
  )
}

const UsersList = () => {
  const { users, loading, fetchUsers } = useCounter()

  return (
    <div>
      <button className="async-btn" onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Загрузить пользователей'}
      </button>
      
      {users.length > 0 && (
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const ReactStateExample = () => {
  return (
    <CounterProvider>
      <div className="counter-container">
        <h2>React Context + useState</h2>
        <CounterDisplay />
        <CounterControls />
        <UsersList />
        
        <div className="info-section">
          <h3>Особенности:</h3>
          <ul>
            <li>✅ Встроенное решение React, не требует дополнительных библиотек</li>
            <li>✅ Простота для небольших приложений</li>
            <li>✅ Context API для избежания prop drilling</li>
            <li>⚠️ Все подписчики Context перерендериваются при изменении любого значения</li>
            <li>⚠️ Требует оборачивания компонентов в Provider</li>
            <li>⚠️ Сложнее масштабировать для больших приложений</li>
            <li>📦 Вся логика в <code>CounterContext.jsx</code></li>
          </ul>
        </div>
      </div>
    </CounterProvider>
  )
}

export default ReactStateExample

