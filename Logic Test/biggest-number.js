const maxRedigit = (arg) => {

    // Make sure the argument converted to number
    let num = Number(arg)
    
    // Check to see if the number is a positive integers and the length of the value must be 3
    if (num > 0 && num.toString().length === 3) {

        // Split each number and put it into an array
        const arr = String(num).split("").map(num => Number(num))

        // Sort the array from the highest to lowest
        const sortedArr = arr.sort((a, b) => b - a)

        // Combine each array and converted it into a number
        const result = +sortedArr.join("")

        return result
    } else {
        return null
    }

}

console.log(maxRedigit(123))
console.log(maxRedigit(231))
console.log(maxRedigit(321))

console.log(maxRedigit(-1))
console.log(maxRedigit(0))
console.log(maxRedigit(99))
console.log(maxRedigit(1000))