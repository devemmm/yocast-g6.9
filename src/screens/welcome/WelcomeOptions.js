import React, { Component } from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import { bright, dark, H, W, _grey } from '../../constants/constants'

export class WelcomeOptions extends Component {
    render() {
        return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw1fHxzdHVkaW98ZW58MHx8fHwxNjI4MDk2MDY1&ixlib=rb-1.2.1&q=80&w=1080'}} style={{ height: H *.55, width: W }} />
            <View style={{ height: H * .45 + 15, backgroundColor: 'white', paddingHorizontal: 25, position: 'absolute', bottom: 0, right: 0, left: 0, borderTopEndRadius: 15, borderTopStartRadius: 15, paddingTop: H * .1 }}>
                {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#ebebeb', borderWidth: 2, justifyContent: 'center', height: 50, borderRadius: 5, marginBottom: 15 }}>
                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjDBqPtCIXHk6p3jEvflNw-_2poZ-YFvFIw&usqp=CAU'}} style={{ height: 25, width: 25 }} />
                    <Text style={{ color: _grey, marginLeft: 15, fontSize: 16 }}>Sign up with Google</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("SignupScreen")} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: 30, marginBottom: 20, backgroundColor: dark }}>
                    <Text style={{ color: bright, marginLeft: 15, fontSize: 16 }}>Sign up with Email</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 45, borderRadius: 30, marginBottom: 20, backgroundColor: "rgba(0,0,0,.1)" }}>
                    <Text style={{ color: '#000', textAlign: 'center', fontSize: 15 }}>Login to your existing account</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

export default WelcomeOptions

