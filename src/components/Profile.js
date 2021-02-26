import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {Button, Text, View} from 'react-native';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.authenticate(),
      user: null,
    };
  }

  authenticate() {
    console.log('first');
    return {
      id: AsyncStorage.getItem('id'),
      token: AsyncStorage.getItem('token'),
    };
  }

  componentDidMount = async () => {
    try {
      console.log('second');
      console.log(
        'id: ' +
          (await this.state.auth.id).toString() +
          ' token: ' +
          (await this.state.auth.token).toString(),
      );
      const token = (await (await this.state.auth).token).toString();
      await fetch(
        `http://10.0.2.2:3333/api/1.0.0/user/${(
          await this.state.auth.id
        ).toString()}/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(JSON.stringify(response));
          this.setState({
            user: response,
          });
          console.log(
            JSON.stringify('This is a User' + JSON.stringify(this.state.user)),
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Button
          title={'My Liked Reviews'}
          onPress={() => {
            console.log('My Likes');
            this.props.navigation.navigate('UserLikes', {
              liked_reviews: this.state.user.liked_reviews,
            });
          }}
        />
        <Button
          title={'My Favourited Locations'}
          onPress={() => {
            console.log('My Favourite Locations');
            this.props.navigation.navigate('UserFav', {
              favourite_locations: this.state.user.favourite_locations,
            });
          }}
        />
        <Button
          title={'My Reviews'}
          onPress={() => {
            console.log('My Reviews Reviews');
            console.log(
              'user Reviews: ' + JSON.stringify(this.state.user.reviews),
            );
            this.props.navigation.navigate('UserReviews', {
              reviews: this.state.user.reviews,
            });
          }}
        />
      </View>
    );
  }
}

export default Profile;
