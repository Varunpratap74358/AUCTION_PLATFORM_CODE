import Card from '@/customComponante/Card'
import React from 'react'
import { useSelector } from 'react-redux'

const FeatersAuction = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction)
  return (
    <>
      <section className="my-8">
        <h3 className="text-black font-bold text-xl">Featured Auctions</h3>
        <div className="flex flex-wrap gap-6">
          {allAuctions.slice(0, 8).map((element) => {
            return (
              <Card
                title={element.title}
                imgSrc={element.image?.url}
                startTime={element.startTime}
                endTime={element.endTime}
                startingBid={element.startingBid}
                id={element._id}
                key={element._id}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default FeatersAuction
