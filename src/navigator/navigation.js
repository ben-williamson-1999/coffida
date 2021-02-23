import React from 'react';
import { Text, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigation from './AuthorisedNavigator';
import AppNavigation from './ApplicationNavigation';
import ProfileNavigation from './ProfileNavigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth:AuthNavigation,
    App:AppNavigation,
    Update:ProfileNavigation
  },
  {
    initialRouteName: 'Auth'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer;