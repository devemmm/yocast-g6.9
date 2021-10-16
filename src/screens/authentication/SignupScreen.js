import React, { useContext, useReducer } from 'react'
import { Image, ScrollView, TouchableOpacity, View, StatusBar, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { APP_ORANGE_COLOR,APP_BACKGROUND_COLOR, APP_WHITE_COLOR, bright, H, primary, StatusBarHeight, W, _grey } from '../../constants/constants';
import { signupReducer } from '../../context/AppContext'
import { Context as AuthContext } from '../../context/AppContext'


const SignupScreen = ({navigation})=> {
    const [state, dispatch] = useReducer( signupReducer, {submitting: false, names: '', email: '', phone: '', country: '', password: '', c_password: ''})
    const { submitting, names, email, phone, country, password, c_password} = state;
    const signup = useContext(AuthContext).signup;

    return (
        <View style={{backgroundColor: APP_BACKGROUND_COLOR, flex: 1}}>
            <StatusBar
                animated = {true}
                backgroundColor = {APP_BACKGROUND_COLOR}
            />
            <ScrollView
                contentContainerStyle={{}}>
                <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 5, paddingRight: 10 }}>
                        <Image source={require('../../../assets/arrow-left.png')} style={{ height: 30, width: 30, tintColor: APP_WHITE_COLOR }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={{  paddingVertical: 5 }}>
                        <Text style={{ color: APP_WHITE_COLOR }}>Login Instead?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '80%' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Create an account</Text>
                    <Text style={{ fontSize: 13, color: APP_WHITE_COLOR }}>Create an account today and start enjoying your favorite podcasts</Text>
                </View>

                <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>
                    <View style={styles.input_vw}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Names"
                            autoCorrect = {false}
                            autoCapitalize = "none"
                            value={state.names}
                            onChangeText={names => dispatch({ type: 'set_names', payload: names})}
                        />
                    </View>

                    <View style={styles.input_vw}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Email"
                            autoCorrect = {false}
                            autoCapitalize = "none"
                            value={state.email}
                            keyboardType="email-address"
                            onChangeText={email => dispatch({ type: 'set_email', payload: email})}
                        />
                    </View>

                    <View style={styles.input_vw}>
                        <TextInput
                            onChangeText={phone => dispatch({ type: 'set_phone', payload: phone})}
                            value={state.phone}
                            keyboardType="phone-pad"
                            placeholder="Phone"
                            style={styles.txt_input} 
                        />
                    </View>

                    <View style={styles.input_vw}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="country"
                            value={state.country}
                            onChangeText={country => dispatch({ type: 'set_country', payload: country})}
                        />
                    </View>

                    <View style={styles.input_vw}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Password"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            secureTextEntry
                            value={state.password}
                            onChangeText={password => dispatch({ type: 'set_password', payload: password})}
                        />
                        <TouchableOpacity style={{ paddingVertical: 5 }}>
                            <Image source={require('../../../assets/Hide.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.input_vw}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Confirm Password"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            secureTextEntry
                            value={state.c_password}
                            onChangeText={c_password => dispatch({ type: 'set_c_password', payload: c_password})}
                        />
                        <TouchableOpacity style={{ paddingVertical: 5 }}>
                            <Image source={require('../../../assets/Hide.png')} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        onPress={ () =>{
                            if(names === '' || email === '' || phone === '' || password === '' || c_password === ''){
                                Alert.alert('Sorry!', 'Make sure you fill all the required info!')
                            }

                            if(password !== '' && password !== c_password){
                                Alert.alert("Sorry!", "Please make sure the passwords are the same.");
                            }

                            dispatch({type: 'submit', payload: true})
                            signup({names, email, phone, country, password}, ()=>{
                                dispatch({type: 'submit', payload: true})
                                navigation.navigate("InAppNavigation")
                            })
                        }       
                    } 
                    style={{ backgroundColor: APP_ORANGE_COLOR, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: bright, fontSize: 16 }}>Continue</Text>
                    </TouchableOpacity>
                    <View style={{ marginBottom: H * .1 }} />

                </View>

            </ScrollView>
            {submitting ?
                <View
                    style={{ position: 'absolute', width: W, backgroundColor: '#fc5603', height: H, top: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                    >
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ marginTop: 15, fontSize: 13, fontWeight: 'bold', color:"#fff" }}>We are creating your account...</Text>
                </View> 
                : 
                null 
            }
        </View>
    )
}

export default SignupScreen

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
