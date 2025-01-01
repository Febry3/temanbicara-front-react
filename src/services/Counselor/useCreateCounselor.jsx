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
            const counselorData = response.data.data;
            const expertises = body.expertises.split(',');

            for (let i = 0; i < expertises.length; i++) {
                const res = await axiosClient.post('http://localhost:3000/api/v1/expertise', { type: expertises[i], counselor_id: counselorData.id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res);
            }
        },
        onSuccess,
        onError,
    });
}