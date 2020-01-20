import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
  createStackNavigator({
    Main:{
      screen: Main,
      navigationOptions:{
          headerTitleAlign: 'center',
          title: 'DevRadar',
      },
    },
    Profile:{
      screen: Profile,
      navigationOptions:{
        headerTitleAlign: 'center',
        title: 'Pefil no Github',
      },

    }
  }, {
    defaultNavigationOptions:{ //aplicada a todas a telas
      headerTintColor:'#FFF',
        headerStyle:{
            backgroundColor:'#7D40E7',
        },
    },
  })
 );

 export default Routes;