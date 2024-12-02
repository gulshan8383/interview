import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import { userLinks } from "../../data/footer-links";




import { FaDiscord, FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = [
  { label: "Privacy Policy", path: "/privacyandpolicy" },
  { label: "Cookie Policy", path: "/CookiePolicy" },
  { label: "Terms & Conditions", path: "/Terms" },
  { label: "Refund Policy", path: "/refundpolicy" },
];

const Footer = () => {
  return (
    <div className="bg-gray-700  relative ">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-shine-light to-transparent opacity-40 transform -translate-x-full animate-shine"></div>
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-gray-400 leading-6 mx-auto py-14 relative">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-gray-700">
          {/* Section 1 */}
          <div className="lg:w-[100%] flex flex-wrap flex-row justify-between lg:border-gray-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0 ">
              <h1 className="text-gray-100 font-bold text-4xl mb-5" >Chatting Hub</h1>
              <div className="flex lg:flex-row flex-col gap-5 text-2xl  lg:w-[14rem] w-10 justify-between">
                <Link to="https://www.facebook.com/chathubOfficial/" className="hover:text-white"><FaFacebook /></Link>
                <Link to="https://www.linkedin.com/company/chathubofficial/" className="hover:text-[#C131A3]"><FaLinkedin /></Link>
                <Link to="https://x.com/chathubofficial" className="hover:text-blue-200"><FaTwitter /></Link>
                <Link to="https://www.youtube.com/@chathub." className="hover:text-[#1967D2]"><FaYoutube /></Link>
                <Link to="https://discord.gg/EMC4KdUv" className="hover:text-[#8c2da1]"><FaDiscord /></Link>
              </div>
            </div>

            {/* Links used */}
            <div className="flex flex-col gap-2 mt-2 pr-8">
              {userLinks.map((ele, i) => (
                <div key={i} className=" lg:pl-0">
                  <h1 className="text-gray-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-gray-50 transition-all duration-200"
                      >
                        <Link to={link.link}>{link.title}</Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

   
            <div className="flex flex-col">
              <h1 className="text-gray-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer flex flex-col hover:text-gray-50 transition-all duration-200 mt-2">
                <Link to={"/contact"}>Help Center</Link>
              </div>
            </div>


            <div className="flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-y-5 mr-10">
              {FooterLink2.map((ele, i) => (
                <div key={i} className=" lg:pl-0">
                  <h1 className="text-gray-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-gray-50 transition-all duration-200"
                      >
                        <Link to={link.link}>{link.title}</Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-gray-400 mx-auto pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={`${BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-gray-700 cursor-pointer hover:text-gray-50 transition-all duration-200"
                  } px-3`}
              >
                <Link to={ele.path}>
                  {ele.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            Powered by: IDCONS TECHNOVA PRIVATE LIMITED.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
