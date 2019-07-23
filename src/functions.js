const functions = {

// validation for all inputs where length of 3 or more characters needed
inputLengthValidator(inputValue) {
    return Object.entries(inputValue)
        .map(val => val[1].length < 3 
            ? false 
            : true
        )},

inputLength(inputValue) {
    return Object.entries(inputValue)
        .map(val => val[1].length < 3 
            ? val 
            : null
        )}
}

export default functions