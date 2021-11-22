import React, { useReducer, useEffect, useState, useContext } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, theme, W, _grey } from '../../constants/constants';
import PhoneInput from 'react-native-phone-number-input';
import { Context as AuthContext } from '../../context/AppContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';
import { ResponseModel } from '../../components/ResponseModel';

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
const EditProfile = ({ navigation, route }) => {
    const defautUserData = route.params.item;
    const [userData, dispatch] = useReducer(reducer, { username: '', token: null, names: "", phone: "", country: "", focusPhoneInput: false, email: "", saving: false, avatar: defautUserData.avatar })
    const { username, token, names, phone, country, focusPhoneInput, email, saving, avatar } = userData
    const [showActivityIndicator, setshowActivityIndicator] = useState(false);

    // show success modal
    const [successmodal, setuccessmodal] = useState(false);


    const { state, updateAccount } = useContext(AuthContext);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            dispatch({ type: 'avatar', payload: image.path })
        }).catch(()=>console.log("canceld"));
    }
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            dispatch({ type: 'avatar', payload: image.path })
        }).catch(()=>console.log("Canceld"));
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
                    <TouchableOpacity onPress={takePhotoFromCamera}>
                        <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 70, resizeMode: 'cover' }} />
                    </TouchableOpacity>
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
                            placeholder={state.user.names}
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
                            placeholder={state.user.country}
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
                        style={{ fontSize: 20 }}
                        flagButtonStyle={{ padding: 0, height: 30, margin: 0, marginHorizontal: 0 }}
                        containerStyle={{ paddingVertical: 5, flex: 1, marginTop: 15, borderRadius: 3, paddingHorizontal: 5, alignItems: 'center', padding: 0, width: W - 30, backgroundColor: '#ebebeb' }}
                        placeholder={state.user.phone}
                        textContainerStyle={{ paddingVertical: 0, backgroundColor: 'transparent', paddingHorizontal: 0 }}
                        textInputStyle={{ flex: 1, paddingVertical: 0, marginVertical: 0, paddingHorizontal: 0, backgroundColor: 'transparent', fontSize: 14 }}
                        codeTextStyle={{ fontSize: 16, paddingHorizontal: 0 }}
                        onChangeFormattedText={phone => { dispatch({ type: 'phone', payload: phone }) }}
                    />
                </View>

            </ScrollView>



            { saving ?
                <View style={{ backgroundColor: theme, height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, marginVertical: 5 }}>
                    <ActivityIndicator size="small" color="#fff" />
                </View> :
                <TouchableOpacity
                    onPress={() => {
                        const contextToUpdate = {}

                        if (names.length !== 0) {
                            contextToUpdate.names = names
                        }

                        if (country.length !== 0) {
                            contextToUpdate.country = country
                        }

                        if (phone.length !== 0) {
                            contextToUpdate.phone = phone
                        }

                        if(avatar !== "" && avatar !== state.user.avatar){
                            contextToUpdate.avatar = avatar
                        }

                        if (Object.keys(contextToUpdate).length === 0) {
                            return Alert.alert("Yocast system !!!", `Hello ${defautUserData.names}, let you know that there is nothing to updates because there is no change in  your profile information`);
                        } else {
                            updateAccount(contextToUpdate,
                                setshowActivityIndicator, () => {
                                    setuccessmodal(!successmodal);
                                });
                        }
                    }}
                    style={{ backgroundColor: APP_ORANGE_COLOR, height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginHorizontal: 15, marginVertical: 5 }}>
                    <Text style={{ color: "#fff" }} >Save Changes</Text>
                </TouchableOpacity>
            }

            {showActivityIndicator ? <AppActivityIndictor /> : null}


            {successmodal ? 
                <ResponseModel 
                    type = "Success"
                    navigation = {navigation} 
                    screen = "ProfilePage"
                    message = {state.successMessage}
                /> : null
            }
        </View>
    );
};

export default EditProfile