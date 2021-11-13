import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { W, H} from '../constants/constants';

const AppActivityIndictor = () => {
    return (
        <View style={{ 
            position: 'absolute', 
            width: W, 
            backCover: {
                position: 'absolute',
                marginTop: 20,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }, 
            height: H, 
            top: 0, 
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center' 
            }}>
            <ActivityIndicator size="large" color="#fff" />
        </View> 
    )
}

export  { AppActivityIndictor }