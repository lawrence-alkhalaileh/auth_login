import { useFormik } from "formik";
import { resetPasswordValidate } from "../helpers/validate";
import { resetPassword } from "../helpers/helper";
import { useAuthStore } from "../store/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      toast.promise(resetPassword(username, values.password), {
        loading: "Updating...",
        success: <b>Reset Successfully..!</b>,
        error: <b>Could not reset</b>,
      });
      navigate("/");
    },
  });
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[rgba(255,255,255,0.55)] border-4 border-gray-100 shrink-0 h-[85vh] w-[30vw] rounded-3xl py-24 px-10 min-w-[360px] backdrop-blur-[7.1px] shadow-[0_4px_30px_#4747470b]">
          <div className="title flex flex-col items-center">
            <h4 className="text-6xl font-bold">Reset</h4>
            <span className="py-6 text-2xl w-3/4 text-center text-gray-500">
              Enter new password.
            </span>
          </div>
          <form className="pt-24" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-8">
              <input
                {...formik.getFieldProps("password")}
                className="border-0 px-6 py-5 rounded-xl w-4/5 shadow-md text-xl focus:outline-none"
                type="text"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirmPassword")}
                className="border-0 px-6 py-5 rounded-xl w-4/5 shadow-md text-xl focus:outline-none"
                type="text"
                placeholder="Confirm Password"
              />
              <button
                className="border bg-indigo-500 w-4/5 py-5 rounded-lg text-gray-100 text-2xl shadow-md text-center hover:bg-[#ff6a6a]"
                type="submit"
              >
                Let's Go
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
