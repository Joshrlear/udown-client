// validation for all inputs where length of 3 or more characters needed
export default function inputLengthValidator(inputValue) {
    console.log(inputValue)
    return inputValue.map(i => i).length < 2 ? false : true;
}