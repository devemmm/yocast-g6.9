import React, { useReducer, useContext } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, StyleSheet, Platform, TextInput, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, StatusBarHeight, theme, W, _grey } from '../../constants/constants';
import PhoneInput from 'react-native-phone-number-input';
import serverConfig from '../../constants/server.json';
import { Context as AuthContext } from '../../context/AppContext';

const reducer = (state, action) => {
    switch (action.type) {

        case 'username':
            return { ...state, username: action.payload };
        case 'avatar':
            return { ...state, avatar: action.payload };
        case 'names':
            return { ...state, names: action.payload }
        case 'country':
            return { ...state, country: action.payload }
        case 'phone':
            return { ...state, phone: action.payload };
        default:
            return state;
    }
}
const EditProfile = ({ navigation }) => {

    const [userData, dispatch] = useReducer(reducer, { username: '', token: null, names: "", phone: "", country: "", focusPhoneInput: false, email: "", saving: false, avatar: "https://yocast-api.nextreflexe.com/images/avatar/default-avatar.jpg", })
    const { username, token, names, phone, country, focusPhoneInput, email, saving, avatar } = userData

    const { state, updateAccount } = useReducer(AuthContext);
    
    const update = async (token) => {
        try {
            // this.setState({ saving: true});

            var data = {
                names: names,
                phone: phone,
                country: "RW"
            }

            const value = await fetch(`${serverConfig.restServer}/user/account`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(data)
            });
            const response = await value.json();
            console.log(token);
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            dispatch({type: 'avatar', payload: image.path})
        });
    }
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            dispatch({type: 'avatar', payload: image.path})
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: APP_BACKGROUND_COLOR }}>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: .2, paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 28, width: 28, tintColor: APP_WHITE_COLOR }} />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 'bold', color: '#fff' }}>Edit Profile</Text>
                <TouchableOpacity style={{ flex: .2, paddingRight: 10 }} />
            </View>
            <ScrollView
                keyboardShouldPersistTaps="handled">

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                    <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 70, resizeMode: 'cover' }} />
                    <TouchableOpacity
                        onPress={choosePhotoFromLibrary}
                        style={{ paddingVertical: 5, marginTop: 10, backgroundColor: '#ebebeb', paddingHorizontal: 15, borderRadius: 3 }}>
                        <Text style={{ textAlign: 'right', fontSize: 13 }}>Change Photo</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                    <Text style={{ color: APP_WHITE_COLOR, fontSize: 16 }}>Names: </Text>
                    <View style={{ backgroundColor: '#ebebeb', flexDirection: 'row', height: 40, borderRadius: 3, paddingHorizontal: 10, marginTop: 10 }}>
                        <TextInput
                            value={names}
                            onChangeText={names => dispatch({ type: 'names', payload: names })}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            // autoFocus
                            placeholder="Names"
                            style={{ flex: 1, fontSize: 16 }} />
                    </View>
                </View>

                <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                    <Text style={{ color: APP_WHITE_COLOR, fontSize: 16 }}>Country: </Text>
                    <View style={{ backgroundColor: '#ebebeb', flexDirection: 'row', height: 40, borderRadius: 3, paddingHorizontal: 10, marginTop: 10 }}>
                        <TextInput
                            value={country}
                            onChangeText={country => dispatch({ type: 'country', payload: country })}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="country"
                            style={{ flex: 1, fontSize: 16 }} />
                    </View>
                </View>

                <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
                    <Text style={{ color: APP_WHITE_COLOR, fontSize: 16 }}>Phone: </Text>
                    <PhoneInput
                        defaultValue={phone}
                        defaultCode="RW"
                        layout="first"
                        autoFocus={focusPhoneInput}
                        style = {{fontSize: 20}}
                        flagButtonStyle={{ padding: 0, height: 30, margin: 0, marginHorizontal: 0 }}
                        containerStyle={{ paddingVertical: 5, flex: 1, marginTop: 15, borderRadius: 3, paddingHorizontal: 5, alignItems: 'center', padding: 0, width: W - 30, backgroundColor: '#ebebeb' }}
                        // placeholder="712345678"
                        textContainerStyle={{ paddingVertical: 0, backgroundColor: 'transparent',paddingHorizontal: 0}}
                        textInputStyle={{ flex: 1, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0, backgroundColor: 'transparent', fontSize: 14 }}
                        codeTextStyle={{ fontSize: 16, paddingHorizontal: 0 }}
                        onChangeFormattedText={phone => {dispatch({ type: 'phone', payload: phone })}}
                    />
                </View>

            </ScrollView>



            { saving ?
                <View style={{ backgroundColor: theme, height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, marginVertical: 5 }}>
                    <ActivityIndicator size="small" color="#fff" />
                </View> :
                <TouchableOpacity
                    onPress={() =>{
                        // if()
                        console.log(phone, avatar)
                    }}
                    style={{ backgroundColor: APP_ORANGE_COLOR, height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, marginVertical: 5 }}>
                    <Text style={{ color: "#fff" }} >Save Changes</Text>
                </TouchableOpacity>}
        </View>
    )
}

export default EditProfile