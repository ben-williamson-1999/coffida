import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import UpdateDetails from '../components/UpdateDetails';
import UserReviews from '../components/UserReviews';
import UserLikes from '../components/UserLikes';
import UserFav from '../components/UserFav';
import UpdateReview from '../components/UpdateReview';

const TabContents = {
  UpdateDetails: {
    screen: UpdateDetails,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  UserReviews: {
    screen: UserReviews,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  UserLikes: {
    screen: UserLikes,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  UserFav: {
    screen: UserFav,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  UpdateReview: {
    screen: UpdateReview,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
};

const ProfileNavigation = createMaterialBottomTabNavigator(TabContents);

export default ProfileNavigation;
