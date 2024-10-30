import { AUCTION_API_POINT } from '@/utils/APIs'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidder: [],
    myAuctions: [],
    allAuctions: [],
  },
  reducers: {
    getAllauctionRequiest(state, action) {
      state.loading = true
    },
    getAllauctionSuccess(state, action) {
      state.loading = false
      state.allAuctions = action.payload
    },
    getAllauctionFaild(state, action) {
      state.loading = false
    },

    getAuctionDetailRequiest(state, action) {
      state.loading = true
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false
      state.auctionDetail = action.payload.auctionItem
      state.auctionBidder = action.payload.bidders
    },
    getAuctionDetailFaild(state, action) {
      state.loading = false
      state.auctionDetail = state.auctionDetail
      state.auctionBidder = state.auctionBidder
    },

    createAuctionRequest(state, action) {
      state.loading = true
    },
    createAuctionSuccess(state, action) {
      state.loading = false
    },
    createAuctionFaild(state, action) {
      state.loading = false
    },

    getMyAuctionItemsRequest(state, action) {
      state.loading = true
      state.myAuctions = []
    },
    getMyAuctionItemsSuccess(state, action) {
      state.loading = false
      state.myAuctions = action.payload
    },
    getMyAuctionItemsFaild(state, action) {
      state.loading = false
      state.myAuctions = []
    },

    deleteAuctionItemRequest(state, action) {
      state.loading = true
    },
    deleteAuctionItemSuccess(state, action) {
      state.loading = false
    },
    deleteAuctionItemFaild(state, action) {
      state.loading = false
    },

    republishAuctionItemRequest(state, action) {
      state.loading = true
    },
    republishAuctionItemSuccess(state, action) {
      state.loading = false
    },
    republishAuctionItemFaild(state, action) {
      state.loading = false
    },

    resetSlice(state, action) {
      state.loading = false
      state.auctionDetail = state.auctionDetail
      state.itemDetail = state.itemDetail
      state.myAuctions = state.myAuctions
      state.allAuctions = state.allAuctions
    },
  },
})

//get auction items
export const getAllAuctionItem = () => async (dispatch) => {
  // console.log("Hello")
  dispatch(auctionSlice.actions.getAllauctionRequiest())
  try {
    const { data } = await axios.get(`${AUCTION_API_POINT}/allitems`, {
      withCredentials: true,
    })
    // console.log(data)
    dispatch(auctionSlice.actions.getAllauctionSuccess(data.items))
    dispatch(auctionSlice.actions.resetSlice())
  } catch (error) {
    dispatch(auctionSlice.actions.getAllauctionFaild())
    console.log(error)
    dispatch(auctionSlice.actions.resetSlice())
  }
}

//get auction detail
export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAuctionDetailRequiest())
  try {
    const { data } = await axios.get(`${AUCTION_API_POINT}/auction/${id}`, {
      withCredentials: true,
    })
    dispatch(auctionSlice.actions.getAuctionDetailSuccess(data))
    dispatch(auctionSlice.actions.resetSlice())
  } catch (error) {
    dispatch(auctionSlice.actions.getAuctionDetailFaild())
    console.log(error)
    dispatch(auctionSlice.actions.resetSlice())
  }
}

// /create  auction
export const createAuction = (formData) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest())
  try {
    const { data } = await axios.post(`${AUCTION_API_POINT}/create`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multiprt/form-data' },
    })
    toast.success(data.message)
    dispatch(auctionSlice.actions.createAuctionSuccess())
    dispatch(getAllAuctionItem())
  } catch (error) {
    dispatch(auctionSlice.actions.createAuctionFaild())
    console.log(error)
    toast.error(error?.response?.data?.message)
  }
}
// get my auctions
export const getMyAuctionItem = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionItemsRequest())
  try {
    const { data } = await axios.get(`${AUCTION_API_POINT}/myitems`, {
      withCredentials: true,
    })
    // console.log(data.items)
    dispatch(auctionSlice.actions.getMyAuctionItemsSuccess(data.items))
  } catch (error) {
    console.log(error)
    dispatch(auctionSlice.actions.getMyAuctionItemsFaild())
  }
}
// delete auction
export const deleteAuctionItem = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.deleteAuctionItemRequest())
  try {
    const { data } = await axios.delete(`${AUCTION_API_POINT}/delete/${id}`, {
      withCredentials: true,
    })
    toast.success(data?.message)
    dispatch(auctionSlice.actions.deleteAuctionItemSuccess())
    dispatch(getMyAuctionItem())
    dispatch(getAllAuctionItem())
    dispatch(auctionSlice.actions.resetSlice())
  } catch (error) {
    // console.log(error)
    dispatch(auctionSlice.actions.deleteAuctionItemFaild())
    dispatch(auctionSlice.actions.resetSlice())
    toast.error(error?.response?.data?.message)
  }
}
//republish auction
export const republishAuction = (id, formdata) => async (dispatch) => {
  console.log(formdata)
  dispatch(auctionSlice.actions.republishAuctionItemRequest())
  try {
    const { data } = await axios.put(
      `${AUCTION_API_POINT}/item/republish/${id}`,
       formdata ,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      },
    )
    toast.success(data.message)
    dispatch(auctionSlice.actions.republishAuctionItemSuccess())
    dispatch(getMyAuctionItem())
    dispatch(getAllAuctionItem())
    dispatch(auctionSlice.actions.resetSlice())
  } catch (error) {
    console.log(error)
    dispatch(auctionSlice.actions.republishAuctionItemFaild())
    dispatch(auctionSlice.actions.resetSlice())
    toast.error(error?.response?.data?.message)
  }
}
export default auctionSlice.reducer
