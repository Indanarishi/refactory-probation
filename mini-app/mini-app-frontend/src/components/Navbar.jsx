import { useEffect, useState, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { GlobalContext } from "../context/GlobalState"

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const { signoutUser } = useContext(GlobalContext)
    const navigate = useNavigate()
    const location = useLocation()

    const signout = () => {
        signoutUser()

        navigate('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        // JWT

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <nav>
            {user !== null ? (
                    <ul>
                        <li><p>{user?.result.name}</p></li>
                        <li><button onClick={signout}>Logout</button></li>
                    </ul>
                ) : (
                    <ul>
                        <li><Link to="/">Sign In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                )}
        </nav>
    )
}

export default Navbar