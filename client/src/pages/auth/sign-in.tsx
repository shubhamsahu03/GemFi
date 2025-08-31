import SignInForm from "./_component/signin-form";
import Logo from "@/components/logo/logo";
import dashboardImg from "../../assets/images/dashboard_.jpeg";
import dashboardImgDark from "../../assets/images/dashboard_dark.png";
import { useTheme } from "@/context/theme-provider";

const SignIn = () => {
  const { theme } = useTheme();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 md:pt-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo url="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block -mt-3">
        <div className="absolute inset-0 flex flex-col items-end justify-end pt-8 pl-8">
          
          <div className="relative max-w-3xl h-screen w-full overflow-hidden mt-3">
            <img
              src={theme === "dark" ? dashboardImgDark : dashboardImg}
              alt="Dashboard"
              className="w-full h-full object-contain max-h-screen"
              style={{
                objectPosition: "left top",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
