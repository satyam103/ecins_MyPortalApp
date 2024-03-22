/**



 * MyPortal Application
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {setCustomText} from 'react-native-global-props';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
//  import { Thumbnail} from 'native-base';
import FlashMessage from 'react-native-flash-message';
import * as RootNavigation from './RootNavigation';
import moment from 'moment';
import {getDataParamUrl} from './components/utility';
// component includes
import Login from './components/Authentication/Login';
import ResetPassword from './components/Authentication/ResetPassword';
import ChangePassword from './components/Authentication/ChangePassword';
import Task from './components/Tasks/Task';
import Chat from './components/Emessage/MessageList';
import ChatMessage from './components/Emessage/CreateChat';
import Calendar from './components/Calendar/Calendar';
import CreateMessage from './components/Message/createMessage';
import ViewMessage from './components/Message/ViewMessages';
import EMessage from './components/Message/MessageList';
import HelpAndList from './components/Help-Advice/HelpAndList';
import JournalList from './components/Journal/JournalList';
import TaskView from './components/Tasks/TaskView';
import TaskViewDetails from './components/Tasks/TaskViewDetails';
import HelpInfo from './components/Help-Advice/HelpInfo';
import BackButton from './components/Header/BackButton';
import UserImage from './components/Notifications/Notifications';
import HideFunction from './components/HideFunctions/HideFunction';
import Settings from './components/Authentication/Settings.js';
import PrivateMode from './components/Authentication/PrivateMode.js';
import Passcode from './components/Passcode/Passcode';
import PasscodeLogin from './components/Passcode/PasscodeLogin';
import MyAccount from './components/Authentication/MyAccount';
import EditSettings from './components/Authentication/EditSettings';
import EmailSettings from './components/Authentication/EmailSettings';
import ChangePasscode from './components/Passcode/ChangePasscode';
import ScanScreen from './components/MyEvents/ScanScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {NativeBaseProvider} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import Attendance from './components/MyEvents/Attendance';
import MyEvents from './components/MyEvents/MyEvents';
console.disableYellowBox = true;
const customTextProps = {
  style: {
    fontFamily: 'Helvetica',
  },
};
setCustomText(customTextProps);

const Stack = createStackNavigator();

function LogoImage(navigation) {
  return (
    <Image
      onPress={() => RootNavigation.push('ChatMessage')}
      style={{marginRight: 'auto', marginLeft: 'auto'}}
      source={require('./assets/images/myportal_logo_inline.png')}
    />
  );
}

function LogoImageRegular() {
  return (
    <Image
      onPress={() => RootNavigation.push('ChatMessage')}
      style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 50}}
      source={require('./assets/images/myportal_logo_inline.png')}
    />
  );
}

function RootStack() {
  const theme = useTheme();
  return (
    <NavigationContainer ref={RootNavigation.navigationRef} theme={theme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{gestureEnabled: false, tintColor: '#43c2f0'}}
        style={{backgroundColor: '#fff'}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTransparent: true,
            headerTitleStyle: {
              display: 'none',
            },
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 8}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="PrivateMode"
          component={PrivateMode}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              display: 'none',
              backgroundColor: '#fff',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              display: 'none',
              backgroundColor: '#fff',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="Passcode"
          component={Passcode}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              display: 'none',
              backgroundColor: '#fff',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="PasscodeLogin"
          component={PasscodeLogin}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              display: 'none',
              backgroundColor: '#fff',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => null,
            headerLeft: () => null,
          })}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('MyAccount')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="EditSettings"
          component={EditSettings}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="EmailSettings"
          component={EmailSettings}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ChangePasscode"
          component={ChangePasscode}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Task"
          component={Task}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => RootNavigation.push('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => null,
          })}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ChatMessage"
          component={ChatMessage}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.push('MyAccount')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="CreateMessage"
          component={CreateMessage}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="HideFunction"
          component={HideFunction}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
              color: '#E0E0E0',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}></View>
            ),
          })}
        />
        <Stack.Screen
          name="EMessage"
          component={EMessage}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ViewMessage"
          component={ViewMessage}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => navigation.push('EMessage')}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => navigation.push('EMessage')}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="JournalList"
          component={JournalList}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="MyEvents"
          component={MyEvents}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => null,
            // <View
            //   style={{
            //     flexDirection: 'row',
            //     justifyContent: 'space-between',
            //   }}>
            //   <Icon
            //     onPress={() => {
            //       navigation.goBack();
            //     }}
            //     style={{
            //       fontSize: 25,
            //       marginLeft: 0,
            //       fontWeight: 'bold',
            //       marginTop: 5,
            //     }}
            //     name="keyboard-arrow-left"
            //   />
            //   <Text
            //     onPress={() => {
            //       navigation.goBack();
            //     }}
            //     style={{fontWeight: 'bold', marginTop: 10}}>
            //     Back
            //   </Text>
            // </View>
          })}
        />
        <Stack.Screen
          name="TaskView"
          component={TaskView}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="TaskViewDetails"
          n
          component={TaskViewDetails}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="HelpAndList"
          component={HelpAndList}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="HelpInfo"
          component={HelpInfo}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Task')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => navigation.navigate('MyEvents')}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={({route, navigation}) => ({
            headerStyle: {
              backgroundColor: '#E0E0E0',
            },
            headerTitleStyle: {
              height: 70,
              marginRight: 'auto',
              marginLeft: 'auto',
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTitle: () => (
              <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
                <Image
                  style={{marginRight: 'auto', marginLeft: 'auto'}}
                  source={require('./assets/images/myportal_logo_inline.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: (props) => <UserImage navigation={navigation} />,
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Icon
                  onPress={() => navigation.navigate('MyEvents')}
                  style={{
                    fontSize: 25,
                    marginLeft: 0,
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                  name="keyboard-arrow-left"
                />
                <Text
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{fontWeight: 'bold', marginTop: 10}}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
      {/* </ScrollView>
            </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: false,
    };

    if (RNLocalize.getCountry() !== undefined) {
      console.log(RNLocalize.getCountry());
      if (RNLocalize.getCountry() == 'GB') {
        global.ApiUrl = 'https://em.ecdesk.org';
        global.ApiSecret = 'B6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvX';
        global.DialNumber = '999';
      } else if (RNLocalize.getCountry() == 'US') {
        global.ApiUrl = 'https://em.ecdesk-us.org';
        global.ApiSecret = 'B6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvX';
        global.DialNumber = '911';
      } else if (RNLocalize.getCountry() == 'AU') {
        global.ApiUrl = 'https://em.ecdesk.com.au';
        global.ApiSecret = 'B6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvX';
        global.DialNumber = '000';
      } else if (RNLocalize.getCountry() == 'NZ') {
        global.ApiUrl = 'https://em.ecdesk.dev';
        global.ApiSecret = 'n6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvj';
      } else {
        global.ApiUrl = 'https://em.ecdesk.dev';
        global.ApiSecret = 'n6EXKckC6nirW1viiW1G3B0pmEV5WXHACD3dTQvj';
      }
    }
  }

  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    AsyncStorage.setItem('FCMTokenString', JSON.stringify({token: fcmToken}));
    AsyncStorage.setItem('FCMTokenString', JSON.stringify(fcmToken));
    const fcmt = await AsyncStorage.getItem('FCMTokenString');
    console.log(fcmToken, 'fcmToken ================================');
    if (!fcmToken) {
      console.log('object');
      // if (Platform.OS === ' android') {
      await messaging().registerDeviceForRemoteMessages();
      // }
      const fcmToken1 = await messaging().getToken();
      console.log(fcmToken1, '~~~~~~~~~~~~~~~ new token');
      if (fcmToken1) {
        await AsyncStorage.setItem('fcmToken', fcmToken1);
        AsyncStorage.setItem(
          'FCMTokenString',
          JSON.stringify({token: fcmToken1}),
        );
      }
    }
  };

  checkPermission = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then((res) => {})
        .catch((error) => {
          console.error('Permission error: ', error);
        });
    }
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
    requestLocationPermission();
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  createNotificationListeners = async () => {
    this.onUnsubscribeNotificaitonListener = messaging()
      .getInitialNotification()
      .then((notifications) => {
        console.log(notifications?.notification);
      });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      (notificationOpen) => {
        const notification = notificationOpen.notification;
        if (notification._data.data !== undefined) {
          var notificationDataResponseDetails = JSON.parse(
            notification._data.data,
          );
          var notificationDataResponseTypeVar =
            notification._data.type.split('\\');
          var notificationDataResponseType =
            notificationDataResponseTypeVar[
              notificationDataResponseTypeVar.length - 1
            ];

          if (notificationDataResponseDetails.organisation_uuid !== undefined) {
            AsyncStorage.setItem(
              'selectedOrg',
              JSON.stringify({
                uuid: notificationDataResponseDetails.organisation_uuid,
              }),
            );
          }

          var notificationDescription = '';
          if (notificationDataResponseDetails.text !== undefined) {
            notificationDescription = notificationDataResponseDetails.text;
          } else if (
            notificationDataResponseDetails.description !== undefined
          ) {
            notificationDescription =
              notificationDataResponseDetails.description;
          } else if (
            notificationDataResponseDetails.instructions !== undefined
          ) {
            notificationDescription =
              notificationDataResponseDetails.instructions;
          }

          if (
            notificationDataResponseType == 'ProfileEventReminder' ||
            notificationDataResponseType == 'ProfileEventCreated' ||
            notificationDataResponseType == 'ProfileEventUpdated' ||
            notificationDataResponseType == 'ProfileEventDeleted'
          ) {
            let event_date = notificationDataResponseType.start_date
              ? notificationDataResponse.data.start_date
              : '';
            getDataParamUrl(
              'GET',
              'notification/' + notification._data.id + '',
            ).then((response) => {
              RootNavigation.push('Calendar', {
                payload: {
                  event_id: notificationDataResponseDetails.entity_id,
                  event_date: notificationDataResponseDetails.start_date,
                },
              });
            });
          } else if (
            notificationDataResponseType == 'ProfileTaskCreated' ||
            notificationDataResponseType == 'ProfileTaskUpdated' ||
            notificationDataResponseType == 'ProfileTaskReopened' ||
            notificationDataResponseType == 'ProfileTaskClosed' ||
            notificationDataResponseType == 'ProfileTaskReminder' ||
            notificationDataResponseType == 'ProfileTaskOverdue'
          ) {
            let taskType;
            let taskRe =
              notificationDataResponseType == 'ProfileTaskReopened'
                ? 'ProfileTaskReopened'
                : '';
            let urlType = 'task/' + notificationDataResponseDetails.entity_id;
            //mark as read
            getDataParamUrl('GET', urlType, true).then((response) => {
              if (response.message == undefined) {
                if (
                  response.due_date !== undefined &&
                  response.due_date !== null
                ) {
                  // convert due date in actual format
                  let due_date = response.due_date.split(' ')[0];
                  let due_date_task = new Date(due_date);
                  let today = new Date();
                  today.setHours(today.getHours() + 48);
                  if (response.status != 2 && response.status != 1) {
                    if (due_date_task.getTime() < today.getTime()) {
                      taskType = 'urgent';
                    } else if (due_date_task.getTime() > today.getTime()) {
                      taskType = 'warning';
                    }
                  } else if (response.status == 2 || response.status == 1) {
                    taskType = 'success';
                  }
                }
                //mark as read
                getDataParamUrl(
                  'GET',
                  'notification/' + notification._data.id + '',
                ).then((response) => {
                  RootNavigation.push('TaskView', {
                    taskId: notificationDataResponseDetails.entity_id,
                    taskType: taskType,
                    taskRe: taskRe,
                  });
                });
              }
            });
          } else if (
            notificationDataResponseType == 'ProfileEmessageCreated' ||
            notificationDataResponseType == 'ProfileEmessageUpdated'
          ) {
            let urlType =
              'emessages/' + notificationDataResponseDetails.entity_id;
            getDataParamUrl('GET', urlType, true).then((response) => {
              if (response.message == undefined) {
                var emessageDescription = response.emessages.description;
                var emessageCreatedDate = response.emessages.created_at;
                getDataParamUrl(
                  'GET',
                  'notification/' + notification._data.id + '',
                ).then((response) => {
                  RootNavigation.push('ViewMessage', {
                    messageId: notificationDataResponseDetails.entity_id,
                    name: notificationDataResponseDetails.name,
                    title: notificationDataResponseDetails.title,
                    dateSent:
                      moment(emessageCreatedDate).format('DD/MM/YYYY - HH:mm'),
                    description: emessageDescription,
                  });
                });
              }
            });
          } else if (
            notificationDataResponseType == 'ProfileChatClientReply' ||
            notificationDataResponseType == 'ProfileChatUpdateSent'
          ) {
            getDataParamUrl(
              'GET',
              'notification/' + notification._data.id + '',
            ).then((response) => {
              RootNavigation.push('ChatMessage', {});
            });
          } else {
            RootNavigation.push('Task', {});
          }
        }
      },
    );
    // This listener triggered when app is closed and we click,tapped and opened notification
    const notificationOpen = await firebase
      .messaging()
      .getInitialNotification();
    if (notificationOpen) {
      const notification = notificationOpen?.notification;
      if (notification._data.data !== undefined) {
        var notificationDataResponseDetails = JSON.parse(
          notification._data.data,
        );
        var notificationDataResponseTypeVar =
          notification._data.type.split('\\');
        var notificationDataResponseType =
          notificationDataResponseTypeVar[
            notificationDataResponseTypeVar.length - 1
          ];

        if (notificationDataResponseDetails.organisation_uuid !== undefined) {
          AsyncStorage.setItem(
            'selectedOrg',
            JSON.stringify({
              uuid: notificationDataResponseDetails.organisation_uuid,
            }),
          );
        }

        var notificationDescription = '';
        if (notificationDataResponseDetails.text !== undefined) {
          notificationDescription = notificationDataResponseDetails.text;
        } else if (notificationDataResponseDetails.description !== undefined) {
          notificationDescription = notificationDataResponseDetails.description;
        } else if (notificationDataResponseDetails.instructions !== undefined) {
          notificationDescription =
            notificationDataResponseDetails.instructions;
        }

        if (
          notificationDataResponseType == 'ProfileEventReminder' ||
          notificationDataResponseType == 'ProfileEventCreated' ||
          notificationDataResponseType == 'ProfileEventUpdated' ||
          notificationDataResponseType == 'ProfileEventDeleted'
        ) {
          let event_date = notificationDataResponseType.start_date
            ? notificationDataResponse.data.start_date
            : '';
          getDataParamUrl(
            'GET',
            'notification/' + notification._data.id + '',
          ).then((response) => {
            RootNavigation.push('Calendar', {
              payload: {
                event_id: notificationDataResponseDetails.entity_id,
                event_date: notificationDataResponseDetails.start_date,
              },
            });
          });
        } else if (
          notificationDataResponseType == 'ProfileTaskCreated' ||
          notificationDataResponseType == 'ProfileTaskUpdated' ||
          notificationDataResponseType == 'ProfileTaskReopened' ||
          notificationDataResponseType == 'ProfileTaskClosed' ||
          notificationDataResponseType == 'ProfileTaskReminder' ||
          notificationDataResponseType == 'ProfileTaskOverdue'
        ) {
          let taskType;
          let taskRe =
            notificationDataResponseType == 'ProfileTaskReopened'
              ? 'ProfileTaskReopened'
              : '';
          let urlType = 'task/' + notificationDataResponseDetails.entity_id;
          //mark as read
          getDataParamUrl('GET', urlType, true).then((response) => {
            if (response.message == undefined) {
              if (
                response.due_date !== undefined &&
                response.due_date !== null
              ) {
                // convert due date in actual format
                let due_date = response.due_date.split(' ')[0];
                let due_date_task = new Date(due_date);
                let today = new Date();
                today.setHours(today.getHours() + 48);
                if (response.status != 2 && response.status != 1) {
                  if (due_date_task.getTime() < today.getTime()) {
                    taskType = 'urgent';
                  } else if (due_date_task.getTime() > today.getTime()) {
                    taskType = 'warning';
                  }
                } else if (response.status == 2 || response.status == 1) {
                  taskType = 'success';
                }
              }
              //mark as read
              getDataParamUrl(
                'GET',
                'notification/' + notification._data.id + '',
              ).then((response) => {
                RootNavigation.push('TaskView', {
                  taskId: notificationDataResponseDetails.entity_id,
                  taskType: taskType,
                  taskRe: taskRe,
                });
              });
            }
          });
        } else if (
          notificationDataResponseType == 'ProfileEmessageCreated' ||
          notificationDataResponseType == 'ProfileEmessageUpdated'
        ) {
          let urlType =
            'emessages/' + notificationDataResponseDetails.entity_id;
          getDataParamUrl('GET', urlType, true).then((response) => {
            if (response.message == undefined) {
              var emessageDescription = response.emessages.description;
              var emessageCreatedDate = response.emessages.created_at;
              getDataParamUrl(
                'GET',
                'notification/' + notification._data.id + '',
              ).then((response) => {
                RootNavigation.push('ViewMessage', {
                  messageId: notificationDataResponseDetails.entity_id,
                  name: notificationDataResponseDetails.name,
                  title: notificationDataResponseDetails.title,
                  dateSent:
                    moment(emessageCreatedDate).format('DD/MM/YYYY - HH:mm'),
                  description: emessageDescription,
                });
              });
            }
          });
        } else if (
          notificationDataResponseType == 'ProfileChatClientReply' ||
          notificationDataResponseType == 'ProfileChatUpdateSent'
        ) {
          getDataParamUrl(
            'GET',
            'notification/' + notification._data.id + '',
          ).then((response) => {
            RootNavigation.push('ChatMessage', {});
          });
        } else {
          RootNavigation.push('Task', {});
        }
      }
    }
  };

  removeNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener;
  };

  componentDidMount() {
    // Build a channel
    // const channel = new messaging.android.Channel(
    //   'test-channel',
    //   'Test Channel',
    //   messaging.Android.Importance.Max,
    // ).setDescription('My apps test channel');

    // Create the channel
    this.checkPermission();
    this.createNotificationListeners();
    SplashScreen.hide();
    // this.getCurrentLocation();
  }

  componentWillUnmount() {
    this.removeNotificationListeners();
  }

  render() {
    // const theme = useTheme()
    return (
      <NativeBaseProvider>
        {/* // <> */}
        <RootStack />
        <FlashMessage position="top" />
        {/* </> */}
      </NativeBaseProvider>
    );
  }
}
