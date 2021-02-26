import React from 'react';
import {Alert, Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserFav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.authenticate(),
      favourite_locations: this.props.navigation.state.params
        .favourite_locations,
    };
    console.log(
      'favourite_locations: ' + JSON.stringify(this.state.favourite_locations),
    );
  }

  authenticate() {
    return {
      id: AsyncStorage.getItem('id'),
      token: AsyncStorage.getItem('token'),
    };
  }

  deleteFavouriteLocation = async (favourite_locations) => {
    try {
      console.log(
        'favourite location being deleted: ' +
          favourite_locations.location_id +
          ' ' +
          favourite_locations.location_name,
      );
      const token = (await (await this.state.auth).token).toString();
      let response = await fetch(
        `http://10.0.2.2:3333/api/1.0.0/location/${favourite_locations.location_id}/favourite`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        },
      )
        .then((response) => {
          if (response.ok) {
            Alert.alert('Deleted');
          }
        })
        .then(() => {
          this.props.navigation.navigate('Profile');
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View>
        {console.log(
          'ALL REVIEWS: ' + JSON.stringify(this.state.favourite_locations),
        )}
        <Text>My Favourite Locations</Text>
        {this.state.favourite_locations.map((favourite_locations, index) => (
          <View key={index}>
            {console.log('Review: ' + JSON.stringify(favourite_locations))}
            <Text key={index} style={{textAlign: 'center'}}>
              {favourite_locations.location_name}
              {'\n'}
              {favourite_locations.location_town}
              {'\n'}
            </Text>
            <Button
              title={'Unfavourite Location'}
              onPress={() => {
                this.deleteFavouriteLocation(favourite_locations);
              }}
            />
          </View>
        ))}
        <Button
          title={'Back'}
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}
        />
      </View>
    );
  }
}
export default UserFav;
