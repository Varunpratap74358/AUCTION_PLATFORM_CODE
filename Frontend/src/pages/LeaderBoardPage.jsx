import Spinner from '@/customComponante/Spinner'
import React from 'react'
import { useSelector } from 'react-redux'

const LeaderBoardPage = () => {
  const { leaderboard, loading } = useSelector((state) => state.user)
  return (
    <>
      <section className="w-full ml-0 h-fit pt-20 px-5 lg:pl-[320px] flex flex-col ">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col min-h-[340px]:flex-row min-h-[340px]:gap-2 mb-5">
              <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
                Bidders Leaderboard
              </h1>
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
                  {leaderboard.slice(0, 100).map((element, i) => {
                    return (
                      <tr
                        key={element._id}
                        className="border-b border-gray-300"
                      >
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
          </>
        )}
      </section>
    </>
  )
}

export default LeaderBoardPage
