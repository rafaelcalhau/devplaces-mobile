import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import theme from '../theme'
import { AppState } from '../store'

export default function Book() {
  const [date, setDate] = useState('')
  const [showDatepicker, setDatepickerVisibility] = useState(false)
  const spotId = useNavigationParam('id')
  const { id: userId } = useSelector((state: AppState) => state.user.data)
  const navigation = useNavigation()

  function handleDate (d: any) {
    const value = d || date

    setDate(moment(new Date(value)).format('YYYY-MM-DD'))
    setDatepickerVisibility(false)
    
    Keyboard.dismiss()
  }

  function handleRequest () {

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