import React, { useState, useContext, useReducer, useEffect } from 'react'
import { Image, ScrollView, TouchableOpacity, View, StatusBar, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { APP_ORANGE_COLOR,APP_BACKGROUND_COLOR, APP_WHITE_COLOR, bright, H, primary, StatusBarHeight, W, _grey } from '../../constants/constants';
import { Context as AuthContext } from '../../context/AppContext'
import validator from 'validator';
import { AppActivityIndictor2 } from '../../components/AppActivityIndictor2';


const signupReducer = (state, action)=>{
    switch(action.type){
        case 'names':
            return {...state, names: action.payload};
        case 'email':
            return {...state, email: action.payload};
        case 'phone':
            return {...state, phone: action.payload};
        case 'country':
            return {...state, country: action.payload};
        case 'password':
            return {...state, password: action.payload};
        case 'c_password':
            return {...state, c_password: action.payload};
        case 'reset_text_field':
            return { ...state, names: '', email: '', phone: '', country: '', password: '', c_password: ''}
        default:
            return state;
    }
}
const SignupScreen = ({navigation})=> {
    const [state, dispatch] = useReducer( signupReducer, { names: '', email: '', phone: '', country: '', password: '', c_password: ''})
    const { names, email, phone, country, password, c_password} = state;
    
    const [submitting, setSubmitting ] = useState(false);

    const[passwordVisibility, setPasswordVisibility] = useState(true);
    const signup = useContext(AuthContext).signup;
    const clearErrorMessage = useContext(AuthContext).clearErrorMessage

    useEffect(() => {
        const unSubscribe = navigation.addListener('focus', () => {
            clearErrorMessage();
            dispatch({type: 'reset_text_field'})

        });

        return unSubscribe
    }, [navigation])

    return (
        <View style={{backgroundColor: APP_BACKGROUND_COLOR, flex: 1}}>
            <StatusBar
                animated = {true}
                backgroundColor = {APP_BACKGROUND_COLOR}
            />
            <ScrollView
                contentContainerStyle={{}}>
                <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={{ paddingVertical: 5, paddingRight: 10 }}>
                        <Image source={require('../../../assets/arrow-left.png')} style={{ height: 30, width: 30, tintColor: APP_WHITE_COLOR }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={{  paddingVertical: 5 }}>
                        <Text style={{ color: APP_WHITE_COLOR }}>Login Instead?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '80%' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Create an account</Text>
                    <Text style={{ fontSize: 13, color: APP_WHITE_COLOR, marginTop: 10}}>Create an account today and start enjoying your favorite podcasts</Text>
                </View>

                <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>
                    <View style={[styles.input_vw, {borderColor: names.length > 4 || names.length ===0 ? '#fff': 'red', borderWidth: 1}]}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Names"
                            autoCorrect = {false}
                            autoCapitalize = "none"
                            value={state.names}
                            onChangeText={names => dispatch({ type: 'names', payload: names})}
                        />
                    </View>

                    <View style={[styles.input_vw, {borderColor: validator.isEmail(email) || email.length == 0 ? '#fff': 'red', borderWidth: 1}]}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Email"
                            autoCorrect = {false}
                            autoCapitalize = "none"
                            value={state.email}
                            keyboardType="email-address"
                            onChangeText={email => dispatch({ type: 'email', payload: email})}
                        />
                    </View>

                    <View style={[styles.input_vw, {borderColor: phone.length > 10 || phone.length ===0 ? '#fff': 'red', borderWidth: 1}]}>
                        <TextInput
                            onChangeText={phone => dispatch({ type: 'phone', payload: phone})}
                            value={state.phone}
                            keyboardType="phone-pad"
                            placeholder="Phone"
                            style={styles.txt_input} 
                        />
                    </View>

                    <View style={[styles.input_vw, {borderColor: country.length > 4 || country.length ===0 ? '#fff': 'red', borderWidth: 1} ]}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="country"
                            value={state.country}
                            onChangeText={country => dispatch({ type: 'country', payload: country})}
                        />
                    </View>

                    <View style={[styles.input_vw, {borderColor: password.length > 8 || password.length ===0 ? '#fff': 'red', borderWidth: 1}]}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Password"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            secureTextEntry = {passwordVisibility}
                            value={state.password}
                            onChangeText={password => dispatch({type: 'password', payload: password})}
                        />
                        <TouchableOpacity 
                            onPress={()=>passwordVisibility? setPasswordVisibility(false): setPasswordVisibility(true)}
                            style={{ paddingVertical: 5 }}
                        >
                            <Image source={passwordVisibility ? require('../../../assets/Show.png') : require('../../../assets/Hide.png')} style={{ height: 30, width: 30, tintColor: APP_ORANGE_COLOR }} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.input_vw, {borderColor: c_password.length > 8 || c_password.length ===0 ? '#fff': 'red', borderWidth: 1}]}>
                        <TextInput
                            style={styles.txt_input} 
                            placeholder="Confirm Password"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            secureTextEntry = {passwordVisibility}
                            value={state.c_password}
                            onChangeText={c_password => dispatch({ type: 'c_password', payload: c_password})}
                        />
                        <TouchableOpacity 
                            onPress={()=>passwordVisibility? setPasswordVisibility(false): setPasswordVisibility(true)}
                            style={{ paddingVertical: 5 }}
                        >
                            <Image source={passwordVisibility ? require('../../../assets/Show.png') : require('../../../assets/Hide.png')} style={{ height: 30, width: 30, tintColor: APP_ORANGE_COLOR }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        style={{ backgroundColor: APP_ORANGE_COLOR, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                        onPress={ () =>{
                            if(names === '' || email === '' || phone === '' || password === '' || c_password === ''){
                                return Alert.alert('Sorry!', 'Make sure you fill all the required info!')
                            }

                            if(password !== '' && password !== c_password){
                                return Alert.alert("Sorry!", "Please make sure the passwords are the same.");
                            }

                            if(!validator.isEmail(email)){
                                return Alert.alert("Sorry!", "Please your email looks like incorrect");
                            }

                            if(password.length < 6){
                                return Alert.alert("Sorry!", "Please your password is too short.");
                            }

                            signup({names, email, phone, country, password, setSubmitting}, ()=>{
                                navigation.navigate("InAppNavigation")
                            });
                        }} 
                    >
                        <Text style={{ color: bright, fontSize: 16 }}>Continue</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: H * .1 }} />
                </View>
            </ScrollView>

           
            {submitting ?
                <AppActivityIndictor2 activity= "We are creating your account..."/>
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
