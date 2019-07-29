const functions = {

    // validation for all inputs where length of 3 or more characters needed
    inputLengthValidator(inputValue) {
        return Object.entries(inputValue)
            .map(val => val[1].length < 3 
                ? false 
                : true
            )
    },

    inputLength(inputValue) {
        return Object.entries(inputValue)
            .map(val => val[1].length < 3 
                ? val 
                : null
            )
    },

    redirectIfLoggedIn(props, context) {
        if (context === true) {
            props.history.push(`/profile/${localStorage.user_id}`)
        }
    },

    setIdRedirect(props, result) {
        localStorage.user_id = result.id
        props.history.push(`/profile/${localStorage.user_id}`)
    }
}

export default functions