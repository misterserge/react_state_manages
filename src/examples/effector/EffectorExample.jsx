import { useStore, useUnit } from 'effector-react'
import { 
  $count, 
  $users, 
  $loading, 
  $doubleCount,
  increment, 
  decrement, 
  reset,
  incrementAsyncFx,
  fetchUsersFx
} from './model'

const CounterDisplay = () => {
  const count = useStore($count)
  const doubleCount = useStore($doubleCount)
  
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
  // useUnit - оптимизированный хук для multiple stores/events
  const loading = useStore($loading)
  
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
      <button className="async-btn" onClick={() => incrementAsyncFx()} disabled={loading}>
        {loading ? 'Loading...' : 'Async +1'}
      </button>
    </div>
  )
}

const UsersList = () => {
  const users = useStore($users)
  const loading = useStore($loading)

  return (
    <div>
      <button className="async-btn" onClick={() => fetchUsersFx()} disabled={loading}>
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

const EffectorExample = () => {
  return (
    <div className="counter-container">
      <h2>Effector (Реактивный подход)</h2>
      <CounterDisplay />
      <CounterControls />
      <UsersList />
      
      <div className="info-section">
        <h3>Особенности:</h3>
        <ul>
          <li>✅ Реактивный подход с четким разделением Store/Event/Effect</li>
          <li>✅ TypeScript first - отличная типизация из коробки</li>
          <li>✅ Effect для async операций с pending/done/fail состояниями</li>
          <li>✅ Combine и sample для сложной логики</li>
          <li>✅ Производные store через <code>.map()</code></li>
          <li>✅ Автоматическая оптимизация ре-рендеров</li>
          <li>✅ Framework agnostic (работает с React, Vue, Svelte)</li>
          <li>✅ Маленький размер (~10kb)</li>
          <li>✅ Отличная производительность</li>
          <li>⚠️ Специфичная терминология (Store, Event, Effect, Domain)</li>
          <li>⚠️ Steep learning curve для новичков</li>
          <li>📦 Вся логика в <code>model.js</code> с events, stores, effects</li>
        </ul>
      </div>
    </div>
  )
}

export default EffectorExample

