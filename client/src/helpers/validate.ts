import toast from "react-hot-toast";
import { authenticate } from "./helper";
/* ---------------------- Types ---------------------- */

interface UsernameValues {
  username?: string;
}

interface PasswordValues {
  password?: string;
}

interface ResetPasswordValues {
  password?: string;
  confirmPassword?: string;
}

interface RegisterValues {
  email?: string;
  password?: string;
  username?: string;
}

type UsernameErrors = Partial<{
  username: string;
  exist: string;
}>;

interface PasswordErrors {
  password?: string;
}

interface ResetPasswordErrors {
  password?: string;
}

interface RegisterErrors {
  username?: string;
  password?: string;
  email?: string;
}

interface ProfileValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  address?: string;
  mobile?: string;
}

/* ---------------------- Validators ---------------------- */

export async function usernameValidate(
  values: UsernameValues
): Promise<UsernameErrors> {
  const errors: UsernameErrors = {};

  usernameVerify(errors, values);

  if (values.username && !errors.username) {
    try {
      const { status } = await authenticate(values.username);
      if (status !== 200) {
        errors.exist = "User does not exist!";
        toast.error(errors.exist);
      }
    } catch (error) {
      console.log(error);
      errors.exist = "Error checking username existence";
      toast.error(errors.exist);
    }
  }

  return errors;
}

export async function passwordValidate(
  values: PasswordValues
): Promise<PasswordErrors> {
  return passwordVerify({}, values);
}

export async function resetPasswordValidate(
  values: ResetPasswordValues
): Promise<ResetPasswordErrors> {
  return resetPasswordVerify({}, values);
}

export async function registerValidation(
  values: RegisterValues
): Promise<RegisterErrors> {
  let errors: RegisterErrors = {};
  errors = { ...usernameVerify(errors, values) };
  errors = { ...passwordVerify(errors, values) };
  errors = { ...emailVerify(errors, values) };
  return errors;
}

export async function profileValidation(values: ProfileValues) {
  const errors = emailVerify({}, values);
  return errors;
}

/* ---------------------- Core Checks ---------------------- */

function usernameVerify<T extends { username?: string }>(
  errors: Partial<{ username: string }> = {},
  values: T
): Partial<{ username: string }> {
  if (!values.username) {
    errors.username = "Username is required";
    toast.error(errors.username);
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username, can't contain spaces";
    toast.error(errors.username);
  }
  return errors;
}

function passwordVerify<T extends { password?: string }>(
  errors: Partial<{ password: string }> = {},
  values: T
): Partial<{ password: string }> {
  const specialChars = /[`!@#$%^&*()\-=+[\]{}\\|;:'",.<>/?~"]/;

  if (!values.password) {
    errors.password = "Password is required";
    toast.error(errors.password);
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password, can't contain spaces";
    toast.error(errors.password);
  } else if (values.password.length < 6) {
    errors.password = "Password Weak";
    toast.error(errors.password);
  } else if (!specialChars.test(values.password)) {
    errors.password = "Password Must Have a Special Characters";
    toast.error(errors.password);
  }

  return errors;
}

function resetPasswordVerify(
  errors: ResetPasswordErrors = {},
  values: ResetPasswordValues
): ResetPasswordErrors {
  passwordVerify(errors, values);

  if (values.password !== values.confirmPassword) {
    errors.password = "Passwords Does Not Match";
    toast.error(errors.password);
  }

  return errors;
}

function emailVerify(
  errors: Partial<{ email: string }> = {},
  values: { email?: string }
): Partial<{ email: string }> {
  if (!values.email) {
    errors.email = "Email required!";
    toast.error(errors.email);
  } else if (values.email.includes(" ")) {
    errors.email = "Wrong Email";
    toast.error(errors.email);
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
    toast.error(errors.email);
  }

  return errors;
}
