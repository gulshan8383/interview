import React, { useState, useEffect } from 'react';
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from "../../../../../services/operations/blogapi";
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';
import BlogTable from './BlogTable';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
    const [heading, setHeading] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [editingBlog, setEditingBlog] = useState(null);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }], // Color options
            [{ 'font': [] }],
            ['clean'] 
        ],
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        },
        multiple: false,
        accept: {
            'image/*': []
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            let response;
            if (editingBlog) {
                response = await updateBlog(editingBlog._id, formData);
            } else {
                response = await createBlog(formData);
            }

            if (response) {
                toast.success(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
                fetchBlogs();
                resetForm();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving blog.');
        }
    };

    const resetForm = () => {
        setHeading("");
        setImage(null);
        setImagePreview(null);
        setDescription("");
        setEditingBlog(null);
    };

    const handleEdit = (blog) => {
        setHeading(blog.heading);
        setImagePreview(blog.image);
        setDescription(blog.description);
        setEditingBlog(blog);
    };

    const handleDelete = async (blogId) => {
        const confirmed = window.confirm("Are you sure you want to delete this blog?");
        if (confirmed) {
            try {
                await deleteBlog(blogId);
                toast.success("Blog deleted successfully!");
                fetchBlogs();
            } catch (error) {
                toast.error(error.response?.data?.message || "Error deleting blog.");
            }
        }
    };

    const fetchBlogs = async () => {
        try {
            const fetchedBlogs = await getAllBlogs();
            setBlogs(fetchedBlogs);
        } catch (error) {
            toast.error("Failed to fetch blogs.");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-richblack-50 dark:bg-white rounded-lg shadow-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <h2 className="text-2xl font-bold text-richblack-700 dark:text-gray-900 mb-6">
                {editingBlog ? "Edit Blog" : "Create a New Blog"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-richblack-700 dark:text-gray-700">Heading</label>
                    <ReactQuill
                        theme="snow"
                        value={heading}
                        modules={modules}
                        onChange={setHeading}
                        className="bg-white dark:bg-richblack-300 dark:text-white text-richblack-500 border border-gray-300 dark:border-richblack-600 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-richblack-700 dark:text-gray-700">Image</label>
                    <div
                        {...getRootProps()}
                        className="mt-1 flex items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer bg-gray-200 dark:bg-richblack-700 dark:border-gray-600 hover:border-indigo-500 hover:bg-gray-50 dark:hover:border-indigo-500 dark:hover:bg-richblack-600"
                    >
                        <input {...getInputProps()} />
                        <p className="text-gray-500 dark:text-white">
                            Drag 'n' drop an image here, or click to select one
                        </p>
                    </div>
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Uploaded preview"
                            className="mt-4 max-h-48 rounded-md shadow-md"
                        />
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-richblack-700 dark:text-richblack-700">Description</label>
                    <ReactQuill
                        theme="snow"
                        value={description}
                        modules={modules}
                        onChange={setDescription}
                        className="bg-white dark:bg-richblack-300 dark:text-white text-richblack-500 border border-gray-300 dark:border-richblack-600 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#1967D2] text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    {editingBlog ? "Update Blog" : "Create Blog"}
                </button>
            </form>
            {blogs.length === 0 ? (
                <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
                    No blogs available.
                </p>
            ) : (
                <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default CreateBlog;
