import { postCommsssionProof } from '@/store/slice/commissionSlice'
import React, { useState } from 'react'
import { RiLoader2Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

const SubmitCommission = () => {
  const [proof, setProof] = useState('')
  const [amount, setAmount] = useState('')
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.commission)

  const imghandler = (e) => {
    const file = e.target.files[0]
    setProof(file)
  }

  const handelPaymentProof = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('proof', proof)
    formdata.append('amount', amount)
    formdata.append('comment', comment)
    dispatch(postCommsssionProof(formdata))
  }

  return (
    <div>
      <section className="w-full ml-0 h-fit pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md shadow-3xl shadow-slate-300">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handelPaymentProof}
          >
            <h3 className="text-red-500 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">Upload Payent Proof</h3>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">
                Payment Proof (<span className="text-red-500">Screen Shot</span>
                )
              </label>
              <input
                type="file"
                onChange={imghandler}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-stone-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">Amount</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={7}
                className="text-[16px] py-2 px-4 bg-transparent border-[1px] border-stone-500 focus:outline-none rounded-md"
                required
              />
            </div>
            <button
              className="bg-yellow-500 font-semibold hover:bg-yellow-600 transition-all duration-200 text-xl py-2 px-4 rounded-md text-black my-auto "
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex justify-center items-center mx-auto">
                  Uploading...
                  <RiLoader2Fill className='animate-spin' />
                </span>
              ) : (
                'Upload'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default SubmitCommission
