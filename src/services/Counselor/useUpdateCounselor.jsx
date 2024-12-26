import axiosClient from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCounselorAccount = ({ onSuccess, token, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const response = await axiosClient.put('http://localhost:3000/api/v1/counselor', body,
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