import React from 'react';
import {Alert, Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.authenticate(),
      reviews: this.props.navigation.state.params.reviews,
    };
    console.log('REVIEWS: ' + JSON.stringify(this.state.reviews));
  }

  authenticate() {
    return {
      id: AsyncStorage.getItem('id'),
      token: AsyncStorage.getItem('token'),
    };
  }

  updateReview = async (review) => {
    try {
      console.log(
        'Review being Updated: ' +
          review.location.location_name +
          ' ' +
          review.review.review_body,
      );
    } catch (error) {
      console.error(error);
    }
  };

  deleteReview = async (review) => {
    try {
      console.log(
        'Review being deleted: ' +
          review.location.location_name +
          ' ' +
          review.review.review_body,
      );
      const token = (await (await this.state.auth).token).toString();
      let response = await fetch(
        `http://10.0.2.2:3333/api/1.0.0/location/${review.location.location_id}/review/${review.review.review_id}`,
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
        {console.log('ALL REVIEWS: ' + JSON.stringify(this.state.reviews))}
        <Text>My Reviews</Text>
        {this.state.reviews.map((review, index) => (
          <View key={index}>
            {console.log('Review: ' + JSON.stringify(review.review))}
            <Text key={index} style={{textAlign: 'center'}}>
              {review.location.location_name}
              {'\n'}
              {review.review.review_body}
              {'\n'}
            </Text>
            <Button
              title={'Update this Review'}
              onPress={() => {
                this.updateReview(review);

                this.props.navigation.navigate('UpdateReview', {
                  review: review,
                });
              }}
            />
            <Button
              title={'Remove Review'}
              onPress={() => {
                this.deleteReview(review);
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
export default UserReviews;
