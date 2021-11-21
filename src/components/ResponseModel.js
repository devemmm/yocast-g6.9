import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, primary, StatusBarHeight, theme, W, _grey } from '../constants/constants';

const ResponseModel = ({navigation, screen, message, type}) => {
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "white", width: W - 50, borderRadius: 5, alignItems: "center", padding: 10 }}>
                <Image source={type === "Success" ? require('../../assets/checkmark.svg.png') :require('../../assets/x-mark.png')} style={{
                    height: 60,
                    width: 60,
                    resizeMode: "cover",
                }} />

                <Text style={{
                    fontWeight: "bold",
                    marginVertical: 5,
                    fontSize: 20
                }}>{type == "Success" ? "Success!!" : "Error!!"}</Text>
                <Text>{message}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(screen);
                    }}
                    style={{
                        backgroundColor: APP_ORANGE_COLOR,
                        borderRadius: 50,
                        height: 40, alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10
                    }}>
                    <Text style={{
                        color: "white",
                        paddingHorizontal: 30,
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: APP_ORANGE_COLOR,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }
});

export { ResponseModel }
