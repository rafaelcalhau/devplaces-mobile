import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import SpotList from '../components/SpotList'
import { AppState } from '../store'
import { Spot } from '../store/ducks/spots/types' 
import { spotsRequest } from '../store/ducks/spots/actions'

export default function List() {
  const [search, setSearch] = useState('')
  const [techs, setTechs] = useState([])
  const dispatch = useDispatch()
  const spotsState = useSelector((state: AppState) => state.spots)
  const { token : userToken } = useSelector((state: AppState) => state.user.data)
  const Logo = require('../assets/logo.png')

  useEffect(() => handleSearch(), [])
  useEffect(() => groupSpots(), [spotsState.data])

  function groupSpots () {
    if (!techs.length && spotsState.data.length) {
      const groups: any = {}
      
      spotsState.data.map((spot: Spot) => {
        spot.technologies.map((tech: string) => {
          const key = tech.trim().toUpperCase()

          if (groups[`${key}`] === undefined) {
            groups[`${key}`] = []
          }

          groups[key].push({ ...spot })
        })
      })

      setTechs(groups)
    }
  }

  function handleSearch () {
    dispatch(spotsRequest(search, userToken))
  }

  function renderSpots() {
    const keys: any = Object.keys(techs)

    if (!keys.length) return

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
  
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.logo} />

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
  }
})