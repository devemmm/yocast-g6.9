/**
 * mhn this Context will helps us to store data grobally without storing it in AsysncStorage like errors, credentials ,etc 
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import yocastApi from '../api/yocastApi';
import createDataContext from './createDataContext';

const AuthReducer = (state, action)=>{

    switch(action.type){
        
        case 'signin':
            return {...state, user: action.payload.user, token: action.payload.token}
        case 'signout':
            return {user: null, token: null, errorMessage: '', podcasts:[]}
        case 'clear_error':
            return { ...state, errorMessage: ''}
        case 'add_error':
            return { ...state, errorMessage: action.payload}

        case 'add_podcasts':
            return {...state, podcasts: action.payload}
        default: 
            return state;
    }
}

const signup = dispatch => async({names, email, phone, country, password}, callback)=>{
    try {
        const response = await yocastApi.post('/signup', { names, email, phone, country, password});
        const { message, status, statusCode, user }  = response.data;
        
        await AsyncStorage.setItem('@USERDATA', JSON.stringify(user));
        dispatch({type: 'signin', payload: {user, token: user.token.token}})

        // call a callback function  if everything goes well
        callback ? callback(): null

    } catch (error) {
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
}

const signin = dispatch => async({email, password}, callback)=>{
    try {
        const response = await yocastApi.post('/signin', {email, password});
        const { message, status, statusCode, user }  = response.data;

        await AsyncStorage.setItem('@USERDATA', JSON.stringify(user));
        dispatch({type: 'signin', payload: {user, token: user.token.token}})

        // call a callback function  if everything goes well
        callback ? callback(): null
    } catch (error) {
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
}

const tryLocalSignin = dispatch => async({navigation})=>{
    const data = await AsyncStorage.getItem('@USERDATA')
    const user = JSON.parse(data)
  
    if(data){
        dispatch({type: 'signin', payload: {user, token: user.token.token}})
        navigation.navigate("InAppNavigation")
    }else{
        navigation.navigate("LoginScreen")
    }
  }

const signout = dispatch => async(token, callback)=>{
    try {
        const response = await yocastApi.post('/user/signout', {
            //yo bro you can parse some body here ..
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.data.status === "successfull"){
            await AsyncStorage.removeItem('@USERDATA');
        }
        
        // dispatch({type: 'signout'})

        //call calback function if exist
        callback ? callback() : null;
    } catch (error) {
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
}

const fetchPodcasts = dispatch => async(token, callback)=>{
    try {
        const response = await yocastApi.get('/podcasts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({type: 'add_podcasts', payload: response.data.podcast})

        //call calback if exist
        callback ? callback(response.data.podcast) : null
    } catch (error) {
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
} 

const registerSubscription = dispatch => async({type, transactionId, paymentMode, price, currency, token})=>{
    try {
        const response = await yocastApi.post('/user/subscription', {
            type, transactionId, paymentMode, price, currency
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data)

    } catch (error) {
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
};

const addErrorMessage = dispatch =>(error)=> dispatch({type: 'add_error', payload: error})
const clearErrorMessage = dispatch =>()=> dispatch({type: 'clear_error'})

export const { Context, Provider } = createDataContext(
    AuthReducer,
    { signup, signin, signout, tryLocalSignin, registerSubscription, addErrorMessage, clearErrorMessage, fetchPodcasts},
    {user: null, token: null, errorMessage: '', podcasts:[] }
)