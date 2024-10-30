import { createAuction } from '@/store/slice/auctionSlice'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateAuction = () => {
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('')
  const [startingBid, setStrtingBid] = useState('')
  const [category, setcategory] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auction)
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const navigateTo = useNavigate()

  const auctionCategories = [
    'Art',
    'Electronics',
    'Fashion',
    'Furniture',
    'Jewelry',
    'Real Estate',
    'Vehicles',
    'Watches',
    'Sports Memorabilia',
    'Toys',
    'Books',
    'Coins & Stamps',
    'Music Instruments',
    'Home Appliances',
  ]

  const imgHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImage(file)
      setImagePreview(reader.result)
    }
  }

  const handelCreateAuction = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('condition', condition)
    formData.append('startingBid', startingBid)
    formData.append('category', category)
    formData.append('startTime', startTime)
    formData.append('endTime', endTime)
    formData.append('image', image)

    dispatch(createAuction(formData))
  }

  useEffect(() => {
    if (!isAuthenticated || user.role !== 'Auctioner') {
      navigateTo('/')
    }
  }, [isAuthenticated])

  return (
    <article className="w-full ml-0 h-fit px-5 lg:pl-[320px] flex flex-col min-h-screen py-4 pt-20">
      <h1 className="text-red-500 text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
        Create Auction
      </h1>
      <div className="bg-white mx-auto w-full h-auto flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <form
          className="flex flex-col gap-5 w-full px-4"
          onSubmit={handelCreateAuction}
        >
          <p className="font-semibold text-xl md:text-2xl">Auction Detailt</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Category</label>
              <select
                value={category}
                onChange={(e) => setcategory(e.target.value)}
                className="text-16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((v, i) => {
                  return (
                    <option value={v} key={i}>
                      {v}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="text-16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              >
                <option value="">Select Condition</option>
                <option value="Used">Used</option>
                <option value="New">New</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Starting Bid</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStrtingBid(e.target.value)}
                className="text-16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Description</label>
              <textarea
                value={description}
                rows={10}
                onChange={(e) => setDescription(e.target.value)}
                className="text-16px] py-2 bg-transparent border-[2px] border-stone-500 focus:outline-none px-4 rounded-md max-h-[100px] min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">
                Auction Starting Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">
                Auction End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                timeFormat="HH:mm"
                timeIntervals={15}
                showTimeSelect
                dateFormat={'MMMM d, yyyy h, mm aa'}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-semibold text-xl md:text-2xl">
              Auction Item Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt={title}
                      className="w-44 h-auto"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  )}

                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  onChange={imgHandler}
                  className="hidden"
                />
              </label>
            </div>
            <div className="w-full bg-yellow-500 py-1 px-10 flex items-center justify-center rounded-md shadow-md shadow-yellow-200 cursor-pointer hover:bg-yellow-600 duration-300  transition-all">
              <button className="font-semibold" type="submit">
                {loading ? 'Uploading....' : 'Upload'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </article>
  )
}

export default CreateAuction
