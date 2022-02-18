import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "react-google-login"
import { GlobalContext } from "../context/GlobalState"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [isNotFound, setIsNotFound] = useState(false)
    const navigate = useNavigate()
    const { signupUser, error, setError } = useContext(GlobalContext)

    useEffect(() => {
        if (error?.response?.status === 404) {
            setIsNotFound(true)
            setTimeout(() => {
                setIsNotFound(false)
            }, 3000)
            setError(null)
        }
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            email,
            firstName,
            lastName,
            password,
            imageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            account_type: 'regular'
        }

        signupUser(newUser, navigate)
    }

    const googleSuccess = async (res) => {
        const { email, givenName, familyName, imageUrl } = res?.profileObj
        const newUser = {
            email,
            firstName: givenName,
            lastName: familyName,
            password: '',
            imageUrl,
            account_type: 'google'
        }

        // const token = res?.tokenId
        // const data = { newUser, token }

        try {
            signupUser(newUser, navigate)
        } catch (err) {
            console.log(err)
        }

    }

    const googleFailure = () => {
        console.log("Google sign in was unsuccesful. Try again later.")
    }

    return (
        <section id="register">
            <div className="container">
                <div className="login-logo">
                    <img src="images/logo.png" alt="logo"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {isNotFound ? <p>Create Your Account First</p> : <></>}
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" onChange={e => setFirstName(e.target.value)} value={firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" onChange={e => setLastName(e.target.value)} value={lastName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
                    </div>
                    <button type="submit" className="login-btn">Sign Up</button>
                    <p>or sign up with</p>
                    <GoogleLogin
                        clientId="722796550580-689fs0ullvboukm3opoti903ksimhirp.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button className="google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <img src="images/google-logo.png" alt="google" />
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <p>already have an account ? <Link to='/'>sign in</Link></p>
                </form>
            </div>
        </section>
    )
}

export default SignUp