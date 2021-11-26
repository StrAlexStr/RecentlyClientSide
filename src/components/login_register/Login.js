import LogoSide from "./LogoSide";
import LoginForm from "./LoginForm";
import CopyrightBanner from "./CopyrightBanner";

function Login() {
  return (
    <div className="h-screen flex flex-col justify-between bg-wave-log-tert w-screen bg-no-repeat">
      <div className="h-screen flex flex-col justify-between bg-wave-log-sec w-screen bg-no-repeat">
        <div className="h-screen flex flex-col justify-between bg-wave-pattern w-screen bg-no-repeat">
          <div className="h-1/12"></div>
          <div className="flex flex-col lg:flex-row w-screen justify-center items-center lg:gap-x-20 lg:pl-10">
            <LogoSide />
            <LoginForm />
          </div>
          <CopyrightBanner />
        </div>
      </div>
    </div>
  );
}

export default Login;
