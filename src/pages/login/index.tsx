import { NextPage } from "next";
import LoginCard from "../../components/login";

const Login: NextPage = () => {
  return (
    <div className="container h-full w-full mx-auto flex align-center justify-center">
      <LoginCard />
    </div>
  );
};

export default Login;
