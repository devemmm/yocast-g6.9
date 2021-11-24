import React, { useState, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, H, StatusBarHeight, _grey } from '../../constants/constants'
import { Context as DataContext } from '../../context/AppContext';
import { FluterwavePaymentButton } from '../../components/FluterwavePaymentButton';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { PayWithFlutterwaveV2 } from 'flutterwave-react-native';


const SubscriptionPay = ({ navigation, route }) => {

    const { state, registerSubscription } = useContext(DataContext);
    const [_package, setPackage] = useState(route.params._package);

    return (
        <ScrollView style={{ backgroundColor: APP_BACKGROUND_COLOR }}>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Subscription")} style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 30, width: 30, tintColor: APP_WHITE_COLOR }} />
                </TouchableOpacity>
                <Text style={{ flex: .5, textAlign: 'center', fontSize: 17, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Subscription</Text>
                <View style={{ flex: .25 }} />
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .03, paddingBottom: 20, width: '80%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Choose Payment Method</Text>
                <Text style={{ fontSize: 13, color: APP_WHITE_COLOR }}>Your membership will start as you as you click proceed</Text>
            </View>

            <FluterwavePaymentButton
                user = {state.user}
                _package = {_package}
                paymentMethod = "Credit/Debit Card"
                navigation = {navigation}
                registerSubscription = {registerSubscription}
                // registerSubscription = {({type, transactionId, paymentMode, price, currency, token})=>registerSubscription({type, transactionId, paymentMode, price, currency, token})}
            />

            <FluterwavePaymentButton
                user = {state.user}
                _package = {_package}
                paymentMethod = "Mobile Money"
                navigation = {navigation}
                registerSubscription = {registerSubscription}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default SubscriptionPay
