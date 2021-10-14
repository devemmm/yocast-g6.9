import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, H, StatusBarHeight, W } from '../../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { splicePodcast } from '../../helps/helperFunctions';

export class Favorite extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isPodcast: true,
            isEpisode: false,
            Liked: [],
            isFavorite: true,
            RemoveLoading: false
            // rmvModal: false
        }

        this.FAVORITES = []

    }

    componentDidMount(){
        this.fetchLiked();

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchLiked();
          });
    }

    componentWillUnmount() {
        this._unsubscribe();
      }

    fetchLiked = async () => {
        try {
            await AsyncStorage.getItem('@LIKED').then((liked) => {
                const StorageLiked = liked ? JSON.parse(liked) : [];
                this.setState({ Liked: StorageLiked });
                this.FAVORITES = StorageLiked;
            })
        } catch (error) {
            console.log(error);
        }
    }

    removeFromFavorite = async (id) => {
        try {
            var removedPodcast = this.state.Liked.filter(item => item.id != id);
            await AsyncStorage.setItem('@LIKED', JSON.stringify(removedPodcast));
            this.setState({ Liked: removedPodcast, RemoveLoading: true });
            setTimeout(() => { this.setState({ RemoveLoading: false }) }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    searchInFavorite = (text) => {
        const temp = this.FAVORITES.filter((x) => {
        const item = `${x.name}`;
        const itemUppercase = item.toLowerCase();
        const textData = text.toLowerCase();
        return itemUppercase.indexOf(textData) > -1;
      });
      this.setState({ Liked: temp }); 
    };
    
    render() {
        return (
        <View showsVerticalScrollIndicator={false} style={styles.container}>
             
            <View style={{ paddingHorizontal: 15, height: H*.1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.header}>Favorite</Text>
                <TouchableOpacity style={{ padding: 5, display: 'none' }}>
                    <Image source={require('../../../assets/Search.png')} style={{ width: 28, height: 28 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', display: 'none' }}>
                <TouchableOpacity 
                onPress={() => this.setState({ isPodcast: !this.state.isPodcast })}
                style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: this.state.isPodcast ? "black": APP_WHITE_COLOR }}>Podcasts</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => this.setState({ isPodcast: !this.state.isPodcast })}
                style={{ paddingVertical: 10,  paddingHorizontal: 15, }}>
                    <Text style={{ fontSize: 16, color: this.state.isPodcast ? "grey": "black", fontWeight: 'bold' }}>Episodes</Text>
                </TouchableOpacity>
            </View>

           

            { this.state.isPodcast ?

            <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, backgroundColor: '#ebebeb', height: 37, marginBottom: 10, marginTop: 5, borderRadius: 5, paddingHorizontal: 10 }}>
                <Image source={require('../../../assets/Search.png')} style={{ width: 20, height: 20, marginRight: 15 }} />
                <TextInput
                onChangeText={result => this.searchInFavorite(result)}
                placeholder="Search Favorite"
                style={{ flex: 1, fontSize: 14 }} />
            </View>

            { this.state.Liked.length === 0 ? 
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: APP_WHITE_COLOR }}>You have no favorites yet!</Text>
            </View> :
            <ScrollView>
                {this.state.Liked.map((item, index) => {
                    return (
                <TouchableOpacity
                key={index}
                onPress={() => this.props.navigation.navigate("SoundPlay", { podcasts: splicePodcast(this.state.Liked, item)})} 
                style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', paddingVertical: 4 }}>
                    <Image source={{ uri: item.cover }} style={{ width: W * .14, height: W * .14, borderRadius: 5, resizeMode: 'cover' }} />
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text numberOfLines={2} style={styles.podcast_name}>{item.name}</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.podcast_owner}>{item.ownerName}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={() => this.removeFromFavorite(item.id)}>
                    { this.state.isFavorite ? 
                <Image
                source={require("../../../assets/HeartBold.png")}
                style={{ width: 28, height: 28, tintColor: '#fc5603' }}
              /> :
                <Image
                  source={require("../../../assets/Heart.png")}
                  style={{ width: 28, height: 28, tintColor: 'black' }}
                /> }
                    </TouchableOpacity>
                </TouchableOpacity>
                    )
                })}
            </ScrollView> }

            </View> :
            <View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, backgroundColor: '#ebebeb', height: 37, marginBottom: 10, marginTop: 5, borderRadius: 5, paddingHorizontal: 10 }}>
                <Image source={require('../../../assets/Search.png')} style={{ width: 20, height: 20, marginRight: 15 }} />
                <TextInput
                onChangeText={i => this.searchPodcasts(i)}
                placeholder="Search Episode"
                style={{ flex: 1, fontSize: 14 }} />
            </View>

            <TouchableOpacity 
                style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', paddingVertical: 4 }}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw5fHxtdXNpY3xlbnwwfHx8fDE2MjgxMDc0OTU&ixlib=rb-1.2.1&q=80&w=1080' }} style={{ width: W * .14, height: W * .14, borderRadius: 5, resizeMode: 'cover' }} />
                <View style={{ flex: 1, marginLeft: 10 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text numberOfLines={2} style={{ flex: 1, marginRight: 5, fontSize: 13, fontWeight: 'bold', textTransform: 'capitalize' }}>name</Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: 'grey', fontSize: 10 }}>owner</Text>
                </View>
            </TouchableOpacity>

            </View> }

                {this.state.RemoveLoading &&
            <View style={{ position: 'absolute', backgroundColor: '#fc5603', left: 10, right: 10, bottom: 10, elevation: 1, paddingHorizontal: 10, height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', alignItems: 'center' }}>Removed from your favorites</Text>
            </View> }
        </View>
        )
    }
}

export default Favorite

const styles = StyleSheet.create({
    container:{
        fontSize: 18,  
        fontWeight: 'bold', 
        flex: 1,
        backgroundColor: APP_BACKGROUND_COLOR
    },
    header:{
        fontSize: 20, 
        fontWeight: 'bold',
        color: APP_ORANGE_COLOR
    },
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
        color: APP_WHITE_COLOR
    },
    podcast_name:{
        color: APP_WHITE_COLOR, 
        fontSize: 10, 
        textTransform: 'capitalize' 
    },
    podcast_owner:{
        flex: 1, 
        marginRight: 5, 
        fontSize: 13, 
        fontWeight: 'bold', 
        textTransform: 'capitalize',
        color: APP_WHITE_COLOR
    }
})
