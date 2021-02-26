import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthNavigation from './AuthorisedNavigator';
import AppNavigation from './ApplicationNavigation';
import ProfileNavigation from './ProfileNavigation';
import SearchNavigation from './SearchNavigator';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: AppNavigation,
    Update: ProfileNavigation,
    Search: SearchNavigation,
  },
  {
    initialRouteName: 'Auth',
  },
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
