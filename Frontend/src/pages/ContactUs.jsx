import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { RiLoader2Fill } from 'react-icons/ri'
const ContactUs = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  let to_name = "Varun Mern"

  const handelContactForm = (e) => {
    e.preventDefault()
    setLoading(true)
    const tempLateParams = {
      name,
      to_name,
      email,
      phone,
      subject,
      message,
    }
    emailjs
      .send(
        'service_8crkvst',
        'template_r8i6vgo',
        tempLateParams,
        '5lr6UpNU7hDZhG9Dz',
      )
      .then(() => {
        toast.success('ThankYou !Your Message has been sent successfully.')
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        toast.error('Faild To send message')
        setLoading(false)
      })
  }
  return (
    <div className='p-3'>
      <section className="w-full ml-0 h-fit pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        <div className="bg-white mx-auto w-full h-auto p-4 flex flex-col gap-4 items-center  justify-center rounded-md shadow-3xl shadow-slate-300">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handelContactForm}
          >
            <h3 className="text-red-500 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
              Contact Us
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-300"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">Your Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">Your Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">Your Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-slate-500">Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 max-h-[150px] min-h-[150px] outline-none"
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
                  Sending Message...
                  <RiLoader2Fill className="animate-spin" />
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ContactUs
