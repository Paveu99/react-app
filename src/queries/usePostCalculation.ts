import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi";
import { Calculation, CalculationDto } from "../types";

export const usePostCalculationMutation = (userId: string | null) => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ['calculations', userId],
        mutationFn: async (payload: CalculationDto) => {
            return apiPost<Calculation, CalculationDto>(`calculations`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['calculations', userId]
            });
        }
    });

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess
    }
}