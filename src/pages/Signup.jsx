import signupImg from "../Assest/signup.png"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Connect with People Around the World"
      description1="Connect instantly with others, chat securely, and share ideas freely."
      description2=" Engage in private chats and group discussions with ease.."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup