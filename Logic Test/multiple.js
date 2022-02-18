const solution = (num) => {

    let a = 3
    let b = 5
    let sum = 0

    for (let i = 0; i < num; i++) {
        if (i % a == 0 || i % b == 0) {
            sum += i
        }
    }

    return sum

}

console.log(solution(10))
console.log(solution(20))