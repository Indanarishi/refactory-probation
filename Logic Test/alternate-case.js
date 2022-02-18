const alternateCase = (arg) => {

    // Make sure the argument is a string
    let string = String(arg)

    // Split each of the letters and put it into an array
    const arr = string.split("").map(s => s)

    // Iterates through the array
    const alterArr = arr.map(item => {
        // If the element inside the array is a lowercase letter
        if (item.toLowerCase() === item) {
            // convert it to uppercase
            return item.toUpperCase()
        } else {
            // if not, convert it to lowercase
            return item.toLowerCase()
        }
    })

    // Combine each element inside the array into a string
    const result = alterArr.join("")

    return result
}

console.log(alternateCase("abc"))
console.log(alternateCase("ABC"))
console.log(alternateCase("Hello World"))