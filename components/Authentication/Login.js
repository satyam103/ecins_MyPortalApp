import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  // Button,
  Accordion,
  Image,
  TextInput,
} from 'react-native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '../css/style';
import * as RootNavigation from '../../RootNavigation.js';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import Dialog, {DialogContent, ScaleAnimation} from 'react-native-popup-dialog';

export default class Login extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: false,
      profileError: false,
      spinner: false,
      icon: 'eye-slash',
      passwordStatus: true,
      popup4: false,
    };
  }

  componentDidMount() {
    const authDetails = AsyncStorage.getItem('authDetails', (err, result) => {
      let authResponse = JSON.parse(result);
      if (authResponse !== null && this.props.route.params === undefined) {
        AsyncStorage.getItem('passCodeDetails', (err, result) => {
          let passResponse = JSON.parse(result);
          if (passResponse != null) {
            AsyncStorage.getItem('loginStatus', (err, result) => {
              let statusResponse = JSON.parse(result);
              if (!statusResponse.status) {
                this.props.navigation.navigate('PasscodeLogin');
              } else {
                AsyncStorage.getItem('WheatherApp', (err, result) => {
                  let wheatherResponse = JSON.parse(result);
                  if (wheatherResponse !== null) {
                    if (wheatherResponse.isEnable)
                      this.props.navigation.navigate('HideFunction');
                    else this.props.navigation.navigate('Task');
                  } else {
                    this.props.navigation.navigate('Task');
                  }
                });
              }
            });
          } else {
            AsyncStorage.getItem('loginStatus', (err, result) => {
              let statusResponse = JSON.parse(result);
              if (!statusResponse.status) {
                this.props.navigation.navigate('Login');
              } else {
                this.props.navigation.navigate('Task');
              }
            });
          }
        });
      }
    });
  }

  _chagneIcon() {
    this.setState((prevState) => ({
      icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
      passwordStatus: !prevState.passwordStatus,
    }));
  }

  async onFetchLoginRecords() {
    var formData = {
      username: this.state.email.toLowerCase(),
      password: this.state.password,
      client_id: 2,
      client_secret: global.ApiSecret,
      grant_type: 'password',
      scope: '*',
    };
    const myHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    var raw = JSON.stringify(formData);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(formData)
    console.log(global.ApiUrl + '/api/oauth/token')
    fetch(global.ApiUrl + '/api/oauth/token', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.access_token !== undefined) {
          AsyncStorage.setItem('authDetails', JSON.stringify(responseJson));
          this.loginDetails(
            responseJson.profile_uuid,
            responseJson.access_token,
          );
        } else {
          this.setState({loginError: true});
        }
      })
      .catch((error) => {
        console.log(error, 'jjjnjnj');
        this.setState({loginError: true});
      });
  }

  // get login and organizations details
  async loginDetails(profile_uuid, access_token) {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + access_token);
    myHeaders.append('Cookie', 'logged_in=1');

    var getRequestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    this.setState({spinner: true});
    fetch(
      global.ApiUrl + '/api/profiles/' + profile_uuid + '/organisations',
      getRequestOptions,
    )
      .then((response) => response.json())
      .then((responseOrganizationJson) => {
        if (responseOrganizationJson.length != 0) {
          this.setState({spinner: false});
          AsyncStorage.setItem(
            'selectedOrg',
            JSON.stringify({uuid: responseOrganizationJson[0].uuid}),
          );
          AsyncStorage.setItem(
            'organizationDetails',
            JSON.stringify(responseOrganizationJson),
          );
          AsyncStorage.setItem('loginStatus', JSON.stringify({status: true}));
          // check if popup appear before
          AsyncStorage.getItem('passCodePopup', (err, result) => {
            let popupAppearResponse = JSON.parse(result);
            if (!popupAppearResponse) {
              this.removePopup();
            }
          });

          const task = '';
          // FCM TOKEN STORE
          AsyncStorage.getItem('FCMTokenString', (err, result) => {
            console.log(result);
            let authResponse = JSON.parse(result);
            console.log(authResponse);
            var tokenStr = '';
            if (authResponse.token === undefined) {
              tokenStr = authResponse;
            } else {
              tokenStr = authResponse.token;
            }

            let FCMData = {
              device_id: DeviceInfo.getUniqueId(),
              fcm: tokenStr,
            };
            const raw = JSON.stringify(FCMData);
            var myHeaders = new Headers();
            myHeaders.append('Accept', 'application/json');
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', 'Bearer ' + access_token);
            myHeaders.append('Cookie', 'logged_in=1');

            var postRequestOptions = {
              method: 'POST',
              headers: myHeaders,
              redirect: 'follow',
              body: raw,
            };
            if (responseOrganizationJson[0] !== undefined) {
              Object.keys(responseOrganizationJson).map(function (
                keyName,
                keyIndex,
              ) {
                fetch(
                  global.ApiUrl +
                    '/api/organisations/' +
                    responseOrganizationJson[keyName].uuid +
                    '/profile/' +
                    profile_uuid +
                    '/fcm',
                  postRequestOptions,
                )
                  .then((response) => response.json())
                  .then((responseJson) => {})
                  .catch((error) => {
                    console.log(error);
                    this.setState({loginError: true});
                  });
              });
            }
          }).then((res) => {
            this.props.navigation.navigate('Task');
          });
        } else {
          this.props.navigation.navigate('Login');
          this.setState({profileError: true});
          AsyncStorage.setItem('loginStatus', JSON.stringify({status: false}));
          this.setState({spinner: false});
        }
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  _onPressButton = () => {
    if (this.state.password != '' && this.state.email != '') {
      this.onFetchLoginRecords();
    } else {
      this.setState({loginError: true});
    }
  };

  redirectToPasscode = () => {
    this.setState({popup4: false});
    this.props.navigation.push('Passcode');
  };

  removePopup = () => {
    AsyncStorage.setItem('passCodePopup', JSON.stringify({status: true}));
    AsyncStorage.getItem('passCodeDetails', (err, result) => {
      let passResponse = JSON.parse(result);
      if (passResponse == null || passResponse == undefined) {
        this.setState({popup4: true});
      }
    });
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{backgroundColor: 'white'}}>
        {this.state.loggedInUser && (
          <View style={Styles.LoginViewappHeader}>
            <AppHeader />
          </View>
        )}
        <View>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.LoginViewscrollView}>
              <View style={Styles.LoginViewbody}>
                <View style={Styles.LoginViewsectionContainer}>
                  <View style={Styles.LoginViewloginContainer}>
                    <View style={Styles.LoginViewappLogoContatainer}>
                      <Image
                        style={Styles.LoginViewappLogo}
                        source={require('../../assets/images/myportal_logo.png')}
                      />
                    </View>
                    <Text style={Styles.LoginViewloginTitle}>Login</Text>
                    <View>
                      {this.state.profileError && (
                        <View style={Styles.ProfileViewError}>
                          <Text style={Styles.ProfileViewMsg}>
                            This email isn’t linked to an active account. Please
                            click accept in your email invite then try again.
                          </Text>
                        </View>
                      )}
                      <View regular style={Styles.LoginViewloginInput}>
                        <TextInput
                          ref="email"
                          style={Styles.LoginViewloginInputBoxArea}
                          placeholder="Email"
                          onChangeText={(email) => this.setState({email})}
                        />
                      </View>

                      <View regular style={Styles.LoginViewloginInput}>
                        <TextInput
                          ref="password"
                          style={[
                            Styles.LoginViewloginInputBoxArea,
                            {marginRight: -25},
                          ]}
                          placeholder="Password"
                          onChangeText={(password) => this.setState({password})}
                          secureTextEntry={this.state.passwordStatus}
                        />
                        <Icon
                          name={this.state.icon}
                          onPress={() => this._chagneIcon()}
                          size={15}
                          style={{paddingRight: 10}}
                        />
                      </View>
                    </View>
                    <View style={Styles.LoginViewbtnView}>
                      {this.state.loginError && (
                        <Text style={Styles.LoginViewError}>
                          Username or password is not matching
                        </Text>
                      )}
                      <Button
                        full
                        colorScheme={'success'}
                        style={Styles.LoginViewbtnViewLayout}
                        onPress={this._onPressButton}
                        title="Submit">
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          Submit
                        </Text>
                      </Button>
                      <View style={Styles.LoginViewstyleborderlayout}></View>
                      <Button
                        onPress={() => navigate('ResetPassword')}
                        full
                        bordered
                        danger
                        style={Styles.LoginViewbtnViewLayoutForgot}
                        title="Reset Password ?">
                        <Text style={{color: '#4A90E2', fontWeight: 'bold'}}>
                          Reset
                        </Text>
                      </Button>
                    </View>
                  </View>
                </View>

                <Dialog
                  visible={this.state.popup4}
                  onTouchOutside={() => {
                    this.setState({popup4: false, moodType: 0, journalMsg: ''});
                  }}
                  dialogAnimation={
                    new ScaleAnimation({
                      initialValue: 0, // optional
                      useNativeDriver: true, // optional
                    })
                  }
                  width={0.9}
                  height={100}>
                  <DialogContent>
                    <Text style={Styles.JournalListemojoTitle}>
                      Do you want to set a passcode for this app?
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View style={{flex: 1, marginTop: 30, width: '20%'}}>
                        <Button
                          full
                          onPress={() => {
                            this.setState({popup4: false});
                          }}
                          style={[
                            Styles.JournalListemojiAfterPopupBtn,
                            {backgroundColor: '#9A9A9A', borderRadius: 5},
                          ]}
                          title="No"
                        />
                      </View>
                      <View style={{marginLeft: 10}}></View>
                      <View style={{flex: 1, marginTop: 30, width: '20%'}}>
                        <Button
                          full
                          onPress={this.redirectToPasscode}
                          style={Styles.JournalListemojiAfterPopupBtn}
                          title="Yes"
                        />
                      </View>
                    </View>
                  </DialogContent>
                </Dialog>
              </View>
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
        {this.state.loggedInUser && (
          <View>
            <AppFooter />
          </View>
        )}
      </View>
    );
  }
}
