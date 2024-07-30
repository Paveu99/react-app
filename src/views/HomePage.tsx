export const HomePage = () => {
    return <div style={{ textAlign: "left" }}>
        <h2>Overview</h2>
        <p>
            Welcome to the Loan Calculator Application! This web application provides users with an easy and efficient way to calculate their loan repayments. With a simple interface and powerful functionality, users can quickly determine their monthly payments based on loan amount, term, and interest rate.
        </p>
        <div>
            <h3>Features</h3>
            <ul>
                <li>
                    <strong>User Authentication:</strong>Secure login system to ensure your data is protected.
                </li>
                <li>
                    <strong>Loan Calculation:</strong> Calculate monthly loan repayments by inputting loan amount, term, and interest rate.
                </li>
                <li>
                    <strong>Personalized Data:</strong> View your previous calculations and manage your loan data.
                </li>
                <li>
                    <strong>Data Storage:</strong> All data is stored locally in JSON format, ensuring quick access and easy management.
                </li>
            </ul>
        </div>
    </div>
}

