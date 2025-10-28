import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { 
  countAtom, 
  usersAtom, 
  loadingAtom,
  incrementAtom,
  decrementAtom,
  resetAtom,
  incrementAsyncAtom,
  fetchUsersAtom,
  doubleCountAtom
} from './store'

const CounterDisplay = () => {
  const count = useAtomValue(countAtom)
  const doubleCount = useAtomValue(doubleCountAtom)
  
  return (
    <div>
      <div className="counter-display">{count}</div>
      <p style={{ textAlign: 'center', color: '#aaa' }}>
        Двойное значение: {doubleCount}
      </p>
    </div>
  )
}

const CounterControls = () => {
  const increment = useSetAtom(incrementAtom)
  const decrement = useSetAtom(decrementAtom)
  const reset = useSetAtom(resetAtom)
  const incrementAsync = useSetAtom(incrementAsyncAtom)
  const loading = useAtomValue(loadingAtom)
  
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
  const users = useAtomValue(usersAtom)
  const loading = useAtomValue(loadingAtom)
  const fetchUsers = useSetAtom(fetchUsersAtom)

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

const JotaiExample = () => {
  return (
    <div className="counter-container">
      <h2>Jotai (Атомарный подход)</h2>
      <CounterDisplay />
      <CounterControls />
      <UsersList />
      
      <div className="info-section">
        <h3>Особенности:</h3>
        <ul>
          <li>✅ Атомарный подход - состояние разбито на независимые атомы</li>
          <li>✅ Минималистичный API, похож на <code>useState</code></li>
          <li>✅ Не требует Provider в большинстве случаев</li>
          <li>✅ Производные атомы (computed values) из коробки</li>
          <li>✅ Автоматическая оптимизация ре-рендеров</li>
          <li>✅ Поддержка async атомов нативно</li>
          <li>✅ Маленький размер (~3kb)</li>
          <li>✅ TypeScript first подход</li>
          <li>✅ Utilities: atomWithStorage, atomFamily и др.</li>
          <li>⚠️ Новая парадигма мышления (атомы вместо глобального store)</li>
          <li>📦 Атомы в <code>store.js</code>, используются через хуки</li>
        </ul>
      </div>
    </div>
  )
}

export default JotaiExample

