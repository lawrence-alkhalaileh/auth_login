import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useFormik } from "formik";
import { usernameValidate } from "../helpers/validate";

export function Username() {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[rgba(255,255,255,0.55)] border-4 border-gray-100 shrink-0 h-3/4 w-1/4 rounded-3xl py-20 px-7 min-w-max backdrop-blur-[7.1px] shadow-[0_4px_30px_#4747470b]">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Lorem ipsum dolor sit amet consectetur elit. A, aspernatur.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                className="border-4 border-gray-100 w-[135px] rounded-full shadow-lg cursor-pointer hover:border-gray-200"
                src={avatar}
                alt="avatar"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none"
                type="text"
                placeholder="Username"
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
                Not a Member
                <Link className="text-red-500 mx-2" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
