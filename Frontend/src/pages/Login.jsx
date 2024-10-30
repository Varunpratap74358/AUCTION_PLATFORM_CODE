import { login } from '@/store/slice/userSlice'
import { Loader2, LoaderPinwheel } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { RiLoader2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isAuthenticated, loading } = useSelector((state) => state.user)

  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const handelLogin = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("email",email)
    formData.append("password",password)
    dispatch(login(formData))
  }
  useEffect(() => {
    console.log("navigate")
    if (isAuthenticated) {
        // console.log("navigate2")
      navigateTo('/')
    }
  }, [dispatch, loading, isAuthenticated])
  return (
    <div>
      <section className="w-full ml-0 h-fit pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]  shadow-3xl shadow-slate-300">
          <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Login
          </h1>
          <form onSubmit={handelLogin} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[16px] text-slate-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-[16px] text-slate-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
              />
            </div>
            <button className={`bg-red-500 font-semibold hover:bg-red-600 transition-all duration-600 text-xl py-2 px-4 rounded-md text-white my-auto `} type='submit' disabled={loading}>{loading ?<RiLoader2Fill className='flex justify-center items-center mx-auto animate-spin' /> : "Login"}</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login
