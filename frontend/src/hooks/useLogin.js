// hooks/useLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      // Directly update the query cache with the response
      queryClient.setQueryData(["authUser"], data);
      
      // Wait briefly for state updates
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Navigate based on onboarding status
      if (data?.user?.isOnboarded) {
        navigate("/", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      // Clear any existing auth data on failure
      queryClient.setQueryData(["authUser"], null);
    }
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;