import signupImg from "../../../../assets/Images/signup.webp"
import CreateAccount from "./accountcreatefrom/CreateAccount"

function SignupAdmin() {
  return (
    <CreateAccount
      title="Join the millions learning to code with IDC India for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="SignupAdmin"
    />
  )
}

export default SignupAdmin