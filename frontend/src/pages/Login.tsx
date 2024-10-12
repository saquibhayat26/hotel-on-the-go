import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../api/authService";
import { useAppContext } from "../contexts/AppContext";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>();

  //mutation
  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (data) => {
      showToast({
        message: data.message,
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Login</h2>
      <label className="text-textColor-darkGrey text-sm font-bold flex-1">
        Email:
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-textColor-darkGrey text-sm font-bold flex-1">
        Password:
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex justify-between align-bottom">
        <p className="text-sm flex items-center gap-1">
          <span>New to here?</span>
          <Link
            to={"/register"}
            className="text-sm hover:text-textColor-inverted cursor-pointer underline justify-center"
          >
            Register
          </Link>
        </p>
        <button
          type="submit"
          className="bg-backgroundColor-normal text-white text-xl font-bold py-2 px-4 rounded hover:bg-backgroundColor-darkBlue"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
