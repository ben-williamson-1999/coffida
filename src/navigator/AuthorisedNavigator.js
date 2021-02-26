import React from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon} from 'react-native-elements';

import Login from '../components/Login';
import NewUser from '../components/NewUser';

const TabContents = {
  NewUser: {
    screen: NewUser,
    navigationOptions: {
      tabBarIcon: () => (
        <View>
          <Icon name={'home'} />
        </View>
      ),
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarIcon: () => (
        <View>
          <Icon name={'login'} />
        </View>
      ),
    },
  },
};

const AuthNavigation = createMaterialBottomTabNavigator(TabContents, {
  initialRouteName: 'Login',
});

export default AuthNavigation;
