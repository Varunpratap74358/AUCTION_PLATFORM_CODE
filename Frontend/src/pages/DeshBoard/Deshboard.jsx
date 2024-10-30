import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentsProof,
  getAllUsers,
  getMonthlyRevenue,
} from '@/store/slice/superAdminSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuctionItemDelete from './SubComponantes/AuctionItemDelete'
import BiddersAuctionersGraf from './SubComponantes/BiddersAuctionersGraf'
import PaymentGraph from './SubComponantes/PaymentGraph'
import PaymentProof from './SubComponantes/PaymentProof'
import Spinner from '@/customComponante/Spinner'
import { useNavigate } from 'react-router-dom'

const Deshboard = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.superAdmin)
  const {user,isAuthenticated} = useSelector(state=>state.user)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMonthlyRevenue())
    dispatch(getAllUsers())
    dispatch(getAllPaymentsProof())
    dispatch(clearAllSuperAdminSliceErrors())
  }, [])

  useEffect(()=>{
    if(user.role !== "Super Admin" || !isAuthenticated){
      navigate("/")
    }
  },[isAuthenticated])
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col gap-10">
            <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">Deshboard</h1>
            <div className="flex flex-col gap-10">
                <div className="">
                    <h3 className="text-black font-bold text-xl">Monthly Total Payment Recived</h3>
                    <PaymentGraph />
                </div>
                <div className="">
                    <h3 className="text-black font-bold text-xl">Users</h3>
                    <BiddersAuctionersGraf />
                </div>
                <div className="">
                    <h3 className="text-black font-bold text-xl">Payment Proofs</h3>
                    <PaymentProof />
                </div>
                <div className="">
                    <h3 className="text-black font-bold text-xl">Delete Item From Auction</h3>
                    <AuctionItemDelete />
                </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Deshboard
