const useError = (errCode)=> {
    if(errCode === "ER_DUP_ENTRY") {
        return { message: "Email Already Use" }
    }
}
const useSuccess = (errCode)=> {
    if(errCode === "ER_DUP_ENTRY") {
        return { message: "Email Already Use" }
    }
    if(errCode === "ER_DUP_ENTRY") {
        return { message: "Email Already Use" }
    }
    if(errCode === "ER_DUP_ENTRY") {
        return { message: "Email Already Use" }
    }
    
}

module.export = {
    useError,
    useSuccess
}

module.exports = {
    useError,
    useSuccess
}