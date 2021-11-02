import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { W, H} from '../constants/constants';

const AppActivityIndictor2 = ({activity}) => {
    return (
        <View style={{ position: 'absolute', width: W, backgroundColor: '#fc5603', height: H, top: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ marginTop: 15, fontSize: 13, fontWeight: 'bold', color:"#fff" }}>{activity}</Text>
        </View> 
    )
}

export {AppActivityIndictor2}
