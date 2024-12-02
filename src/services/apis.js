  const BASE_URL = process.env.REACT_APP_BASE_URL

  // AUTH ENDPOINTS
  export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    CREATE_INSTRUCTOR_ACCOUNT:BASE_URL + "/auth/create-instructor"
  }

  // PROFILE ENDPOINTS
  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
    GET_ALL_STUDENT : BASE_URL + "/profile/getallstudentusers",
    GET_ALL_INSTRUCTUR : BASE_URL + "/profile/getallinstructorusers",
    GET_ADMIN_DASHBOARD_DATA : BASE_URL + "/profile/adminDashboard",
    DELETE_USER_API: BASE_URL + "/profile/deleteProfile",
  }


  // SETTINGS PAGE API
  export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  }
