import { Dimensions, View, StatusBar, Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 33 : 20,
    android: StatusBar.currentHeight,
    default: 0
})

export const W = Dimensions.get("screen").width
export const H = Dimensions.get("screen").height

export const primary = "#ff0000";
export const dark = "#000";
export const bright = "#fff";
export const _grey = "#8f8f8f";
export const APP_ORANGE_COLOR = "#fc5603";
export const APP_BACKGROUND_COLOR = "#071430";
export const APP_WHITE_COLOR = "#fff";


export const categories = [
    {
        name: 'Business',
        cover: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxfHxtdXNpY3xlbnwwfHx8fDE2MjgxMDc0OTU&ixlib=rb-1.2.1&q=80&w=1080'
    },
    {
        name: 'Politics',
        cover: 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwyMHx8bXVzaWN8ZW58MHx8fHwxNjI4MTA3NDk1&ixlib=rb-1.2.1&q=80&w=1080'
    },
    {
        name: 'Education',
        cover: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwyOHx8bXVzaWN8ZW58MHx8fHwxNjI4MTA5OTEx&ixlib=rb-1.2.1&q=80&w=1080'
    },
    {
        name: 'Music',
        cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwyNXx8bXVzaWN8ZW58MHx8fHwxNjI4MTA5OTEx&ixlib=rb-1.2.1&q=80&w=1080'
    },
    {
        name: 'Tech',
        cover: 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwyMHx8bXVzaWN8ZW58MHx8fHwxNjI4MTA3NDk1&ixlib=rb-1.2.1&q=80&w=1080'
    }
]

export const content = [
    {
        id: "aaa",
        title: "Yo cast, your daily podcast player",
        description: "Think classic lorem ipsum is passé? Give your next project a bit more edge with these funny and unique text generators.",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxfHxwb2RjYXN0fGVufDB8fHx8MTYzMjA2NTk1MA&ixlib=rb-1.2.1&q=80&w=1080",
        last: 0
    },
    {
        id: "bbb",
        title: "Unlimited pocast and Interesting conversations",
        description: "Think classic lorem ipsum is passé? Give your next project a bit more edge with these funny and unique text generators.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw3fHxwb2RjYXN0fGVufDB8fHx8MTYzMjA2NTk1MA&ixlib=rb-1.2.1&q=80&w=1080",
        last: 0
    },
    {
        id: "ccc",
        title: "With local and international content creators",
        description: "Think classic lorem ipsum is passé? Give your next project a bit more edge with these funny and unique text generators.",
        image: "https://images.unsplash.com/photo-1581547848545-a75a2634ba23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxNXx8cG9kY2FzdHxlbnwwfHx8fDE2MzIwNjU5NTA&ixlib=rb-1.2.1&q=80&w=1080",
        last: 0
    },
    {
        id: "ddd",
        title: "Don't wait anymore, get started",
        description: "Think classic lorem ipsum is passé? Give your next project a bit more edge with these funny and unique text generators.",
        image: "https://images.unsplash.com/photo-1567596296091-0a257a028e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwyNXx8cG9kY2FzdHxlbnwwfHx8fDE2MzIwNjYwNDQ&ixlib=rb-1.2.1&q=80&w=1080",
        last: 1
    }
]