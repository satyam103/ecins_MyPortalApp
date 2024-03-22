import React, {Component, useState} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  PermissionsAndroid,
  Platform,
  View,
  Pressable,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
// import { request } from 'react-native-permissions';
import {PERMISSIONS, request} from 'react-native-permissions';
import ValidationComponent from 'react-native-form-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import AppFooter from '../Footer/Footer';
import {getDataParamUrl} from '../utility';

export default class ScanScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      currTime: '',
      spinner: false,
      joined: false,
      data: [],
      joinTime: '',
      time: '0hr 0min 0sec',
      accessToken: '',
    };
    this.date = new Date();
  }
  UNSAFE_componentWillMount = async () => {
    this.getJoinedTime();
    this.getData();
    clearInterval(this.time);
  };
  getData = async () => {
    const authDetails = await AsyncStorage.getItem('authDetails');
    const authResponse = JSON.parse(authDetails);
    const access_token = authResponse.access_token;
    this.setState({accessToken: access_token});
  };
  getJoinedTime = async () => {
    const joinedTime = await AsyncStorage.getItem('joinedAt');
    if (joinedTime !== null && joinedTime != '') {
      const lectureDetails = await AsyncStorage.getItem('lectureDetails');
      this.setState({joined: true});
      this.setState({data: lectureDetails.split('/')});
      this.setState({joinTime: joinedTime});
    }
  };
  onSuccess = async (e) => {
    const data = e.data.split('/');
    console.log(e);
    AsyncStorage.setItem('joinedAt', this.currentTime());
    AsyncStorage.setItem('lectureDetails', e.data);
    this.setState({data: data});
    this.setState({joined: true});
    this.setState({joinTime: this.currentTime()});
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + this.state.accessToken);
    myHeaders.append('Cookie', 'logged_in=1');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const response = await fetch(e.data, requestOptions);
    console.log(await response.json());
    this.props.navigation.push('MyEvents');
  };
  componentDidMount = async () => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA).then((res) => console.log(res));
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    }

    this.setState({spinner: true});
    setInterval(() => {
      this.getTime();
    }, 1000);
    this.setState({spinner: false});
  };
  currentTime = () => {
    var hour = this.date.getHours();
    var min = this.date.getMinutes();
    var sec = this.date.getSeconds();
    var ampm = 'AM';
    if (sec < 10) {
      sec = '0' + sec;
    }
    if (min < 10) {
      min = '0' + min;
    }
    if (hour > 12) {
      hour = hour - 12;
      ampm = 'PM';
    }
    this.setState({currTime: hour + ':' + min + ':' + sec + ' ' + ampm});
    return hour + ':' + min + ':' + sec + ' ' + ampm;
  };
  getTime = () => {
    var cHours = new Date().getHours(); //Current Hours
    var cMin = new Date().getMinutes(); //Current Minutes
    var cSec = new Date().getSeconds(); //Current Seconds
    var joinedTime = this.state.joinTime;
    joinedTime = joinedTime.split(' ');
    var ampm = joinedTime[1];
    var joinedTime1 = joinedTime[0];
    joinedTime1 = joinedTime1.split(':');
    if (ampm === 'PM') {
      joinedTime1[0] = Number(joinedTime1[0]) + 12;
    }
    var currTime = [cHours, cMin, cSec];
    this.calculateTimeDifference(joinedTime1, currTime);
  };
  calculateTimeDifference(joinTime, currTime) {
    var [jHr, jMin, jSec] = joinTime;
    var [cHr, cMin, cSec] = currTime;
    const startTime = new Date();
    startTime.setHours(jHr, jMin, jSec); // Set to 8:24:30

    const endTime = new Date();
    endTime.setHours(cHr, cMin, cSec); // Set to 9:05:20

    // Calculate the time difference in milliseconds
    const timeDifference = endTime - startTime;

    // Convert the time difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    this.setState({time: `${hours}hr ${minutes}min ${seconds}sec`});
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <Spinner visible={this.state.spinner} textContent={'Loading...'} />
        {!this.state.joined && (
          <QRCodeScanner
            onRead={this.onSuccess}
            reactivate={false}
            showMarker={true}
            containerStyle={{width: '100%', height: '100%'}}
            topContent={
              <Text style={styles.centerText}>
                <Text style={styles.textBold}>
                  Scan the QR code to mark your attendance
                </Text>
              </Text>
            }
            bottomContent={
              <TouchableOpacity
                style={styles.buttonTouchable}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  attendanceCard: {
    width: '90%',
    padding: 10,
    marginTop: 20,
    elevation: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#43c2f0',
  },
  cardHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: '65%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'times new roman',
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'times new roman',
  },
  details: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'times new roman',
  },
  status: {
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'times new roman',
  },
  duration: {
    flexDirection: 'row',
  },
  joiningTitle: {
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  joinTiming: {
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  desc: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 15,
  },
  timeContent: {
    // elevation: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  time: {
    fontSize: 22,
    // elevation: 15,
    color: 'green',
    fontWeight: 'bold',
    textShadowRadius: 10,
  },
});
