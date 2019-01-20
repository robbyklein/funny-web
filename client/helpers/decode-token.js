import jwtDecode from 'jwt-decode'

export default auth_token => {
    const decoded = jwtDecode(auth_token)

    return {
        auth_token,
        role: decoded.sub.role,
        name: decoded.sub.name,
        email: decoded.sub.email,
    }
}
