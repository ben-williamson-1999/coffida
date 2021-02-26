import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native';

class ReviewLikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.isReviewLiked(),
    };
  }

  isReviewLiked = () => {
    console.log('starting filer: ' + JSON.stringify(this.props));
    if (!this.props.liked_reviews) {
      return false;
    }
    const likedReviews = this.props.liked_reviews.filter((review) => {
      console.log(
        'checking review id: ' + (review.review_id === this.props.review_id),
      );
      return review.review_id === this.props.review_id;
    });
    return likedReviews.length ? true : false;
  };

  handleLike = async () => {
    let response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${this.props.location_id}/review/${this.props.review_id}/like`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('token'),
        },
      },
    );
    if (response.status === 200) {
      this.setState({liked: true});
    }
  };

  handleUnlike = async () => {
    let response = await fetch(
      `http://10.0.2.2:3333/api/1.0.0/location/${this.props.location_id}/review/${this.props.review_id}/like`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': await AsyncStorage.getItem('token'),
        },
      },
    );
    if (response.status === 200) {
      this.setState({liked: false});
    }
  };

  render() {
    return this.state.liked ? (
      <Button title={'unlike'} onPress={() => this.handleUnlike()} />
    ) : (
      <Button title={'like'} onPress={() => this.handleLike()} />
    );
  }
}

export default ReviewLikeButton;
