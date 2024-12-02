import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-16 items-center justify-center border-b-[1px] border-b-gray-50 bg-white dark:bg-white transition-all duration-200">
      <div className="flex lg:w-11/12 w-full max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-gray-600 font-bold text-2xl">Chatting Hub</h1>
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:block dark:text-white">
          <ul className="flex gap-x-6 text-gray-500 dark:text-white">
            <li>
              <Link to="/login">
                <p className="text-gray-600 dark:text-white">Log in</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <p className="text-gray-600 dark:text-white">Sign up</p>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleMenu}
          className="mr-4 lg:hidden bg-[#C91513] text-gray-5 w-10 h-10 flex items-center justify-center rounded-full"
        >
          {isMenuOpen ? <AiOutlineClose fontSize={24} fill="#AFB2BF" /> : <AiOutlineMenu fontSize={24} fill="#AFB2BF" />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-14 right-0 z-50 w-[60%] md:w-[50%] md:rounded-l-xl bg-gray-700 text-gray-5 shadow-lg transition-transform duration-300 lg:hidden">
            <ul className="flex flex-col gap-y-4 p-4">
              {/* Display Login/Signup or Profile */}
              <div className="flex md:flex-row gap-y-2 gap-x-2 mb-4 items-center justify-center">
                {token === null ? (
                  <>
                    <Link to="/login ">
                      <button className="rounded-[8px] border border-gray-500 bg-white px-[12px] py-[8px] text-gray-5 w-full">
                        Log in
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="rounded-[8px] border border-gray-500 bg-gray-100 px-[12px] py-[8px] text-gray-5 w-full">
                        Sign up
                      </button>
                    </Link>
                  </>
                ) : (
                  <ProfileDropdown />
                )}
              </div>
            </ul>
          </div>
        )}

        {/* Desktop Login/Signup/Profile */}
        <div className="hidden lg:flex items-center gap-x-4">
          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-gray-700 bg-gray-800 px-[12px] py-[8px] text-gray-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-gray-700 bg-gray-800 px-[12px] py-[8px] text-gray-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
