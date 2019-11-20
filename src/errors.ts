interface ErrorObject {
  title: string;
  message: string;
}

export default function getError(errorName: string) {
  let error: ErrorObject

  switch(errorName) {
    case "authentication": 
      error = {
        "title": "Authentication error",
        "message": "Wasn't possible to authenticate you, please try again."
      }
      break
    case "invalid-email": 
      error = {
        "title": "Invalid Email",
        "message": "Please enter a valid email address."
      }
      break
    case "invalid-password": 
      error = {
        "title": "Invalid Password",
        "message": "Please enter your password."
      }
      break
    default:
      error = {
        "title": "Whoops!",
        "message": "Something wrong happened, please try again."
      }
  }

  return error
}