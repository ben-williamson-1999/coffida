import React from 'react';
import {Alert, Button, TextInput, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Stars from 'react-native-stars';

class UpdateReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //auth: this.authenticate(),
      review: this.props.navigation.state.params.review,
      newReview: {},
    };
    console.log('REVIEWS: ' + JSON.stringify(this.state.review));
  }

  handleNewDetails = (state, text) => {
    console.log(`${state} + ${text}`);
    this.setState({
      newReview: {
        ...this.state.newReview,
        [state]: text,
      },
    });
  };

  sendUpdate = async () => {
    console.log('GOING TO PATCH THIS: ' + JSON.stringify(this.state.newReview));
    console.log('location_id: ' + this.state.review.location.location_id);
    console.log('review_id: ' + this.state.review.review.review_id);
    console.log(
      `GOING TO SEND THIS URL: http://10.0.2.2:3333/api/1.0.0/location/${this.state.review.location.location_id}/review/${this.state.review.review.review_id}`,
    );
    try {
      let response = await fetch(
        `http://10.0.2.2:3333/api/1.0.0/location/${this.state.review.location.location_id}/review/${this.state.review.review.review_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': await AsyncStorage.getItem('token'),
          },
          body: JSON.stringify(this.state.newReview),
        },
      );
      if (await response.ok) {
        Alert.alert('Update Successful');
        return await response;
      } else {
        Alert.alert('Update Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <>
        <Text>Update</Text>
        {/* {console.log(JSON.stringify(this.state.review.review.review_body))} */}
        {/* <Text>{JSON.stringify(this.state.review.review.review_body)}</Text> */}
        <TextInput
          defaultValue={this.state.review.review.review_body}
          onChangeText={(text) => this.handleNewDetails('review_body', text)}
        />
        <Text>Overall Rating:</Text>
        <Stars
          half={true}
          default={this.state.review.review.overall_rating}
          update={(val) => this.handleNewDetails('overall_rating', val)}
        />
        <Text>Price Rating:</Text>
        <Stars
          half={true}
          default={this.state.review.review.price_rating}
          update={(val) => this.handleNewDetails('price_rating', val)}
        />
        <Text>Quality Rating:</Text>
        <Stars
          half={true}
          default={this.state.review.review.quality_rating}
          update={(val) => this.handleNewDetails('quality_rating', val)}
        />
        <Text>Clenliness Rating:</Text>
        <Stars
          half={true}
          default={this.state.review.review.clenliness_rating}
          update={(val) => this.handleNewDetails('clenliness_rating', val)}
        />
        <Button
          title={'Submit'}
          onPress={() => {
            console.log(
              'LOOK HERE UPDATED STATE: ' +
                JSON.stringify(this.state.newReview),
            );
            this.sendUpdate();
          }}
        />
        <Button
          title={'Back'}
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}
        />
      </>
    );
  }
}

export default UpdateReview;
