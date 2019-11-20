import getError from '../errors'
import { AlertStatic } from 'react-native'

let instance: null

class ErrorHandler {

  public alertDialog: AlertStatic | null = null
  
  attachDialogComponent = (alertDialog: any) => {
    this.alertDialog = alertDialog
  }

  error = (errorName: string) => getError(errorName)

  getInstance = () => {
    if (!instance) {
      return new ErrorHandler()
    }

    return instance
  }

  showAlert = (errorName: string) => {
    if (!this.alertDialog) {
      return
    } 
    
    const { title, message } = this.error(errorName)
    this.alertDialog.alert(title, message)
  }
}

export default ErrorHandler