import React from 'react';
import {Alert, Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.authenticate(),
      liked_reviews: this.props.navigation.state.params.liked_reviews,
    };
    console.log('LIKES: ' + JSON.stringify(this.state.liked_reviews));
  }

  authenticate() {
    return {
      id: AsyncStorage.getItem('id'),
      token: AsyncStorage.getItem('token'),
    };
  }

  deleteLikedReviews = async (liked_reviews) => {
    try {
      console.log(
        'liked review being deleted: ' +
          liked_reviews.review.review_id +
          ' ' +
          liked_reviews.review.review_body,
      );
      const token = (await (await this.state.auth).token).toString();
      let response = await fetch(
        `http://10.0.2.2:3333/api/1.0.0/location/${liked_reviews.location.location_id}/review/${liked_reviews.review.review_id}/like`,
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
        {console.log('all Likes: ' + JSON.stringify(this.state.liked_reviews))}
        <Text>My Likes</Text>
        {this.state.liked_reviews.map((liked_reviews, index) => (
          <View key={index}>
            {console.log('Likes: ' + JSON.stringify(liked_reviews.review))}
            <Text key={index} style={{textAlign: 'center'}}>
              {liked_reviews.location.location_name}
              {'\n'}
              {liked_reviews.review.review_body}
              {'\n'}
            </Text>
            <Button
              title={'Unlike Review'}
              onPress={() => {
                this.deleteLikedReviews(liked_reviews);
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
export default UserLikes;
