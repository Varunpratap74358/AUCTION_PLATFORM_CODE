import React from 'react'
import { RiAuctionFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'

const UpCommingsAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction)

  const today = new Date()
  const todayString = today.toDateString()

  const auctionsStringToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime)
    return auctionDate.toDateString() === todayString
  })
  // console.log(allAuctions)

  return (
    <section className="my-8">
      <h3 className="text-black font-bold text-xl">Auction For Today</h3>
      <div className="flex flex-col gap-6">
        <div className="bg-black w-full p-2 gap-10 rounded-md flex flex-col justify-between lg:flex-1 lg:h-auto lg:p-6 2xl:flex-none">
          <span className="rounded-full bg-red-300 text-white w-fit p-3">
            <RiAuctionFill />
          </span>
          <div className="">
            <h3 className="text-red-300 font-bold text-xl">Auctions For</h3>
            <div className="">
              <h3 className="text-white font-bold text-xl">Today</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:flex-none 2xl:basis-64 2xl:flex-grow">
          {auctionsStringToday.slice(0, 2).map((element) => {
            return (
              <div
                className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                key={element._id}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={element?.image?.url}
                    alt={element.title}
                    className="w-16 h-16 2xl:w-10 2xl:h-10"
                  />
                  <p className="font-extralight text-[15px] text-black">
                    {element.title}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-stone-600 font-semibold">Starting Bid:</p>
                  <p>Rs.{element.startingBid}</p>
                </div>
                <div className="flex felx-col">
                  <p className="text-stone-600 font-bold">Starting Time:</p>
                  <p className="text-black">
                    {element.startTime.substring(0, 25)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
          {auctionsStringToday.slice(2, 4).map((element) => {
            return (
              <div
                className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                key={element._id}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={element?.image?.url}
                    alt={element.title}
                    className="w-16 h-16 2xl:w-10 2xl:h-10"
                  />
                  <p className="font-extralight text-[15px] text-black">
                    {element.title}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-stone-600 font-semibold">Starting Bid:</p>
                  <p>Rs.{element.startingBid}</p>
                </div>
                <div className="flex felx-col">
                  <p className="text-stone-600 font-bold">Starting Time:</p>
                  <p className="text-black">
                    {element.startTime.substring(0, 25)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
          {auctionsStringToday.slice(4, 6).map((element) => {
            return (
              <div
                className="w-full flex flex-col gap-4 bg-white p-2 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                key={element._id}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={element?.image?.url}
                    alt={element.title}
                    className="w-16 h-16 2xl:w-10 2xl:h-10"
                  />
                  <p className="font-extralight text-[15px] text-black">
                    {element.title}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-stone-600 font-semibold">Starting Bid:</p>
                  <p>Rs.{element.startingBid}</p>
                </div>
                <div className="flex felx-col">
                  <p className="text-stone-600 font-bold">Starting Time:</p>
                  <p className="text-black">
                    {element.startTime.substring(0, 25)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default UpCommingsAuctions
