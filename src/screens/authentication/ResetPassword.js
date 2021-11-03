import React, { useState, useContext } from 'react'
import { Image, ScrollView, TouchableOpacity, View, Text, StatusBar, TextInput, StyleSheet, Alert } from 'react-native'
import { BottomSheet } from 'react-native-btr';
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, bright, H, primary, StatusBarHeight, _grey } from '../../constants/constants'
import { Context as AuthContext } from '../../context/AppContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';


const ResetPassword = ({navigation})=>{

    const [password, setPassword] = useState('');
    const [password_2, setPassword_2] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [showActivityIndicator, setshowActivityIndicator] = useState(false);
    const { state, resetPassword, addErrorMessage, clearErrorMessage } = useContext(AuthContext);
    const {errorMessage,successMessage, OTP, emailToReset } = state;

    return (
        <ScrollView style={{ backgroundColor: APP_BACKGROUND_COLOR}}>
            <StatusBar
                animated = {true}
                backgroundColor = {APP_BACKGROUND_COLOR}
            />
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 35, width: 35, tintColor: APP_WHITE_COLOR }} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '80%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Create a new Password</Text>
                <Text style={{ fontSize: 13, color: APP_WHITE_COLOR }}>Password should be different from the previous one</Text>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>

                <View style={styles.input_vw}>
                    <TextInput
                        style={styles.txt_input} 
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value = {password}
                        secureTextEntry = {passwordVisibility}
                        onChangeText = {(password)=>{
                            clearErrorMessage();
                            setPassword(password)
                        }}
                    />
                    <TouchableOpacity 
                        onPress={()=>passwordVisibility? setPasswordVisibility(false): setPasswordVisibility(true)}
                        style={{ paddingVertical: 5 }}
                    >
                        <Image source={ passwordVisibility?require('../../../assets/Show.png') : require('../../../assets/Hide.png')} style={{ height: 35, width: 35, tintColor: APP_ORANGE_COLOR }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.input_vw}>
                    <TextInput
                        style={styles.txt_input} 
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value = {password_2}
                        secureTextEntry = {passwordVisibility}
                        onChangeText = {(password2)=>{
                            clearErrorMessage();
                            setPassword_2(password2)
                        }}
                    />
                    <TouchableOpacity 
                        onPress={()=>passwordVisibility? setPasswordVisibility(false): setPasswordVisibility(true)}
                        style={{ paddingVertical: 5 }}
                    >
                        <Image source={ passwordVisibility?require('../../../assets/Show.png') : require('../../../assets/Hide.png')} style={{ height: 35, width: 35, tintColor: APP_ORANGE_COLOR }} />
                    </TouchableOpacity>
                </View>

                {
                    errorMessage ? Alert.alert(errorMessage) : null
                }
                <TouchableOpacity 
                    style={{ backgroundColor: APP_ORANGE_COLOR, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                    onPress = {()=>{
                        if(password.length < 6){
                           return addErrorMessage("Password should be greater than 6 in length");
                        } 

                        if(password !== password_2){
                            return addErrorMessage("Both password should be the same!");
                        }


                        resetPassword({
                            email: emailToReset,
                            password,
                            OTP, 
                            setshowActivityIndicator
                        }, ()=>{
                            Alert.alert(successMessage)
                            // navigation.navigate("LoginScreen")
                        });
                    }}
                >
                    <Text style={{ color: bright, fontSize: 16 }}>Continue</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: H * .1 }} />

            </View>
            <BottomSheet visible={showActivityIndicator}>
                <AppActivityIndictor />
            </BottomSheet>
        </ScrollView>
    )
}

export default ResetPassword

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
