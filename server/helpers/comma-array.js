module.exports = string => {
    return string
        .trim()
        .replace(/ +(?= )/g, '')
        .match(/[^,\s][^\,]*[^,\s]*/g)
}
