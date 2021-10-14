import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { H, StatusBarHeight, W, _grey } from '../../constants/constants'

export class PodcastProfilePage extends Component {
    render() {
        return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: StatusBarHeight }}>
            <View style={{ paddingHorizontal: 10, height: H*.1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ padding: 5 }}>
                    <Image source={require('../../../assets/arrow-left.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw5fHxtdXNpY3xlbnwwfHx8fDE2MjgxMDc0OTU&ixlib=rb-1.2.1&q=80&w=1080' }} style={{ width: '100%', height: H * .3, borderRadius: 5, resizeMode: 'cover' }} />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', flex: 1, marginRight: 15 }}>Emmy Podcasts</Text>
                    <Text style={{ color: 'grey' }}>Hosted by Israel M.</Text>
                        
                    </View>
                    <TouchableOpacity style={{ padding: 5 }}>
                        <Image source={require('../../../assets/Heart.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text numberOfLines={3}>Bacon ipsum dolor amet short ribs brisket venison rump drumstick pig sausage prosciutto chicken spare ribs salami picanha doner. Kevin capicola sausage, buffalo bresaola venison turkey shoulder picanha ham pork tri-tip meatball meatloaf ribeye. Doner spare ribs andouille bacon sausage. Ground round jerky brisket pastrami shank.</Text>
                </View>
            </View>

            <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Episodes</Text>
            </View>


            <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', paddingVertical: 5 }}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw5fHxtdXNpY3xlbnwwfHx8fDE2MjgxMDc0OTU&ixlib=rb-1.2.1&q=80&w=1080' }} style={{ width: W * .15, height: W * .15, borderRadius: 5, resizeMode: 'cover' }} />
                <View style={{ flex: 1, marginLeft: 15 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>Ese birashoboka?</Text>
                    <Text numberOfLines={1} style={{ color: 'grey' }}>06:23</Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: 'grey' }}>Episode #21</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
        )
    }
}

export default PodcastProfilePage

const styles = StyleSheet.create({
    profile_set: {
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    haeder: {
        fontSize: 16,
        // fontWeight: 'bold'
    },
    det: {
        fontSize: 13,
        color: _grey
    }
})
