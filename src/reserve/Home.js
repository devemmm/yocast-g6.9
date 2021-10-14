import React, { Component, useContext, useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native'
import { bright, H, W, StatusBarHeight, _grey } from './constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverConfig from './server.json';
import { Context as DataContext } from '../context/AppContext';



const Home = ({navigation})=>{

    const { state, fetchPodcasts} = useContext(DataContext);

    useEffect(()=>{
        fetchPodcasts(state.token);
        filterPodcast(state.podcasts)
    }, [state.podcasts.length !== 0])

    const [podcast, setPodcast ] = useState(state.podcasts)
    const [Business, setBusiness ] = useState([])
    const [Education, setEducation ] = useState([])
    const [Tech, setTech] = useState([])
    const [Politics, setPolitics ] = useState([])
    const [Music, setMusic ] = useState([])
    const [Popular, setPopular ] = useState([])
    const [TopExpensive, setTopExpensive ] = useState([])
    const [LatestRelease, setLatestRelease ] = useState([])
    const [Trending, setTrending ] = useState([])
    const [username, setUsername ] = useState('') //remeber to fectch username or email from user context
    const [Hour, setHour ] = useState(1) // remeber to set Hour
    const [today, setToday ] = useState([]) // check well today 
    const [month, setMonth] = useState('')
    const [__monthly, set__monthly] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [showCategoryPage, setShowCategoryPage] = useState(false)

    // componentDidMount(){
    //     const Hour = new Date().getHours();
    //     this.setState({ Hour: Hour });


    //     var currentTime = new Date();
    //     var month = currentTime.getMonth() + 1;
    //     var __month = month < 10 ? ("0" + month) : month;
    //     var today = currentTime.getFullYear() + "-" + __month + "-" + currentTime.getDate() ;
    //     var __monthly = currentTime.getFullYear() + "-" + __month + "-" ;
    //     this.setState({ today: today, month: __monthly });
    //     this.FetchUser();
    // }


    // ------------------------------DONE ------------------------
    // FetchUser = async() => {
    //     try {
    //         await AsyncStorage.getItem('@USERDATA').then((userNewData) => {
    //             const user = userNewData ? JSON.parse(userNewData) : [];
    //             this.setState({ username: user.owner });
    //             this.fetchPodcasts(user.token)
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // fetchPodcasts = async (token) => {
    //     try {
    //       const value = await fetch(`${serverConfig.restServer}/podcasts`, {
    //         method: 'GET',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json',
    //           'Authorization': 'Bearer ' + token
    //         },
    //       });
    //       const response = await value.json();
    //       console.log(response.status)
    //       if (response.status == 'sucessfull') {
              
    //         const all_podcasts = response.podcast;
            
    //         var Business = all_podcasts.filter(item => item.category.includes("Business") );
    //         var Education = all_podcasts.filter(item => item.category.includes("Education") );
    //         var Politics = all_podcasts.filter(item => item.category.includes("Politics") );
    //         var Music = all_podcasts.filter(item => item.category.includes("Music") );
    //         var Tech = all_podcasts.filter(item => item.category.includes("Tech") );
    //         var TopExpensive = all_podcasts.filter(item => item.price > 0);
    //         var today = all_podcasts.filter(item => item.updatedAt.includes(this.state.today));
    //         var __monthly = all_podcasts.filter(item => item.updatedAt.includes(this.state.month));

// ------------------------------DONE ------------------------
    const filterPodcast = (podcast)=>{
        setBusiness(podcast.filter(item => item.category.includes("Business")));
        setEducation(podcast.filter(item => item.category.includes("Education")))
        setPolitics(podcast.filter(item => item.category.includes("Politics")));
        setMusic(podcast.filter(item => item.category.includes("Music")))
        setTech(podcast.filter(item => item.category.includes("Tech")));
        setTopExpensive(podcast.filter(item => item.price > 0))
        setToday(podcast.filter(item => item.updatedAt.includes(today)));
        set__monthly(podcast.filter(item => item.updatedAt.includes(month)));
        setPopular(podcast.sort((a, b) => b.likes - a.likes))
        setTopExpensive(podcast.sort((a, b) => b.price - a.price))
        setTrending(__monthly)
    }
    //         TopExpensive.sort((a, b) => {
    //             return b.price - a.price;
    //         });


    //         // most liked
    //         var Popular = all_podcasts.sort((a, b) => {
    //             return b.likes - a.likes;
    //         });

            
    //         this.setState({ 
    //             podcasts: response.podcast ,
    //             Business: Business,
    //             Education: Education,
    //             Politics: Politics,
    //             Music: Music,
    //             Tech: Tech,
    //             TopExpensive: TopExpensive,
    //             Popular: Popular,
    //             LatestRelease: today,
    //             Trending: __monthly
    //         });
                

    //       } else {
    //         Alert.alert('Error!', 'Error!');
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    const showTheModal = (catName) => {
            setCategoryName(catName);
            setShowCategoryPage(true)
      }
    
    return (
        <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ flex: 1, marginTop: StatusBarHeight, backgroundColor: '#fff' }}>
            <View style={{ paddingHorizontal: 15, height: H*.12,justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                    { Hour >= 0 && Hour < 12 ?
                    "Good morning," :
                    Hour >= 12 && Hour < 18 ?
                    "Good afternoon," :
                    Hour >= 18 && state.Hour < 24 ?
                    "Good evening," : null
                } <Text style={{ textTransform: 'capitalize' }}> {username} </Text>
                </Text>
            </View>

            {/* LatestRelease */}
            {LatestRelease.length === 0 ? null :
            <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Latest Release</Text>

                </View>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate("SoundPlay", { item: LatestRelease[0] })
                        }} 
                        style={{ width: W - 30 , marginRight: 10 }}>
                            <Image source={{ uri: LatestRelease[0].cover }} style={{ width: W - 30, height: 140, borderRadius: 5, resizeMode: 'stretch' }}  />
                            { LatestRelease[0].isFree === 0 && 
                            <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>RWF {LatestRelease[0].price}</Text>
                            </View> }
                            <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize' }}>{LatestRelease[0].name}</Text>
                            <Text style={{ color: 'grey', fontSize: 12, textTransform: 'capitalize' }}>{LatestRelease[0].ownerName}</Text>
                    </TouchableOpacity>
            </View> }

{/* ------------------------------------------------------------------------------------------------- */}
            {Popular.length === 0 ? null :
            <View style={{ marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Most Popular</Text>
                {Popular.length > 7 &&
                <TouchableOpacity 
                    onPress = {()=> console.log(Popular.length)}
                    // onPress={() => navigation.navigate("CategoryPage")}
                    style={{ padding: 5 }}>
                    <Text style={{ color: 'grey', fontSize: 13 }}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 15 }}
                    horizontal>

                    {Popular.splice(0,7).map((item, index) => {
                        return (
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("++++++++++++++++++++++++++++++++++++=")
                                        console.log(Popular.length)
                                        console.log("++++++++++++++++++++++++++++++++++++=")

                                        // navigation.navigate("SoundPlay", {item: index })
                                    }} 
                                    key={index} 
                                    style={{ width: W * .35, marginRight: 10 }}>
                                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                                        { item.isFree === 0 && 
                                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                                        </View> }
                                        <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize' }}>{item.name}</Text>
                                        <Text style={{ color: 'grey', fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                                </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }

            <View>
                <Text>New Item</Text>
                
                <FlatList
                    horizontal
                    data = {Business}
                    keyExtractor = {business => business.updatedAt}
                    renderItem = {({item})=>{
                        return(
                            <Text>{item.price}</Text>
                        )
                    }}
                />

                <Text>Ending</Text>
            </View>
{/* --------------------------------------------------------------------------------------------------------------------------------------*/}

                {Business.length === 0 ? null :
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Top Business</Text>
                <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => navigation.navigate("CategoryPage", { item: 'Business' })} 
                    >
                    <Text style={{ color: 'grey', fontSize: 13 }}>View More</Text>
                </TouchableOpacity>

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {Business.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("SoundPlay", { item: item })} 
                    key={index} style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize' }}>{item.name}</Text>
                        <Text style={{ color: 'grey', fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }


            {Trending.length === 0 ? null :
            <View style={{ marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Trending</Text>

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {Trending.map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress={() => navigation.navigate("SoundPlay", { item: item })} 
                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize' }}>{item.name}</Text>
                        <Text style={{ color: 'grey', fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
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
                    <Text numberOfLines={1} style={{ color: 'grey' }}>06:23</Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: 'grey' }}>Episode #21</Text>
                </View>
            </TouchableOpacity>
            </View>

            {TopExpensive.length === 0 ? null :
            <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Certified Platinum</Text>

                </View>
                    <TouchableOpacity 
                    onPress={() => {
                        console.log(TopExpensive[0])
                        // navigation.navigate("SoundPlay", { item: TopExpensive[0] })
                    }} 
                    style={{ width: W - 30 , marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{ uri: TopExpensive[0].cover }} style={{ width: W * .25, height: W *.25, borderRadius: 5, resizeMode: 'stretch' }}  />
                        { TopExpensive[0].isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {TopExpensive[0].price}</Text>
                        </View> }
                        <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize' }}>{TopExpensive[0].name}</Text>
                        <Text style={{ color: 'grey', fontSize: 12, textTransform: 'capitalize' }}>{TopExpensive[0].ownerName}</Text>
                        </View>
                    </TouchableOpacity>
            </View> }

            {Education.length === 0 ? null :
            <View style={{ marginVertical: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Top Education</Text>

                {Education.length > 7 && 
                <TouchableOpacity 
                onPress={() => navigation.navigate("CategoryPage", { item: 'Education' })} 
                style={{ padding: 5 }}>
                    <Text style={{ color: 'grey', fontSize: 13 }}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {Education.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress={() => navigation.navigate("SoundPlay", { item: item })} 
                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize' }}>{item.name}</Text>
                        <Text style={{ color: 'grey', fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }

            {Politics.length === 0 ? null :
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Top Politics</Text>

                {Politics.length > 7 &&
                <TouchableOpacity 
                onPress={() => navigation.navigate("CategoryPage", { item: 'Politics' })} 
                style={{ padding: 5 }}>
                    <Text style={{ color: 'grey', fontSize: 13 }}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {Politics.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress={() => navigation.navigate("SoundPlay", { item: item })} 
                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize' }}>{item.name}</Text>
                        <Text style={{ color: 'grey', fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }


            {Music.length === 0 ? null :
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={{ fontSize: 18,  fontWeight: 'bold', flex: 1 }}>Top Music</Text>
                {Music.length > 7 &&
                <TouchableOpacity 
                onPress={() => navigation.navigate("CategoryPage", { item: 'Music' })} 
                style={{ padding: 5 }}>
                    <Text style={{ color: 'grey', fontSize: 13 }}>View More</Text>
                </TouchableOpacity> }

                </View>
                <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                    {Music.splice(0,7).map((item, index) => {
                        return (
                    <TouchableOpacity key={index} 
                    onPress={() => navigation.navigate("SoundPlay", { item: item })} 
                    style={{ width: W * .35, marginRight: 10 }}>
                        <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }}  />
                        { item.isFree === 0 && 
                        <View style={{ position: 'absolute', backgroundColor: 'green', paddingVertical: 3, paddingHorizontal: 7, top: 5, borderTopRightRadius: 3, borderBottomRightRadius: 3  }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>RWF {item.price}</Text>
                        </View> }
                        <Text numberOfLines={3} style={{ paddingTop: 2,  fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize' }}>{item.name}</Text>
                        <Text style={{ color: 'grey', fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                    </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View> }

            <View style={{ height: 100 }} />

        </ScrollView>
    )

    // return(
    //     <View>
    //         <Text style={{marginTop: 500}}>Under Construction</Text>
    //     </View>
    // )
}


const styles = StyleSheet.create({
    profile_set: {
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    haeder: {
        fontSize: 16,
        // fontWeight: 'bold'
    },
    det: {
        fontSize: 13,
        color: _grey
    }
});

export default Home;
