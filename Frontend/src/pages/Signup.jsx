import { register } from '@/store/slice/userSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [backAccountNumber, setBackAccountNumber] = useState('')
  const [backAccountIFSC, setBackAccountIFSC] = useState('')
  const [bankName, setBankName] = useState('')
  const [PhonePayNumber, setPhonePayNumber] = useState('')
  const [paypalEmail, setPaypalEmail] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [profileImagePreview, setProfileImagePreview] = useState('')

  const { loading, isAuthenticated } = useSelector((state) => state.user)
  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const handelRegister = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('userName', userName)
    formdata.append('password', password)
    formdata.append('email', email)
    formdata.append('address', address)
    formdata.append('role', role)
    formdata.append('profileImage', profileImage)
    formdata.append('phone', phone)
    formdata.append('paypalEmail', paypalEmail)
    // console.log(formdata)
    role === 'Auctioner' && formdata.append('bankName', bankName)
    formdata.append('backAccountIFSC', backAccountIFSC)
    formdata.append('backAccountNumber', backAccountNumber)
    formdata.append('PhonePayNumber', PhonePayNumber)
    // console.log(formdata)
    const entries = Object.fromEntries(formdata.entries())
    // console.log(entries)
    dispatch(register(entries))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/')
    }
  }, [dispatch, loading, isAuthenticated])

  const imagehandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setProfileImage(file)
      setProfileImagePreview(reader.result)
    }
  }
  return (
    <div>
      <section className="w-full ml-0 h-fit pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
          <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Register
          </h1>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handelRegister}
          >
            <p className="font-semibold text-xl md:text-2xl">Personal Detail</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label htmlFor="" className="text-[16px] sm:text-stone-600">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label htmlFor="" className="text-[16px] sm:text-stone-600">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label htmlFor="" className="text-[16px] sm:text-stone-600">
                  Phone
                </label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label htmlFor="" className="text-[16px] sm:text-stone-600">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label htmlFor="" className="text-[16px] sm:text-stone-600">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Auctioner">Auctioner</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-1">
                <label htmlFor="" className="text-[16px] sm:text-stone-600">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-1 gap-2">
              <label htmlFor="" className="text-[16px] sm:text-stone-600">
                Profile Image
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : 'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png?v=2024100120'
                  }
                  alt="profile image"
                  className="w-14 h-14 rounded-full"
                />
                <input type="file" onChange={imagehandler} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label
                htmlFor=""
                className="font-semibold text-xl md:2xl flex flex-col"
              >
                Payment Methed Detail{' '}
                <span className="text-[12px] text-stone-500">
                  Fill Payment Details Only If you are registering as an
                  Auctioner
                </span>
              </label>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] text-stone-500">
                  Bank Details
                </label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === 'Bidder'}
                    required
                  >
                    <option value="">Select Your Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">
                      Kotak Mahindra Bank
                    </option>
                    <option value="Indian Bank">Indian Bank</option>
                    <option value="State Bank of India">
                      State Bank of India
                    </option>
                    <option value="Punjab National Bank">
                      Punjab National Bank
                    </option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Union bank">Union bank</option>
                    <option value="State Banck of India">
                      State Bank Of India
                    </option>
                  </select>
                  <input
                    type="text"
                    value={backAccountNumber}
                    placeholder="Bank Account Number"
                    onChange={(e) => setBackAccountNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === 'Bidder'}
                    required
                  />
                  <input
                    type="text"
                    value={backAccountIFSC}
                    placeholder="IFSC CODE"
                    onChange={(e) => setBackAccountIFSC(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === 'Bidder'}
                    required
                  />
                </div>
              </div>
              <div className="">
                <label className="text-[16px] text-stone-600 font-semibold">
                  Phone Pay And Paypal Details
                </label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <input
                    type="number"
                    value={PhonePayNumber}
                    placeholder="Phone Pay Number"
                    onChange={(e) => setPhonePayNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none sm:flex-1"
                    disabled={role==="Bidder"}
                    required
                  />
                  <input
                    type="email"
                    value={paypalEmail}
                    placeholder="PayPal Email"
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none sm:flex-1"
                    disabled={role==="Bidder"}
                    required
                  />
                </div>
              </div>
            </div>
            <button className='bg-red-500 font-semibold hover:bg-red-600 transition-all duration-200 text-xl py-2 px-4 rounded-md text-white w-[280px] mx-auto lg:w-[640px]' type='submit' disabled={loading}>{loading ? "Registring..." : "Rigister"}</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Signup
