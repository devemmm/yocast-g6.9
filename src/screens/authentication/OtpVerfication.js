import React, { useState, useContext } from 'react'
import { Image, ScrollView, TouchableOpacity, StatusBar, View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, bright, H, primary, StatusBarHeight, _grey } from '../../constants/constants'
import { BottomSheet } from 'react-native-btr';
import { Context as AuthContext } from '../../context/AppContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';

const OtpConfirmation = ({navigation}) => {
    const [otp, setOtp] = useState('');
    const [showActivityIndicator, setshowActivityIndicator] = useState(false);
    const { state, verfiyOTP, addErrorMessage, clearErrorMessage  } = useContext(AuthContext);
    const { errorMessage, OTP, emailToReset } = state;

    return (
        <ScrollView style={{ backgroundColor: APP_BACKGROUND_COLOR }}>
            <StatusBar
                animated={true}
                backgroundColor={APP_BACKGROUND_COLOR}
            />
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 35, width: 35, tintColor: APP_WHITE_COLOR }} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '85%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>OTP Verfication</Text>
                <Text style={{ fontSize: 13, color: APP_WHITE_COLOR, marginTop: 10 }}>Check the OTP code on your email address and submit it here</Text>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>

                <View style={[styles.input_vw, { borderColor: otp.length === 4 || otp.length === 0 ? '#fff' : 'red', borderWidth: 1 }]}>
                    <TextInput
                        style={styles.txt_input}
                        placeholder="OTP-code"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={otp}
                        keyboardType="number-pad"
                        maxLength = {4}
                        onChangeText={(otp) => {
                            clearErrorMessage();
                            setOtp(otp)
                        }}
                    />
                </View>
                {state.errorMessage ? <Text style={{color: 'red', alignSelf: 'center', fontSize: 16, marginBottom: 10}}>{errorMessage}</Text> : null}
                <TouchableOpacity
                    style={{ backgroundColor: APP_ORANGE_COLOR, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        if(otp.length !== 4){
                            return addErrorMessage("wrong OTP - CODE")
                        }
                        verfiyOTP({ email: emailToReset, type: 'otpCode', otp, setshowActivityIndicator }, () => navigation.navigate("ResetPassword"))
                    }}
                >
                    <Text style={{ color: bright, fontSize: 16 }}>Continue</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: H * .1 }} />

            </View>
            {showActivityIndicator ? <AppActivityIndictor/> : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input_vw : {
        backgroundColor: '#ebebeb',
        flexDirection: 'row',
        height: 43,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    txt_input: {
        flex: 1,
        fontSize: 16
    }
})

export default OtpConfirmation
