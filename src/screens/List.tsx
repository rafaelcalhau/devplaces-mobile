import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Feather'
import socketio from 'socket.io-client'
import moment from 'moment'

import SpotList from '../components/SpotList'
import { AppState } from '../store'
import { Spot } from '../store/ducks/spots/types' 
import { bookListRequest } from '../store/ducks/booking/actions'
import { BookResponse } from '../store/ducks/booking/types'
import { spotsRequest } from '../store/ducks/spots/actions'
import { logout } from '../store/ducks/user/actions'
import { socketURL } from '../../app.json'

export default function List () {
  const [isFiltering, setFilteringState] = useState(false)
  const [search, setSearch] = useState('')
  const [techs, setTechs] = useState([])
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const spotsState = useSelector((state: AppState) => state.spots)
  const { id: userId, token } = useSelector((state: AppState) => state.user.data)
  const Logo = require('../assets/logo.png')

  const socket = useMemo(() => socketio(socketURL, {
    query: { userId, type: 'mobile' }
  }), [])

  // onMount
  useEffect(() => {
    handleSearch()
    requestBookList()
  }, [])

  // onUpdate
  useEffect(() => {
    socket.on('booking_response', (data: BookResponse): void => {
      const date = moment(new Date(data.date)).format('LL')
      const answer = data.approved ? 'confirmed' : 'denied'
      const title = data.approved ? 'Booking confirmed!' : "We're Sorry"

      Alert.alert(
        title,
        `Your booking to a spot in ${data.company} at ${date} was ${answer}!`
      )
    })
  }, [socket])
  
  // onUpdate
  useEffect(() => groupSpots(), [spotsState.data])

  function groupSpots () {
    const groups: any = {}

    if (spotsState.data.length) {
      if (search.length) {
        // When we search technologies

        groups[search] = []
        
        spotsState.data.map((spot: Spot) => {
          groups[search].push({ ...spot })
        })
      }
      else if (!techs.length) { 
        // When we don't

        spotsState.data.map((spot: Spot) => {
          spot.technologies.map((tech: string) => {
            const key = tech.trim().toUpperCase()

            if (groups[`${key}`] === undefined) {
              groups[`${key}`] = []
            }

            groups[key].push({ ...spot })
          })
        })
      }
    }

    setTechs(groups)
  }

  function handleSearch () {
    dispatch(spotsRequest(search, token))
  }

  function logoutUser () {
    AsyncStorage
      .removeItem('user')
      .then(() => {
        dispatch(logout())
        navigate('Login')
      })
  }

  function renderSpots () {
    const keys: any = Object.keys(techs)

    if (spotsState.loaded && !keys.length && search.length) {
      return (
        <View style={styles.notFound}>
          <Icon name='frown' size={26} />
          <Text style={styles.notFoundText}>
            No companies found.
          </Text>
        </View>
      )
    }

    return (
      <ScrollView style={ styles.spots }>
        {
          keys.map((name: any, idx: number) => {
            return (
              <SpotList
                key={idx}
                spots={techs[name]}
                tech={keys[idx]}
              />
            )
          })
        }
      </ScrollView>
    )
  }

  function requestBookList () {
    dispatch(bookListRequest({ userId, token }))
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity
          onPress={() => setFilteringState(!isFiltering)}
          style={styles.topbarButton}>
          <Icon name='filter' size={26} />
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />

        <TouchableOpacity
          onPress={logoutUser}
          style={styles.topbarButton}>
          <Icon name='log-out' size={26} />
        </TouchableOpacity>
      </View>

      {
        isFiltering &&
        <View style={styles.form}>
          <TextInput
            onChangeText={setSearch}
            autoCapitalize='words'
            placeholder='Search for Technologies'
            style={styles.input}
            value={search} />
          <TouchableOpacity
            onPress={handleSearch}
            style={styles.searchButton}>
            <Icon name='search' size={26} />
          </TouchableOpacity>
        </View>
      }

      {
        !spotsState.loaded && <Text>Loading spots...</Text>
      }

      {
        renderSpots()
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ddd',
    color: '#444',
    fontSize: 16,
    width: '70%',
    height: 44,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  logo: {
    height: 25,
    marginVertical: 20,
    resizeMode: 'contain'
  },
  notFound: {
    alignItems: 'center',
    marginVertical: 20
  },
  notFoundText: {
    color: '#444',
    marginVertical: 5
  },
  searchButton: {
    height: 46,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginLeft: 10
  },
  spots: {
    alignSelf: 'stretch',
    marginHorizontal: 15,
    marginTop: 10
  },
  topbar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topbarButton: {
    height: 46,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginHorizontal: 10
  }
})
