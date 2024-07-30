import { useQuery } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi";
import { User } from "../types";

export const useUsers = () => {
    const { apiGet } = useApi();

    const { data, refetch, error, isPending } = useQuery({
        queryKey: ['login'],
        queryFn: async () => {
            return apiGet<User[]>('users');
        }
    });

    return {
        data,
        refetch,
        error,
        isPending
    };
};
