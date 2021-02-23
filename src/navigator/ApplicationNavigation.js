import React from 'react';
import { Alert, Button, TextInput, Text, View } from 'react-native';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';

import Home from '../components/Home'
import Profile from '../components/Profile'

const TabContents = 
{
  Home: {screen:Home,
    navigationOptions:{
      tabBarIcon:() => (
        <View>
          <Icon name={'home'}/>
        </View>
      )
    }
  },
  Profile: {screen:Profile,
    navigationOptions:{
      tabBarIcon:() => (
        <View>
          <Icon name={'person'}/>
        </View>
      )
    }
  }
}

const AppNavigation = createMaterialBottomTabNavigator(
  TabContents,{initialRouteName:'Home'}
)

export default AppNavigation;