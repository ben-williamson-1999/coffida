import React from 'react';
import {Alert, Button, TextInput, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Stars from 'react-native-stars';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        id: '',
        token: '',
      },
      review_body: '',
      overall_rating: null,
      price_rating: null,
      quality_rating: null,
      clenliness_rating: null,
      location_id: this.props.navigation.state.params.location_id,
    };
  }

  componentDidMount = async () => {
    console.log('Look Here: ' + this.props.navigation.state.params.location_id);
    try {
      this.setState({
        auth: {
          ...this.state.auth,
          id: await AsyncStorage.getItem('id'),
          token: await AsyncStorage.getItem('token'),
        },
      });
      console.log('Updating State: ' + JSON.stringify(this.state));
    } catch (error) {
      console.error(error);
    }
  };

  submitReview = async () => {
    const token = this.state.auth.token;
    console.log('Submitting Data using Token: ' + token);
    await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${this.state.location_id}/review`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify({
          review_body: this.state.review_body,
          overall_rating: this.state.overall_rating,
          price_rating: this.state.price_rating,
          quality_rating: this.state.quality_rating,
          clenliness_rating: this.state.clenliness_rating,
        }),
      },
    )
      .then((response) => {
        if (response.ok) {
          Alert.alert('Submitted');
        }
      })
      .then(() => {
        this.props.navigation.navigate('Home');
      });
  };

  handleNewText = (state, text) => {
    this.setState({[state]: text});
    console.log(`${state} + ${text}`);
  };

  render() {
    return (
      <>
        <View>
          <Text>New Review:</Text>
          <TextInput
            onChangeText={(text) => {
              this.handleNewText('review_body', text);
            }}
          />
          <Text>Overall Rating:</Text>
          <Stars
            half={true}
            default={0}
            update={(val) => this.handleNewText('overall_rating', val)}
          />
          <Text>Price Rating:</Text>
          <Stars
            half={true}
            default={0}
            update={(val) => this.handleNewText('price_rating', val)}
          />
          <Text>Quality Rating:</Text>
          <Stars
            half={true}
            default={0}
            update={(val) => this.handleNewText('quality_rating', val)}
          />
          <Text>Clenliness Rating:</Text>
          <Stars
            half={true}
            default={0}
            update={(val) => this.handleNewText('clenliness_rating', val)}
          />
          <Button
            title={'Submit'}
            onPress={() => {
              this.submitReview();
            }}
          />
        </View>
        <Button
          title={'Back'}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </>
    );
  }
}
export default NewReview;
