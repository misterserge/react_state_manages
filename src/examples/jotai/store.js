import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Базовые атомы
export const countAtom = atom(0)
export const usersAtom = atom([])
export const loadingAtom = atom(false)

// Производные атомы (computed)
export const doubleCountAtom = atom((get) => get(countAtom) * 2)
export const isPositiveAtom = atom((get) => get(countAtom) > 0)

// Атомы с write функциями
export const incrementAtom = atom(
  null, // read не нужен
  (get, set) => set(countAtom, get(countAtom) + 1)
)

export const decrementAtom = atom(
  null,
  (get, set) => set(countAtom, get(countAtom) - 1)
)

export const resetAtom = atom(
  null,
  (get, set) => set(countAtom, 0)
)

// Асинхронный атом
export const incrementAsyncAtom = atom(
  null,
  async (get, set) => {
    set(loadingAtom, true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    set(countAtom, get(countAtom) + 1)
    set(loadingAtom, false)
  }
)

// Асинхронная загрузка пользователей
export const fetchUsersAtom = atom(
  null,
  async (get, set) => {
    set(loadingAtom, true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      set(usersAtom, data.slice(0, 3))
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      set(loadingAtom, false)
    }
  }
)

// Опциональный пример: атом с localStorage
export const persistedCountAtom = atomWithStorage('jotai-count', 0)

