import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAdminData } from '../../../../services/operations/profileAPI';
import Adminchart from './Adminchart';
import { Link } from 'react-router-dom';


export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [adminDashboardData, setAdminDashboardData] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const adminData = await getAdminData(token);
        // console.log(adminData, "adminData");
        if (adminData) setAdminDashboardData(adminData);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    })();
  }, [token]);

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#1967D2]">
          Hi Admin {user?.firstName} 👋
        </h1>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses?.length > 0 ? (
        <div>
          <div className="my-4 flex  space-x-4">
            {/* Render chart / graph */}
            {adminDashboardData?.totalIncome > 0 || adminDashboardData?.totalStudents > 0 ? (
              <Adminchart adminDashboardData={adminDashboardData} />
            ) : (
              <div className="flex-1 rounded-md bg-[#750909] p-6">
                <p className="text-lg font-bold text-">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-400">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {adminDashboardData?.totalCourses}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {adminDashboardData?.totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    Rs. {adminDashboardData?.totalIncome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not any data then graph is not
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-[#1967D2]">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
