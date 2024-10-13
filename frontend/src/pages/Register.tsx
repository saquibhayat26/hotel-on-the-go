import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as authService from "../api/authService";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // Mutations
  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => authService.register(data),
    onSuccess: async (data) => {
      showToast({
        message: data.message,
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      {/* go for mobile first design */}

      {/* first name and last name */}
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-textColor-darkGrey text-sm font-bold flex-1">
          First Name:
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-textColor-darkGrey text-sm font-bold flex-1">
          Last Name:
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      {/* email */}
      <label className="text-textColor-darkGrey text-sm font-bold flex-1">
        Email:
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      {/* password */}
      <label className="text-textColor-darkGrey text-sm font-bold flex-1">
        Password:
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be of minimum 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      {/* confirm password */}
      <label className="text-textColor-darkGrey text-sm font-bold flex-1">
        Confirm Password:
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "Confirm password is required";
              } else if (watch("password") !== value) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      {/* submit button */}
      <span className="flex justify-between">
        <p className="text-sm flex items-center gap-1">
          <span>Already Registered?</span>
          <Link
            to={"/login"}
            className="text-sm hover:text-textColor-inverted cursor-pointer underline justify-center"
          >
            Login
          </Link>
        </p>
        <button
          type="submit"
          className="bg-backgroundColor-normal text-white py-2 px-4 rounded text-xl font-bold hover:bg-backgroundColor-darkBlue"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
