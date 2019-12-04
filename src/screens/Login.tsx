import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage'
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

import theme from '../theme'

import { AppState } from '../store/index'
import { loginRequest, sessionStored } from '../store/ducks/user/actions'
import ErrorHandlerFactory from '../modules/ErrorHandler'

export default function Login() {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [email, setEmail] = useState('rafael@calhau.me')
  const [passw, setPassw] = useState('')
  const [isAutoLogin, setAutoLogin] = useState(false)
  const [isSessionVerified, setSessionVerification] = useState(false)
  const { data, loading } = useSelector((state: AppState) => state.user)

  const ErrorHandler = new ErrorHandlerFactory()
  const Logo = require('../assets/logo.png')

  ErrorHandler.attachDialogComponent(Alert)

  useEffect(() => {
    AsyncStorage
      .getItem('user')
      .then(data => {
        if (data) {
          const session = JSON.parse(data)

          if (session.id && session.id.length) {
            setAutoLogin(true)
            dispatch(sessionStored(session))
          }
        } else {
          setSessionVerification(true)
        }
      })
  }, [])

  useEffect(() => {
    if (data.id !== undefined && data.id.length) {
      if (!isAutoLogin) {
        AsyncStorage.setItem('user', JSON.stringify(data))
      }
      
      callListScreen()
    }
  }, [data])

  const callListScreen = () => {
    setTimeout(() => navigate('List'), 1000)
  }

  const handleSubmit = () => {
    if (email.indexOf('@') < 0 || email.indexOf('.') < 0) {
      return ErrorHandler.showAlert('invalid-email')
    }
    else if (!passw.length) {
      return ErrorHandler.showAlert('invalid-password')
    }

    dispatch(loginRequest(email, passw))
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      enabled={Platform.OS === 'ios'}
      onTouchStart={() => Keyboard.dismiss()}
      style={styles.container}>
      
      {
        !isSessionVerified
          ? <Text>Loading...</Text>
          : (
            <>
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
                  <Text style={styles.buttonText}>
                    { !loading ? 'LOGIN' : 'LOADING...' }
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )
      }
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