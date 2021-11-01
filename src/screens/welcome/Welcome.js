import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ImageBackground } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { bright, H, W, StatusBarHeight, content } from '../../constants/constants'


const Welcome = ({navigation})=> {

        return (
            <View style={styles.container}>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={content}
                    keyExtractor={item => item.id}
                    renderItem={({ index, item }) => {
                        return (
                            <ImageBackground 
                                source={{ uri: item.image }}
                                resizeMode = "cover"
                                style={{ height: H, width: W}}
                            >
                            <View style={{ position: 'absolute', height: H, width: W, backgroundColor: 'black', opacity: .5 }} />
                                <View style={{ top: H * .6, left: 0, width: '80%', paddingLeft: 25}}>
                                    <Text style={{ color: bright, fontSize: 22, textTransform: 'capitalize', fontWeight: 'bold'}}>{item.title}</Text>
                                    <Text style={{ color: bright, fontSize: 12 }}>{item.description}</Text>
                                </View>

                            

                                <View style={{top: H * .7, left: 0, width: '100%'}}>

                                    { item.last === 0 ? 

                                        <MaterialCommunityIcons name="gesture-two-double-tap" size={30} color="white" style = {{alignSelf: 'flex-end', marginRight: '10%'}} />
                                        
                                        :
                                        <TouchableOpacity 
                                            onPress={() => navigation.navigate("WelcomeOptions") } 
                                            style={{ position: 'absolute', bottom: 10, right: 0, left: 0, backgroundColor: '#fff', height: 45, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginHorizontal: 25 }}>
                                            <Text>Get started</Text>
                                        </TouchableOpacity> 
                                    }
                                </View>
                            </ImageBackground>
                        )
                }} />
            
                <TouchableOpacity 
                    onPress={() => navigation.navigate("WelcomeOptions") } 
                    style={styles.skip_btn}>
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
        backgroundColor: 'rgba(255, 255, 255, .5)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 30
    },
    skip_btntxt : {
        color: bright
    }
});

export default Welcome

