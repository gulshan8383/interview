export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-[#CD1411] bg-transparent" : "bg-[#CD1411]"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white bg-[#1967D2] ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-[#CD1411]"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
// export default function IconBtn({
//     text,
//     onclick,
//     children,
//     disabled,
//     outline = false,
//     customClasses,
//     type,
//   }) {
//     return (
//       <button
//         disabled={disabled}
//         onClick={onclick}
//         className={`flex items-center ${
//           outline ? "border border-[#CD1411] bg-transparent" : "bg-[#CD1411]"
//         } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white ${customClasses}`}
//         type={type}
//       >
//         {children ? (
//           <>
//             <span className={`${outline && "text-[#CD1411]"}`}>{text}</span>
//             {children}
//           </>
//         ) : (
//           text
//         )}
//       </button>
//     )
//   }