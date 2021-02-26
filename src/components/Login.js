import React from 'react';
import {Button, TextInput, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@email.com',
      password: 'password',
      id: '',
      token: '',
    };
  }

  loginEnterText = (state, text) => {
    this.setState({[state]: text});
    console.log(`${state} + ${text}`);
  };

  handleLogin = async () => {
    console.log(
      `Login Button Pressed. ${this.state.email}, ${this.state.password}`,
    );
    console.log('method Started');
    console.log('email state: ' + this.state.email);
    console.log('password state: ' + this.state.password);
    try {
      await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          console.log(responseData);
          this.loginEnterText('id', responseData.id);
          this.loginEnterText('token', responseData.token);
          return responseData;
        })
        .then(async () => {
          try {
            await AsyncStorage.setItem('id', this.state.id.toString());
            await AsyncStorage.setItem('token', this.state.token.toString());
          } catch (error) {
            console.log(error);
          }
        });

      console.log(await AsyncStorage.getItem('id'));
      console.log(await AsyncStorage.getItem('token'));

      this.props.navigation.navigate('App');
    } catch (error) {
      console.error(error);
    }
  };

  handleCreateNewUser = () => {
    console.log('Create New User');
    this.props.navigation.navigate('NewUser');
  };

  render() {
    return (
      <ScrollView>
        <Text title="CoffiDa">CoffiDa</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(text) => this.loginEnterText('email', text)}
          placeholder="Email"
        />
        <TextInput
          value={this.state.password}
          onChangeText={(text) => this.loginEnterText('password', text)}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Button onPress={this.handleLogin} title={'Login'} />
        <Button onPress={this.handleCreateNewUser} title={'Create New User'} />
      </ScrollView>
    );
  }
}

export default Login;
