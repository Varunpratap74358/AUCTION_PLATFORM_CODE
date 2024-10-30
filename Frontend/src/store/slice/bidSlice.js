import { BID_API_POINT } from '@/utils/APIs'
import axios from 'axios'
import { toast } from 'react-toastify'

import { createSlice } from '@reduxjs/toolkit'
import { getAuctionDetail } from './auctionSlice'

const bidSlice = createSlice({
  name: 'bid',
  initialState: {
    loading: false,
  },
  reducers: {
    bidRequest(state, action) {
      state.loading = true
    },
    bidSuccess(state, action) {
      state.loading = false
    },
    bidFaild(state, action) {
      state.loading = false
    },
  },
})

export const placedBid = (id, amount) => async (dispatch) => {
  dispatch(bidSlice.actions.bidRequest())
  try {
    const {data} = await axios.post(`${BID_API_POINT}/place/${id}`, {amount}, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
    dispatch(bidSlice.actions.bidSuccess())
    toast.success(data.message)
    dispatch(getAuctionDetail(id))
  } catch (error) {
    dispatch(bidSlice.actions.bidFaild())
    console.log(error)
    toast.error(error?.response?.data?.message)
  }
}

export default bidSlice.reducer
