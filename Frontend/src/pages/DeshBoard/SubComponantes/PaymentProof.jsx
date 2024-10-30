import {
  deletepaymentproof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from '@/store/slice/superAdminSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PaymentProof = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin,
  )
  const [openDrawer, setOpenDrawer] = useState(false)
  const dispatch = useDispatch()
  const handelPaymentProofDelete = (id) => {
    dispatch(deletepaymentproof(id))
  }
  const handePaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id))
  }

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true)
    }
  }, [singlePaymentProof])
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-5">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2">User Id</th>
              <th className="w-1/3 py-2">Status</th>
              <th className="w-1/3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, i) => {
                return (
                  <tr key={i}>
                    <td className="py-2 px-4 text-center border-[1px] border-slate-700">
                      {element.userId}
                    </td>
                    <td className="py-2 px-4 text-center border-[1px] border-slate-700">
                      {element.status}
                    </td>
                    <td className="flex items-center py-4 justify-center gap-3 border-b-[1px] border-slate-700">
                      <button
                        className="bg-blue-500 text-white py-1 rounded hover:bg-blue-700 transition-all duration-300 px-3"
                        onClick={() => handePaymentDetail(element._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 rounded hover:bg-red-700 transition-all duration-300 px-3"
                        onClick={() => handelPaymentProofDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr className="text-center text-sm text-sky-600 py-3">
                <td>No Payment proofs are found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      </div>
    </>
  )
}

export default PaymentProof

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <>
      <section
        className={`fixed ${
          openDrawer && singlePaymentProof.userId ? "top-10" : "-top-full"
        }  left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end `}
      >
        <div className="bg-white h-fit transition-all duration-300 w-full">
          <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
            <h3 className="text-[#D6482B]  text-2xl font-semibold text-center mb-1">
              Update Payment Proof
            </h3>
            <p className="text-stone-600 text-center">
              You can update payment status and amount.
            </p>
            <form className="flex flex-col gap-3 my-5">
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-stone-600 ">User ID</label>
                <input
                  type="text"
                  value={singlePaymentProof.userId || ""}
                  disabled
                  onChange={(e) => e.target.value}
                  className="text-md px-1 py-2 bg-transparent border-[1px] border-stone-600  rounded-md focus:outline-none text-stone-500 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-stone-600">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-md px-1 py-2 bg-transparent border-[1px] border-stone-600  rounded-md focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-stone-600">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="text-md px-1 py-2 bg-transparent border-[1px] border-stone-600  rounded-md focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Settled">Settled</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[16px] text-stone-600">Comment</label>
                <textarea
                  rows={2}
                  value={singlePaymentProof.comment || ""}
                  onChange={(e) => e.target.value}
                  disabled
                  className="text-sm px-1 py-2 bg-transparent border-[1px] border-stone-600 max-h-[50px] rounded-md focus:outline-none text-stone-500 cursor-not-allowed"
                />
              </div>
              <div>
                <Link
                  to={singlePaymentProof.proof?.url || ""}
                  className="bg-[#D6482B] flex justify-center w-full py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:bg-[#b8381e]"
                  target="_blank"
                >
                  Payment Proof (SS)
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:bg-blue-700"
                  onClick={handlePaymentProofUpdate}
                >
                  {loading ? "Updating Payment Proof" : "Update Payment Proof"}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="bg-yellow-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:bg-yellow-700"
                  onClick={() => setOpenDrawer(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};