import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { H, W } from '../../constants/constants';
import { Context as AuthContext } from '../../context/AppContext';


const Splash = ({navigation})=>{

  const { tryLocalSignin} = useContext(AuthContext)

    useEffect(()=>{
        tryLocalSignin({navigation});
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fc5603' }}>
            <Image source={require('../../../assets/splash.png')}
            style={{ height: H, width: W, resizeMode: 'contain' }} />
            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: H * .35 }}>
            <ActivityIndicator size="large" color="#fff"/>
            </View>
        </View>
    )
}

export default Splash
