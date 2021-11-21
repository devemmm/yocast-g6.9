import React, { useReducer, useState, Component, useEffect, useContext } from 'react'
import { View, Text, StatusBar, ScrollView, SliderBox, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BottomSheet } from 'react-native-btr'
import { H, W, _grey, APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, theme } from '../../constants/constants'
import yocastApi from '../../api/yocastApi';
import { Context as DataContext } from '../../context/AppContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';
import { PodcastList } from '../../components/PodcastList';
import { FreePodcasts } from '../../components/FreePodcasts';
import { PodcastCategory } from '../../components/PodcastCategory';

const categoryReducer = (state, action) => {

    switch (action.type) {

        case 'Business':
            return { ...state, Business: action.payload }
        case 'Education':
            return { ...state, Education: action.payload }
        case 'Politics':
            return { ...state, Politics: action.payload }
        case 'Music':
            return { ...state, Music: action.payload }
        case 'Tech':
            return { ...state, Tech: action.payload }
        case 'Popular':
            return { ...state, Popular: action.payload }
        case 'TopExpensive':
            return { ...state, TopExpensive: action.payload }
        case 'LatestRelease':
            return { ...state, LatestRelease: action.payload }
        case 'Trending':
            return { ...state, Trending: action.payload }
        case 'Free':
            return { ...state, Free: action.payload }
        default:
            return state;
    }
}

const todayDateReducer = (state, action) => {

    switch (action.type) {
        case 'today':
            return { ...state, today: action.payload }
        case 'month':
            return { ...state, month: action.payload }
        default:
            return state;
    }
}


const fectchPodcast = async ({ token, todayDate, setPodcast, dispatchCategory, setshowActivityIndicator, setNotSubscribedModal, setRemainingDays }) => {
    try {
        setshowActivityIndicator(true);

        const response1 = await yocastApi.get('/user/subscription?type=last', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        let { message, status, statusCode, subscription } = response1.data;

        if (status == "successfull" && subscription.length == 0) {
            setNotSubscribedModal(true)
            setshowActivityIndicator(false);

        } else if (status == "successfull" && subscription.length > 0 && (new Date(subscription[0].desactivationDate) >= new Date())) {
            const desactivationDate = new Date(subscription[0].desactivationDate);
            const remainingTime = desactivationDate - new Date();
            const remainingDays = remainingTime / (1000 * 3600 * 24)
            setRemainingDays(Math.floor(remainingDays));

            const response = await yocastApi.get('/podcasts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { podcast } = response.data;

            if (response.data.status === "sucessfull") {
                setPodcast(podcast);
                dispatchCategory({ type: 'Business', payload: podcast.filter(podcast => podcast.category.includes("Business")) })
                dispatchCategory({ type: 'Education', payload: podcast.filter(podcast => podcast.category.includes("Education")) })
                dispatchCategory({ type: 'Politics', payload: podcast.filter(podcast => podcast.category.includes("Politics")) })
                dispatchCategory({ type: 'Music', payload: podcast.filter(podcast => podcast.category.includes("Music")) })
                dispatchCategory({ type: 'Tech', payload: podcast.filter(podcast => podcast.category.includes("Tech")) })
                dispatchCategory({ type: 'Popular', payload: podcast.sort((a, b) => b.likes - a.likes) });
                dispatchCategory({ type: 'TopExpensive', payload: (podcast.filter(podcast => podcast.price > 0).sort((a, b) => b.price - a.price)) });
                dispatchCategory({ type: 'LatestRelease', payload: podcast.filter(podcast => podcast.updatedAt.includes(todayDate.today)) });
                dispatchCategory({ type: 'Trending', payload: podcast.filter(podcast => podcast.updatedAt.includes(todayDate.month)) });
                dispatchCategory({ type: 'Free', payload: podcast.filter(podcast => podcast.isFree == 0) });
            }
            setshowActivityIndicator(false);

        } else {
            setNotSubscribedModal(true)
            setshowActivityIndicator(false);
        }
    } catch (error) {
        setNotSubscribedModal(true)
        setshowActivityIndicator(false)
    }
}
const Home = ({ navigation }) => {

    const { state } = useContext(DataContext);
    const { token, user } = state;
    const [remainingDays, setRemainingDays] = useState('')

    const [category, dispatchCategory] = useReducer(categoryReducer, { Business: [], Education: [], Education: [], Politics: [], Music: [], Tech: [], TopExpensive: [], Popular: [], Trending: [], LatestRelease: [], Free: [] })
    const [todayDate, dispatchDate] = useReducer(todayDateReducer, { hour: new Date().getHours(), today: '', month: '' });

    const [podcasts, setPodcast] = useState([]);
    const [username, setUsername] = useState(user.names);
    const [packages, setPackages] = useState([1, 2, 3]);
    const [tag, setTag] = useState('latest')
    const [NotSubscribedModal, setNotSubscribedModal] = useState(false);
    const [showActivityIndicator, setshowActivityIndicator] = useState(false);
    const [showRemainingDays, setShowRemainingDays] = useState("none");

    const [banners, setBanners] = useState([
        "https://yocast-api.nextreflexe.com/images/background/yocast.jpeg",
        "https://yocast-api.nextreflexe.com/images/background/yocast.jpeg",
        "https://yocast-api.nextreflexe.com/images/background/yocast.jpeg",
        "https://yocast-api.nextreflexe.com/images/background/yocast.jpeg"
    ]);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=>{
            var currentTime = new Date();
            var month = currentTime.getMonth() + 1;
            var __month = month < 10 ? ("0" + month) : month;
            var today = currentTime.getFullYear() + "-" + __month + "-" + currentTime.getDate();
            var __monthly = currentTime.getFullYear() + "-" + __month + "-";
    
            dispatchDate({ type: 'today', payload: today });
            dispatchDate({ type: 'month', payload: __monthly });
    
            fectchPodcast({ token, todayDate, setPodcast, dispatchCategory, setshowActivityIndicator, setNotSubscribedModal, setRemainingDays });
        }) 
        return unsubscribe;

    }, [navigation])


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={APP_BACKGROUND_COLOR}
            />

            {/* subscription modal */}
            <BottomSheet visible={NotSubscribedModal}>
                <View style={{ flex: 1, backgroundColor: theme, justifyContent: 'center' }}>
                    <View
                        style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
                        <Text style={{ color: APP_ORANGE_COLOR, fontSize: 17, fontWeight: "bold", textAlign: "center" }}>You have no active subscriptions</Text>
                    </View>

                    {packages.map((item, index) => {
                        return (
                            <View key={index} style={{ marginHorizontal: 15, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 5, marginBottom: 10, borderColor: '#ebebeb', borderWidth: 3 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: "#fff" }}>
                                        Premium Package
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: "#fff" }}>
                                        then $ 30.25/year
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: "#fff" }}>Save 72%</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: "#fff" }}>12 months at RWF 2,420/mo</Text>
                                </View>
                            </View>
                        )
                    })}

                    <TouchableOpacity
                        onPress={() => {
                            setNotSubscribedModal(false);
                            navigation.navigate("ProfileStackNavigation", { screen: "Subscription" })
                        }}
                        style={{ backgroundColor: '#fff', height: 40, justifyContent: "center", alignItems: "center", marginHorizontal: 15, borderRadius: 3, backgroundColor: APP_ORANGE_COLOR }}>
                        <Text style={{ color: APP_WHITE_COLOR }}>Subscribe</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>

            <View style={{ paddingHorizontal: 15, height: H * .12, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>
                    {todayDate.hour >= 0 && todayDate.hour < 12 ?
                        "Good morning," :
                        todayDate.hour >= 12 && todayDate.hour < 18 ?
                            "Good afternoon," :
                            todayDate.hour >= 18 && todayDate.hour < 24 ?
                                "Good evening," : null
                    } <Text style={{ textTransform: 'capitalize' }}> {state.user.names} </Text>
                </Text>
                <TouchableOpacity
                    onPress={() => showRemainingDays === "none" ? setShowRemainingDays("flex") : setShowRemainingDays("none")}
                    style={{ padding: 5 }}>
                    <AntDesign name="clockcircleo" size={24} color={APP_ORANGE_COLOR} />
                </TouchableOpacity>
            </View>

            {/* <SliderBox
                    autoplay={true}
                    circleLoop={true}
                    images={banners}
                    sliderBoxHeight={140} 
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    imageLoadingColor={ theme }
                    dotColor={ theme }
                    inactiveDotColor="#FFF"
                    ImageComponentStyle={{ 
                        alignItems: "center", 
                        justifyContent: 'center', 
                        borderRadius: 10, 
                        marginHorizontal: 15, 
                        width: W - 30 }}
                /> */}

            {/* // remaining days banner */}
            <View style={{ display: showRemainingDays, backgroundColor: '#fc5603', marginHorizontal: 15, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 15 }}>
                <Text style={{ color: '#fff' }}>Remaining {remainingDays} days before subscription ends</Text>
            </View>


            {/* LatestRelease */}
            {category.LatestRelease.length === 0 ? null :
                <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, color: APP_ORANGE_COLOR }}>Latest Release</Text>

                    </View>
                    <TouchableOpacity

                        onPress={() => navigation.navigate("SoundPlay", { podcasts: category.LatestRelease })}
                        style={{ width: W - 30, marginRight: 10 }}>
                        <Image source={{ uri: category.LatestRelease[0].cover }} style={{ width: W - 30, height: 140, borderRadius: 5, resizeMode: 'stretch' }} />

                        <Text numberOfLines={3} style={{ paddingTop: 2, fontWeight: 'bold', fontSize: 14, textTransform: 'capitalize', color: APP_WHITE_COLOR }}>{category.LatestRelease[0].name}</Text>
                        <Text style={{ color: APP_WHITE_COLOR, fontSize: 12, textTransform: 'capitalize' }}>{category.LatestRelease[0].ownerName}</Text>
                    </TouchableOpacity>
                </View>}

            <View style={{ marginTop: 10, marginHorizontal: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {setTag("latest")}}
                    style={{ backgroundColor: tag === "latest" ? theme : "#ebebeb", flex: 1, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 3, marginHorizontal: 5 }}>
                    <Text style={{ color: tag === "latest" ? "#fff" : "#000" }}>Latest</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setTag("filtered")}}
                    style={{ backgroundColor: tag === "filtered" ? theme : "#ebebeb", flex: 1, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 3, marginHorizontal: 5 }}>
                    <Text style={{ color: tag === "filtered" ? "#fff" : "#000" }}>Filtered</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setTag("free")}}
                    style={{ backgroundColor: tag === "free" ? theme : "#ebebeb", flex: 1, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 3, marginHorizontal: 5 }}>
                    <Text style={{ color: tag == "free" ? "#fff" : "#000" }}>Free</Text>
                </TouchableOpacity>
            </View>

            { tag === "latest" ?

                <PodcastList podcasts={podcasts} navigation={navigation} /> :
                tag === "filtered" ?

                    <View>

                        {category.Popular.length === 0 ? null :
                            <PodcastCategory category="Popular" title="Most Popular" podcasts={category.Popular} navigation={navigation} />
                        }

                        {category.Business.length === 0 ? null :
                            <PodcastCategory category="Business" title="Business" podcasts={category.Business} navigation={navigation} />
                        }

                        {category.Trending.length === 0 ? null :
                            <PodcastCategory category="Trending" title="Trending" podcasts={category.Trending} navigation={navigation} />
                        }

                        {category.TopExpensive.length === 0 ? null :
                            <PodcastCategory category="TopExpensive" title="Certified Platinum" podcasts={category.TopExpensive} navigation={navigation} />
                        }

                        {category.Education.length === 0 ? null :
                            <PodcastCategory category="Education" title="Top Education" podcasts={category.Education} navigation={navigation} />
                        }

                        {category.Politics.length === 0 ? null :
                            <PodcastCategory category="Politics" title="Top Politics" podcasts={category.Politics} navigation={navigation} />
                        }

                        {category.Music.length === 0 ? null :
                            <PodcastCategory category="Music" title="Top Music" podcasts={category.Music} navigation={navigation} />
                        }

                        <View style={{ height: 100 }} />
                    </View> 
                    :
                    
                    tag === "free" ? <FreePodcasts podcasts={category.Free} navigation={navigation}/> : null
            }

            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_BACKGROUND_COLOR
    },
    greeting_section: {
        paddingHorizontal: 15,
        height: H * .12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: APP_ORANGE_COLOR
    },
    subscription_reminder: {
        backgroundColor: APP_ORANGE_COLOR,
        marginHorizontal: 15,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    subscription_reminder_text: {
        color: APP_WHITE_COLOR,
    },
    latest_release_txt: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: APP_ORANGE_COLOR
    },
    category: {
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
    btn_view_more: {
        color: APP_WHITE_COLOR,
        fontSize: 13
    },
    podcast_name: {
        paddingTop: 2,
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'capitalize',
        color: APP_WHITE_COLOR
    },
    podcast_owner: {
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
});

export default Home
