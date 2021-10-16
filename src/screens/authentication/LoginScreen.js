import React, { useContext, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View, StatusBar, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { bright, H, W, primary, StatusBarHeight, _grey, APP_ORANGE_COLOR, APP_BACKGROUND_COLOR, APP_WHITE_COLOR } from '../../constants/constants';
import { Context as AuthContext } from '../../context/AppContext';

const LoginScreen = ({navigation})=>{

    const {state, signin} = useContext(AuthContext)

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[submitting, setSubmitting] = useState(false)

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
                    <View style={styles.input_vw}>
                        <TextInput
                            placeholder="Email"
                            style={styles.txt_input} 
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            value={email}
                            onChangeText={email => setEmail(email)}
                        />
                    </View>

                    <View style={styles.input_vw}>
                        <TextInput
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            placeholder="Password"
                            secureTextEntry
                            style={styles.txt_input}
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                        <TouchableOpacity style={{ paddingVertical: 5 }}>
                            <Image source={require('../../../assets/Hide.png')} style={{ height: 35, width: 35 }} />
                        </TouchableOpacity>
                    </View>

                    {/* ERROR MESSAGE IF EXIST */}
                    {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}

                    <TouchableOpacity 
                        style={styles.signinBtn}

                        onPress={() => {
                                email=== "" || password === "" ? Alert.alert("Error", "Please provide Email and Password") :
                                signin({email, password}, ()=>{
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
                <View
                    style={{ position: 'absolute', width: W, height: H, backgroundColor: '#fc5603', bottom: 0, top: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ marginTop: 15, fontSize: 13, fontWeight: 'bold', color:"#fff" }}>Loging you in...</Text>
                </View> 
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
        color: 'red', 
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
