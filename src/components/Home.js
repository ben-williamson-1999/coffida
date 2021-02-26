import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Stars from 'react-native-stars';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  name: '',
  overall_rating: 0,
  price_rating: 0,
  quality_rating: 0,
  clenliness_rating: 0,
  search_in: '',
  limit: '',
  offset: '',
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      initialState,
      auth: {
        id: '',
        token: '',
      },
      data: null,
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({
        auth: {
          ...this.state.auth,
          id: await AsyncStorage.getItem('id'),
          token: await AsyncStorage.getItem('token'),
        },
      });
      console.log('Updating State: ' + JSON.stringify(this.state));
    } catch (error) {
      console.error(error);
    }
  };

  handleParams = (state, text) => {
    this.setState((previousState) => ({
      initialState: {
        ...previousState.initialState,
        [state]: text,
      },
    }));
    console.log(`${state} + ${text}`);
    console.log('Handing Params' + JSON.stringify(this.state));
  };

  resetState = () => {
    this.setState({initialState: {...initialState}});
    this.forceUpdate();
    console.log('resetting state: ' + JSON.stringify(this.state));
  };

  getParams = () => {
    console.log('STATE: ' + this.state.initialState.search_in);
    console.log('search_in STATE: ' + this.state.initialState.search_in);
    console.log('search_in INITIAL: ' + initialState.search_in);
    console.log(
      'comparison: ' +
        (Object.entries(this.state).toString() ===
          Object.entries(initialState).toString()),
    );
    var params = '';
    if (
      Object.entries(this.state).toString() ===
      Object.entries(initialState).toString()
    ) {
      return '';
    } else {
      console.log('got here');
      if (
        !this.state.initialState.name.toString() ===
        initialState.name.toString()
      ) {
        params = params + `q=${this.state.initialState.name}&`;
      }
      if (
        !this.state.initialState.overall_rating === initialState.overall_rating
      ) {
        params =
          params + `overall_rating=${this.state.initialState.overall_rating}&`;
      }
      if (!this.state.initialState.price_rating === initialState.price_rating) {
        params =
          params + `price_rating=${this.state.initialState.price_rating}&`;
      }
      if (
        !this.state.initialState.quality_rating === initialState.quality_rating
      ) {
        params =
          params + `quality_rating=${this.state.initialState.quality_rating}&`;
      }
      if (
        !this.state.initialState.clenliness_rating ===
        initialState.clenliness_rating
      ) {
        params =
          params +
          `clenliness_rating=${this.state.initialState.clenliness_rating}&`;
      }
      if (
        !this.state.initialState.search_in.toString() ===
        initialState.search_in.toString()
      ) {
        params = params + `search_in=${this.state.initialState.search_in}&`;
      }
    }
    console.log('params: ' + params);
    return params.toString();
  };

  searchCoffee = async () => {
    this.setState({isLoading: true});
    try {
      const token = this.state.auth.token;
      var params = this.getParams().toString();
      params = params.substring(0, params.length - 1);
      params = params.replace(/(["'])/g, '\\$1');
      console.log('http://10.0.2.2:3333/api/1.0.0/find?' + params);
      await fetch('http://10.0.2.2:3333/api/1.0.0/find?' + params, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log('LOOK HERE: ' + JSON.stringify(response));
          this.setState({
            isLoading: false,
            data: response,
          });
          this.setState({isLoading: false});
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View>
        <Text>Search By:</Text>
        <View>
          <Text>Name</Text>
          <TextInput
            placeholder={'Name of Coffee Shop'}
            onChangeText={(text) => this.handleParams('name', text)}
          />
        </View>
        <View>
          <Text>Overall Rating</Text>
          <Stars
            half={true}
            default={this.state.initialState.overall_rating}
            update={(val) => this.handleParams('overall_rating', val)}
          />
        </View>
        <View>
          <Text>Search In</Text>
          <Picker
            selectedValue={this.state.initialState.search_in}
            onValueChange={(value) => {
              this.handleParams('search_in', value);
            }}>
            <Picker.Item label={'All'} value={''} key={0} />
            <Picker.Item label={'Favourite'} value={'favourite'} key={1} />
            <Picker.Item label={'Reviewed'} value={'reviewed'} key={2} />
          </Picker>
        </View>
        <View>
          <Text>Limit</Text>
          <Picker
            selectedValue={this.state.initialState.limit}
            onValueChange={(value) => {
              this.handleParams('limit', value);
            }}>
            <Picker.Item label={'5'} value={5} key={0} />
            <Picker.Item label={'10'} value={10} key={1} />
            <Picker.Item label={'20'} value={20} key={2} />
            <Picker.Item label={'All'} value={100} key={3} />
          </Picker>
        </View>
        {/* <View style={{flexDirection: 'row', flex:1}}>
                    <Text>Offset</Text>
                </View> */}
        <Button
          title={'Search'}
          onPress={() => {
            this.searchCoffee();
          }}
        />
        <Button title={'Clear'} onPress={this.resetState} />
        {/* <Button
                    title={'Dev - Print State'}
                    onPress={() => {
                        console.log('state is currently: ' + (JSON.stringify(this.state.initialState)))
                        console.log(JSON.stringify(this.state.auth))
                        console.log(JSON.stringify(this.state.data))
                    }}
                /> */}
        <View>
          <FlatList
            data={this.state.data} //location
            renderItem={({item}) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('SearchResults', {
                      location: item,
                    });
                  }}>
                  <View>
                    <Text>{item.location_name}</Text>
                    <Text>{item.location_town}</Text>
                    <Stars half={true} display={item.avg_overall_rating} />
                  </View>
                </TouchableOpacity>
                <Button
                  title={'Leave a reivew'}
                  onPress={() => {
                    //console.error(JSON.stringify(item.location_id))
                    this.props.navigation.navigate('NewReview', {
                      location_id: item.location_id,
                    });
                  }}
                />
              </>
            )}
            keyExtractor={(index) => {
              return index.location_id.toString();
            }}
          />
        </View>
      </View>
    );
  }
}

export default Home;
