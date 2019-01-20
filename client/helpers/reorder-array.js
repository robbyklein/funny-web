export default ({list, start, end}) => {
    let newList = [...list]
    const [removed] = newList.splice(start, 1)
    newList.splice(end, 0, removed)
    return newList
}