import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { H, StatusBarHeight, _grey } from '../../constants/constants'


export class SubscriptionPay extends Component {
    render() {
        return (
        <ScrollView style={{ marginTop: StatusBarHeight }}>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <Text style={{flex: .5, textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>Subscription</Text>
                <View style={{ flex: .25 }}/>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .03, paddingBottom: 20, width: '80%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Choose Payment Method</Text>
                <Text style={{ fontSize: 13, color: _grey }}>Your membership will start as you as you click proceed</Text>
            </View>
            <TouchableOpacity style={{ marginHorizontal: 15, backgroundColor: 'orange', paddingVertical: 20, paddingHorizontal: 15, borderRadius: 7, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Credit/Debit Card</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>RWF 9,900</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 15, backgroundColor: 'orange', paddingVertical: 20, paddingHorizontal: 15, borderRadius: 7, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Mobile Money</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>RWF 9,900</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
        )
    }
}

export default SubscriptionPay
