import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import { H, W, _grey, APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, theme } from '../constants/constants'
import { splicePodcast } from '../helps/helperFunctions';

const PodcastCategory = ({ category, title, podcasts, navigation }) => {

    return (
        <View style={{ marginVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginLeft: 15, marginRight: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1, color: APP_ORANGE_COLOR }}>{title}</Text>
                {podcasts.length > 7 &&
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CategoryPage", { item: category })}
                        style={{ padding: 5 }}>
                        <Text style={{ color: APP_WHITE_COLOR, fontSize: 13 }}>View More</Text>
                    </TouchableOpacity>}

            </View>
            <View style = {{ paddingLeft: 15 }}>
                <FlatList
                    data={podcasts}
                    keyExtractor={podcasts.name}
                    horizontal
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SoundPlay", { podcasts: splicePodcast(podcasts, item) })}
                                key={index}
                                style={{ width: W * .35, marginRight: 10 }}>
                                <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }} />

                                <Text numberOfLines={3} style={{ paddingTop: 2, fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize', color: APP_WHITE_COLOR }}>{item.name}</Text>
                                <Text style={{ color: APP_WHITE_COLOR, fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            {/* <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
                horizontal>
                {podcasts.splice(0, 7).map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SoundPlay", { podcasts: splicePodcast(podcasts, item) })}
                            key={index}
                            style={{ width: W * .35, marginRight: 10 }}>
                            <Image source={{ uri: item.cover }} style={{ width: W * .35, height: W * .3, borderRadius: 5, resizeMode: 'cover' }} />

                            <Text numberOfLines={3} style={{ paddingTop: 2, fontWeight: 'bold', fontSize: 13, textTransform: 'capitalize', color: APP_WHITE_COLOR }}>{item.name}</Text>
                            <Text style={{ color: APP_WHITE_COLOR, fontSize: 11, textTransform: 'capitalize' }}>{item.ownerName}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView> */}
        </View>
    )
}

export { PodcastCategory }
