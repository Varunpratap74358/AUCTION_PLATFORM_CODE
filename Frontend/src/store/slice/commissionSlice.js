import { COMMISSIONPROOF_API_POINT } from '@/utils/APIs'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const commissionSlice = createSlice({
    name:"commission",
    initialState:{
        loading:false,
    },
    reducers:{
        postCommissionPoofRequest(state,action){
            state.loading = true
        },
        postCommissionPoofSuccess(state,action){
            state.loading = false
        },
        postCommissionPoofFaild(state,action){
            state.loading = false
        },
    },
})

export const postCommsssionProof=(formData)=>async(dispatch)=>{
    dispatch(commissionSlice.actions.postCommissionPoofRequest())
  try {
    const { data } = await axios.post(`${COMMISSIONPROOF_API_POINT}/proof`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    dispatch(commissionSlice.actions.postCommissionPoofSuccess())
    toast.success(data?.message)
  } catch (error) {
    console.log(error)
    dispatch(commissionSlice.actions.postCommissionPoofFaild())
    toast.error(error?.response?.data?.message)
  }
}



export default commissionSlice.reducer