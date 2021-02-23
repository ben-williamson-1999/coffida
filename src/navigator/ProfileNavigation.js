import React from 'react';
import { Alert, Button, TextInput, Text, View } from 'react-native';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import UpdateDetails from '../components/UpdateDetails'

const TabContents = 
{
    UpdateDetails:{screen:UpdateDetails,
        navigationOptions:{
            tabBarVisible: false
        }
    }
}

const ProfileNavigation = createMaterialBottomTabNavigator(
  TabContents
)

export default ProfileNavigation;