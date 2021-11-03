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

const signup = dispatch => async({names, email, phone, country, password, setSubmitting}, callback)=>{
    try {
        setSubmitting(true);
        const response = await yocastApi.post('/signup', { names, email, phone, country, password});
        const { message, status, statusCode, user }  = response.data;
        
        await AsyncStorage.setItem('@USERDATA', JSON.stringify(user));
        dispatch({type: 'signin', payload: {user, token: user.token.token}})

        // call a callback function  if everything goes well
        setSubmitting(false);
        callback ? callback(): null

    } catch (error) {
        setSubmitting(false);
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
}

const signin = dispatch => async({email, password, setSubmitting}, callback)=>{
    try {
        setSubmitting(true);
        const response = await yocastApi.post('/signin', {email, password});
        const { message, status, statusCode, user }  = response.data;

        await AsyncStorage.setItem('@USERDATA', JSON.stringify(user));
        dispatch({type: 'signin', payload: {user, token: user.token.token}})

        // call a callback function  if everything goes well
        setSubmitting(false)
        callback ? callback(): null
    } catch (error) {
        setSubmitting(false)
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
        navigation.navigate("Welcome")
    }
  }

const signout = dispatch => async(token, setActivityIndicator,  callback, )=>{
    try {
        setActivityIndicator(true);
        await AsyncStorage.removeItem('@USERDATA');
        const response = await yocastApi.post('/user/signout', {
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.data.status === "successfull"){
            await AsyncStorage.removeItem('@USERDATA');
        }
        
        // dispatch({type: 'signout'})

        setActivityIndicator(false)
        //call calback function if exist
        callback ? callback() : null;
    } catch (error) {
        setActivityIndicator(false)
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

const forgotPassword = dispatch => async({email, setshowActivityIndicator }, callback)=>{
    try {
        setshowActivityIndicator(true);
        const response = await yocastApi.post('/users/forgotpassword', {
            email
        });
        console.log(response.data);

        setshowActivityIndicator(false);

        callback? callback() : null;
    } catch (error) {

        console.log(error.response.data.error.message);
        setshowActivityIndicator(false);
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
}

const updateAccount = dispatch => async(updates, setshowActivityIndicator, callback)=>{
    try {
        setshowActivityIndicator(true);

        console.log({updates})

        setshowActivityIndicator(false);

        callback? callback() : null;
    } catch (error) {
        setshowActivityIndicator(false);
        dispatch({type: 'add_error', payload: error.response.data.error.message})
    }
}

const addErrorMessage = dispatch =>(error)=> dispatch({type: 'add_error', payload: error})
const clearErrorMessage = dispatch =>()=> dispatch({type: 'clear_error'})

export const { Context, Provider } = createDataContext(
    AuthReducer,
    { signup, signin, signout, tryLocalSignin, registerSubscription, forgotPassword, updateAccount, addErrorMessage, clearErrorMessage, fetchPodcasts},
    {user: null, token: null, errorMessage: '', podcasts:[] }
)