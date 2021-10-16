import React, { Component } from 'react'
import { Image, ScrollView, TouchableOpacity, View, Text, StatusBar, TextInput, StyleSheet } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, bright, H, primary, StatusBarHeight, _grey } from '../../constants/constants'

export class ResetPassword extends Component {
    render() {
        return (
        <ScrollView style={{ backgroundColor: APP_BACKGROUND_COLOR}}>
            <StatusBar
                animated = {true}
                backgroundColor = {APP_BACKGROUND_COLOR}
            />
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ paddingVertical: 5, paddingRight: 10 }}>
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
                    placeholder="Password"
                    style={styles.txt_input} />
                    <TouchableOpacity style={{ paddingVertical: 5 }}>
                        <Image source={require('../../../assets/Hide.png')} style={{ height: 35, width: 35 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.input_vw}>
                    <TextInput
                    placeholder="Confirm Password"
                    style={styles.txt_input} />
                    <TouchableOpacity style={{ paddingVertical: 5 }}>
                        <Image source={require('../../../assets/Hide.png')} style={{ height: 35, width: 35 }} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ backgroundColor: APP_ORANGE_COLOR, height: 45, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: bright, fontSize: 16 }}>Continue</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: H * .1 }} />

            </View>
        </ScrollView>
        )
    }
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
