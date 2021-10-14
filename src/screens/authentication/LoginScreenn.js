import React, { Component, useReducer } from 'react'
import { Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { bright, H, W, primary, StatusBarHeight, _grey } from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverConfig from '../../constants/server.json';
import yocastApi from '../../api/yocastApi';

export class LoginScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: '',
             submitting: false
        }
    }


    login = async() => {
        try {
            this.setState({ submitting: true});
            var data = { 
                email: this.state.email,
                password: this.state.password 
            }
            console.log(data);

            const value = await fetch(`${serverConfig.restServer}/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            const response = await value.json();
            if (response.message == "you are logged in") {
                this.save( response.user.token ) 
            } else if (response.message === 'no user'){
                this.setState({ show_error: true,errorText:this.state.error_text_2, isSubmitting:false,    })                    
                setInterval(() => {
                    this.setState({ show_error: false})                    
                }, 5000);
                this.setState({ username: "", password: ""})
            }else {

                this.setState({ show_error: true,errorText:this.state.error_text_1, isSubmitting:false,   })                    
                setInterval(() => {
                    this.setState({ show_error: false })                    
                }, 5000);
                this.setState({ username: "", password: ""})                
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    save = async(token) => {
        try {
            await AsyncStorage.setItem('@USERDATA', JSON.stringify(token) ) ;
            this.setState({ submitting: false });
            this.props.navigation.navigate('InAppNavigation');
        } catch (error) {
            console.log(error);
        }
    }
    
    render() {
        return (
            <View>
        <ScrollView
        contentContainerStyle={{ marginTop: StatusBarHeight }}>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPasswordScreen")} style={{  paddingVertical: 5 }}>
                    <Text style={{ color: _grey }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '80%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Welcome Back</Text>
                <Text style={{ fontSize: 13, color: _grey }}>Enter your credentials and login to have fun with our podcasts</Text>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>
                <View style={styles.input_vw}>
                    <TextInput
                    value={this.state.email}
                    onChangeText={email => this.setState({ email: email })}
                    placeholder="Email"
                    style={styles.txt_input} />
                </View>

                <View style={styles.input_vw}>
                    <TextInput
                    value={this.state.password}
                    onChangeText={password => this.setState({ password: password })}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.txt_input} />
                    <TouchableOpacity style={{ paddingVertical: 5 }}>
                        <Image source={require('../../../assets/Hide.png')} style={{ height: 35, width: 35 }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => 
                    this.state.email=== "" || this.state.password === "" ?
                    Alert.alert("Error", "Please provide Email and Password") :
                    this.login()} 
                    style={{ backgroundColor: primary, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: bright, fontSize: 16 }}>Continue</Text>
                </TouchableOpacity>

                <View style={{ marginBottom: H * .1 }} />
            </View>

        </ScrollView>

        {this.state.submitting ?
            <View
            style={{ position: 'absolute', width: W, height: H, backgroundColor: '#fc5603', bottom: 0, top: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ marginTop: 15, fontSize: 13, fontWeight: 'bold', color:"#fff" }}>Loging you in...</Text>
            </View> : null}

        </View>
        )
    }
}

export default LoginScreen

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
