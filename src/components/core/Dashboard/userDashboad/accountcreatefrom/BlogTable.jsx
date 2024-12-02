import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const BlogTable = ({ blogs, onEdit, onDelete }) => {
    const handleEdit = (blog) => {
        onEdit(blog);
        toast.success('Blog edited successfully!');
    };

    const handleDelete = async (blogId) => {
        try {
            await onDelete(blogId);
            toast.success('Blog deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete the blog.');
        }
    };

    const truncateDescription = (description, wordLimit) => {
        if (!description) return '';
        const words = description.replace(/<[^>]+>/g, '').split(' ');
        if (words.length <= wordLimit) return description;
        return `${words.slice(0, wordLimit).join(' ')}...`;
    };

    return (
        <div className="mt-8 overflow-x-auto">
            <ToastContainer />
            <table className="min-w-full bg-white dark:bg-richblack-50 table-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 dark:text-gray-200 tracking-wider">
                            Heading
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 dark:text-gray-200 tracking-wider">
                            Image
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 dark:text-gray-200 tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 dark:text-gray-200 tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog._id}>
                            <td className="px-6 py-4 whitespace-normal border-b border-gray-300">
                                <div className="text-sm leading-5 text-gray-900 dark:text-gray-200"
                                dangerouslySetInnerHTML={{ __html: truncateDescription(blog.heading, 7) }}>
                                   
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-richblack-300">
                                {blog?.imageUrl ? (
                                    <img
                                        src={blog?.imageUrl}
                                        alt={blog?.heading}
                                        className="max-h-20 rounded-md shadow-md"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/path/to/placeholder-image.png';
                                        }}
                                    />
                                ) : (
                                    <div className="text-richblack-500 dark:text-richblack-400">No image available</div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-normal border-b border-gray-300">
                                <div
                                    className="text-richblack-700 dark:text-richblack-700 leading-relaxed max-w-4xl"
                                    dangerouslySetInnerHTML={{ __html: truncateDescription(blog.description, 10) }}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-richblack-300 text-sm leading-5 text-black dark:text-richblack-700">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="mr-4 text-blue-800 hover:text-blue-100 text-xl"
                                    title="Edit Blog"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(blog?._id)}
                                    className="text-richblack-500 text-xl hover:text-[#E53935]"
                                    title="Delete Blog"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;
