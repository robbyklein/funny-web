import jwtDecode from 'jwt-decode'

export default auth => {
    const decoded = jwtDecode(auth)

    return {
        auth,
        admin: decoded.sub.admin,
        name: decoded.sub.name,
        email: decoded.sub.email,
    }
}
