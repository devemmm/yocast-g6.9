import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { H, W, _grey, APP_BACKGROUND_COLOR, APP_WHITE_COLOR, APP_ORANGE_COLOR } from '../../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverConfig from '../../constants/server.json';
import { splicePodcast } from '../../helps/helperFunctions';

export class CategoryPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            categoryData: [1,2,3],
            isFree: true,
            categoryName: "Loading..."
        }
    }

    componentDidMount() {
        const { item } = this.props.route.params;
        this.setState({ categoryName: item});
        this.FetchUser(item)
    }

    FetchUser = async(categoryName) => {
        try {
            await AsyncStorage.getItem('@USERDATA').then((userNewData) => {
                const user = userNewData ? JSON.parse(userNewData) : [];
                this.setState({ username: user.owner });
                this.fetchPodcasts(user.token.token, categoryName);
            });
        } catch (error) {
            console.log(error);
        }
    };

    fetchPodcasts = async (token, categoryName) => {
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
          console.log(response.status)
          if (response.status == 'sucessfull') {
              
            const all_podcasts = response.podcast;
            
            var Array = all_podcasts.filter(item => item.category.includes(categoryName) );
            
            this.setState({ 
                podcasts: response.podcast ,
                categoryData: Array
            });                

          } else {
            Alert.alert('Error!', 'Error!');
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{ paddingHorizontal: 15, height: H*.1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.goBack()} 
                        style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                        <Image source={require('../../../assets/arrow-left.png')} style={{ height: 28, width: 28, tintColor: APP_WHITE_COLOR }} />
                    </TouchableOpacity>
                    <Text style={styles.category_name}>{this.state.categoryName}</Text>
                <View style={{ flex: .25 }} />
                </View>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 5 }}>
                            { this.state.categoryData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.categoryData, item)})} 
                                    key={index} 
                                    style={{ width: (W * .5) - 15 , marginHorizontal: 5 ,marginVertical: 7 }}>
                                        <Image source={{ uri: item.cover }} style={{  height: (W * .4) - 15, borderRadius: 5, resizeMode: 'cover' }}  />
                                        
                                        <Text numberOfLines={3} style={styles.podcast_name}>{item.name}</Text>
                                        <Text style={styles.podcast_owner}>{item.ownerName}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: '#fff',
        backgroundColor: APP_BACKGROUND_COLOR
    },
    category_name:{
        flex: 1, 
        fontSize: 18, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        textTransform: 'capitalize',
        color: APP_ORANGE_COLOR
    },
    podcast_name:{
        paddingTop: 2,  
        fontWeight: 'bold', 
        fontSize: 13, 
        textTransform: 'capitalize',
        color: APP_WHITE_COLOR
    },
    podcast_owner:{
        color: 'grey', 
        fontSize: 11, 
        textTransform: 'capitalize',
        color: APP_WHITE_COLOR 
    }
})
export default CategoryPage