import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LocalView } from "./LocalView";

export const Header = () => {

    const [test, setTest] = useState<boolean>(false);

    const styleOfLink = ({ isActive }: {
        isActive: boolean
    }
    ) => (
        {
            color: isActive ? "#a61b19" : '',
            backgroundColor: isActive ? "#fff" : '',
            padding: isActive ? "5px 150px" : "5px 100px",
            borderRadius: isActive ? '15px' : ""
        }
    )

    useEffect(() => {
        (async () => {
            if (sessionStorage.getItem('token')) {
                setTest(true)
            }
        })()
    }, [])

    const login = <NavLink style={{ textDecoration: "none" }} to="/user/login">Log in</NavLink>

    const user = <LocalView />

    return <header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>LOAN CALCULATION APP</h1>
            <div>
                {test ? user : login}
            </div>
        </div>
        <hr />
        <div>
            <NavLink style={styleOfLink} to="/">Main page</NavLink>
            {test && <NavLink style={styleOfLink} to="/history">History</NavLink>}
            {test && <NavLink style={styleOfLink} to="/calculator">Calculator</NavLink>}
        </div>
        <hr />
    </header>
}