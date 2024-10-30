import CardTwo from '@/customComponante/CardTwo'
import Spinner from '@/customComponante/Spinner'
import { getMyAuctionItem } from '@/store/slice/auctionSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction)
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated || user.role !== 'Auctioner') {
        navigate('/')
    }
    dispatch(getMyAuctionItem())
  }, [isAuthenticated, dispatch])

  return (
    <>
      <div className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
        <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          My Ayction
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-6">
            {
              myAuctions.length > 0 ? myAuctions.map((v,i)=>{
                // console.log(v._id)
                return(
                  <CardTwo key={i} title={v.title} startingBid={v.startingBid} startTime={v.startTime} endTime={v.endTime} imgSrc={v.image?.url} id={v._id} />
                )
              }) : (
                <h3 className="text-slate-500 font-bold text-xl">You have not Posted Any Auction</h3>
              )
            }
          </div>
        )}
      </div>
    </>
  )
}

export default ViewMyAuctions
