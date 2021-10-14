import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { bright, H, StatusBarHeight, W, _grey } from "./constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";
// import Slider from "react-native-sliders";
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverConfig from "./server.json";
import moment from "moment";

// SOUND
import { Audio } from "expo-av";

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

export class SoundPlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      isPlay: false,
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
    };
  }

  componentDidMount = () => {
    const { item } = this.props.route.params;
    this.setState({ activeAudio: item });
    this.CheckLiked(item.id);

    //   this.onHandleAudio();
  };

  // FUNCTION THAT PLAY AUDIO
  onHandleAudio = async () => {
    if (this.state.soundObj === null) {
      // HNADLE PLAY BUTTON ICON
      this.setState({ isPlay: !this.state.isPlay });

      // INITIALIZE NEW AUDIO
      this.playbackObj = new Audio.Sound();

      // LOAD AUDIO FROM URL
      const status = await this.playbackObj.loadAsync(
        { uri: this.state.activeAudio.url },
        { shouldPlay: true }
      );

      // GENERATE AUDIO EVENT WHO MONITOR AUDIO
      this.playbackObj.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);

      // SETTING STATE TO LISTEN AUDIO
      return this.setState({
        ...this.state,
        playbackObj: this.playbackObj,
        soundObj: status,
      });
    }

    // LOGIC TO STOP AUDIO
    if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
      this.setState({ isPlay: !this.state.isPlay });
      const status = await this.playbackObj.setStatusAsync({
        shouldPlay: false,
      });
      return this.setState({ ...this.state, soundObj: status });
    }

    // LOGIC TO STOP RESUME AUDIO
    if (
      this.state.soundObj.isLoaded &&
      !this.state.soundObj.isPlaying &&
      this.state.soundObj.uri
    ) {
      this.setState({ isPlay: !this.state.isPlay });
      const status = await this.playbackObj.playAsync();
      return this.setState({ ...this.state, soundObj: status });
    }
  };

  // EVENT THAT MONITOR AUDIO
  _onPlaybackStatusUpdate = (playbackStatus) => {
    this.setState({
      currentTime: playbackStatus.positionMillis,
      value: playbackStatus.positionMillis / playbackStatus.durationMillis,
    });

    // LOGIC IF AUDIO FINISHED CHANGE STATE TO NULL
    if (playbackStatus.isPlaying) {
      if (
        playbackStatus.positionMillis === this.state.soundObj.durationMillis
      ) {
        this.setState({
          value: 0,
          currentTime: 0,
          isPlay: false,
          soundObj: null,
        });
      }
    }
    //   console.log('xxx',playbackStatus);
  };

  // FUNCTION THAT PLAY NEXT AND PREVIOUS AUDIO
  onHandleAudioChange = async (flag) => {
    clearInterval(audioIntervalId);
    const { audioList } = this.state;
    let audioIntervalId;

    // LOGIC THAT PLAY PREVIOUS AUDIO IF EXIST OTHERWISE STILL PLAYING
    if (flag === 1) {
      if (index === 0) return;
      else {
        this.setState({ isLoadNext: true });
        index = index - 1;
        this.onHandleStopPreviousAudio();
        audioIntervalId = setTimeout(() => {
          this.onHandleStateChange(audioList[index]);
        }, 1000);
      }
    }

    // LOGIC THAT PLAY NEXT AUDIO IF EXIST OTHERWISE STILL PLAYING
    if (flag === 2) {
      if (index === audioList.length - 1) return;
      else {
        this.setState({ isLoadNext: true });
        index = index + 1;
        this.onHandleStopPreviousAudio();
        audioIntervalId = setTimeout(() => {
          this.onHandleStateChange(audioList[index]);
        }, 1000);
      }
    }
  };

  // FUNCTION THAT SET STATE TO NEXT AND PREVIOUS AUDIO
  onHandleStateChange = (audio) => {
    this.setState(
      {
        value: 0,
        isPlay: false,
        soundObj: null,
        currentTime: 0,
        isLoadNext: false,
        activeAudio: audio,
        activeImage: audio,
      },
      () => {
        this.playbackObj = null;
        this.onHandleAudio();
      }
    );
  };

  // FUNCTION THAT CLEAR CLEAR PREVIOUS AUDIO
  onHandleStopPreviousAudio = async () => {
    this.setState({ isPlay: !this.state.isPlay });
    const status = await this.playbackObj.setStatusAsync({
      shouldPlay: false,
    });
    return this.setState({
      ...this.state,
      soundObj: null,
    });
  };

  // const minutesAndSeconds = (position) => ([
  //     pad(Math.floor(position / 60), 2),
  //     pad(position % 60, 2),
  //   ]);


  // ADD TO FAVORITE
  CheckLiked = async(id) => {
    try {
      await AsyncStorage.getItem('@LIKED').then((liked) => {
        const StorageLiked = liked ? JSON.parse(liked) : [];
        this.setState({ Liked: StorageLiked });
        // check if the id of this store is found in the lists of liked stores
        // if yes then specify that is liked else do nothing
        var likedPodcasts = StorageLiked.filter( item => parseInt(item.id) === parseInt(id));
        if( likedPodcasts.length > 0 ){
         this.setState({ isFavorite: true })
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  addToFavorite = async(item) => {
    try {
      var StorageLiked = this.state.Liked;

      StorageLiked.push(item);
      await AsyncStorage.setItem('@LIKED', JSON.stringify(StorageLiked))
      this.setState({ Liked: StorageLiked, isFavorite: true });
      console.log("added to favorite");
      
    } catch (error) {
      console.log(error);
    }
  }

  removeFromFavorite = async (id) => {
    try {
      var rmvd = this.state.Liked.filter(item => item.id != id);

      await AsyncStorage.setItem('@LIKED', JSON.stringify(rmvd))
      this.setState({ Liked: rmvd, isFavorite: false }); 
      console.log("removed from favorite");


    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { value, isPlay, soundObj, isLoadNext, activeImage, currentTime } =
      this.state;

    const currentTime1 = currentTime
      ? moment(currentTime).format("mm:ss")
      : "00:00";
    const endTime = soundObj?.durationMillis
      ? soundObj?.durationMillis / converter
      : "0:00";

    return (
      <View>
        <BottomSheet visible={true}>
          <View
            style={{
              flex: 1,
              paddingTop: Platform.OS === "ios" ? StatusBarHeight : null,
              paddingHorizontal: 15,
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                height: H * 0.1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
              onPress={() => this.props.navigation.goBack()} 
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

            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Image
                source={{
                  uri: this.state.activeAudio.cover,
                }}
                style={{
                  width: H * 0.4,
                  height: H * 0.4,
                  borderRadius: 5,
                  resizeMode: "cover",
                }}
              />
            </View>

            <View
              style={{
                marginHorizontal: 10,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 17, fontWeight: "bold", marginRight: 15, textTransform: 'capitalize' }}
                >
                  {this.state.activeAudio.name}
                </Text>
                <Text style={{ color: "grey", fontSize: 13 }}>{this.state.activeAudio.ownerName}</Text>
              </View>
              <TouchableOpacity
              onPress={
                this.state.isFavorite?
                 () => this.removeFromFavorite(this.state.activeAudio.id) :
                 () => this.addToFavorite(this.state.activeAudio)
               } style={{ paddingVertical: 5 }}>
                { this.state.isFavorite ? 
                <Image
                source={require("../../assets/HeartBold.png")}
                style={{ width: 30, height: 30, tintColor: '#fc5603' }}
              /> :
                <Image
                  source={require("../../assets/Heart.png")}
                  style={{ width: 30, height: 30, tintColor: 'black' }}
                /> }
              </TouchableOpacity>
            </View>

            {/* controls */}
            <View
              style={{ position: "absolute", bottom: 50, right: 15, left: 15 }}
            >
              <View style={{ paddingHorizontal: 10 }}>
                <Slider
                  //   maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
                  //   onSlidingStart={onSlidingStart}
                  //   onSlidingComplete={onSeek}
                  minimumValue={0}
                  maximumValue={1}
                  value={value}
                  style={{
                    height: 25,
                  }}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="shuffle"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={isLoadNext}
                  // onPress={() => this.onHandleAudioChange(1)}
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  <MaterialCommunityIcons
                    name="skip-previous"
                    size={30}
                    color="black"
                  />
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
                  onPress={() => this.onHandleAudio()}
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
                  // onPress={() => this.onHandleAudioChange(2)}
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ebebeb",
                  }}
                >
                  <MaterialCommunityIcons
                    name="skip-next"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="repeat"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  }
}

export default SoundPlay;