import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground } from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { bright, H, W, StatusBarHeight, content } from '../../constants/constants'


const Welcome = ()=> {
        return (
            <View style={styles.container}>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={content}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <ImageBackground 
                                source={{ uri: item.image }}
                                resizeMode = "cover"
                                style={{
                                    height: H,
                                    width: W,
                                }}
                            >
                            <View style={{ position: 'absolute', height: H, width: W, backgroundColor: 'black', opacity: .5 }} />
                                <View style={{
                                    top: H * .6,
                                    left: 0,
                                    width: '80%',
                                    paddingLeft: 25
                                }}>
                                    <Text style={{
                                        color: bright,
                                        fontSize: 22,
                                        textTransform: 'capitalize', 
                                        fontWeight: 'bold'
                                    }}>{item.title}</Text>
                                    <Text style={{ color: bright, fontSize: 12 }}>lorem asdas sda ssda asdas dsad sdasdas</Text>
                                </View>

                            

                                { item.last === 0 ? 
                                <MaterialCommunityIcons name="gesture-swipe-right" size={24} color="white" style={{ position:  'absolute', bottom: 50, right: 25 }} /> : 
                                <TouchableOpacity 
                                    onPress={() => this.props.navigation.navigate("WelcomeOptions") } 
                                    style={{ position: 'absolute', bottom: 50, right: 0, left: 0, backgroundColor: '#fff', height: 45, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginHorizontal: 25 }}>
                                    <Text>Get started</Text>
                                </TouchableOpacity> }
                            </ImageBackground>
                        )
                }} />
            
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("WelcomeOptions") } 
                    style={{
                        position: 'absolute',
                        right: 25, 
                        top: StatusBarHeight + 25,
                        backgroundColor: 'rgba(255, 255, 255, .5)',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 30
                    }}>
                        <Text style={styles.skip_btntxt}>SKIP</Text>
                </TouchableOpacity>
            </View>
        );
    };


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    skip_btn : {
        position: 'absolute',
        right: 25, 
        top: StatusBarHeight + 25,
        // backgroundColor: 'rgba(255, 255, 255, .5)',
        paddingHorizontal: 20,
        paddingVertical: 7,
    },
    skip_btntxt : {
        color: bright
    }
});

export default Welcome

