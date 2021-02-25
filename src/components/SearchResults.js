import React from 'react';
import { Alert, Button, TextInput, Text, ScrollView, View } from 'react-native';
import Stars from 'react-native-stars';

/*
    
*/

class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            item:this.props.navigation.state.params.location,
        } 
    }

    render() {
        return (
            <ScrollView>
                {console.log('item: '+JSON.stringify(this.state.item))}
                <Text style={{textAlign:'center'}}>
                    {/* Location Id:{this.state.item.location_id} */}
                    {this.state.item.location_name + '\n'}
                    {this.state.item.location_town + '\n'}
                </Text>
                <Stars
                    half={true}
                    display={this.state.item.avg_overall_rating}
                />
                <Stars
                    half={true}
                    display={this.state.item.avg_price_rating}
                />
                <Stars
                    half={true}
                    display={this.state.item.avg_quality_rating}
                />
                <Stars
                    half={true}
                    display={this.state.item.avg_cleanliness_rating}
                />
                <Text>Reviews:{'\n'}</Text>
                {this.state.item.location_reviews.map( (review, index) =>
                    <View key={index}>
                        {/* <Text key={index}>Review:{review.review_id}</Text> */}
                        <Text key={index}>
                            {'\t\t'}{'NAME'}: {'USER_ID'}{review.review_user_id}{'\n'}
                            {'\t\t'}{review.review_body}
                        </Text>
                        <Button title={'Like'}/>
                        <Button title={'Fave'}/>
                        <Button
                            title={'Leave a reivew'}
                            onPress={() => {
                                this.props.navigation.navigate("NewReview") //pass props
                            }}
                        />
                    </View>)}
                <Button
                    title={'Back'}
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </ScrollView>
        )
    }
}

export default SearchResults;