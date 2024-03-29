import React, { ComponentType, ReactElement, ReactNode, useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { RouteProp, useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import { ScreenParamsList } from '../common/interfaces';
import theme from '../theme'
import { AppState } from '../store'
import { bookRequest } from '../store/ducks/booking/actions'

interface BookScreenProps {
  route: RouteProp<ScreenParamsList, "Book">
}
export default function Book({ route }: BookScreenProps) {
  const { id: spotId } = route.params

  const dispatch = useDispatch()
  const [date, setDate] = useState('')
  const [showDatepicker, setDatepickerVisibility] = useState(false)
  const { id: userId, token } = useSelector((state: AppState) => state.user.data)
  const bookList = useSelector((state: AppState) => state.book.data)
  const [bookings] = useState(bookList.length)
  const navigation = useNavigation()

  useEffect(() => {
    if (bookList.length > bookings) {
      Alert.alert('Booking a spot', 'Great! Your request was successfully sent.')
      navigation.goBack()
    }
  }, [bookList])

  function handleDate (d: any) {
    const value = d || date

    setDate(moment(new Date(value)).format('YYYY-MM-DD'))
    setDatepickerVisibility(false)

    Keyboard.dismiss()
  }

  function handleRequest () {
    if (date.length) {
      dispatch(bookRequest({ date, spotId, userId, token }))
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book your spot</Text>

      <View style={styles.form}>
        <Text style={styles.label}>PERFECT DATE</Text>
        <TextInput
          autoCapitalize='none'
          onTouchStart={() => setDatepickerVisibility(true)}
          placeholder='Which date do you want?'
          placeholderTextColor='#999'
          style={styles.input}
          value={date}
        />

        <TouchableOpacity
          onPress={handleRequest}
          style={styles.button}>
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.buttonBack]}>
          <Text style={styles.buttonBackText}>Cancel</Text>
        </TouchableOpacity>

        {
          showDatepicker
          && <DateTimePicker
              value={new Date(moment().format())}
              mode='date'
              is24Hour={true}
              display='default'
              onChange={(event, date) => handleDate(date)}
            />
        }
      </View>
    </SafeAreaView>
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
  buttonBack: {
    backgroundColor: theme.button.secondary.bgColor,
    marginTop: 10
  },
  buttonText: {
    color: theme.button.primary.textColor
  },
  buttonBackText: {
    color: theme.button.secondary.textColor
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch',
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30
  }
})