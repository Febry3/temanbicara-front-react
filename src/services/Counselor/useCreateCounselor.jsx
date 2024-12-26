import axiosClient from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateCounselorAccount = ({ onSuccess, token, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const response = await axiosClient.post('http://localhost:3000/api/v1/counselor', body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response;
        },
        onSuccess,
        onError,
    });
}