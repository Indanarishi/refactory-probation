import { useState, useEffect } from "react"

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    return (
        <section id="profile">
            <div className="container">
                <div className="login-logo">
                    <img src="images/logo.png" alt="logo" />
                </div>
                <div className="profile-box">
                    <img src={user?.result?.imageUrl} alt="profile" />
                    <div>
                        <p className="profile-email">{user?.result?.email}</p>
                        <p className="profile-name">{user?.result?.name}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile