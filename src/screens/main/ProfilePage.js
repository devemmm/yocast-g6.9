import React, { useState, useContext, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, StyleSheet, Platform, TextInput } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, bright, H, StatusBarHeight, _grey } from '../../constants/constants'
import { BottomSheet } from 'react-native-btr';
import { Context as DataContext } from '../../context/AppContext';
import { AppActivityIndictor2 } from '../../components/AppActivityIndictor2';

const ProfilePage  = ({navigation})=>{

    const {state, signout, fetchPodcasts} = useContext(DataContext);

    const [about, setAbout] = useState(false)
    const [terms, setterms] = useState(false)
    const [edit, setEdit] = useState(false)
    const [names, setNames] = useState('')

    const [activityIndicator, setActivityIndicator] = useState(false);


    const PropsToEditProfile = () => {
        var data = {
            names: state.user.names,
            phone: state.user.phone,
            email: state.user.email,
            avatar: state.user.avatar,
            token: state.user.token.token
        }
        navigation.navigate("EditProfile", {item: data});
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={{ paddingHorizontal: 15, height: H*.1,justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: APP_WHITE_COLOR }}>Profile</Text>
            </View>

            <View style={{ paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: "https://yocast-api.nextreflexe.com/images/background/yocast.jpeg" }} style={{ width: 80, height: 80, borderRadius: 50, resizeMode: 'cover' }} />
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
                    onPress={() => PropsToEditProfile()}  
                    style={styles.profile_set}>
                    <Text style={styles.haeder}>Edit Profile</Text>
                    <Text style={styles.det}>Change my profile details</Text>
                </TouchableOpacity>
               
                {/* <TouchableOpacity  
                onPress={() => setEdit(true)}  
                style={styles.profile_set}>
                    <Text style={styles.haeder}>Edit Profile</Text>
                    <Text style={styles.det}>Change my profile details</Text>
                </TouchableOpacity> */}

                <TouchableOpacity  onPress={() => navigation.navigate("Subscription")}  style={styles.profile_set}>
                    <Text style={styles.haeder}>Subscriptions</Text>
                    <Text style={styles.det}>Renew my subscription</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.profile_set}>
                    <Text style={styles.haeder}>Notifications</Text>
                    <Text style={styles.det}>Choose which notifications to receive</Text>
                </TouchableOpacity> */}

                <View style={{ height: 30 }} />

                <TouchableOpacity 
                onPress={() =>setAbout(true)} 
                style={styles.profile_set}>
                    <Text style={styles.haeder}>About</Text>
                    <Text style={styles.det}>Know who we are</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => setterms(true)} 
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
                    onPress={() =>{
                        signout(state.user.token.token, setActivityIndicator, ()=>{
                            navigation.navigate("LoginScreen");
                        })
                    }} 
                    >
                    <Text style={styles.haeder}>Logout</Text>
                    <Text style={styles.det}>@{state.user.names}</Text>
                </TouchableOpacity>

                <View style={{ height: H * .2 }} />


            </View>


            <BottomSheet
            visible={about}>
                <View style={{ flex: 1, backgroundColor: APP_BACKGROUND_COLOR, paddingTop: Platform.OS === 'ios' ? StatusBarHeight : null }}>
                <ScrollView>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity 
                onPress={() => setAbout(false)} 
                style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 28, width: 28, tintColor: APP_WHITE_COLOR }} />
                </TouchableOpacity>
                
                <View style={{ flex: .25 }}/>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .03, paddingBottom: 20, width: '80%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: APP_ORANGE_COLOR}}>Hi, We are YoCast</Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
            <Text style={{color: APP_WHITE_COLOR}}>Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.
Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.
Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.</Text>
</View>

<View style={{ height: H *.15 }}/>

            
        </ScrollView>
                </View>
            </BottomSheet>


            <BottomSheet
            visible={terms}>
                <View style={{ flex: 1, backgroundColor: APP_BACKGROUND_COLOR, paddingTop: Platform.OS === 'ios' ? StatusBarHeight : null }}>
                <ScrollView>
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity 
                onPress={() => setterms(false)} 
                style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ height: 28, width: 28, tintColor: APP_WHITE_COLOR}} />
                </TouchableOpacity>
                
                <View style={{ flex: .25 }}/>
            </View>
            <View style={{ paddingHorizontal: 15, paddingTop: H * .03, paddingBottom: 20, width: '80%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Read our terms carefuly</Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
            <Text style={{color: APP_WHITE_COLOR}}>Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.
Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.
Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.</Text>
</View>

<View style={{ height: H *.15 }}/>

            
        </ScrollView>
                </View>
            </BottomSheet>


            <BottomSheet visible={edit}>
                <View style={{ flex: 1, backgroundColor: APP_BACKGROUND_COLOR, paddingTop: Platform.OS === 'ios' ? StatusBarHeight : null }}>
                <ScrollView >
                    <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <TouchableOpacity onPress={() => setEdit(false)} style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                            <Image source={require('../../../assets/arrow-left.png')} style={{ height: 28, width: 28, tintColor: APP_WHITE_COLOR }} />
                        </TouchableOpacity>
                        <Text style={{flex: .5, textAlign: 'center', fontSize: 17, fontWeight: 'bold', color: APP_WHITE_COLOR }}>Edit Profile</Text>
                        <TouchableOpacity style={{ flex: .25, paddingVertical: 5 }}>
                            <Text style={{ color: APP_ORANGE_COLOR, textAlign: 'right', fontSize: 17 }}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: H * .03 }}>
                    <Image source={{ uri: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxMnx8YmxhY2slMjBmYWNlfGVufDB8fHx8MTYyODEwMDQ1Nw&ixlib=rb-1.2.1&q=80&w=1080" }} style={{ width: 120, height: 120, borderRadius: 70, resizeMode: 'cover' }} />
                    <TouchableOpacity style={{ paddingVertical: 5, marginTop: 5 }}>
                            <Text style={{ textAlign: 'right', fontSize: 16, color: APP_WHITE_COLOR }}>Change Photo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        backgroundColor: '#ebebeb',
                        flexDirection: 'row',
                        height: 43,
                        borderRadius: 3,
                        paddingHorizontal: 10,
                        marginHorizontal: 20,
                        marginVertical: 30
                    }}>
                        <TextInput
                            style={{ flex: 1, fontSize: 15}} 
                            value={names}
                            // autoFocus
                            placeholder="Username"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(names)=>setNames(names)}
                        />
                    </View>
                </ScrollView>
                </View>

            </BottomSheet>

            {
                activityIndicator ? 
                <AppActivityIndictor2 activity = "Signout ..."/> :
                null
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
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