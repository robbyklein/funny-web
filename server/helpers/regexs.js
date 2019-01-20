exports.validateEmail = email => {
    // from http://emailregex.com/
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // test lowercase version of email
    return re.test(String(email).toLowerCase())
}

exports.validatePassword = password => {
    // 8-60 characters using letters, numbers, or special chars
    const re = /^([A-Za-z0-9\-_!@#$%^&*()+]){8,60}$/

    // Test the password
    return re.test(String(password))
}

exports.validateUsername = username => {
    const re = /^([A-Za-z0-9\-_]){1,30}$/
    return re.test(String(username).toLowerCase())
}
