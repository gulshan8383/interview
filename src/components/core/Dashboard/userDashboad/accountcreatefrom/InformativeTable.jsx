import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from '../../../../../ultilites/constants';
import { getAllStudent, getAllInstructor, deleteUser } from '../../../../../services/operations/profileAPI';
import { FaEdit, FaTrash } from 'react-icons/fa';  
import { IoIosPerson } from "react-icons/io";
import { toast } from "react-toastify";

export default function InformativeTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const fetchData = async (type) => {
    setLoading(true);
    let result = [];
    try {
      if (type === ACCOUNT_TYPE.STUDENT) {
        result = await getAllStudent(token);
      } else if (type === ACCOUNT_TYPE.INSTRUCTOR) {
        result = await getAllInstructor(token);
      }
      // console.log('API response:', result);

      if (result) {
        setData(result); // Set the data directly
      } else {
        console.error("Unexpected response structure:", result);
      }
      setAccountType(type);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(ACCOUNT_TYPE.STUDENT);
  }, []);

  const seeProfile = (userId) => {
    // console.log(`See profile of user with ID: ${userId}`);
    // Implement the logic to see the profile
  };

  const editProfile = (userId) => {
    // console.log(`Edit profile of user with ID: ${userId}`);
    // Implement the logic to edit the profile
  };

  const handleDelete = async (userId) => {
    // console.log(userId, "sdsudhashdsbfhusd")
    const toastId = toast.loading("Deleting user...");
    try {
      await deleteUser(userId);
      toast.update(toastId, { render: "User deleted successfully", type: "success", isLoading: false, autoClose: 2000 });
      // Refresh the user list or update the state as necessary
      fetchData(accountType);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.update(toastId, { render: "Failed to delete user", type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="mb-4">
          <button
            onClick={() => fetchData(ACCOUNT_TYPE.STUDENT)}
            className={`bg-[#1967D2] text-white px-4 py-2 rounded mr-2 hover:bg-white hover:border-[#1967D2] border hover:text-[#1967D2] ${accountType === ACCOUNT_TYPE.STUDENT ? 'bg-white border-yellow-100 text-yellow-100' : ''}`}
          >
            Student List
          </button>
          <button
            onClick={() => fetchData(ACCOUNT_TYPE.INSTRUCTOR)}
            className={`bg-[#1967D2] text-white px-4 py-2 rounded hover:bg-white hover:border-[#1967D2] border hover:text-[#1967D2] ${accountType === ACCOUNT_TYPE.INSTRUCTOR ? 'bg-white border-yellow-100 text-yellow-100' : ''}`}
          >
            Instructor List
          </button>
        </div>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="mb-4 text-lg font-semibold text-[#1967D2]">Number of users: {data?.length || 0}</p>
            <Table className="lg:min-w-full bg-white">
              <Thead>
                <Tr className="w-full bg-gray-200">
                  <Th className="py-2 px-4 border-b text-richblack-5 bg-richblack-800">Username</Th>
                  <Th className="py-2 px-4 border-b text-richblack-5 bg-richblack-800">Email</Th>
                  <Th className="py-2 px-4 border-b text-richblack-5 bg-richblack-800">Course</Th>
                  <Th className="py-2 px-4 border-b text-richblack-5 bg-richblack-800">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((user) => (
                  <Tr key={user?._id} className="w-full border-b bg-richblack-100">
                    <Td className="py-2 px-4">{user?.firstName} {user?.lastName}</Td>
                    <Td className="py-2 px-4">{user?.email}</Td>
                    <Td className="py-2 px-4">{user?.courses ? user?.courses.length : 0}</Td>
                    <Td className="py-2 px-4 flex">
                      <IoIosPerson
                        onClick={() => seeProfile(user?._id)}
                        className="text-richblack-500 cursor-pointer mr-2 hover:text-yellow-100 text-xl"
                      />
                      <FaEdit
                        onClick={() => editProfile(user?._id)}
                        className="text-richblack-500 cursor-pointer mr-2 hover:text-[#0EA5E9] text-lg"
                      />
                      <FaTrash
                        onClick={() => handleDelete(user._id)}
                        className="text-richblack-500 cursor-pointer hover:text-[#1967D2] text-lg"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}
