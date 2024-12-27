import axiosClient from "../../axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchCounselor = ({ token }) => {
    return useQuery({
        queryFn: async () => {

            const response = await axiosClient.get('http://localhost:3000/api/v1/counselor',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response;
        },
        queryKey: ['counselorAccount'],
    });
}