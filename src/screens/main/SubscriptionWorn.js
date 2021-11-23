import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { _grey, APP_ORANGE_COLOR, APP_WHITE_COLOR, theme, APP_BACKGROUND_COLOR } from '../../constants/constants';


const SubscriptionWorn = ({ navigation }) => {
    const packages = [
        {
            name: 'Premium Package',
            price: 30.25,
            discount: 72,
            period: 12
        },
        {
            name: 'Standard Package',
            price: 15.15,
            discount: 63,
            period: 6
        },
        {
            name: 'Basic Package',
            price: 2.25,
            discount: 0,
            period: 1
        }
    ]
    return (
        <View style={{ flex: 1, backgroundColor: APP_BACKGROUND_COLOR }}>

            <View style={
                {
                    height: '6%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '95%'
                }
            }>
                <TouchableOpacity style={
                    {
                        backgroundColor: APP_ORANGE_COLOR,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        paddingHorizontal: '5%'
                    }
                }>
                    <Text style={{ color: APP_WHITE_COLOR, fontSize: 14 }}>Free Podcast</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View
                    style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
                    <Text style={{ color: APP_ORANGE_COLOR, fontSize: 17, fontWeight: "bold", textAlign: "center" }}>You have no active subscriptions</Text>
                </View>

                <View>

                    <FlatList
                        data={packages}
                        keyExtractor={packages.name}
                        renderItem={({item, index}) => {
                            return (
                                <View style={{ marginHorizontal: 15, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 5, marginBottom: 10, borderColor: '#ebebeb', borderWidth: 3 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 12, color: "#fff" }}>{item.name}</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 12, color: "#fff" }}>
                                            then $ {item.price}/year
                                    </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 10, color: "#fff" }}>Save {item.discount}%</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 10, color: "#fff" }}>12 months at RWF 2,420/mo</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ProfileStackNavigation", { screen: "Subscription" })
                        }}
                        style={{ backgroundColor: '#fff', height: 40, justifyContent: "center", alignItems: "center", marginHorizontal: 15, borderRadius: 3, backgroundColor: APP_ORANGE_COLOR }}>
                        <Text style={{ color: APP_WHITE_COLOR }}>Subscribe</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default SubscriptionWorn
