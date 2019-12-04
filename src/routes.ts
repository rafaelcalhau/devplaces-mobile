import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import BookScreen from './screens/Book'
import ListScreen from './screens/List'
import LoginScreen from './screens/Login'

const navigationOptions = () => ({
  headerShown: false
})

const MainNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions
  },
  Book: {
    screen: BookScreen,
    navigationOptions
  },
  List: {
    screen: ListScreen,
    navigationOptions: () => ({
      gesturesEnabled: false,
      headerShown: false
    })
  }
})

const Routes = createAppContainer(MainNavigator)

export default Routes