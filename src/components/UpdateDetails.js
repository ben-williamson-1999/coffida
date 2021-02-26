import React from 'react';
import {Button, TextInput, Text, ScrollView, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UpdateDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      token: '',
      userData: {},
      newUserData: {},
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({
        id: await AsyncStorage.getItem('id'),
        token: await AsyncStorage.getItem('token'),
      });
    } catch (error) {
      console.error(error);
    }
    console.log('good id: ' + this.state.id + ' token: ' + this.state.token);
    this.getData();
  };

  getData = async () => {
    try {
      const token = this.state.token;
      let response = await fetch(
        `http://10.0.2.2:3333/api/1.0.0/user/${this.state.id}`,
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
        .then((responseData) => {
          this.setState({userData: responseData});
          console.log(
            'RETURNED PROFILE IS: ' + JSON.stringify(this.state.userData),
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  patchUserDetails = async (key, value) => {
    try {
      const token = this.state.token;
      let response = await fetch(
        `http://10.0.2.2:3333/api/1.0.0/user/${this.state.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
          body: JSON.stringify(this.state.newUserData),
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          console.log('ResponseData: ' + responseData);
          this.setState({userData: responseData});
          this.getData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleNewDetails = (key, value) => {
    console.log(`${key} + ${value}`);
    console.log(JSON.stringify(value));
    this.setState({
      newUserData: {
        ...this.state.newUserData,
        [key]: value,
      },
    });
  };

  render() {
    return (
      <ScrollView>
        <Text>Updating Details</Text>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text>First Name</Text>
          <TextInput
            placeholder={this.state.userData.first_name}
            onChangeText={(text) => this.handleNewDetails('first_name', text)}
          />
          <Button
            title={'Submit'}
            onPress={(text) => {
              this.patchUserDetails('first_name', text);
              this.props.navigation.navigate('UpdateDetails');
            }}
          />
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text>Last Name</Text>
          <TextInput
            placeholder={this.state.userData.last_name}
            onChangeText={(text) => this.handleNewDetails('last_name', text)}
          />
          <Button
            title={'Submit'}
            onPress={(text) => {
              this.patchUserDetails('last_name', text);
              this.props.navigation.navigate('UpdateDetails');
            }}
          />
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text>Email</Text>
          <TextInput
            placeholder={this.state.userData.email}
            onChangeText={(text) => this.handleNewDetails('email', text)}
          />
          <Button
            title={'Submit'}
            onPress={(text) => {
              this.patchUserDetails('email', text);
              this.props.navigation.navigate('UpdateDetails');
            }}
          />
        </View>
        <Button
          title={'Back'}
          onPress={() => {
            this.props.navigation.navigate('Settings');
          }}
        />
      </ScrollView>
    );
  }
}

export default UpdateDetails;
