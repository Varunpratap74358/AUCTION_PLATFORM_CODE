import { SUPER_ADMIN_API_POINT } from '@/utils/APIs'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getAllAuctionItem } from './auctionSlice'

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState: {
    loading: false,
    monthlyrevenue: [],
    totalAucteners: [],
    totalBidders: [],
    paymentProofs: [],
    singlePaymentProof: {},
  },
  reducers: {
    monthlyrevenueRequest(state, action) {
      state.loading = true
      state.monthlyrevenue = []
    },
    monthlyrevenueSuccess(state, action) {
      state.loading = false
      state.monthlyrevenue = action.payload
    },
    monthlyrevenueFaild(state, action) {
      state.loading = false
      state.monthlyrevenue = []
    },

    requestForAllUsers(state, action) {
      state.loading = true
      state.totalAucteners = []
      state.totalAucteners = []
    },
    successForAllUsers(state, action) {
      state.loading = false
      state.totalAucteners = action.payload.auctenersArray
      state.totalBidders = action.payload.biddersArray
    },
    faildForAllUsers(state, action) {
      state.loading = false
      state.totalAucteners = []
      state.totalBidders = []
    },

    requestForPaymentsProof(state, action) {
      ;(state.loading = true), (state.paymentProofs = [])
    },
    successForPaymentsProof(state, action) {
      ;(state.loading = false), (state.paymentProofs = action.payload)
    },
    faildForPaymentsProof(state, action) {
      ;(state.loading = false), (state.paymentProofs = [])
    },

    requestForDeletePaymentProof(state, action) {
      state.loading = true
    },
    successForDeletePaymentProof(state, action) {
      state.loading = false
    },
    faildForDeletePaymentProof(state, action) {
      state.loading = false
    },

    requestForSinglePaymentProof(state, action) {
      state.loading = true
      state.singlePaymentProof = {}
    },
    successForSinglePaymentProof(state, action) {
      ;(state.loading = false), (state.singlePaymentProof = action.payload)
    },
    faildForSinglePaymentProof(state, action) {
      state.loading = false
      state.singlePaymentProof = {}
    },

    requestForUpdatePaymentProof(state, action) {
      state.loading = true
    },
    successForUpdatePaymentProof(state, action) {
      state.loading = false
    },
    faildForUpdatePaymentProof(state, action) {
      state.loading = false
    },

    requestForDeleteAuctionItem(state, action) {
      state.loading = true
    },
    successForDeleteAuctionItem(state, action) {
      state.loading = false
    },
    faildForDeleteAuctionItem(state, action) {
      state.loading = false
    },

    clearAllError(state, action) {
      state.loading = false
      state.monthlyrevenue = state.monthlyrevenue
      state.paymentProofs = state.paymentProofs
      state.totalAucteners = state.totalAucteners
      state.totalBidders = state.totalBidders
      state.singlePaymentProof = {}
    },
  },
})

// getmonthly revinew
export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.monthlyrevenueRequest())
  try {
    const { data } = await axios.get(`${SUPER_ADMIN_API_POINT}/monthlyincome`, {
      withCredentials: true,
    })
    dispatch(
      superAdminSlice.actions.monthlyrevenueSuccess(data.totalMonthlyRevenue),
    )
  } catch (error) {
    console.log(error)
    dispatch(superAdminSlice.actions.monthlyrevenueFaild())
  }
}

// get all user
export const getAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForAllUsers())
  try {
    const { data } = await axios.get(`${SUPER_ADMIN_API_POINT}/users/getall`, {
      withCredentials: true,
    })
    dispatch(superAdminSlice.actions.successForAllUsers(data))
  } catch (error) {
    dispatch(superAdminSlice.actions.faildForAllUsers())
    console.log(error)
  }
}

//getAllPyments proof
export const getAllPaymentsProof = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForPaymentsProof())
  try {
    const { data } = await axios.get(
      `${SUPER_ADMIN_API_POINT}/paymentproofs/getall`,
      {
        withCredentials: true,
      },
    )
    dispatch(
      superAdminSlice.actions.successForPaymentsProof(data.paymentsProofs),
    )
  } catch (error) {
    dispatch(superAdminSlice.actions.faildForPaymentsProof())
    console.log(error)
  }
}

// deletepaymentsproof
export const deletepaymentproof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForDeletePaymentProof())
  try {
    const {
      data,
    } = await axios.delete(
      `${SUPER_ADMIN_API_POINT}/paymentproof/delete/${id}`,
      { withCredentials: true },
    )
    toast.success(data.message)
    dispatch(superAdminSlice.actions.successForDeletePaymentProof())
    dispatch(getAllPaymentsProof())
    dispatch(superAdminSlice.actions.clearAllError())
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message)
    dispatch(superAdminSlice.actions.faildForDeletePaymentProof())
  }
}

// singlePaymentProof
export const getSinglePaymentProofDetail = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForSinglePaymentProof())
  try {
    const { data } = await axios.get(
      `${SUPER_ADMIN_API_POINT}/paymentproof/${id}`,
      {
        withCredentials: true,
      },
    )
    dispatch(
      superAdminSlice.actions.successForSinglePaymentProof(
        data.paymentsProofDetail,
      ),
    )
  } catch (error) {
    console.log(error)
    dispatch(superAdminSlice.actions.faildForSinglePaymentProof())
  }
}

//update payment status
export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForUpdatePaymentProof())
  try {
    const { data } = await axios.put(
      `${SUPER_ADMIN_API_POINT}/paymentproof/status/update/${id}`,
      { status, amount },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    dispatch(superAdminSlice.actions.successForUpdatePaymentProof())
    toast.success(data.message)
    dispatch(getAllPaymentsProof())
    dispatch(superAdminSlice.actions.clearAllError())
  } catch (error) {
    console.log(error)
    dispatch(superAdminSlice.actions.faildForUpdatePaymentProof())
    toast.error(error?.response?.data?.message)
  }
}

//delete auction item
export const deleteAuctionItemByAdmin = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForDeleteAuctionItem())
  try {
    const {
      data,
    } = await axios.delete(
      `${SUPER_ADMIN_API_POINT}/auctionitem/delete/${id}`,
      { withCredentials: true },
    )
    toast.success(data.message)
    dispatch(superAdminSlice.actions.successForDeleteAuctionItem())
    dispatch(getAllAuctionItem())
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message)
    dispatch(superAdminSlice.actions.faildForDeleteAuctionItem())
  }
}

// clear all errors
export const clearAllSuperAdminSliceErrors = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.clearAllError())
}

export default superAdminSlice.reducer
