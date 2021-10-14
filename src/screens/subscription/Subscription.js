import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import {  H, StatusBarHeight, _grey } from '../../constants/constants'


export class Subscription extends Component {
    render() {
        return (
        <ScrollView style={{ marginTop: StatusBarHeight }}>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <Text style={{flex: .5, textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Subscriptions</Text>
                <View style={{ flex: .25 }}/>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .03, paddingBottom: 20, width: '80%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Choose a Plan</Text>
                <Text style={{ fontSize: 13, color: _grey }}>Youn upgrade or downgrade anytime.</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("SubscriptionPay")}  style={{ marginHorizontal: 15, backgroundColor: 'orange', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 7, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Basic</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 19 }}>RWF 9,900</Text>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Includes:</Text>
                <View>
                    <Text>Unlimited podcasts</Text>
                    <Text>Access to premium content</Text>
                    <Text>Allow downloads</Text>
                    <Text>No ads</Text>
                    <Text>Get credits</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
        )
    }
}

export default Subscription
