import { useGetCalculations } from "../queries/useGetCalculations";
import { useState } from "react";
import { Calculation } from "../types";

export const CalculationHistory = () => {
    const user = sessionStorage.getItem('token2');
    const { data, refetch, error, isLoading } = useGetCalculations(user);
    const [selectedCalculation, setSelectedCalculation] = useState<Calculation | null>(null);

    const handleRefresh = () => {
        refetch();
    };

    const handleSelectCalculation = (calculation: Calculation) => {
        setSelectedCalculation(calculation);
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading calculations: {error.message}</p>}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2>Calculation History</h2>
                <button onClick={handleRefresh}>Refresh</button>
            </div>
            <ul style={{ textAlign: "left" }}>
                {data?.map((el) => (
                    <li className="record-li"
                        style={{
                            margin: "5px 0 10px 0",
                            width: "fit-content"
                        }}
                        key={el.id}
                        onClick={() => handleSelectCalculation(el)}>
                        <strong>Amount:</strong> {el.amount}$&nbsp;
                        <strong>Payment:</strong> {el.payment}$ &nbsp;
                        <strong>Rate:</strong> {el.rate}% &nbsp;
                        <strong>Term:</strong> {el.term} months
                    </li>
                ))}
            </ul>
            {selectedCalculation && (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h2>Selected calculation details</h2>
                    <div><strong>Amount:</strong> {selectedCalculation.amount}$</div>
                    <div><strong>Monthly Payment:</strong> {selectedCalculation.payment}$</div>
                    <div><strong>Interest Rate:</strong> {selectedCalculation.rate}%</div>
                    <div><strong>Term:</strong> {selectedCalculation.term} months</div>
                    <div><strong>Total Payment:</strong> {(selectedCalculation.payment * selectedCalculation.term).toFixed(2)}$</div>
                </div>
            )}
        </div>
    );
};
