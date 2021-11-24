import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, H, StatusBarHeight, _grey } from '../constants/constants';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { FlutterwaveButton } from 'flutterwave-react-native';

const FluterwavePaymentButton = ({ user, _package, paymentMethod, navigation, registerSubscription, setShowActivityIndicator }) => {


    const { email, names, token } = user

    return (
        <PayWithFlutterwave
            onRedirect={({status, tx_ref})=>{
                
                switch(status){

                    case 'cancelled':
                        console.log("cancelled")

                        return navigation.navigate("HomeStackNavigation");

                    case 'successful':
                        registerSubscription({
                            type: 'monthly', 
                            transactionId: tx_ref, 
                            paymentMode: 'CARD', 
                            price: 500, 
                            currency: 'USD', 
                            token: token.token
                        });
                        console.log("OKkk")

                        return navigation.navigate("HomeStackNavigation");

                    default: 
                    navigation.navigate("HomeStackNavigation");
                }

            }}
            options={{
            tx_ref: Date.now().toString() + email,
            authorization: 'FLWPUBK-3138297073746401f7ecd92029c645fc-X',
            customer: {
                email: email,
                name: names,
                phone: '+250788596281'
            },
            amount: _package === "premium" ?  30.25 :
                    _package === "standard"? 15.15 :
                    _package === "basic"? 2.85 : 30
            ,
            currency: 'USD',
            payment_options: paymentMethod === "Credit/Debit Card"? "card" : "mobilemoneyrwanda",
            }}

            customButton={({disabled, onPress}) => (

                <TouchableOpacity 
                    style={ styles.paymentButton }
                    onPress={ onPress }
                    isBusy={false}
                    disabled={disabled}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, flex: 1, color: APP_WHITE_COLOR}}>{paymentMethod}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: APP_ORANGE_COLOR}}>Pay - Now</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    paymentButton: {
        marginHorizontal: 15,
        backgroundColor: 'orange',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 7,
        marginBottom: 10
    },
    paymentButtonText: {
        color: APP_WHITE_COLOR,
        fontSize: 20
    }
});

export { FluterwavePaymentButton };
