import React from 'react';
import { Alert, Button, TextInput, Text, ScrollView, View } from 'react-native';

class NewReview extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <>
                <View>
                    <Text>New Review</Text>
                </View>
                <Button
                    title={'Back'}
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </>
        )
    }
}
export default NewReview;