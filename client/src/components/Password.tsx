import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useFormik } from "formik";
import { passwordValidate } from "../helpers/validate";
import useFetch from "../hooks/useFetch";
import { useAuthStore } from "../store/store";
import { login } from "../helpers/helper";
import toast from "react-hot-toast";

export function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const loginPromise = login({ username, password: values.password });
      toast.promise(loginPromise, {
        loading: "Checking",
        success: <b>Login Successfully..!</b>,
        error: <b>Password not Match!</b>,
      });
      loginPromise.then((res) => {
        const { token } = res?.data || "";
        localStorage.setItem("token", token);
        navigate("/profile");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">Loading ...</h1>;

  if (serverError) {
    <h1 className="text-2xl text-red-500">
      server error: {serverError.message}
    </h1>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[rgba(255,255,255,0.55)] border-4 border-gray-100 shrink-0 h-3/4 w-1/4 rounded-3xl py-20 px-7 min-w-max backdrop-blur-[7.1px] shadow-[0_4px_30px_#4747470b]">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.firstName || apiData?.username}!
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Welcome back, enter your password to proceed.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                className="border-4 border-gray-100 w-[135px] rounded-full shadow-lg cursor-pointer hover:border-gray-200"
                src={apiData?.profile || avatar}
                alt="avatar"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none"
                type="password"
                placeholder="Password"
              />
              <button
                className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-100 text-xl shadow-sm text-center hover:bg-[#ff6a6a]"
                type="submit"
              >
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password
                <Link className="text-red-500 mx-2" to="/recovery">
                  Recovery Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
