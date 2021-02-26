import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native';

class FavouriteLocationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlefavourite = async () => {
    console.log('PROPS: ' + JSON.stringify(this.props.location_id));
    let response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${this.props.location_id}/favourite`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('token'),
        },
      },
    );
    if (response.status === 200) {
      this.setState({favourited: true});
    } else {
      console.log(response.status);
    }
    console.log('fav');
  };

  handleUnfavourite = async () => {
    let response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${this.props.location_id}/favourite/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('token'),
        },
      },
    );
    if (response.status === 200) {
      this.setState({favourited: false});
    }
    console.log('unfav');
  };

  render() {
    //return this.state.favourited ? (
    return (
      <Button title={'favourite'} onPress={() => this.handlefavourite()} />
    );
    // <Button title={'unfavourite'} onPress={() => this.handleUnfavourite()} />
    //) : (
    //);
  }
}

export default FavouriteLocationButton;
