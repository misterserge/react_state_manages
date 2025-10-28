import { createStore, createEvent, createEffect, combine, sample } from 'effector'

// Events - события для изменения состояния
export const increment = createEvent()
export const decrement = createEvent()
export const reset = createEvent()

// Effects - для async операций
export const incrementAsyncFx = createEffect(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return 1
})

export const fetchUsersFx = createEffect(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data.slice(0, 3)
})

// Stores - хранилища данных
export const $count = createStore(0)
  .on(increment, (state) => state + 1)
  .on(decrement, (state) => state - 1)
  .on(reset, () => 0)
  .on(incrementAsyncFx.doneData, (state, payload) => state + payload)

export const $users = createStore([])
  .on(fetchUsersFx.doneData, (_, users) => users)

export const $loading = createStore(false)
  .on(incrementAsyncFx.pending, (_, pending) => pending)
  .on(fetchUsersFx.pending, (_, pending) => pending)

// Производные store (computed values)
export const $doubleCount = $count.map(count => count * 2)
export const $isPositive = $count.map(count => count > 0)

// Combine - объединение нескольких store
export const $countersData = combine({
  count: $count,
  doubleCount: $doubleCount,
  isPositive: $isPositive,
})

// Sample - реагирование на события с условиями
// Пример: сбрасывать счетчик при загрузке пользователей
sample({
  clock: fetchUsersFx.done,
  target: reset,
})

