import jwtDecode from 'jwt-decode'

export default auth => {
    const decoded = jwtDecode(auth)

    return {
        auth,
        role: decoded.sub.role,
        name: decoded.sub.name,
        email: decoded.sub.email,
    }
}
