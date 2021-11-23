import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, H, StatusBarHeight, _grey } from '../../constants/constants'

const AboutUsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: APP_BACKGROUND_COLOR, paddingTop: Platform.OS === 'ios' ? StatusBarHeight : null }}>
            <ScrollView>
                <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ flex: .25, paddingVertical: 5, paddingRight: 10 }}>
                        <Image source={require('../../../assets/arrow-left.png')} style={{ height: 28, width: 28, tintColor: APP_WHITE_COLOR }} />
                    </TouchableOpacity>

                    <View style={{ flex: .25 }} />
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: H * .03, paddingBottom: 20, width: '80%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: APP_ORANGE_COLOR }}>Hi, We are YoCast</Text>
                </View>

                <View style={{ marginHorizontal: 15 }}>
                    <Text style={{ color: APP_WHITE_COLOR }}>Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

                    Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.
                    Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

                    Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.
                    Like your lorem ipsum extra crispy? Then Bacon Ipsum is the placeholder text generator for you. Side of eggs and hashbrowns is optional, but recommended.

Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.</Text>
                </View>

                <View style={{ height: H * .15 }} />


            </ScrollView>
        </View>
    )
}

export default AboutUsScreen
