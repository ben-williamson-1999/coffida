import React from 'react';
import { Text, ScrollView } from 'react-native';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <ScrollView>
                <Text>Home!</Text>
            </ScrollView>
        )
    }
}

export default Home;