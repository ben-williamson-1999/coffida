import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Button, Text, ScrollView, Alert, View } from 'react-native';

/*
    Going to include:
    - Show Likes
    - Show My Reviews
    - Show My Favourite Locations
*/

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View>
                <Text>Profile</Text>
                <Button
                    title={'My Liked Reviews'}
                    onPress={() => {
                        console.log()
                    }}
                />
                <Button
                    title={'My Favourited Locations'}
                    onPress={() => {
                        console.log('My Favourite Locations')
                    }}
                />
                <Button
                    title={'My Reviews'}
                    onPress={() => {
                        console.log('My Reviews Reviews')
                    }}
                />
            </View>
        )
    }
}

export default Profile;