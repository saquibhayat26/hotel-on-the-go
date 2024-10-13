import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authService from "../api/authService";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({
        message: "You have been signed out",
        type: "SUCCESS",
      });
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const logout = () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-textColor-inverted bg-backgroundColor-white rounded font-bold px-3 hover:bg-backgroundColor-lightGray"
      onClick={() => logout()}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
