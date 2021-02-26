import React from 'react';
import {Button, Text, ScrollView, View} from 'react-native';
import Stars from 'react-native-stars';
import AsyncStorage from '@react-native-community/async-storage';
import ReviewLikeButton from './ReviewLikeButton';
import FavouriteLocationButton from './FavouriteLocationButton';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.location,
      auth: null,
      userData: null,
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({
        auth: {
          id: await AsyncStorage.getItem('id'),
          token: await AsyncStorage.getItem('token'),
        },
        userData: await this.getUser(),
      });
    } catch (error) {
      console.error(error);
    }
    console.log(
      'id: ' + this.state.auth.id + ' token: ' + this.state.auth.token,
    );
  };

  handleLike = () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      let response = await fetch(
        `http://10.0.2.2:3333/api/1.0.0/user/${await AsyncStorage.getItem(
          'id',
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        },
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView>
        {console.log('item: ' + JSON.stringify(this.state.item))}
        <Text style={{textAlign: 'center'}}>
          {/* Location Id:{this.state.item.location_id} */}
          {this.state.item.location_name + '\n'}
          {this.state.item.location_town + '\n'}
        </Text>
        <Stars half={true} display={this.state.item.avg_overall_rating} />
        <Stars half={true} display={this.state.item.avg_price_rating} />
        <Stars half={true} display={this.state.item.avg_quality_rating} />
        <Stars half={true} display={this.state.item.avg_clenliness_rating} />
        <Text>Reviews:{'\n'}</Text>
        {/* {console.log('LOOK HERE: '+await this.getReviews())} */}
        {/* {await this.getReviews()} */}
        {this.state.item.location_reviews.map((review, index) => (
          <View key={index}>
            {/* <Text key={index}>Review:{review.review_id}</Text> */}
            <Text key={index}>
              {'\t\t'}
              {'NAME'}: {review.review_user_id}
              {'\n'}
              {'\t\t'}
              {review.review_body}
            </Text>
            {console.log('SEARCHRESULT: ' + JSON.stringify(this.state))}
            <ReviewLikeButton
              liked_reviews={this.state.userData?.liked_reviews}
              location_id={this.state.item?.location_id}
              review_id={review.review_id}
            />
          </View>
        ))}
        {console.log(
          'USERDATA: ' +
            JSON.stringify(this.state.userData?.favourite_locations),
        )}
        <FavouriteLocationButton
          favourited_locations={this.state.userData?.favourite_locations}
          location_id={this.state.item?.location_id}
        />
        <Button
          title={'Leave a reivew'}
          onPress={() => {
            this.props.navigation.navigate('NewReview', {
              location_id: this.state.item.location_id,
            }); //pass props
          }}
        />
        <Button
          title={'Back'}
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </ScrollView>
    );
  }
}

export default SearchResults;
