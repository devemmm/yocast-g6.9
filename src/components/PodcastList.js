import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { H, W, _grey, APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, theme } from '../constants/constants'
import { splicePodcast } from '../helps/helperFunctions';

const PodcastList = ({ podcasts, navigation }) => {

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }}>
            {podcasts.map((item, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SoundPlay", { podcasts: splicePodcast(podcasts, item) })}
                        key={index}
                        style={{ width: (W * .3) - 5, marginHorizontal: 5, marginTop: 15 }}>
                        <Image source={{ uri: item.cover }} style={{ width: "100%", height: W * .3, borderRadius: 5, resizeMode: 'cover' }} />

                        <Text numberOfLines={3} style={{ paddingTop: 2, fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize', color: APP_WHITE_COLOR }}>{item.name}</Text>
                        <Text style={{ color: APP_WHITE_COLOR, fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                    </TouchableOpacity>
                )
            })}

            <View style={{ height: 60 }} />
        </View>
    )
}

export { PodcastList }
