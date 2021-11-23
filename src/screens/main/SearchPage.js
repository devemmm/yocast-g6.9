import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bright, H, W, _grey, categories, APP_BACKGROUND_COLOR, APP_WHITE_COLOR, APP_ORANGE_COLOR } from '../../constants/constants';
import yocastApi from '../../api/yocastApi';
import serverConfig from '../../constants/server.json';
import { splicePodcast } from '../../helps/helperFunctions';

export class SearchPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: '',
      categories: categories,
      podcasts: [],
      showResult: false
    }

    this.CATEGORY = [];
    this.PODCASTS = []
  }

  // componentDidMount() {
  //   this.FetchUser();
  //   this.checkSubscription();
  // }

  componentDidMount() {
    this.FetchUser();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkSubscription();
    });
  }


  componentWillUnmount() {
    this._unsubscribe();
  }

  FetchUser = async () => {
    try {
      await AsyncStorage.getItem('@USERDATA').then((userNewData) => {
        const response = userNewData ? JSON.parse(userNewData) : [];
        // this.setState({USERDATA:response.username});
        // console.log(response);
        this.fetchPodcasts(response.token.token);
      });
    } catch (error) {
      console.log(error);
    }
  };


  fetchPodcasts = async (token) => {
    try {
      const value = await fetch(`${serverConfig.restServer}/podcasts`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
      const response = await value.json();
      // console.log(response);
      if (response.status == 'sucessfull') {
        this.setState({ podcasts: response.podcast });
        this.PODCASTS = response.podcast;
      } else {
        Alert.alert('Error!', 'Error!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  searchPodcasts = (text) => {
    this.setState({ showResult: true })
    const temp = this.PODCASTS.filter((x) => {
      const item = `${x.name}`;
      const itemUppercase = item.toLowerCase();
      const textData = text.toLowerCase();
      return itemUppercase.indexOf(textData) > -1;
    });
    this.setState({ podcasts: temp });
  };

  checkSubscription = async () => {
    try {
      var subscriptionData = await AsyncStorage.getItem("@YOCAST_SUB");
      var userData = await AsyncStorage.getItem("@USERDATA");
      var user = JSON.parse(userData);
      var subscription = JSON.parse(subscriptionData);

      if (!subscription) {
        try {
          const response = await yocastApi.get('/user/subscription?type=last', {
            headers: {
              Authorization: `Bearer ${user.token.token}`
            }
          });
          await AsyncStorage.setItem('@YOCAST_SUB', JSON.stringify(response.data.subscription));
          subscription = response.data.subscription;
        } catch (error) {
          console.log("something went wrong 1");
        }
      }

      if (subscription.length === 0 || new Date(subscription[0].desactivationDate) <= new Date()) {
        return this.props.navigation.navigate("SubscriptionWorn")
      }
    } catch (error) {
      console.log("Something went wrong")
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 15, height: H * .1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.search_text}>Search</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, backgroundColor: '#ebebeb', height: 40, borderRadius: 5, paddingHorizontal: 10 }}>
          <Image source={require('../../../assets/Search.png')} style={{ width: 20, height: 20, marginRight: 15 }} />
          <TextInput
            onChangeText={result => this.searchPodcasts(result)}
            placeholder="Search Podcast"
            style={{ flex: 1, fontSize: 14 }} />
        </View>

        { this.state.showResult ? null :
          <View
            style={{ marginHorizontal: W * .02, paddingTop: 5, flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.categories.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("CategoryPage", { item: `${item.name}` })}
                  key={index}
                  style={{ backgroundColor: 'black', marginTop: 7, borderRadius: 5, marginHorizontal: W * .01 }} >
                  <Image source={{ uri: item.cover }} style={{ width: W * .30, height: H * .15, borderRadius: 10, opacity: .6 }} />
                  <Text style={{ bottom: 15, left: 7, right: 7, position: 'absolute', fontWeight: 'bold', color: bright, textTransform: 'capitalize', fontSize: 16 }}>{item.name}</Text>
                </TouchableOpacity>
              )
            })}
          </View>}

        { this.state.showResult ?
          this.state.podcasts.length === 0 ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: APP_WHITE_COLOR }}>No Results Found</Text>
            </View> :
            <ScrollView
              contentContainerStyle={{ paddingTop: 10 }}>
              {this.state.podcasts.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.props.navigation.navigate("SoundPlay", { podcasts: splicePodcast(this.state.podcasts, item) })}
                    style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', paddingVertical: 4 }}>
                    <Image source={{ uri: item.cover }} style={{ width: W * .14, height: W * .14, borderRadius: 5, resizeMode: 'cover' }} />
                    <View style={{ flex: 1, marginLeft: 10 }} >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text numberOfLines={2} style={{ flex: 1, marginRight: 5, fontSize: 13, fontWeight: 'bold', textTransform: 'capitalize', color: APP_WHITE_COLOR }}>{item.name}</Text>
                        {/* <Text numberOfLines={1} style={{ color: 'grey', fontSize: 10 }}>06:23</Text> */}
                      </View>
                      <Text numberOfLines={1} style={{ color: APP_WHITE_COLOR, fontSize: 10, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView> : null}
      </View>
    )
  }
}

export default SearchPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: StatusBarHeight,
    backgroundColor: APP_BACKGROUND_COLOR
  },
  search_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: APP_WHITE_COLOR
  },
  profile_set: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  haeder: {
    fontSize: 16,
  },
  det: {
    fontSize: 13,
    color: APP_ORANGE_COLOR
  }
})
