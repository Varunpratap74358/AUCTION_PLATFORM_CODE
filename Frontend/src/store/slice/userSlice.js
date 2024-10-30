import { USER_API_POINT } from '@/utils/APIs'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state, action) {
      ;(state.loading = true),
        (state.isAuthenticated = false),
        (state.user = {})
    },
    registerSuccess(state, action) {
      ;(state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload.user)
    },
    registerFailed(state, action) {
      ;(state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {})
    },

    loginRequest(state, action) {
      ;(state.loading = true),
        (state.isAuthenticated = false),
        (state.user = {})
    },
    loginSuccess(state, action) {
      ;(state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload.user)
    },
    loginFailed(state, action) {
      ;(state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {})
    },



    fetchLeaderBoardRequest(state,action){
      state.loading=true
      state.leaderboard = []
    },
    fetchLeaderBoardSuccess(state,action){
      state.loading=false
      state.leaderboard = action.payload
    },
    fetchLeaderBoardFaild(state,action){
      state.loading=false
      state.leaderboard = []
    },


    fetchUserRequest(state, action) {
      ;(state.loading = true),
        (state.isAuthenticated = false),
        (state.user = {})
    },
    fetchUserSuccess(state, action) {
      ;(state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload)
    },
    fetchUserFailed(state, action) {
      ;(state.loading = false),
        (state.isAuthenticated = false),
        (state.user = {})
    },

    logoutSuccess(state, action) {
      state.isAuthenticated = false
      state.user = {}
    },
    logoutFaild(state, action) {
      state.loading = false
      state.isAuthenticated = state.isAuthenticated
      state.user = state.user
    },
    clearAllErrors(state, action) {
      state.user = state.user
      state.isAuthenticated = state.isAuthenticated
      state.leaderboard = state.leaderboard
      state.loading = false
    },
  },
})

// register
export const register = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest())
  try {
    const { data } = await axios.post(`${USER_API_POINT}/register`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    dispatch(userSlice.actions.registerSuccess(data))
    toast.success(data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  } catch (error) {
    console.log(error)
    dispatch(userSlice.actions.registerFailed())
    toast.error(error?.response?.data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  }
}
// login
export const login = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest())
  try {
    const { data } = await axios.post(`${USER_API_POINT}/login`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
    dispatch(userSlice.actions.loginSuccess(data))
    toast.success(data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  } catch (error) {
    console.log(error)
    dispatch(userSlice.actions.loginFailed())
    toast.error(error?.response?.data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  }
}
// logout
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(`${USER_API_POINT}/logout`, {
      withCredentials: true,
    })
    dispatch(userSlice.actions.logoutSuccess())
    toast.success(response?.data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(userSlice.actions.logoutFaild())
    toast.error(error?.response?.data?.message)
    dispatch(userSlice.actions.clearAllErrors())
  }
}
// fetch users
export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest())
  try {
    const response = await axios.get(`${USER_API_POINT}/me`, {
      withCredentials: true,
    })
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user))
    dispatch(userSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed())
    dispatch(userSlice.actions.clearAllErrors())
    console.warn(error)
  }
}
// export fetchleaderBoard
export const fetchLeaderBoard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderBoardRequest())
  try {
    const response = await axios.get(`${USER_API_POINT}/leaderboard`, {
      withCredentials: true,
    })
    // console.log(response.data)
    dispatch(userSlice.actions.fetchLeaderBoardSuccess(response.data.leaderboard))
    dispatch(userSlice.actions.clearAllErrors())
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderBoardFaild())
    console.warn(error)
    dispatch(userSlice.actions.clearAllErrors())
  }
}

export default userSlice.reducer
