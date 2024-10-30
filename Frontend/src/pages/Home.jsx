import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FeatersAuction from './HomeSubComponante/FeatersAuction'
import UpCommingsAuctions from './HomeSubComponante/UpCommingsAuctions'
import LeaderBoard from './HomeSubComponante/LeaderBoard'

const Home = () => {
  const HowItWorks = [
    { title: 'Post Items', description: 'Auctener posts items for bidding' },
    { title: 'Place bid', description: 'Bidders place bides on listed items' },
    {
      title: 'Win Notification',
      description: 'Hiegst bidder recuves a winnin email',
    },
    {
      title: 'Payments and Fees',
      description: 'Bidder pays; auctioner pays 5% fee',
    },
  ]

  const { isAuthenticated } = useSelector((state) => state.user)

  return (
    <div className="p-5">
      <section className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="">
          <p className="text-red-300 font-bold text-xl mb-8">
            Transparency Leads to your Victory
          </p>
          <h1 className="text-black text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Transparent Auction
          </h1>
          <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Be The Winner
          </h1>
          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <>
                <Link
                  to={'/sign-up'}
                  className="bg-red-500 font-semibold hover:bg-red-600 py-2 px-4 rounded-md shadow-lg shadow-red-300 text-white transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to={'/login'}
                  className="bg-green-500 font-semibold hover:bg-green-600 py-2 px-4 rounded-md shadow-lg shadow-red-300 text-white transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-black font-bold text-xl">How It Works</h3>
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap w-full">
            {HowItWorks.map((v, i) => {
              return (
                <div
                  className="bg-white flex flex-col gap-2 p-2 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  key={i}
                >
                  <h5 className="font-bold">{v.title}</h5>
                  <h5 className="">{v.description}</h5>
                </div>
              )
            })}
          </div>
        </div>
        <FeatersAuction />
        <UpCommingsAuctions />
        <LeaderBoard />
      </section>
    </div>
  )
}

export default Home
