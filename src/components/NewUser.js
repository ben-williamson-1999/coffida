import React from 'react';
import {Alert, Button, TextInput, Text, ScrollView} from 'react-native';

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  newUserEnterText = (state, text) => {
    this.setState({[state]: text});
    console.log(`${state} + ${text}`);
  };

  handleCreateNewUser = () => {
    console.log('First Name: ' + this.state.firstName);
    console.log('Last Name: ' + this.state.lastName);
    console.log('Email: ' + this.state.email);
    console.log('Password: ' + this.state.password);
    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        first_name: `${this.state.firstName}`,
        last_name: `${this.state.lastName}`,
        email: `${this.state.email}`,
        password: `${this.state.password}`,
      }),
    }).then((response) => {
      Alert.alert('New User Created!');
      this.handleLoginRouteButton;
    });
  };

  handleLoginRouteButton = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <ScrollView>
        <Text>SignUp</Text>
        <TextInput
          title={'First Name'}
          placeholder={'First Name'}
          onChangeText={(text) => this.newUserEnterText('firstName', text)}
        />
        <TextInput
          title={'Last Name'}
          placeholder={'Last Name'}
          onChangeText={(text) => this.newUserEnterText('lastName', text)}
        />
        <TextInput
          title={'Email'}
          placeholder={'Email'}
          onChangeText={(text) => this.newUserEnterText('email', text)}
        />
        <TextInput
          title={'Password'}
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={(text) => this.newUserEnterText('password', text)}
        />
        <Button onPress={this.handleCreateNewUser} title={'Create User'} />
        <Button
          onPress={this.handleLoginRouteButton}
          title={'Already A User? Login Here'}
        />
      </ScrollView>
    );
  }
}

export default NewUser;
