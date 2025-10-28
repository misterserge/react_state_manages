import { createContext, useContext, useState } from 'react'

const CounterContext = createContext()

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => prev - 1)
  const reset = () => setCount(0)
  
  const incrementAsync = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCount(prev => prev + 1)
    setLoading(false)
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setUsers(data.slice(0, 3))
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CounterContext.Provider 
      value={{ 
        count, 
        users, 
        loading, 
        increment, 
        decrement, 
        reset, 
        incrementAsync,
        fetchUsers 
      }}
    >
      {children}
    </CounterContext.Provider>
  )
}

export const useCounter = () => {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider')
  }
  return context
}

