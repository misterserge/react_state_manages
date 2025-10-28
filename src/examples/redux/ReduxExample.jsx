import { Provider, useDispatch, useSelector } from 'react-redux'
import { store, increment, decrement, reset, incrementAsync, fetchUsers } from './store'

const CounterDisplay = () => {
  const count = useSelector((state) => state.counter.count)
  return <div className="counter-display">{count}</div>
}

const CounterControls = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.users.loading)
  
  return (
    <div className="buttons">
      <button className="increment" onClick={() => dispatch(increment())} disabled={loading}>
        +1
      </button>
      <button className="decrement" onClick={() => dispatch(decrement())} disabled={loading}>
        -1
      </button>
      <button className="reset" onClick={() => dispatch(reset())} disabled={loading}>
        Reset
      </button>
      <button className="async-btn" onClick={() => dispatch(incrementAsync())} disabled={loading}>
        {loading ? 'Loading...' : 'Async +1'}
      </button>
    </div>
  )
}

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const loading = useSelector((state) => state.users.loading)

  return (
    <div>
      <button className="async-btn" onClick={() => dispatch(fetchUsers())} disabled={loading}>
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

const ReduxContent = () => {
  return (
    <div className="counter-container">
      <h2>Redux (Classic)</h2>
      <CounterDisplay />
      <CounterControls />
      <UsersList />
      
      <div className="info-section">
        <h3>Особенности:</h3>
        <ul>
          <li>✅ Проверенное временем решение (с 2015 года)</li>
          <li>✅ Предсказуемое управление состоянием</li>
          <li>✅ Отличные DevTools для дебага</li>
          <li>✅ Middleware для расширения функционала</li>
          <li>⚠️ Много boilerplate кода (actions, reducers, types)</li>
          <li>⚠️ Требует оборачивания в Provider</li>
          <li>⚠️ Сложнее изучить для новичков</li>
          <li>⚠️ Нужен middleware (thunk/saga) для async операций</li>
          <li>📦 Логика в <code>store.js</code> с actions, reducers</li>
        </ul>
      </div>
    </div>
  )
}

const ReduxExample = () => {
  return (
    <Provider store={store}>
      <ReduxContent />
    </Provider>
  )
}

export default ReduxExample

