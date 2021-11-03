import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";

import { Provider as AppProvider } from './src/context/AppContext';
import ForgotPasswordScreen from "./src/screens/authentication/ForgotPasswordScreen";
import LoginScreen from "./src/screens/authentication/LoginScreen";
import OtpVerfication from "./src/screens/authentication/OtpVerfication";
import ResetPassword from "./src/screens/authentication/ResetPassword";
import SignupScreen from "./src/screens/authentication/SignupScreen";
import ProfilePage from "./src/screens/main/ProfilePage";
import EditProfile from "./src/screens/main/EditProfile";
import SearchPage from "./src/screens/main/SearchPage";
import SoundPlay from "./src/screens/main/SoundPlay";
import Favorite from "./src/screens/main/Favorite";
import Home from "./src/screens/main/Home";
import CategoryPage from "./src/screens/main/CategoryPage";
import Subscription from "./src/screens/subscription/Subscription";
import SubscriptionPay from "./src/screens/subscription/SubscriptionPay";
import WelcomeOptions from "./src/screens/welcome/WelcomeOptions";
import Welcome from "./src/screens/welcome/Welcome";
import Splash from "./src/screens/public/Splash";
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR } from "./src/constants/constants";

const StackNavigation = createStackNavigator();
const buttomTabNavigator = createBottomTabNavigator();

// ------------------Authentication Flow ---------------------------------
const AuthenticationFlow = () => {
  return (
    <StackNavigation.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <StackNavigation.Screen name="Splash" component={Splash} />
      <StackNavigation.Screen name="Welcome" component={Welcome} />
      <StackNavigation.Screen name="WelcomeOptions" component={WelcomeOptions} />
      <StackNavigation.Screen name="LoginScreen" component={LoginScreen} />
      <StackNavigation.Screen name="SignupScreen" component={SignupScreen} />
      <StackNavigation.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
      <StackNavigation.Screen name="OtpVerfication" component={OtpVerfication}/>
      <StackNavigation.Screen name="ResetPassword" component={ResetPassword} />
      <StackNavigation.Screen name="SoundPlay" component={SoundPlay}/>
      <StackNavigation.Screen name="InAppNavigation" component={InAppNavigation} />
    </StackNavigation.Navigator>
  );
};

// ------------------ End Authentication Flow ---------------------------------


const HomeStackNavigation = () => {
  return (
    <StackNavigation.Navigator 
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="Home" component={Home} />
      <StackNavigation.Screen name="CategoryPage" component={CategoryPage} />
    </StackNavigation.Navigator>
  );
};

const SearchStackNavigation = () => {
  return (
    <StackNavigation.Navigator
      initialRouteName="SearchPage"
      screenOptions={{ headerShown: false }}
    >
      <StackNavigation.Screen name="SearchPage" component={SearchPage} />
      {/* <StackNavigation.Screen name="SoundPlay" component={SoundPlay} /> */}
      <StackNavigation.Screen name="CategoryPage" component={CategoryPage} />
    </StackNavigation.Navigator>
  );
};

const FavoriteStackNavigation = () => {
  return (
    <StackNavigation.Navigator
    initialRouteName="Favorite"
    screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="Favorite" component={Favorite} />
      {/* <StackNavigation.Screen name="SoundPlay" component={SoundPlay} /> */}
    </StackNavigation.Navigator>
  );
};

const ProfileStackNavigation = () => {
  return (
    <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="ProfilePage" component={ProfilePage} />
      <StackNavigation.Screen name="EditProfile" component={EditProfile} />
      <StackNavigation.Screen name="Subscription" component={Subscription} />
      <StackNavigation.Screen name="SubscriptionPay" component={SubscriptionPay} />
    </StackNavigation.Navigator>
  );
};

const setTabBarVisible = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hideOnScreens = [
    'ProfilePage',
    'SoundPlay'
  ];
  if (hideOnScreens.indexOf(routeName) > -1) return false;
  return true;
};

// ------------------ MAIN SCREENS ---------------------------
const InAppNavigation = () => {
    return (
      <buttomTabNavigator.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveBackgroundColor: APP_BACKGROUND_COLOR,
          tabBarActiveBackgroundColor: APP_BACKGROUND_COLOR,
          tabBarStyle: { height: 55, elevation: 0 },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          // tabBarHideOnKeyboard: true
        }}
      >
      <buttomTabNavigator.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={({ route }) => ({
          tabBarVisible: setTabBarVisible(route),
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  source={require("./assets/HomeBold.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              ) : (
                <Image
                  source={require("./assets/Home.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              )}
            </View>
          ),
        })}
      />
      <buttomTabNavigator.Screen
        name="SearchStackNavigation"
        component={SearchStackNavigation}
        options={({ route }) => ({
          tabBarVisible: setTabBarVisible(route),
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  source={require("./assets/SearchBold.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              ) : (
                <Image
                  source={require("./assets/Search.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              )}
            </View>
          ),
        })}
      />
      <buttomTabNavigator.Screen
        name="FavoriteStackNavigation"
        component={FavoriteStackNavigation}
        options={({ route }) => ({
          tabBarVisible: setTabBarVisible(route),
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  source={require("./assets/HeartBold.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              ) : (
                <Image
                  source={require("./assets/Heart.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              )}
            </View>
          ),
        })}
      />
      <buttomTabNavigator.Screen
        name="ProfileStackNavigation"
        component={ProfileStackNavigation}
        options={({ route }) => ({
          tabBarVisible: setTabBarVisible(route),
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  source={require("./assets/ProfileBold.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              ) : (
                <Image
                  source={require("./assets/Profile.png")}
                  style={{ height: 26, width: 26, tintColor: APP_ORANGE_COLOR }}
                />
              )}
            </View>
          ),
        })}
      />
    </buttomTabNavigator.Navigator>
  );
};

const App = ()=>{
  return (
    <NavigationContainer>
      <AuthenticationFlow/>
    </NavigationContainer>
  );
}

export default ()=>{
  return(
    <AppProvider>
        <App/>
    </AppProvider>
  )
}
