export const signupReducer = (state, action)=>{

    switch(action.type){
        case 'submit':
            return { ...state, submitting: action.payload}
        case 'set_names':
            return {...state, names: action.payload}
        case 'set_email':
            return {...state, email: action.payload}
        case 'set_phone':
            return {...state, phone: action.payload}
        case 'set_country':
            return {...state, country: action.payload}
        case 'set_password':
            return {...state, password: action.payload}
        case 'set_c_password':
            return {...state, c_password: action.payload}
        default: 
            return state;
    };
};

export const splicePodcast = (podcastArray, shiftPodcast)=>{
    // let podcast = podcasts[index];

    // podcasts.splice(index, 1);
    // podcasts.splice(0, 0, podcasts);

    // return podcasts;

    let podcasts = podcastArray.filter(function(podcast, index, arr){
        return podcast !== shiftPodcast
    });

    podcasts.unshift(shiftPodcast);

    return podcasts;
} 