import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import {  H, W, StatusBarHeight, StatusBar, _grey, APP_ORANGE_COLOR, APP_WHITE_COLOR, APP_BACKGROUND_COLOR } from '../../constants/constants'
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
            <StatusBar
                animated={true}
                backgroundColor= {APP_BACKGROUND_COLOR}
            />
            <View style={styles.header}>
            <TouchableOpacity 
                onPress={() => this.props.navigation.goBack()} 
                style={styles.btn_back}>
                    <Image source={require('../../../assets/arrow-left.png')} style={styles.icon_back} />
                </TouchableOpacity>
                <Text style={styles.category}>{this.state.categoryName}</Text>
                <View style={{ flex: .25 }} />
            </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 5 }}>
                    { this.state.categoryData.map((item, index) => {
                        return (
                            <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.podcasts, item)})} 
                            key={index} 
                            style={{ width: (W * .5) - 15 , marginHorizontal: 5 ,marginVertical: 7 }}>
                                <Image source={{ uri: item.cover }} style={styles.podcast_cover}  />
                                { item.isFree === 0 && 
                                <View style={styles.podcast_price_card}>
                                    <Text style={styles.podcast_price}>RWF {item.price}</Text>
                                </View> }
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


const styles = {
    container:{
        flex: 1, 
        backgroundColor: '#fff', 
        // marginTop: StatusBarHeight,
        backgroundColor: APP_BACKGROUND_COLOR
    },
    header:{
        paddingHorizontal: 15, 
        height: H*.1, 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    btn_back:{
        flex: .25, 
        paddingVertical: 5, 
        paddingRight: 10, 
    },
    icon_back:{
        height: 28, 
        width: 28,
        // color: APP_WHITE_COLOR
        backgroundColor: APP_WHITE_COLOR
    },
    category:{
        fontSize: 18, 
        fontWeight: 'bold', 
        flex: 1, 
        textAlign: 'center', 
        textTransform: 'capitalize',
        color: APP_ORANGE_COLOR 
    },
    podcast_cover:{  
        height: (W * .4) - 15, 
        borderRadius: 5, 
        resizeMode: 'cover' 
    },
    podcast_price_card:{
        position: 'absolute', 
        backgroundColor: 'green', 
        paddingVertical: 3, 
        paddingHorizontal: 7, 
        top: 5, 
        borderTopRightRadius: 3, 
        borderBottomRightRadius: 3  
    },
    podcast_price:{
        color: 'white', 
        fontSize: 10
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
}

export default CategoryPage
