import { useQuery } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi";
import { Calculation } from "../types/index";

export const useGetCalculations = (userId: string | null) => {
    const { apiGet } = useApi();
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ['calculations', userId],
        queryFn: async () => {
            return apiGet<Calculation[]>(`calculations?userId=${userId}`);
        },
    });

    return {
        data,
        refetch,
        error,
        isLoading
    }
}