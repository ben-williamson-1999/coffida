import React from 'react';
import { Alert, Button, TextInput, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import SearchResults from '../components/SearchResults';
import NewReview from '../components/NewReview';

const TabContents = 
{
  SearchResults:{screen:SearchResults,
    navigationOptions:{
      tabBarVisible: false
    }
  },
  NewReview:{screen:NewReview,
    navigationOptions:{
      tabBarVisible: false
    }
  }
}

const SearchNavigation = createMaterialBottomTabNavigator(
  TabContents
)

export default SearchNavigation;