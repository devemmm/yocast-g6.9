import React, { Component } from 'react'
import { Image, ScrollView, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native'
import { bright, H, primary, StatusBarHeight, _grey } from '../../constants/constants'

export class ForgotPasswordScreen extends Component {
    render() {
        return (
        <ScrollView style={{ marginTop: StatusBarHeight }}>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 35, width: 35 }} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .05, width: '85%' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Reset Password</Text>
                <Text style={{ fontSize: 13, color: _grey }}>Send the email address associated to this account and we will send you instructions to reset your password</Text>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: H * .05 }}>

                <View style={styles.input_vw}>
                    <TextInput
                    placeholder="Email"
                    style={styles.txt_input} />
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("ResetPassword")} style={{ backgroundColor: primary, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: bright, fontSize: 16 }}>Send Instructions</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: H * .1 }} />

            </View>
            
        </ScrollView>
        )
    }
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
});

export default ForgotPasswordScreen

