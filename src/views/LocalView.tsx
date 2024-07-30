import { Link, NavLink } from "react-router-dom";

export const LocalView = () => {
    const name = sessionStorage.getItem('token')
    return (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
            <b>
                <div>{name}</div>
            </b>
            |
            <b>
                <NavLink className="link" style={{ textDecoration: "none" }} to="/user/logout">Log out</NavLink>
            </b>
        </div>
    )
}