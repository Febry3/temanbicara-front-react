import axiosClient from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCounselorAccount = ({ onSuccess, token, onError }) => {
    return useMutation({
        mutationFn: async (id) => {
            const response = await axiosClient.delete(`http://localhost:3000/api/v1/counselor/${id}`,
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