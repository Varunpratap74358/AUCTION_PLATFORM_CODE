import React, { useState } from 'react'
import { RiAuctionFill, RiOctagonFill } from 'react-icons/ri'
import { MdLeaderboard, MdDashboard } from 'react-icons/md'
import { SiGooglesearchconsole } from 'react-icons/si'
import { BsFillInfoSquareFill } from 'react-icons/bs'
import { FaFacebook, FaUser } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdCloseCircleOutline, IoIosCreate } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/slice/userSlice'
import { Link } from 'react-router-dom'

const SideDrower = () => {
  const [show, setShow] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const handelLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-red-500 text-white text-3xl rounded-md p-2 hover:bg-red-400 lg:hidden"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-[100%] sm:w-[300px] bg-white h-full fixed top-0 ${
          show ? 'left-0' : 'left-[-100%]'
        } transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-slate-500`}
      >
        <div className="relative">
          <Link to={'/'} className="">
            <h4 className="text-2xl font-semibold mb-4">
              Prime<span className="text-red-600">Bid</span>
            </h4>
          </Link>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to={'/auctions'}
                className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
              >
                <RiOctagonFill />
                Auctions
              </Link>
            </li>
            <li>
              <Link
                to={'/leaderboard'}
                className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
              >
                <MdLeaderboard />
                Leaderboard
              </Link>
            </li>
            {isAuthenticated && user && user.role === 'Auctioner' && (
              <>
                <li>
                  <Link
                    to={'/submit-commission'}
                    className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
                  >
                    <FaFileInvoiceDollar />
                    Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/create-auction'}
                    className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
                  >
                    <IoIosCreate />
                    Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/view-my-auction'}
                    className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
                  >
                    <FaEye />
                    View My Auctions
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === 'Super Admin' && (
              <>
                <li>
                  <Link
                    to={'/deshboard'}
                    className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
                  >
                    <MdDashboard />
                    Deshboard
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!isAuthenticated ? (
            <>
              <div className="my-4 flex gap-2">
                <Link to={'/sign-up'} className='border-[1px] border-slate-500 px-3 bg-red-500 text-white font-semibold rounded-sm shadow-slate-500 shadow-lg hover:bg-transparent hover:text-black hover:duration-150 hover:transition-all'>Sign Up</Link>
                <Link to={'/login'} className='border-[1px] border-slate-500 px-3 bg-green-500 text-white font-semibold rounded-sm shadow-slate-500 shadow-lg hover:bg-transparent hover:text-black hover:duration-150 hover:transition-all'>Login</Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-4 flex gap-4 w-fit" onClick={handelLogout}>
                <button className='border-[1px] border-slate-500 px-3 bg-red-500 text-white font-semibold rounded-sm shadow-slate-500 shadow-lg hover:bg-transparent hover:text-black hover:duration-150 hover:transition-all'>Logout</button>
              </div>
            </>
          )}
          <hr className="mb-4 border-t-red-400" />
          <ul className="flex flex-col gap-3">
            {
              isAuthenticated && (
                <li>
              <Link
                to={'/me'}
                className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
              >
                <FaUser />
                Profile
              </Link>
            </li>
              )
            }
            
            <li>
              <Link
                to={'/how-it-works-info'}
                className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
              >
                <SiGooglesearchconsole />
                How it works
              </Link>
            </li>
            <li>
              <Link
                to={'/about'}
                className="flex text-lg font-semibold gap-2 items-center hover:text-red-500 hover:transition-all hover:duration-150"
              >
                <BsFillInfoSquareFill />
                About Us
              </Link>
            </li>
          </ul>
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden"
          />
        </div>

        <div>
          <div className='flex gap-2 items-center mb-2'>
            <Link to={'https://www.facebook.com/p/varun-pratap-singh-100072471157372/'} target='_blanck' className='bg-white text-stone-500 p-2 text-2xl rounded-sm hover:text-blue-700'><FaFacebook /></Link>
            <Link to={'https://www.instagram.com/varun_singh_74358/profilecard/?igsh=MzB6NHk4bDJ5c2Fu'} target='_blanck' className='bg-white text-stone-500 p-2 text-2xl rounded-sm hover:text-pink-500'><RiInstagramFill /></Link>
          </div>
          <Link to={"/contact"} className=' text-stone-500 font-semibold hover:text-red-500 hover:transition-all duration-150'>Contact Us</Link>
          <p className='text-stone-500'>&copy; PrimeBid, LIC.</p>
          <p className='text-stone-500'>Designed By <Link className='font-semibold hover:text-red-500 hover:transition-all duration-150'>Varun Singh</Link></p>
        </div>
      </div>
    </>
  )
}

export default SideDrower
