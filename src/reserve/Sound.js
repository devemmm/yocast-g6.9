import React, { Component, useState, useEffect} from "react";
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { bright, H, StatusBarHeight, W, _grey } from "../screens/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BottomSheet } from "react-native-btr";
import Slider from "@react-native-community/slider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverConfig from "../screens/server.json";
import moment from "moment";
import { podcasts, W as WIDTH } from '../constants/constants'

// SOUND
import { Audio } from "expo-av";
import { useReducer } from "react/cjs/react.development";

let index = 0;
let playerEvent;
const converter = 60000;

const newArray = [
  {
    id: 1,
    audio:
      "https://yocast-api.nextreflexe.com/videos/podcasts/2021-09-12T17:33:54.809ZWizKid%20-%20Essence%20(Official%20Video)%20ft.%20Tems.MP3",
    image:
      "https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    image:
      "https://images.unsplash.com/photo-1631795559143-f3358a656cec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    image:
      "https://images.unsplash.com/photo-1631539514000-484f0ba77c05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: 4,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
    image:
      "https://images.unsplash.com/photo-1631785641419-eef018e28ef9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    image:
      "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: 6,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
    image:
      "https://images.unsplash.com/photo-1631781333592-06504a86166d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=312&q=80",
  },
  {
    id: 7,
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    image:
      "https://images.unsplash.com/photo-1631624210938-539575f92e3c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
];

const reducer = (state, action)=>{

  switch(action.type){

    case 'set_active_audio':
      return {...state, activeAudio: action.payload}

    default:
      return state;
  }
};

/** ----------------------------------------------------- */

const SoundPlay = ({navigation, route})=>{

  const [item, setItem] = useState(route.params.podcasts[0])

  const renderPodcast = ({index, item})=>{
    // console.log(item)
      return (
        <View style = {{
          width: WIDTH,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <View style={styles.artworkWrapper}>
              <Image
                source={{
                  uri: item.cover,
                }}
                style={styles.podcast_cover}
              />
            </View>
        </View>
        
      )
  }
  useEffect(()=>{
    // console.log(item)
    // console.log(navigation.getState().routes[1].params.item)
    // console.log(navigation.getParent())
    // console.log(podcast)
  }, [])
  

  const [state, dispatch] = useReducer(reducer, {
    value: 0, 
    isPlay: 
    false, 
    soundObj: null,

    // favorite podcasts
    isFavorite: false,
    Liked: [],

    // sound states
    currentTime: 0,
    isLoadNext: false,
    playbackObj: null,
    audioList: newArray,
    activeAudio: {},
    activeImage: newArray[index],
  })

    const { value, isPlay, soundObj, isLoadNext, activeImage, currentTime } = state;

    const currentTime1 = currentTime
      ? moment(currentTime).format("mm:ss")
      : "00:00";
    const endTime = soundObj?.durationMillis
      ? soundObj?.durationMillis / converter
      : "0:00";

    return (
      <View style={styles.container}>
        <BottomSheet visible={true}>
          <View style={styles.mainContainer} >

            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()} 
                
                style={{ paddingVertical: 5, paddingRight: 5 }}>
                  <Image
                    source={require("../../assets/arrow-down.png")}
                    style={{ width: 30, height: 30 }}
                  />
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ paddingVertical: 5, paddingLeft: 5 }}>
                <Image
                  source={require("../../assets/user-2.png")}
                  style={{ width: 28, height: 28 }}
                />
              </TouchableOpacity> */}
            </View>

            <FlatList
              renderItem = {renderPodcast}
              data = {podcasts}
              keyExtractor = {podcast => podcast.createdAt}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator = { false }
              scrollEventThrottle = {16}
            />

            <View style={ styles.podcast_details}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={2} style={styles.podcast_name}>
                  {"podcast name let me try to write a long charcher name podcast name let me try to write a long charcher name "}
                  {/* {state.activeAudio.name} */}
                </Text>
                <Text style={styles.podcast_owner}>
                  {/* {state.activeAudio.ownerName} */}
                  {"Emmanuel NTI."}
                  </Text>
              </View>

{/* --------------------------- add to favolite-------------------- */}
              <TouchableOpacity
                onPress={
                  state.isFavorite?
                  () => removeFromFavorite(state.activeAudio.id) :
                  () => addToFavorite(state.activeAudio)
                } style={{ paddingVertical: 5 }}>
                  { state.isFavorite ? 
                  <Image
                  source={require("../../assets/HeartBold.png")}
                  style={{ width: 30, height: 30, tintColor: '#fc5603' }}
                /> :
                  <Image
                    source={require("../../assets/Heart.png")}
                    style={{ width: 30, height: 30, tintColor: 'black' }}
                  /> }
              </TouchableOpacity>
{/* --------------------------- end add to favolite-------------------- */}

            </View>

            {/* controls */}
            <View style={ styles.main_controls}>
              <View style={{ paddingHorizontal: 10 }}>
                <Slider
                  //   maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
                  //   onSlidingStart={onSlidingStart}
                  //   onSlidingComplete={onSeek}
                  minimumValue={0}
                  maximumValue={1}
                  value={state.value}
                  style={{ height: 25 }}
                  minimumTrackTintColor="#2ECC71"
                  maximumTrackTintColor="#ebebeb"
                  thumbStyle={{
                    backgroundColor: "#fc5603",
                    height: 12,
                    width: 12,
                  }}
                  trackStyle={{
                    backgroundColor: "black",
                  }}
                />

                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    {currentTime1}
                    {/* {elapsed[0] + ":" + elapsed[1]} */}
                  </Text>
                  <View style={{ flex: 1 }} />
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    {/* {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]} */}
                    {endTime.toString().substring(0, 4)}
                  </Text>
                </View>
              </View>

              <View style={styles.button_Control}>

                <TouchableOpacity style={styles.btn_shuffle}>
                  <MaterialCommunityIcons name="shuffle" style={styles.icon_shuffle}/>
                </TouchableOpacity>


                <TouchableOpacity disabled={isLoadNext} style = {styles.btn_skip_previous}
                  // onPress={() => onHandleAudioChange(1)}
                >
                  <MaterialCommunityIcons name="skip-previous" style={styles.icon_skip_previous}/>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={isLoadNext}
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fc5603",
                  }}
                  // onPress={() => onHandleAudio()}
                >
                  {isLoadNext ? (
                    <ActivityIndicator color="#fff" size={25} />
                  ) : (
                    <MaterialCommunityIcons
                      name={!isPlay ? "play" : "pause"}
                      size={40}
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={isLoadNext}
                  // onPress={() => onHandleAudioChange(2)}
                  style={styles.btn_skip_next}
                >
                  <MaterialCommunityIcons name="skip-next" style = { styles.icon_skip_next}/>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn_repeat}
                >
                  <MaterialCommunityIcons name="repeat" style = {styles.icon_repeat}/>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
}

const styles = StyleSheet.create({
  container:{

  },
  mainContainer:{
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBarHeight : null,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  header:{
    height: H * 0.1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  artworkWrapper:{
    alignItems: "center", 
    marginVertical: 10
  },
  podcast_cover:{
    width: H * 0.4,
    height: H * 0.4,
    borderRadius: 5,
    resizeMode: "cover",

    shadowColor: '#ccc',
    shadowOffset:{
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    // elevation: 5
  },
  podcast_details:{
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: 'green'
  },
  podcast_name:{
    fontSize: 17, 
    fontWeight: "bold", 
    marginRight: 15, 
    textTransform: 'capitalize'
  },
  podcast_owner:{
    color: "grey", 
    fontSize: 13
  },






  main_controls:{
    position: "absolute", 
    bottom: 50, right: 15, 
    left: 15,
    backgroundColor: 'pink'
  },
  button_Control:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    backgroundColor: 'green'
  },
  btn_skip_previous:{
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebebeb"
  },
  icon_skip_previous:{
    fontSize: 30,
    color: 'black'
  },
  btn_shuffle:{
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  icon_shuffle:{
    fontSize: 24,
    color: 'black'
  },
  btn_skip_next:{
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebebeb",
  },
  icon_skip_next:{
    fontSize: 30,
    color: 'black'
  },
  btn_repeat:{
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon_repeat:{
    fontSize: 24,
    color: 'black'
  }

})

export default SoundPlay;









const SoundPlay = ({navigation, route})=>{

  return (
    <View style={styles.container}>
      <BottomSheet visible={true}>
        <View style={styles.mainContainer} >

        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
container:{

},
mainContainer:{
  flex: 1,
  paddingTop: Platform.OS === "ios" ? StatusBarHeight : null,
  paddingHorizontal: 15,
  backgroundColor: "#fff",
}
})

export default SoundPlay;

