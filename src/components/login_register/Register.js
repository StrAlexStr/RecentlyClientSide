import LogoSide from "./LogoSide";
import CopyrightBanner from "./CopyrightBanner";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="h-screen flex flex-col justify-between bg-wave-reg-tert w-screen bg-no-repeat">
      <div className="h-screen flex flex-col justify-between bg-wave-register-pattern-sec w-screen bg-no-repeat">
        <div className="h-screen flex flex-col justify-between bg-wave-register-pattern w-screen bg-no-repeat">
          <div className="h-1/12"></div>
          <div className="flex flex-col lg:flex-row w-screen justify-center items-center lg:gap-x-20 lg:pl-10">
            <LogoSide />
            <RegisterForm />
          </div>
          <CopyrightBanner />
        </div>
      </div>
    </div>
  );
}

export default Register;
