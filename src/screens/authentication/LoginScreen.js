import React, { useContext, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View, StatusBar, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { bright, H, W, _grey, APP_ORANGE_COLOR, APP_BACKGROUND_COLOR, APP_WHITE_COLOR } from '../../constants/constants';
import { Context as AuthContext } from '../../context/AppContext';
import validator from 'validator';
import { AppActivityIndictor2 } from '../../components/AppActivityIndictor2';


const LoginScreen = ({navigation})=>{

    const {state, signin, addErrorMessage} = useContext(AuthContext)

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[submitting, setSubmitting] = useState(false);
    const[passwordVisibility, setPasswordVisibility] = useState(true)

    return (
        <View style ={ styles.container}>
            <StatusBar
                animated = {true}
                backgroundColor = {APP_BACKGROUND_COLOR}
            />
            <ScrollView
                contentContainerStyle={styles.main_container}>
                <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')} style={{ paddingVertical: 5, paddingRight: 10 }}>
                        <Image source={require('../../../assets/arrow-left.png')} style={{ height: 35, width: 35, tintColor: APP_WHITE_COLOR }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")} style={{  paddingVertical: 5 }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '80%' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Welcome Back</Text>
                    <Text style={{ fontSize: 16, color: '#fff' }}>Enter your credentials and login to have fun with our podcasts</Text>
                </View>

                <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>
                    <View style={[styles.input_vw, {borderColor: validator.isEmail(email) || email.length == 0 ? '#fff': 'red', borderWidth: 1}]}>
                        <TextInput
                            placeholder="Email"
                            style={styles.txt_input} 
                            autoCapitalize = "none"
                            autoFocus={true}
                            autoCorrect = {false}
                            value={email}
                            autoCompleteType="email"
                            onChangeText={email => setEmail(email)}
                        />
                    </View>

                    <View style={[styles.input_vw, {borderColor: validator.isLength(password,{min: 6, max: 30}) || password.length ===0 ? '#fff': 'red', borderWidth: 1}]}>
                        <TextInput
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            placeholder="Password"
                            
                            secureTextEntry = {passwordVisibility}
                            style={styles.txt_input}
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                        <TouchableOpacity 
                            style={{ paddingVertical: 5 }}
                            onPress={()=>passwordVisibility? setPasswordVisibility(false): setPasswordVisibility(true)}
                        >
                            <Image source={ passwordVisibility?require('../../../assets/Show.png') : require('../../../assets/Hide.png')} style={{ height: 35, width: 35, tintColor: APP_ORANGE_COLOR }} />
                        </TouchableOpacity>
                    </View>

                    {/* ERROR MESSAGE IF EXIST */}
                    {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}

                    <TouchableOpacity 
                        style={styles.signinBtn}

                        onPress={() => {
                                if(!validator.isEmail(email)){
                                    return addErrorMessage("Wrong email")
                                }

                                if(password.length < 6 ){
                                    return addErrorMessage("incorrect password")
                                }

                                email=== "" || password === "" ? Alert.alert("Error", "Please provide Email and Password") :
                                signin({email, password, setSubmitting}, ()=>{
                                    navigation.navigate("InAppNavigation");
                                })}
                            } 
                        >
                        <Text style={{ color: bright, fontSize: 18, fontWeight: 'bold' }}>Continue</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: H * .1 }} />
                </View>

            </ScrollView>

            {submitting ?
                <AppActivityIndictor2 activity = "Loging you in..."/>
                : 
                null
            }
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: APP_BACKGROUND_COLOR
    },
    main_container:{ 
        // marginTop: StatusBarHeight ,
        // backgroundColor: ''
    },
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
    },
    errorMessage:{
        color: APP_ORANGE_COLOR, 
        alignSelf: 'center',
        fontSize: 18, 
        marginBottom: 20,
        textTransform: 'lowercase'
    },
    signinBtn:{ 
        backgroundColor: APP_ORANGE_COLOR, 
        height: 45, borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})