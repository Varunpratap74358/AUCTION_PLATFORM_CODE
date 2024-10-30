import Card from '@/customComponante/Card'
import Spinner from '@/customComponante/Spinner'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Auctions = () => {
  const { loading, allAuctions } = useSelector((state) => state.auction)
  const [filterAuction, setFilterAuction] = useState(allAuctions)
  const [category, setcategory] = useState('')
  const auctionCategories = [
    'Art',
    'Camera',
    'Electronics',
    'Fashion',
    'Furniture',
    'Jewelry',
    'Real Estate',
    'Vehicles',
    'Watches',
    'Sports Memorabilia',
    'Toys',
    'Books',
    'Coins & Stamps',
    'Music Instruments',
    'Home Appliances',
  ]

  useEffect(() => {
    setFilterAuction(allAuctions)
  }, [allAuctions])

  useEffect(() => {
    if (category) {
      const filterData = allAuctions.filter((auction) => {
        return auction?.category.includes(category)
      })
      setFilterAuction(filterData)
    }
  }, [category, allAuctions])

  return (
    <div className="p-5">
      {loading ? (
        <Spinner />
      ) : (
        <article className="w-full ml-0 h-fit pt-20 lg:pl-[320px] flex flex-col ">
          <section className="my-8">
            <h1 className="font-bold text-3xl text-red-500">Auctions</h1>
            <div className="my-7 w-full">
              <select
                className="w-full py-2 px-5 rounded-md shadow-md shadow-slate-400"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option>Filtered by catgory</option>
                {auctionCategories.map((v, i) => {
                  return (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="flex flex-wrap gap-6">
              {filterAuction.length > 0 ? (
                filterAuction.map((element) => (
                  <Card
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    startingBid={element.startingBid}
                    key={element._id}
                    id={element._id}
                  />
                ))
              ) : (
                <h1 className="my-10 text-center w-full text-2xl font-bold text-red-400 animate-bounce">
                  Auction not found
                </h1>
              )}
            </div>
          </section>
        </article>
      )}
    </div>
  )
}

export default Auctions
