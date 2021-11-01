import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { APP_ORANGE_COLOR } from '../constants/constants'

const AppActivityIndictor = () => {
    return (
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={APP_ORANGE_COLOR} />
        </View>
    )
}

export  { AppActivityIndictor }