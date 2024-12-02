const express = require("express")
const router = express.Router()
const { auth, isInstructor, isAdmin } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  // getEnrolledCourses,
  instructorDashboard,
  getAllInstructorUsers,
  getAllStudentUsers,  
  adminDashboard
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.delete("/deleteProfile/:id", auth, isAdmin, deleteAccount);
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
//get all student and users
router.get("/getallstudentusers", getAllStudentUsers)
router.get("/getallinstructorusers", getAllInstructorUsers)

//admin dashboard
router.get("/adminDashboard", auth, isAdmin, adminDashboard)


module.exports = router
