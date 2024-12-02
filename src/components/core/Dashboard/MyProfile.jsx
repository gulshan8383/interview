import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../ultilites/dateFormatter"
import IconBtn from "../../common/IconBtn"
import IsLoggedinHOC from "../../common/isLoggedIn.js" 

function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-[600] text-[#1967D2] ">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border border-richblack-100 shadow-[0px_0px_20px_10px_#cbd5e0] dark:shadow-[0px_0px_10px_1px_#cbd5e0] bg-white p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover border border-richblack-400"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-600">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-400">{user?.email}</p>
          </div>
        </div>
        <div className="lg:mt-0 -mt-[5.4rem] ">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border border-richblack-100 shadow-[0px_0px_20px_10px_#cbd5e0] dark:shadow-[0px_0px_10px_1px_#cbd5e0] bg-white p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-600">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${user?.additionalDetails?.about
              ? "text-richblack-600"
              : "text-richblack-400"
            } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border border-richblack-100 shadow-[0px_0px_20px_10px_#cbd5e0] dark:shadow-[0px_0px_10px_1px_#cbd5e0] bg-white p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-600">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-700">First Name</p>
              <p className="text-sm font-medium text-richblack-400 border p-1 px-2 border-richblack-300 rounded">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-700">Email</p>
              <p className="text-sm font-medium text-richblack-400 p-1 px-2 border border-richblack-300 rounded">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-700">Gender</p>
              <p className="text-sm font-medium text-richblack-400 p-1 px-2 border border-richblack-300 rounded">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-700">Last Name</p>
              <p className="text-sm font-medium text-richblack-400 p-1 px-2 border border-richblack-300 rounded">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-700">Phone Number</p>
              <p className="text-sm font-medium text-richblack-400 p-1 px-2 border border-richblack-300 rounded">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-700">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-400 p-1 px-2 border border-richblack-300 rounded">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default IsLoggedinHOC(MyProfile);