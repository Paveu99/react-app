import { NavLink } from "react-router-dom";

export const LogoutForm = () => {
    const logout = () => {
        sessionStorage.clear()
        window.location.replace("http://localhost:5173");
    }

    return (<div style={{ textAlign: 'center' }}>
        <h2>Are you sure about that?</h2>
        <div className='decision'>
            <button className='download' onClick={logout}>Yes</button>
            <NavLink to="/">
                <button className='download3'>No</button>
            </NavLink>
        </div>
    </div>
    )
}