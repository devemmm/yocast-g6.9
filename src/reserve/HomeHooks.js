import React, { useReducer, useState, Component, useEffect, useContext } from 'react'
import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-btr'
import { H, W, StatusBarHeight, _grey, APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR } from '../../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context as DataContext } from '../../context/AppContext';
import serverConfig from '../../constants/server.json';
import { splicePodcast } from '../../helps/helperFunctions';
import yocastApi from '../../api/yocastApi';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';

const categoryReducer = (state, action)=>{

    switch(action.type){

        case 'Business':
            return {...state, Business: action.payload}
        case 'Education':
            return {...state, Education: action.payload}
        case 'Politics':
            return {...state, Politics: action.payload}
        case 'Music':
            return {...state, Music: action.payload}
        case 'Tech':
            return {...state, Tech: action.payload}
        case 'Popular':
            return {...state, Popular: action.payload}
        case 'TopExpensive':
            return {...state, TopExpensive: action.payload}
        case 'LatestRelease':
            return {...state, LatestRelease: action.payload}
        case 'Trending':
            return {...state, Trending: action.payload}
        default:
            return state;
    }
}

const todayDateReducer = (state, action)=>{

    switch(action.type){
        case 'today': 
            return {...state, today: action.payload}
        case 'month': 
            return {...state, month: action.payload}
        default:
            return state;
    }
}

const fectchPodcast = async({token, todayDate, setPodcast, dispatchCategory, setshowActivityIndicator})=>{
    try {
        setshowActivityIndicator(true);
        const response = await yocastApi.get('/podcasts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const {status, statusCode, podcast } = response.data;

        if(status === "sucessfull"){
            setPodcast(podcast);
            dispatchCategory({type: 'Business', payload: podcast.filter(podcast => podcast.category.includes("Business"))})
            dispatchCategory({type: 'Education', payload: podcast.filter(podcast => podcast.category.includes("Education"))})
            dispatchCategory({type: 'Politics', payload: podcast.filter(podcast => podcast.category.includes("Politics") )})
            dispatchCategory({type: 'Music', payload: podcast.filter(podcast => podcast.category.includes("Music") )})
            dispatchCategory({type: 'Tech', payload: podcast.filter(podcast => podcast.category.includes("Tech") )})
            dispatchCategory({type: 'Popular', payload: podcast.sort((a, b) => b.likes - a.likes)});
            dispatchCategory({type: 'TopExpensive', payload: (podcast.filter(podcast => podcast.price > 0).sort((a, b) => b.price - a.price))});
            dispatchCategory({type: 'LatestRelease', payload: podcast.filter(podcast => podcast.updatedAt.includes(todayDate.today))});
            dispatchCategory({type: 'Trending', payload: podcast.filter(podcast => podcast.updatedAt.includes(todayDate.month))});
        }

        setshowActivityIndicator(false);

    } catch (error) {
        setshowActivityIndicator(false)
        console.log(error.response.data.error.message)
    }
}
const Home = ()=>{

    const {state } = useContext(DataContext);
    const { token, user } = state;

    const [categoryStore, dispatchCategory ] = useReducer(categoryReducer, {Business: [],Education: [], Education: [], Politics: [], Music: [], Tech: [], TopExpensive: [], Popular: [], Trending: [], LatestRelease: []})
    const [ todayDate, dispatchDate ] = useReducer(todayDateReducer, {hour: new Date().getHours(), today: '', month: ''});
    
    const [podcasts, setPodcast ] = useState([]);
    const [username, setUsername] = useState(user.names);
    const [showActivityIndicator, setshowActivityIndicator] = useState(false);

    

    useEffect(()=>{
        var currentTime = new Date();
        var month = currentTime.getMonth() + 1;
        var __month = month < 10 ? ("0" + month) : month;
        var today = currentTime.getFullYear() + "-" + __month + "-" + currentTime.getDate() ;
        var __monthly = currentTime.getFullYear() + "-" + __month + "-" ;

        dispatchDate({type: 'today', payload: today});
        dispatchDate({type: 'month', payload: __monthly});

        fectchPodcast({token, todayDate, setPodcast, dispatchCategory, setshowActivityIndicator});
    }, [])


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor= {APP_BACKGROUND_COLOR}
            />
            
            <View style= {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style = {{color: '#fff'}}>{podcasts.length}</Text>
                <Text style={{color: '#fff'}}>{categoryStore.TopExpensive.length}</Text>
            </View>

            <BottomSheet visible = {showActivityIndicator}>
                <AppActivityIndictor/>
            </BottomSheet>
        </ScrollView>
    );
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