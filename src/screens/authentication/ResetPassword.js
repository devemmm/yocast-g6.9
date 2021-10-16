import React, { useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View, Text, StatusBar, TextInput, StyleSheet } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, bright, H, primary, StatusBarHeight, _grey } from '../../constants/constants'

const ResetPassword = ({navigation})=>{

    const [password, setPassword] = useState('');
    const [password_2, setPassword_2] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true)



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
                        onChangeText = {(password)=>setPassword(password)}
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
                        onChangeText = {(password2)=>setPassword_2(password2)}
                    />
                    <TouchableOpacity 
                        onPress={()=>passwordVisibility? setPasswordVisibility(false): setPasswordVisibility(true)}
                        style={{ paddingVertical: 5 }}
                    >
                        <Image source={ passwordVisibility?require('../../../assets/Show.png') : require('../../../assets/Hide.png')} style={{ height: 35, width: 35, tintColor: APP_ORANGE_COLOR }} />
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
