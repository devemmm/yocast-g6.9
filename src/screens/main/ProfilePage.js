import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { APP_BACKGROUND_COLOR, APP_WHITE_COLOR, bright, H, _grey } from '../../constants/constants'
import { Context as DataContext } from '../../context/AppContext';
import { AppActivityIndictor } from '../../components/AppActivityIndictor';

const ProfilePage = ({ navigation }) => {

    const { state, signout } = useContext(DataContext);
    const [activityIndicator, setActivityIndicator] = useState(false);


    const PropsToEditProfile = () => {
        var data = {
            names: state.user.names,
            phone: state.user.phone,
            email: state.user.email,
            avatar: state.user.avatar,
            token: state.user.token.token
        }
        navigation.navigate("EditProfile", { item: data });
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={{ paddingHorizontal: 15, height: H * .1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: APP_WHITE_COLOR }}>Profile</Text>
            </View>

            <View style={{ paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={PropsToEditProfile}>
                    <Image source={{ uri: state.user.avatar }} style={{ width: 80, height: 80, borderRadius: 50, resizeMode: 'cover' }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 20, flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold', textTransform: 'capitalize', color: APP_WHITE_COLOR }}>{state.user.names}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold', color: APP_WHITE_COLOR }}>{state.user.email}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ backgroundColor: '#000', color: bright, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 3, fontSize: 12 }}>Premium</Text>
                    </View>
                </View>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
                <TouchableOpacity
                    onPress={PropsToEditProfile}
                    style={styles.profile_set}>
                    <Text style={styles.haeder}>Edit Profile</Text>
                    <Text style={styles.det}>Change my profile details</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Subscription")} style={styles.profile_set}>
                    <Text style={styles.haeder}>Subscriptions</Text>
                    <Text style={styles.det}>Renew my subscription</Text>
                </TouchableOpacity>

                <View style={{ height: 30 }} />

                <TouchableOpacity
                    onPress={() => navigation.navigate("AboutUsScreen")}
                    style={styles.profile_set}>
                    <Text style={styles.haeder}>About</Text>
                    <Text style={styles.det}>Know who we are</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("TermAndPrivacy")}
                    style={styles.profile_set}>
                    <Text style={styles.haeder}>Terms and Conditions</Text>
                    <Text style={styles.det}>Important for both of us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profile_set}>
                    <Text style={styles.haeder}>Support</Text>
                    <Text style={styles.det}>Get help from our team</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.profile_set}
                    onPress={() => {
                        signout(state.user.token.token, setActivityIndicator, () => {
                            navigation.navigate("LoginScreen");
                        })
                    }}
                >
                    <Text style={styles.haeder}>Logout</Text>
                    <Text style={styles.det}>@{state.user.names}</Text>
                </TouchableOpacity>

                <View style={{ height: H * .2 }} />


            </View>
            { activityIndicator ? <AppActivityIndictor/> : null}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_BACKGROUND_COLOR
    },
    profile_set: {
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 0.2,
        paddingVertical: 10
    },
    haeder: {
        fontSize: 15,
        fontWeight: 'bold',
        color: APP_WHITE_COLOR
    },
    det: {
        fontSize: 11,
        color: _grey
    }
})


export default ProfilePage