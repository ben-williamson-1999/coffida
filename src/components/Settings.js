import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Text, ScrollView, Alert} from 'react-native';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
      id: '',
      token: '',
      newValue: '',
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({
        id: await AsyncStorage.getItem('id'),
        token: await AsyncStorage.getItem('token'),
      });
    } catch (error) {
      console.log(error);
    }
    console.log('id: ' + this.state.id + ' token: ' + this.state.token);
  };

  handleLogoutButton = async () => {
    console.log('Logout Called!');
    try {
      const token = this.state.token;
      console.log('token: ' + token);
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      }).then(() => {
        Alert.alert('Successfully Logged Out!');
        this.props.navigation.navigate('Login');
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView>
        <Text>Settings</Text>
        <Button title={'Logout'} onPress={this.handleLogoutButton} />
        <Button
          title={'Update Details'}
          onPress={() => this.props.navigation.navigate('UpdateDetails')}
        />
      </ScrollView>
    );
  }
}

export default Settings;
