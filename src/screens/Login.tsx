import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import api from '../services/api'
import theme from '../theme'

import ErrorHandlerFactory from '../modules/ErrorHandler'

export default function Login() {
  const [email, setEmail] = useState('')
  const [passw, setPassw] = useState('')

  const ErrorHandler = new ErrorHandlerFactory()
  const Logo = require('../assets/logo.png')

  ErrorHandler.attachDialogComponent(Alert)

  const handleSubmit = async (): Promise<void> => {
    if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
      return ErrorHandler.showAlert('invalid-email')
    }
    else if (!passw.length) {
      return ErrorHandler.showAlert('invalid-password')
    }

    try {
      const response = await api.post('/authenticate', { email, password: passw })
      const { id, name, token } = response.data
    } catch {
      ErrorHandler.showAlert('authentication')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      enabled={Platform.OS === 'ios'}
      onTouchStart={() => Keyboard.dismiss()}
      style={styles.container}>
      <Image source={Logo} />
      
      <View style={styles.form}>
        <Text style={styles.label}>YOUR EMAIL</Text>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          onChangeText={setEmail}
          placeholder='my@email.com'
          placeholderTextColor='#999'
          style={styles.input}
          value={email} />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          onChangeText={setPassw}
          secureTextEntry
          style={styles.input}
          value={passw} />

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.button.primary.bgColor,
    borderRadius: 3,
    alignItems: 'center',
    height: 44,
    justifyContent: 'center'
  },
  buttonText: {
    color: theme.button.primary.textColor
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch',
    marginTop: 40,
    marginHorizontal: 50
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ddd',
    color: '#444',
    fontSize: 16,
    height: 44,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  label: {
    color: '#444',
    fontWeight: 'bold',
    marginBottom: 8
  }
})