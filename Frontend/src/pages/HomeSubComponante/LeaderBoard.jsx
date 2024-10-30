import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LeaderBoard = () => {
  const { leaderboard } = useSelector((state) => state.user)
  // console.log(leaderboard)
  return (
    <>
      <section className="my-8 lg:px-5">
        <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2">
          <h3 className="text-black font-bold text-xl">Top 10</h3>
          <h3 className="text-red-400 font-bold text-xl">
            Bidders Leaderboard
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border my-5 border-gray-400">
            <thead>
              <th className="py-2 px-4 text-left">Profile Pic</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Bid Expenditure</th>
              <th className="py-2 px-4 text-left">Auctions Won</th>
            </thead>
            <tbody className="text-gray-700">
              {leaderboard.slice(0, 10).map((element, i) => {
                return (
                  <tr key={element._id} className="border-b border-gray-300">
                    <td className="flex gap-2 items-center py-2 px-4">
                      <span className="text-stone-400 font-semibold text-xl w-7 hidden sm:block">
                        {i + 1}
                      </span>
                      <span>
                        <img
                          src={element.profileImage.url}
                          alt={element.userName}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </span>
                    </td>
                    <td className="py-2 px-4">{element.userName}</td>
                    <td className="py-2 px-4">{element.monySpent}</td>
                    <td className="py-2 px-4">{element.auctionWon}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Link
          to={'/leaderboard'}
          className="border-2 border-stone-300 font-bold text-xl w-full py-2 flex justify-center border-md hover:border-stone-500 transition-all duration-300 rounded-md hover:text-red-500 hover:scale-[1.02]"
        >
          See more leaderboard member
        </Link>
      </section>
    </>
  )
}

export default LeaderBoard
