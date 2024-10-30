import Spinner from '@/customComponante/Spinner'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/')
    }
  }, [isAuthenticated])
  return (
    <div className="p-4">
      <section className="w-full ml-0 h-fit pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md shadow-3xl shadow-slate-300">
            <Link to={`${user?.profileImage?.url}`} target='_blanck'>
              <img
                src={user?.profileImage?.url}
                alt={user.userName}
                className="w-36 h-36 rounded-full cursor-pointer"
                // onClick={}
              />
            </Link>

            <div className="mb-6 w-full">
              <h3 className="text-xl font-semibold mb-4">Persional Detail</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={user.userName}
                    className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    defaultValue={user.email}
                    className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    defaultValue={user.phone}
                    className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={user.address}
                    className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue={user.role}
                    className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Joind On
                  </label>
                  <input
                    type="text"
                    defaultValue={user.createdAt?.substring(0, 10)}
                    className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                    disabled
                  />
                </div>
              </div>
            </div>

            {user.role === 'Auctioner' && (
              <div className="mb-6 w-full">
                <h3 className="text-xl font-semibold mb-4">Payment Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user?.paymentMethods?.bankTransfer?.bankName
                      }
                      className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user?.paymentMethods?.bankTransfer?.backAccountNumber
                      }
                      className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user?.paymentMethods?.bankTransfer?.backAccountIFSC
                      }
                      className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PhonePay Number
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user?.paymentMethods?.phonePay?.PhonePayNumber
                      }
                      className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PayPal Email
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.paymentMethods?.paypal?.paypalEmail}
                      className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6 w-full">
              <h3 className="text-xl font-semibold mb-4">Outher User Detail</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.role === 'Auctioner' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Unpaid Commissions
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.unpaidCommission}
                        className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                        disabled
                      />
                    </div>
                  </>
                )}

                {user.role == 'Bidder' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Auction Won
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.auctionWon}
                        className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Money Spent
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.monySpent}
                        className="w-ful mt-1 p-2 border-gray-300 roundde-md focus:outline-none"
                        disabled
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default UserProfile
