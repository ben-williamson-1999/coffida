import React from 'react';
import { Alert, Button, TextInput, Text, ScrollView, View } from 'react-native';

class UserFav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            favorite_list: null,
            location_id: null
        }
    }

    getData = () => {
        
    }

    render() {
        return (
            <View>
                <Text>All Reviews</Text>
            </View>
        )
    }
}
export default UserFav;