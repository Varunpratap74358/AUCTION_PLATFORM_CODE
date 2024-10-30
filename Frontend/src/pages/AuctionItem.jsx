import Spinner from '@/customComponante/Spinner'
import { getAuctionDetail } from '@/store/slice/auctionSlice'
import { placedBid } from '@/store/slice/bidSlice'
import React, { useEffect, useState } from 'react'
import { FaGreaterThan } from 'react-icons/fa'
import { RiAuctionFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AuctionItem = () => {
  const { id } = useParams()
  const { loading, auctionDetail, auctionBidder } = useSelector(
    (state) => state.auction,
  )
  const { isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [amount, setAmout] = useState()
  const handelBid = () => {
    dispatch(placedBid(id, amount))
    dispatch(getAuctionDetail(id))
    setAmout('')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
    if (id) {
      dispatch(getAuctionDetail(id))
    }
  }, [isAuthenticated])

  return (
    <section className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col ">
      <div className="text-[16px] flex flex-wrap gap-2 items-center ">
        <Link
          to={'/'}
          className="font-semibold transition-all duration-300 hover:text-red-500"
        >
          Home
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <Link
          to={'/auctions'}
          className="font-semibold transition-all duration-300 hover:text-red-500"
        >
          Auctions
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <p className="text-stone-600">{auctionDetail.title}</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="bg-white w-[100%] lg:rounded-lg lg:h-50 lg:w-52 flex justify-center items-center p-5">
                <img
                  src={auctionDetail?.image?.url}
                  alt={auctionDetail.title}
                  className="sm:h-40 sm:w-40"
                />
              </div>
              <div className="flex flex-col justify-around pb-4">
                <h3 className="text-black font-bold text-xl">
                  {auctionDetail.title}
                </h3>
                <p className="text-xl font-semibold">
                  Minimum Bid:{' '}
                  <span className="text-red-500">
                    Rs.{auctionDetail.startingBid}
                  </span>
                </p>
                <h3 className='font-bold text-xl'>Condition: <span className='text-green-500'>{auctionDetail.condition}</span></h3>
              </div>
            </div>
            <p className="text-xl w-fit font-bold">Auction Item Description</p>
            <hr className="my-2 border-t-[1px] border-t-stone-700" />
            {auctionDetail.description &&
              auctionDetail.description.split('. ').map((element, i) => {
                return (
                  <li key={i} className="text-[18px] my-2">
                    {element}
                  </li>
                )
              })}
          </div>
          <div className="flex-1">
            <header className="bg-stone-200 py-4 text-[24px] font-semibold px-4">
              BIDS
            </header>
            <div className="bg-white px-4 min-h-fit lg:min-h-[600px]">
              {auctionBidder &&
              auctionBidder.length > 0 &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidder.map((element, i) => {
                  return (
                    <div
                      className="py-2 flex items-center justify-between"
                      key={i}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="w-12 h-12 rounded-full my-2 hidden md:block"
                        />
                        <p className="text-[18px] font-semibold">
                          {element.userName}
                        </p>
                      </div>
                      {i === 0 ? (
                        <p className="text-[20px] font-semibold text-green-600">
                          1st
                        </p>
                      ) : i === 1 ? (
                        <p className="text-[20px] font-semibold text-blue-600">
                          2nd
                        </p>
                      ) : i === 2 ? (
                        <p className="text-[20px] font-semibold text-yellow-600">
                          3st
                        </p>
                      ) : (
                        <p className="text-[20px] font-semibold text-gray-600">
                          {i + 1}th
                        </p>
                      )}
                    </div>
                  )
                })
              ) : Date.now() > new Date(auctionDetail.startTime) ? (
                <>
                  <h1 className="relative top-8 font-extralight text-green-500">
                    Bidding started
                  </h1>
                  <img
                    src="https://raw.githubusercontent.com/Zeeshu911/MERN_Stack_Auction_Platform/refs/heads/main/frontend/public/notStarted.png"
                    alt="not started"
                    className="w-full max-h-[650px]"
                  />
                </>
              ) : (
                <>
                  <h1 className="relative top-8 font-extralight text-red-500">
                    Bidding Not started
                  </h1>
                  <img
                    src="https://raw.githubusercontent.com/Zeeshu911/MERN_Stack_Auction_Platform/refs/heads/main/frontend/public/auctionEnded.png"
                    alt="ended"
                    className="w-full max-h-[650px]"
                  />
                </>
              )}
            </div>

            <div className="bg-red-500 py-4 text-[16px] md:text-[24px] font-semibold px-4 flex items-center justify-between">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex gap-3  sm:sflex-row sm:items-center">
                    <p className="text-white">Place Bid</p>
                    <input
                      type="number"
                      className="h-10 w-32 focus:outline-none md:text-[16px] px-4 rounded-md shadow-md shadow-slate-400"
                      value={amount}
                      placeholder="enter Rs."
                      onChange={(e) => setAmout(e.target.value)}
                    />
                  </div>
                  <button
                    className="p-4 text-white bg-black rounded-full transition-all duration-300 hover:bg-slate-700 "
                    onClick={handelBid}
                  >
                    <RiAuctionFill />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-white font-semibold text-xl">
                  Auction is Not Startet Yet
                </p>
              ) : (
                <p className="text-slate-400 font-semibold text-xl">
                  Auction is Ended
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AuctionItem
