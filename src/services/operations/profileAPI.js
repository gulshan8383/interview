import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/ProfileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API, 
  GET_ALL_STUDENT, GET_ALL_INSTRUCTUR, GET_ADMIN_DASHBOARD_DATA, DELETE_USER_API} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      
      // console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    // console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    // console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}


export async function getAllStudent(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_ALL_STUDENT, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    // console.log("GET_ALL_STUDENT", response);
    result = response?.data?.data;

  }
  catch(error) {
    console.log("GET_ALL_STUDENT ", error);
    toast.error("Could not Get all Student Data")
  }
  toast.dismiss(toastId);
  return result;
}


export async function getAllInstructor(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_ALL_INSTRUCTUR, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    // console.log("GET_ALL_INSTRUCTUR", response);
    result = response?.data?.data

  }
  catch(error) {
    console.log("GET_ALL_INSTRUCTUR ", error);
    toast.error("Could not Get all Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}


export async function getAdminData(token) {
  const toastId = toast.loading("Loading...")
  let result = {}
  try {
    const response = await apiConnector("GET", GET_ADMIN_DASHBOARD_DATA, null, {
      Authorization: `Bearer ${token}`,
    })
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ADMIN_DASHBOARD_DATA ERROR", error)
    toast.error("Could not get Admin data")
  }
  toast.dismiss(toastId)
  return result
}


export const deleteUser = async (userId) => {
  // console.log(userId, "this is user id")
  const toastId = toast.loading("Deleting user...");
  try {
    const response = await apiConnector("DELETE", `${profileEndpoints.DELETE_USER_API}/${userId}`);
    // console.log("Response from delete user API:", response);

    if (response.data.success) {
      toast.success("User deleted successfully");
    } else {
      toast.error("Failed to delete user: " + response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};
