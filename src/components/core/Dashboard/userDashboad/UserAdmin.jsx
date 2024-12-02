import React from 'react'
import { Link } from 'react-router-dom';
import ProfileDropdown from '../../Auth/ProfileDropDown';
import { useSelector } from 'react-redux';
import InformativeTable from './accountcreatefrom/InformativeTable';

const UserAdmin = () => {
  const { token } = useSelector((state) => state.auth)
  return (
    <div className='border '>
        <div className=' pb-5'>
       <div className='flex flex-row justify-between '> 
       <h1 className='text-[#1967D2]  text-2xl'>Hello Admin </h1>
       <div className='flex gap-x-2'>
       <Link to="/CreateBlog"><button className='bg-[#1967D2] w-[9rem] h-8 rounded-sm text-lg text-white'>Create Blog</button></Link>
       <Link to="/SignupAdmin"><button className='bg-[#1967D2] w-[9rem] h-8 rounded-sm text-lg text-white'>Create Account</button></Link>
       <Link to="/CreateCategory"><button className='bg-[#1967D2] w-[9rem] h-8 rounded-sm text-lg text-white'>Create Category</button></Link>         
       </div>
       </div>

            
       

        </div>

        <div>
          <InformativeTable/>
        </div>
    </div>
  )
}

export default UserAdmin