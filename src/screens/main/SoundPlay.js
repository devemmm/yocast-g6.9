import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity, StyleSheet, Animated} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, H  as HEIGHT, W as WIDTH, _grey } from "../../constants/constants";
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, { 
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents
 } from 'react-native-track-player';

 const setupPlayer = async(podcastStore)=>{
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop
      ]
  })
  await TrackPlayer.add(podcastStore);

}

const togglePlayback = async(playbackState)=>{
  const currentPodcast = await TrackPlayer.getCurrentTrack();

  if(currentPodcast !== null){
    if(playbackState == State.Paused){
      await TrackPlayer.play();
    }else{
      await TrackPlayer.pause();
    }
  }
}

const checkFavoritePodcast = async({id, setLiked, setIsFavorite})=>{
  try {
    const likedPodcastBuffer =  await AsyncStorage.getItem('@LIKED');
    
    const likedPodcasts = likedPodcastBuffer ? JSON.parse(likedPodcastBuffer) : []
    setLiked(likedPodcasts);

    let likedPodcast = likedPodcasts.filter( item => parseInt(item.id) === parseInt(id));

    likedPodcast.length > 0 ? setIsFavorite(true) : setIsFavorite(false)
  } catch (error) {
      console.log(error.message);
  }
}

const addToFavorite = async({id, podcast, Liked, setLiked, setIsFavorite}) => {
  try {
    var likedPodcasts = Liked;
  
    likedPodcasts.push(podcast);
    await AsyncStorage.setItem('@LIKED', JSON.stringify(likedPodcasts));

    setLiked(likedPodcasts);
    setIsFavorite(true);

  } catch (error) {
    console.log(error);
  }
}

const removeFromFavorite = async ({id, Liked, setLiked, setIsFavorite}) => {
  try {
    var rmvd = Liked.filter(item => item.id != id);

    await AsyncStorage.setItem('@LIKED', JSON.stringify(rmvd))
    setLiked(rmvd);
    setIsFavorite(true);

  } catch (error) {
    console.log(error);
  }
}


const SoundPlay  = ({navigation, route})=>{
  const playbackState = usePlaybackState()
  const progress = useProgress();

  const [podcastOwner, setPodcastOwner] = useState();
  const [podcastName, setPodcastName] = useState();
  const [podcastCover, setPodcastCover] = useState();

  const [podcastStore, setPodcastStore] = useState(route.params.podcasts);
  const [podcastIndex, setPodcastIndex] = useState(0);
  const [ isFavorite, setIsFavorite ] = useState(false);
  const [Liked, setLiked ] = useState([]);
  const [repeatMode, setRepeatMode] = useState('off');

  const podcastSlider = useRef(null);
  
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event =>{
      if( event.type === Event.PlaybackTrackChanged && event.nextTrack !== null){
        const track = await TrackPlayer.getTrack(event.nextTrack);

        const { owner, name, cover }  = track;
        setPodcastOwner(owner);
        setPodcastName(name);
        setPodcastCover(cover);
      }
  })
  const repeatIcon = function(){
      if(repeatMode === "off"){
        return "repeat-off"
      }

      if(repeatMode === "track"){
        return "repeat-once"
      }

      if(repeatMode === "repeat"){
        return "repeat"
      }
  }

  const changeRepeatMode = ()=>{
      if(repeatMode == "off"){
          TrackPlayer.setRepeatMode(RepeatMode.Track);
          setRepeatMode("track");
      }

      if(repeatMode == "track"){
          TrackPlayer.setRepeatMode(RepeatMode.Queue);
          setRepeatMode("repeat")
      }

      if(repeatMode == "repeat"){
          TrackPlayer.setRepeatMode(RepeatMode.Off);
          setRepeatMode("off")
      }
  }

  const scrollX = useRef(new Animated.Value(0)).current;

  const skipTo = async(podcastIndex)=>{
    await TrackPlayer.skip(podcastIndex)
  }


  useEffect(()=>{
    checkFavoritePodcast({id: podcastStore[podcastIndex].id, setLiked, setIsFavorite});
    setupPlayer(podcastStore);
    scrollX.addListener(({value})=>{
      skipTo(Math.round(value/WIDTH))
      setPodcastIndex(Math.round(value/WIDTH))
      
    })

    return ()=> {
        scrollX.removeListener();
    }
  }, [])

  const skipToNext = ()=>{
    podcastSlider.current.scrollToOffset({
      offset: (podcastIndex + 1) * WIDTH
    });
  }

  const skipToPrevious = ()=>{
    podcastSlider.current.scrollToOffset({
      offset: (podcastIndex - 1) * WIDTH
    });
  }


  const renderPodcast = ()=>{
    return(
      <Animated.View style = {{width: WIDTH, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.podcast_wrapper}>
          <Image source={{ uri: podcastCover}} style={styles.podcast_cover}/>
        </View>
      </Animated.View>
    );
  };

  return(
      <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor= {APP_BACKGROUND_COLOR}
        />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()} 
            style={{ paddingVertical: 5, paddingRight: 5 }}>
            <Image source={require("../../../assets/arrow-down.png")} style={styles.icon_back}/>
          </TouchableOpacity>
        </View>

        <View style = {styles.podcast_cover_card}>
        <Animated.FlatList
          ref={podcastSlider}
          data = {podcastStore}
          keyExtractor = {podcast => podcast.url}
          renderItem = {renderPodcast}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator = {false}
          scrollEventThrottle = {16}
          onScroll = {Animated.event(
            [{nativeEvent:{
                contentOffset: {x: scrollX}
            }}],
            {useNativeDriver: true}
        )}
        />
        </View>
        


        <View style={styles.podcast_details_group}>
          <View style={styles.podcast_details_info}>
            <Text numberOfLines={2} style={styles.podcast_title}>{podcastName}</Text>
            <Text style={styles.podcast_owner}>{podcastOwner}</Text>
          </View>
          
          
          <TouchableOpacity style={styles.button_favorite}
            onPress = {()=>{
              checkFavoritePodcast({id: podcastStore[podcastIndex].id, setLiked, setIsFavorite});
              isFavorite ? removeFromFavorite({id: podcastStore[podcastIndex].id, Liked, setLiked, setIsFavorite}) : 
              addToFavorite({id: podcastStore[podcastIndex].id, podcast: podcastStore[podcastIndex], Liked, setLiked, setIsFavorite})
            }}
          >
            { isFavorite ? 
              <Image
                source={require("../../../assets/HeartBold.png")}
                style={styles.unlike_icon}
              /> 
              :
              <Image
                source={require("../../../assets/Heart.png")}
                style={styles.liked_icon}
              /> 
            }
          </TouchableOpacity>
        </View>

            {/* ---------------- controls----------------------------- */}

        <View style={styles.main_buttom_contol}>
          <View style={styles.progress_container}>
            <Slider
              tyle={styles.progress_slider}
              value = {progress.position}
              minimumValue = {0}
              maximumValue = {progress.duration}
              minimumTrackTintColor={APP_ORANGE_COLOR}
              maximumTrackTintColor= {APP_ORANGE_COLOR}
              trackStyle={{ backgroundColor: "black" }}
              onSlidingComplete = {async(value)=> {
                await TrackPlayer.seekTo(value)
              }}
            />

            <View style={styles.counter_card}>
              <Text style={{ fontSize: 12, color: "grey" }}>{new Date(progress.position * 1000).toISOString().substr(14, 5)}</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.duration}>{new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}</Text>
            </View>

          </View>

                {/*--------Butoon controls----------- */}

          <View style={styles.button_group}>

            <TouchableOpacity style={styles.button_shuffle}>
              <MaterialCommunityIcons name="shuffle" style = {styles.icon_shuffle}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button_skip_previous} onPress={skipToPrevious}>
              <MaterialCommunityIcons name="skip-previous" style = {styles.icon_skip_previous} />
            </TouchableOpacity>

            <TouchableOpacity style= {styles.btn_play_pause} onPress= {()=>togglePlayback(playbackState)}>
                <MaterialCommunityIcons name= {playbackState === State.Playing ? "pause": "play"} style = {styles.icon_pause}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn_skip_next}  onPress={skipToNext}>
              <MaterialCommunityIcons name="skip-next" style = {styles.icon_skip_next}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn_repeat} onPress = {changeRepeatMode}>
              <MaterialCommunityIcons name={`${repeatIcon()}`} size = {24} color = {repeatMode !== "off" ? APP_ORANGE_COLOR : "#777777"}/>
            </TouchableOpacity>

          </View>
              {/*--------End Butoon controls----------- */}

        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  con:{

  },
  mai:{
    flex: 1,
    borderColor: 'green',
    borderWidth: 10
  },
  container:{
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBarHeight : null,
    paddingHorizontal: 15,
    // backgroundColor: "#fff",
    backgroundColor: APP_BACKGROUND_COLOR
  },
  header:{
    height: HEIGHT * 0.1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'green'
  },
  icon_back:{
    width: 30, 
    height: 30
  },
  podcast_cover_card:{
    height: HEIGHT * .4, 
    width: WIDTH, 
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: 'center'
  },
  podcast_wrapper:{
    alignItems: "center", 
    marginVertical: 10, 
    backgroundColor: APP_ORANGE_COLOR,
    borderRadius: 30
  },
  podcast_cover:{
    width: HEIGHT * 0.4,
    height: HEIGHT * 0.4,
    resizeMode: "cover"
  },
  podcast_details_group:{
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: 'red'
  },
  podcast_details_info:{
    flex: 1
  },
  podcast_title:{
    fontSize: 17, 
    fontWeight: "bold", 
    marginRight: 15, 
    textTransform: 'capitalize',
    color: APP_WHITE_COLOR
  },
  podcast_owner:{
    color: APP_WHITE_COLOR, 
    fontSize: 13 
  },
  button_favorite:{
    paddingVertical: 5
  },
  unlike_icon:{
    width: 30, 
    height: 30, 
    tintColor: '#fc5603'
  },
  liked_icon:{
    width: 30, 
    height: 30, 
    tintColor: 'black' 
  },
  main_buttom_contol:{
    position: "absolute", 
    bottom: 50, 
    right: 15, 
    left: 15,
    // backgroundColor: 'green'
  },
  progress_container:{
    paddingHorizontal: 10, 
    // backgroundColor: 'green' 
  },
  progress_slider:{
    backgroundColor: "#fc5603", 
    height: 12, 
    width: 12
  },
  counter_card:{
    flexDirection: "row", 
    // backgroundColor: 'red'
  },
  duration:{
    fontSize: 12, 
    color: "grey"
  },
  button_group:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20
  },
  button_shuffle:{
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon_shuffle:{
    fontSize: 24,
    color: 'grey'
  },
  button_skip_previous:{
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebebeb",
  },
  icon_skip_previous:{
    fontSize: 30,
    color: APP_ORANGE_COLOR
  },
  btn_play_pause:{
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc5603",
  },
  icon_pause:{
    fontSize: 40,
    color: '#fff'
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
    color: APP_ORANGE_COLOR
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