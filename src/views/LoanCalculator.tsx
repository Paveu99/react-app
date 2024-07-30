import { ChangeEvent, useEffect, useState } from 'react';
import { usePostCalculationMutation } from '../queries/usePostCalculation';
import { CalculationDto } from '../types';
import { Form } from 'react-router-dom';

type FormChangeEvent = ChangeEvent<HTMLInputElement>;

export const LoanCalculator = () => {

    const user = sessionStorage.getItem("token2");

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [res, setRes] = useState<boolean>(false);
    const [formState, setFormState] = useState<CalculationDto>({
        amount: 0,
        payment: 0,
        rate: 0,
        term: 0,
        userId: user ? user : ''
    });

    const { data, error: postError, isPending, mutate, isSuccess } = usePostCalculationMutation(user);

    const handleChange = (e: FormChangeEvent) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: parseFloat(value)
        }));
    };

    const calculatePayment = async () => {
        if (!formState.amount || !formState.term || !formState.rate) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        const principal = formState.amount;
        const numberOfPayments = formState.term;
        const monthlyRate = formState.rate / 100 / 12;

        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = (principal / numberOfPayments).toFixed(2);
        } else {
            monthlyPayment = (
                principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
            ).toFixed(2);
        }

        setFormState(prevState => ({
            ...prevState,
            payment: parseFloat(monthlyPayment)
        }));
        setLoading(false);
        setError(null);
    };

    const sendData = () => {
        mutate(formState)
        setRes(true)
        clear()
    };

    const clear = () => {
        setFormState({
            amount: 0,
            payment: 0,
            rate: 0,
            term: 0,
            userId: user ? user : ''
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setRes(true)
            setTimeout(() => {
                setRes(false)
            }, 3000)
        }
    }, [isSuccess])

    return (
        <div>
            <h2 style={{ textAlign: "left" }}>Loan Calculator</h2>
            <div style={{ display: "flex", gap: "10px" }}>
                <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={formState.amount === 0 ? '' : formState.amount}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder="Term (months)"
                    name="term"
                    value={formState.term === 0 ? '' : formState.term}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder="Interest Rate (%)"
                    name="rate"
                    value={formState.rate === 0 ? '' : formState.rate}
                    onChange={handleChange}
                />
                <button onClick={calculatePayment} disabled={loading}>
                    {loading ? 'Calculating...' : 'Calculate'}
                </button>
                <button onClick={clear}>
                    Clear
                </button>
            </div>
            <br />
            <div>
                {formState.payment !== 0
                    &&
                    <div>
                        <div>Monthly Payment: {formState.payment}$</div>
                        <button onClick={sendData}>Send data</button>
                    </div>}
                {res && <p>Calculation added with id:{data?.id}</p>}
                {isPending && <p>Adding to the database</p>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
    );
};
