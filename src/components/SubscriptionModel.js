import React, {useState} from 'react';
import { View, Text, TouchableOpacity} from 'react-native'
import { BottomSheet } from 'react-native-btr'
import { _grey, APP_ORANGE_COLOR, APP_WHITE_COLOR, theme } from '../constants/constants';

const SubscriptionModel = ({NotSubscribedModal, setNotSubscribedModal, navigation}) => {
    const [packages, setPackages] = useState([1, 2, 3]);
    return (
        <View>
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
                            setNotSubscribedModal;
                            navigation.navigate("ProfileStackNavigation", { screen: "Subscription" })
                        }}
                        style={{ backgroundColor: '#fff', height: 40, justifyContent: "center", alignItems: "center", marginHorizontal: 15, borderRadius: 3, backgroundColor: APP_ORANGE_COLOR }}>
                        <Text style={{ color: APP_WHITE_COLOR }}>Subscribe</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    )
}

export {SubscriptionModel}
 