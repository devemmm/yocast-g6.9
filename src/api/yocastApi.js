import axios from 'react-native-axios'

export default axios.create({
    baseURL: 'https://yocast-api.nextreflexe.com'
})