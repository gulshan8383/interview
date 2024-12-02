import loginImg from "../Assest/login.png"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Real-Time Messaging, Anytime, Anywhere "
      description2="Your space for real-time messaging, privacy, and seamless conversation"
      image={loginImg}
      formType="login"
    />
  )
}

export default Login