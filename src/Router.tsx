import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack'

// Screens
import BookScreen from './screens/Book'
import ListScreen from './screens/List'
import LoginScreen from './screens/Login'
import { ScreenParamsList } from './common/interfaces'

const Stack = createNativeStackNavigator<ScreenParamsList>();
const navigationOptions = (options?: NativeStackNavigationOptions): NativeStackNavigationOptions => ({
  headerShown: false,
  ...options
})

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={navigationOptions()} />
        <Stack.Screen name="Book" component={BookScreen} options={navigationOptions()} />
        <Stack.Screen name="List" component={ListScreen} options={navigationOptions({ gestureEnabled: false })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}