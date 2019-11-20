import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import BookScreen from './screens/Book'
import ListScreen from './screens/List'
import LoginScreen from './screens/Login'

const Routes = createAppContainer(
  createSwitchNavigator({
    LoginScreen,
    BookScreen,
    ListScreen
  })
)

export default Routes