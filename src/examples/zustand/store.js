import { create } from 'zustand'

export const useCounterStore = create((set) => ({
  count: 0,
  users: [],
  loading: false,
  
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  
  incrementAsync: async () => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 1000))
    set((state) => ({ count: state.count + 1, loading: false }))
  },
  
  fetchUsers: async () => {
    set({ loading: true })
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      set({ users: data.slice(0, 3), loading: false })
    } catch (error) {
      console.error('Error fetching users:', error)
      set({ loading: false })
    }
  },
}))

