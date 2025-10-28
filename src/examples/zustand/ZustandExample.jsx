import { useCounterStore } from './store'

const CounterDisplay = () => {
  const count = useCounterStore((state) => state.count)
  return <div className="counter-display">{count}</div>
}

const CounterControls = () => {
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)
  const incrementAsync = useCounterStore((state) => state.incrementAsync)
  const loading = useCounterStore((state) => state.loading)
  
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
  const users = useCounterStore((state) => state.users)
  const loading = useCounterStore((state) => state.loading)
  const fetchUsers = useCounterStore((state) => state.fetchUsers)

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

const ZustandExample = () => {
  return (
    <div className="counter-container">
      <h2>Zustand</h2>
      <CounterDisplay />
      <CounterControls />
      <UsersList />
      
      <div className="info-section">
        <h3>Особенности:</h3>
        <ul>
          <li>✅ Минималистичный API, очень простой в использовании</li>
          <li>✅ Не требует Provider, работает как хук</li>
          <li>✅ Селекторы предотвращают лишние перерендеры</li>
          <li>✅ Отличная производительность</li>
          <li>✅ Маленький размер библиотеки (~1kb)</li>
          <li>✅ TypeScript из коробки</li>
          <li>✅ Middleware для DevTools, persist и других фич</li>
          <li>📦 Вся логика в <code>store.js</code></li>
        </ul>
      </div>
    </div>
  )
}

export default ZustandExample

