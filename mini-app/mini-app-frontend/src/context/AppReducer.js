const AppReducer = (state, action) => {
    switch(action.type) {
        case 'SIGNIN_USER':
        case 'SIGNUP_USER':
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            return {
                ...state,
                user: [
                    action?.payload
                ]
            }
        case 'SIGNOUT_USER':
            localStorage.removeItem('profile')
            return {
                ...state,
                user: []
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action?.payload
            }
        default:
            return state
    }
}

export default AppReducer