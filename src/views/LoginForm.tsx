import { FormEvent, useState } from "react";
import { useUsers } from "../queries/useUsers";

export const LoginForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { data: users, refetch, error, isPending } = useUsers();

    const showPassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('text');
    };

    const hidePassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('password');
    };

    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }));
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault();

        if (form.email.includes('@') && form.password.length > 0) {
            await refetch();

            if (users) {
                const user = users.find(u => u.email === form.email && u.password === form.password);

                if (user) {
                    sessionStorage.setItem('token', user.name);
                    sessionStorage.setItem('token2', user.id as string);
                    sessionStorage.setItem('token3', user.email as string);
                    refreshToMain();
                } else {
                    setSubmitted(true);
                    setErrorMessage('Invalid email or password');
                }
            } else {
                setSubmitted(true);
                setErrorMessage('Error fetching users');
            }
        } else {
            setSubmitted(true);
            setErrorMessage('Please enter a valid email and password');
        }
    };

    const refreshToMain = () => {
        window.location.replace("http://localhost:5173");
    };

    return (
        <div>
            <form autoComplete='off' className="form" onSubmit={checkInput}>
                {submitted && errorMessage && (
                    <p className="checkAnswer" style={{ backgroundColor: 'red' }}>
                        {errorMessage}
                    </p>
                )}
                <p>
                    <label>
                        e-mail: <br />
                        <input
                            type="text"
                            name="email"
                            className="input"
                            value={form.email}
                            onChange={e => change('email', e.target.value)}
                        />
                    </label>
                </p>
                <p>
                    <label>
                        Password: <br />
                        <input
                            type={inputType}
                            name="password"
                            className="input"
                            value={form.password}
                            onChange={e => change('password', e.target.value)}
                        />
                        <button type="button" className="download4" onMouseDown={showPassword} onMouseUp={hidePassword} onMouseOut={hidePassword}>
                            {'👁'}
                        </button>
                    </label>
                </p>
                <button type="submit" className="download2" disabled={isPending}>Log in</button>
            </form>
            {isPending && <h3>Loading...</h3>}
        </div>
    );
};
