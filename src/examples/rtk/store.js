import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async Thunks
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 1
  }
)

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    return data.slice(0, 3)
  }
)

// Counter Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    reset: (state) => {
      state.count = 0
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.count += action.payload
    })
  },
})

// Users Slice
const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false
      })
      .addCase(incrementAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(incrementAsync.fulfilled, (state) => {
        state.loading = false
      })
  },
})

// Export Actions
export const { increment, decrement, reset } = counterSlice.actions

// Configure Store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    users: usersSlice.reducer,
  },
})

