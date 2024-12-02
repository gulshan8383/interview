import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createCategory, showCategories, deleteCategory } from "../../../../../services/operations/categoryAPI";
import { useSelector } from "react-redux";
import { FaTrash } from 'react-icons/fa';

function CreateCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });

  const user = useSelector((state) => state.profile.user); // Adjust this to get the user from your state management

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await showCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const { category, description } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name: category, description });
      setFormData({ category: "", description: "" });
      const updatedCategories = await showCategories();
      setCategories(updatedCategories);
      toast.success("Category created successfully!");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      const updatedCategories = await showCategories();
      setCategories(updatedCategories);
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  if (!user || user.accountType !== "Admin") {
    return <p>You do not have permission to create categories.</p>;
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
        <label className="w-full">
          <p className="mb-1 text-sm leading-5 text-gray-600">
            Enter New Category <sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type="text"
            name="category"
            value={category}
            onChange={handleOnChange}
            placeholder="Enter New Category"
            className="w-full rounded bg-white border-gray-300 border-2 p-3 text-gray-700"
          />
        </label>
        <label className="relative">
          <p className="mb-1 text-sm leading-5 text-gray-600">
            Description <sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type="text"
            name="description"
            value={description}
            onChange={handleOnChange}
            placeholder="Description for Category"
            className="w-full rounded bg-white border-gray-300 border-2 p-3 pr-12 text-gray-700"
          />
        </label>
        <button
          type="submit"
          className="mt-6 rounded bg-red-600 py-2 px-4 font-medium text-white bg-[#E53935] hover:bg-richblack-400 hover:text-white"
        >
          Create Category
        </button>
      </form>

      <ToastContainer />

      {categories.length > 0 && (
        <table className="mt-6 w-full border-collapse border border-gray-200 text-richblack-600 dark:text-white">
          <thead>
            <tr>
              <th className="border border-richblack-600 px-4 py-2">Category</th>
              <th className="border border-richblack-600  px-4 py-2">Description</th>
              <th className="border border-richblack-600  px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat) => (
              <tr key={cat._id}>
                <td className="border border-gray-300 px-4 py-2">{cat?.name}</td>
                <td className="border border-gray-300 px-4 py-2">{cat?.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDeleteCategory(cat?._id)}
                    className="text-richblack-600 dark:text-[#E53935] hover:text-[#E53935] focus:outline-none"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CreateCategory;
