import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "react-google-login"
import { GlobalContext } from "../context/GlobalState"

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isWrong, setIsWrong] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [isGoogle, setIsGoogle] = useState(false)
    const { signinUser, error, setError } = useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (error?.response?.status === 400) {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 3000)
            setPassword('')
        } else if (error?.response?.status === 404) {
            navigate('/signup')
        }
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!password) {
            setIsEmpty(true)
            setTimeout(() => {
                setIsEmpty(false)
            }, 3000)
        } else {
            const userForm = {
                email,
                password,
                account_type: 'regular'
            }
    
            signinUser(userForm, navigate)
        }

    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const userForm = {
            email: result.email,
            password: '',
            account_type: 'google'
        }
        // const token = res?.tokenId
        // const data = { result, token }

        try {
            signinUser(userForm, navigate)
            setError(null)
        } catch (err) {
            setError(err)
        }
    }

    const googleFailure = () => {
        console.log("Google sign in was unsuccesful. Try again later.")
    }

    return (
        <section id="login">
            <div className="container">
                <div className="login-logo">
                    <img src="images/logo.png" alt="logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {isGoogle ? <p>Sign In With Your Google Account</p> : <></>}
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
                        {isWrong ? <p>Wrong Password</p> : <></>}
                        {isEmpty ? <p>Password Cannot Be Empty</p> : <></>}
                    </div>
                    <button type="submit" className="login-btn">Sign In</button>
                    <p>or sign in with</p>
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
                    <p>don't have account ? <Link to='/signup'>sign up</Link></p>
                </form>
            </div>
        </section>
    )
}

export default SignIn