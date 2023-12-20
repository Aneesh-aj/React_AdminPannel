export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    console.log("error hadler ")
    console.log("eht erorr",error.message)
    return error;
}