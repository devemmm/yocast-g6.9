import React, { useState} from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, Alert,StyleSheet } from 'react-native';
import { APP_BACKGROUND_COLOR, APP_ORANGE_COLOR, APP_WHITE_COLOR, _grey } from '../../constants/constants';

const Subscription = ({navigation})=>{


  const [showPackageDetails, setShowPackageDetails] = useState(false);
  //  premium, standard, basic,
  const [_package, setPackage] = useState('standard');
  const [loading, setLoading] = useState(true)

  const openUrl = async(url)=>{
    const isSupported = await Linking.canOpenURL(url);

    if(isSupported){
      await Linking.openURL(url);
    }else{
      Alert.alert( `Don't know how to open this url: ${url}`);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: APP_BACKGROUND_COLOR,
      }}>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfilePage")}
          style={{ flex: 0.25, paddingVertical: 5 }}>
          <Image
            source={require('../../../assets/arrow-left.png')}
            style={{ height: 30, width: 30, tintColor: APP_WHITE_COLOR}}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 0.5,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: APP_ORANGE_COLOR
          }}>
          Choose a Plan
        </Text>
        <View style={{ flex: 0.25 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ paddingHorizontal: 15, paddingBottom: 20, width: '80%' }}>
          <Text style={{ fontSize: 13, color: APP_ORANGE_COLOR }}>
            You can upgrade or downgrade anytime.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setPackage('premium' )}
          style={{
            marginHorizontal: 15,
            backgroundColor: 'grey',
            borderColor: _package === 'premium' ? APP_ORANGE_COLOR : '#ebebeb',
            borderWidth: 3,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: APP_ORANGE_COLOR }}>
              Premium Package
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: APP_WHITE_COLOR }}>
              then $ 30.25/year
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 10, color: APP_WHITE_COLOR }}>Save 63%</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 10, color: APP_WHITE_COLOR }}>
              12 months at $ 2.520/month
            </Text>
          </View>
          {_package === 'premium' && (
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  marginTop: 10,
                  marginBottom: 5,
                  color: APP_ORANGE_COLOR
                }}>
                What you get:
              </Text>
              <View>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* recommended */}
        <TouchableOpacity
          onPress={() => setPackage('standard')}
          style={{
            marginHorizontal: 15,
            backgroundColor: 'grey',
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 5,
            marginBottom: 10,
            borderColor: _package === 'standard' ? APP_ORANGE_COLOR : '#ebebeb',
            borderWidth: 3,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={styles.subscription_name}>
              Standard Package
            </Text>
            <Text style={styles.subscription_price}>
              then $ 15.15/6_month
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 10, color: APP_WHITE_COLOR }}>Save 72%</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 10, color: APP_WHITE_COLOR }}>
              6 months at $ 2.525/month
            </Text>
          </View>

          {_package === 'standard' && (
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  marginTop: 10,
                  marginBottom: 5,
                  color: APP_ORANGE_COLOR
                }}>
                What you get:
              </Text>
              <View>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* monthly */}
        <TouchableOpacity
          onPress={() => setPackage('basic')}
          style={{
            marginHorizontal: 15,
            backgroundColor: 'grey',
            borderColor: _package === 'basic' ? APP_ORANGE_COLOR : '#ebebeb',
            borderWidth: 3,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Text style={styles.subscription_name}>Basic Package</Text>
            <Text style={styles.subscription_price}>
              $ 2.85/month
            </Text>
          </View>

          {_package === 'basic' && (
            <View>
              <Text
                style={styles.subscription_cont}>
                What you get:
              </Text>
              <View>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
                <Text style={styles.package_offer}>Unlimited podcasts</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>

        <TouchableOpacity
          onPress={() => navigation.navigate("SubscriptionPay", {_package})}
          // onPress = {()=> openUrl('https://www.google.com')}

          style={{
            backgroundColor: APP_ORANGE_COLOR,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{ color: '#fff' }}>
            {_package === 'premium'
              ? 'GET SPECIAL OFFER'
              : _package === 'standard'
              ? 'PAY SUBSCRIPTION'
              : _package === 'basic'
              ? 'START NOW'
              : null}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    subscription_name:{
        fontWeight: 'bold', 
        fontSize: 12,
        color: APP_ORANGE_COLOR
    },
    subscription_price:{
        fontWeight: 'bold', 
        fontSize: 12,
        color: APP_WHITE_COLOR
    },
    subscription_cont:{
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        color: APP_ORANGE_COLOR
    },
    package_offer:{
        fontSize: 12,
        color: APP_WHITE_COLOR
    },
    paymentButton:{
      backgroundColor: APP_ORANGE_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: 10
    },
    paymentButtonText:{
      color: APP_WHITE_COLOR,
      fontSize: 20
    }
})
export default Subscription;

/*

4 packages
-

payment methods
-

===> flutter

- modal home page ==> reminding remaining days
7 days to go
on click ==> subscription page


*/
