import React, { Component } from 'react'
import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { H, W, StatusBarHeight, _grey, APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR } from '../../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverConfig from '../../constants/server.json';
import { splicePodcast } from '../../helps/helperFunctions';

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Hour: 0,
            username: '',
            podcasts: [],
            Business: [],
            Education: [],
            Politics: [],
            Music: [],
            Tech: [],
            TopExpensive: [],
            Popular: [],
            Trending: [],
            LatestRelease: [],
            today: '',
            month: '',
        }
    }


    componentDidMount(){
        const Hour = new Date().getHours();
        this.setState({ Hour: Hour });


        var currentTime = new Date();
        var month = currentTime.getMonth() + 1;
        var __month = month < 10 ? ("0" + month) : month;
        var today = currentTime.getFullYear() + "-" + __month + "-" + currentTime.getDate() ;
        var __monthly = currentTime.getFullYear() + "-" + __month + "-" ;
        this.setState({ today: today, month: __monthly });
        this.FetchUser();
    }


    FetchUser = async() => {
        
        try {
            await AsyncStorage.getItem('@USERDATA').then((userNewData) => {
                const user = userNewData ? JSON.parse(userNewData) : [];
                this.setState({ username: user.owner });
                this.fetchPodcasts(user.token.token)
            });

        } catch (error) {
            console.log("this is error 2")

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
          console.log(response.status)
          if (response.status == 'sucessfull') {
              
            const all_podcasts = response.podcast;
            
            var Business = all_podcasts.filter(item => item.category.includes("Business") );
            var Education = all_podcasts.filter(item => item.category.includes("Education") );
            var Politics = all_podcasts.filter(item => item.category.includes("Politics") );
            var Music = all_podcasts.filter(item => item.category.includes("Music") );
            var Tech = all_podcasts.filter(item => item.category.includes("Tech") );
            var TopExpensive = all_podcasts.filter(item => item.price > 0);
            var today = all_podcasts.filter(item => item.updatedAt.includes(this.state.today));
            var __monthly = all_podcasts.filter(item => item.updatedAt.includes(this.state.month));


            TopExpensive.sort((a, b) => {
                return b.price - a.price;
            });


            // most liked
            var Popular = all_podcasts.sort((a, b) => {
                return b.likes - a.likes;
            });

            
            this.setState({ 
                podcasts: response.podcast ,
                Business: Business,
                Education: Education,
                Politics: Politics,
                Music: Music,
                Tech: Tech,
                TopExpensive: TopExpensive,
                Popular: Popular,
                LatestRelease: today,
                Trending: __monthly
            });
                

          } else {
            Alert.alert('Error!', 'Error!');
          }
        } catch (error) {
            console.log("this is error 1")
          console.log(error);
        }
      };

      showTheModal = (catName) => {
          this.setState({ categoryName: catName,  showCategoryPage: true })
      }
    
    
    render() {
        
        return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor= {APP_BACKGROUND_COLOR}
            />
            <View style={styles.greeting_section}>
                <Text style={styles.greeting}>
                    { this.state.Hour >= 0 && this.state.Hour < 12 ?
                    "Good morning," :
                    this.state.Hour >= 12 && this.state.Hour < 18 ?
                    "Good afternoon," :
                    this.state.Hour >= 18 && this.state.Hour < 24 ?
                    "Good evening," : null
                } <Text style={{ textTransform: 'capitalize' }}> {this.state.username} </Text>
                </Text>
                <TouchableOpacity 
                // onPress={() => this.setState({ showRemainingDays: true })}
                style={{ padding: 5, display: 'none' }}>
                <AntDesign name="clockcircleo" size={24} color={APP_ORANGE_COLOR} />
                </TouchableOpacity>
            </View>

            
            <View style={styles.subscription_reminder}>
                <Text style={styles.subscription_reminder_text}>Remaining 10 days before subscription ends</Text>
            </View>

            {/* LatestRelease */}
            {this.state.LatestRelease.length === 0 ? null :
            <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={styles.latest_release_txt}>Latest Release</Text>

                </View>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("SoundPlay", { podcasts: this.state.LatestRelease[0] })} 
                    style={{ width: W - 30 , marginRight: 10 }}>
                        <Image source={{ uri: this.state.LatestRelease[0].cover }} style={{ width: W - 30, height: 140, borderRadius: 5, resizeMode: 'stretch' }}  />
                        { this.state.LatestRelease[0].isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {this.state.LatestRelease[0].price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={styles.podcast_name}>{this.state.LatestRelease[0].name}</Text>
                        <Text style={styles.podcast_owner}>{this.state.LatestRelease[0].ownerName}</Text>
                    </TouchableOpacity>
            </View> }


            {this.state.Popular.length === 0 ? null :
            <View style={{ marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={styles.category}>Most Popular</Text>
                {this.state.Popular.length > 7 &&
                
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("CategoryPage", { item: 'Business' })}
                    style={{ padding: 5 }}>
                        <Text style={styles.btn_view_more}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {this.state.Popular.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity
                        onPress = {()=> this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.Popular, item)})}
                        key={index} 
                        style={{ width: W * .35, marginRight: 10 }}>
                            <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                            { item.isFree === 0 && 
                            <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                            </View> }
                            <Text numberOfLines={3} style={styles.podcast_name}>{item.name}</Text>
                            <Text style={styles.podcast_owner}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }

                {this.state.Business.length === 0 ? null :
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={styles.category}>Top Business</Text>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CategoryPage", { item: 'Business' })} 
                style={{ padding: 5 }}>
                    <Text style={styles.btn_view_more}>View More</Text>
                </TouchableOpacity>

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {this.state.Business.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity 
                    onPress = {()=> this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.Business, item), index: 0})}

                    key={index} style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={styles.podcast_name}>{item.name}</Text>
                        <Text style={styles.podcast_owner}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }


            {this.state.Trending.length === 0 ? null :
            <View style={{ marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={styles.category}>Trending</Text>

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {this.state.Trending.map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress = {()=> this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.Trending, item), index: 0})}

                    onPress={() => this.props.navigation.navigate("SoundPlay", { item: item })} 
                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={styles.podcast_name}>{item.name}</Text>
                        <Text style={styles.podcast_owner}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }

            <View style={{ display: 'none', marginHorizontal: 15, marginVertical: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Recently Played</Text>
            <TouchableOpacity style={{ flexDirection: 'row',  alignItems: 'center', paddingVertical: 5 }}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw5fHxtdXNpY3xlbnwwfHx8fDE2MjgxMDc0OTU&ixlib=rb-1.2.1&q=80&w=1080' }} style={{ width: W * .15, height: W * .15, borderRadius: 5, resizeMode: 'cover' }} />
                <View style={{ flex: 1, marginLeft: 15 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>Ese birashoboka?</Text>
                    <Text numberOfLines={1} style={{ color: APP_WHITE_COLOR }}>06:23</Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: APP_WHITE_COLOR }}>Episode #21</Text>
                </View>
            </TouchableOpacity>
            </View>

            {this.state.TopExpensive.length === 0 ? null :
            <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={styles.category}>Certified Platinum</Text>

                </View>
                    <TouchableOpacity 
                    onPress = {()=> this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.TopExpensive, this.state.TopExpensive[0]), index: 0})}

                    // onPress={() => this.props.navigation.navigate("SoundPlay", { item: this.state.TopExpensive[0] })} 
                    style={{ width: W - 30 , marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: this.state.TopExpensive[0].cover }} style={{ width: W * .25, height: W *.25, borderRadius: 5, resizeMode: 'stretch' }}  />
                        { this.state.TopExpensive[0].isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {this.state.TopExpensive[0].price}</Text>
                        </View> }
                        <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text numberOfLines={3} style={styles.podcast_name}>{this.state.TopExpensive[0].name}</Text>
                        <Text style={styles.podcast_owner}>{this.state.TopExpensive[0].ownerName}</Text>
                        </View>
                    </TouchableOpacity>
            </View> }

            {this.state.Education.length === 0 ? null :
            <View style={{ marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={styles.category}>Top Education</Text>

                {this.state.Education.length > 7 && 
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("CategoryPage", { item: 'Education' })} 
                style={{ padding: 5 }}>
                    <Text style={styles.btn_view_more}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {this.state.Education.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress = {()=> this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.Education, item), index: 0})}

                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={styles.podcast_name}>{item.name}</Text>
                        <Text style={styles.podcast_owner}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }

            {this.state.Politics.length === 0 ? null :
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={styles.category}>Top Politics</Text>

                {this.state.Politics.length > 7 &&
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("CategoryPage", { item: 'Politics' })} 
                style={{ padding: 5 }}>
                    <Text style={styles.btn_view_more}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {this.state.Politics.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress = {()=> this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.Politics, item), index: 0})}

                    // onPress={() => this.props.navigation.navigate("SoundPlay", { item: item })} 
                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style = {styles.podcast_name}>{item.name}</Text>
                        <Text style={styles.podcast_owner}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }


            {this.state.Music.length === 0 ? null :
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={styles.category}>Top Music</Text>
                {this.state.Music.length > 7 &&
                <TouchableOpacity 

                onPress={() => this.props.navigation.navigate("CategoryPage", { item: 'Music' })} 
                style={{ padding: 5 }}>
                    <Text style={styles.btn_view_more}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {this.state.Music.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress = {()=> this.props.navigation.navigate("SoundPlay", {podcasts: splicePodcast(this.state.Music, item), index: 0})}

                    // onPress={() => this.props.navigation.navigate("SoundPlay", { item: item })} 
                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={styles.podcast_name}>{item.name}</Text>
                        <Text style={styles.podcast_owner}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }

            <View style={{ height: 100 }} />

        </ScrollView>
        )
    }
}

export default Home

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        // marginTop: StatusBarHeight, 
        backgroundColor: APP_BACKGROUND_COLOR 
    },
    greeting_section: { 
        paddingHorizontal: 15, 
        height: H*.12,
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    greeting:{
        fontSize: 20, 
        fontWeight: 'bold',
        color: APP_ORANGE_COLOR
    },
    subscription_reminder:{
        backgroundColor: APP_ORANGE_COLOR, 
        marginHorizontal : 15, 
        borderRadius: 5, 
        paddingHorizontal: 10, 
        paddingVertical: 15 
    },
    subscription_reminder_text:{
        color: APP_WHITE_COLOR, 
    },
    latest_release_txt:{
        fontSize: 18,  
        fontWeight: 'bold', 
        flex: 1, 
        color: APP_ORANGE_COLOR 
    },
    category:{
        fontSize: 18,  
        fontWeight: 'bold', 
        flex: 1,
        color: APP_ORANGE_COLOR
    },
    profile_set: {
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    btn_view_more:{
        color: APP_WHITE_COLOR, 
        fontSize: 13 
    },
    podcast_name:{
        paddingTop: 2,  
        fontWeight: 'bold', 
        fontSize: 14, 
        textTransform: 'capitalize',
        color: APP_WHITE_COLOR
    },
    podcast_owner:{
        color: APP_WHITE_COLOR, 
        fontSize: 12, 
        textTransform: 'capitalize'
    },
    haeder: {
        fontSize: 16,
        // fontWeight: 'bold'
    },
    det: {
        fontSize: 13,
        color: APP_WHITE_COLOR
    }
})