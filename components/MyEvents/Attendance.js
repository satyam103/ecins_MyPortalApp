import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
// import style from '../css/style';
import ValidationComponent from 'react-native-form-validator';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Attendance extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      joinTime: '',
      time: '0hr 0min 0sec',
      spinner: false,
    };
    // this.timer = null;
  }
  // const Attendance = (props) => {
  // constuctor(props)
  // const [data,setData] = useState(props.data)
  // console.log(props.data)
  //   const [dte, setDt] = useState(new Date());
  //   const getCurrentDate = () => {
  // const dt = new Date();
  // var date = dt.getDate();
  // var month = dt.getMonth() + 1;
  // var year = dt.getFullYear();
  // var hour = dt.getHours();
  // var min = dt.getMinutes();
  // var sec = dt.getSeconds();
  // var ampm = 'AM';
  // if (date < 10) {
  //   date = '0' + date;
  // }
  // if (month < 10) {
  //   month = '0' + month;
  // }
  // if (sec < 10) {
  //   sec = '0' + sec;
  // }
  // if (min < 10) {
  //   min = '0' + min;
  // }
  // if (hour > 12) {
  //   hour = hour - 12;
  //   ampm = 'PM';
  // }
  // return (
  //   date +
  //   '-' +
  //   month +
  //   '-' +
  //   year +
  //   ', ' +
  //       hour + ':' + min + ':' + sec + ' ' + ampm
  //     );
  //   };
  //   const [timer, setTimer] = useState(0);
  //   const [time, setTime] = useState(0 + 'hr ' + 0 + 'min ' + 0 + 'sec');
  //   const [timemin, setTimemin] = useState(0);
  //   const [timehr, setTimehr] = useState(0);

  //   useEffect(() => {
  //     let secTimer = setInterval(() => {
  //       setTimer(timer + 1);
  //     }, 1000);

  //     return () => clearInterval(secTimer);
  //   });
  //   useEffect(() => {
  //     getTime();
  //   });
  UNSAFE_componentWillMount = async () => {
    this.getJoinedTime();
    clearInterval(this.time);
  };
  getJoinedTime = async () => {
    const joinedTime = await AsyncStorage.getItem('joinedAt');
    const lectureDetails = await AsyncStorage.getItem('lectureDetails');
    console.log(joinedTime, '====-----------------');
    if (joinedTime !== undefined && joinedTime !== null) {
      this.setState({joinTime: joinedTime});
      this.setState({data: lectureDetails.split('/')});
    } else {
      this.setState({joinTime: ''});
      this.setState({data: []});
    }
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
  componentDidMount = async () => {
    // Start the timer when the component mounts
    setInterval(() => {
      if (this.state.joinTime !== '' && this.state.joinTime !== null) {
        this.getTime();
      }
    }, 1000); // Set the interval to 1000 milliseconds (1 second)
    if (joined === null && joined === '') {
      this.props.navigation.push('ScanScreen');
    }
  };
  endSession = async () => {
    try {
      await AsyncStorage.removeItem('joinedAt');
      await AsyncStorage.removeItem('lectureDetails');

      this.getJoinedTime();
    } catch (error) {
      console.log(error, 'error in ending session');
    }
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          elevation: 5,
          borderRadius: 15,
          padding: 15,
          margin: 5,
        }}>
        <Spinner visible={this.state.spinner} textContent={'Loading...'} />
        {this.state.joinTime ? (
          <>
            <View style={styles.attendanceCard}>
              <View style={styles.cardHeading}>
                <Text style={styles.title}>{'Event Name'}</Text>
                <Text style={styles.details}>2 hr</Text>
              </View>
              <View style={styles.duration}>
                <Text style={styles.title1}>Joined at-</Text>
                <Text style={styles.status}>{this.state.joinTime}</Text>
              </View>
            </View>
            <View style={styles.timeContent}>
              <Text style={styles.time}>{this.state.time}</Text>
            </View>
            <Button colorScheme={'danger'} onPress={() => this.endSession()}>
              <Text style={{color: 'white', fontSize: 16}}>End Session</Text>
            </Button>
          </>
        ) : (
          <View>
            <Text>No Ongoing Event found</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  attendanceCard: {
    width: '100%',
    padding: 10,
    marginHorizontal: 10,
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
    color: 'rgb(240,70,50)',
    fontWeight: 'bold',
    fontFamily: 'times new roman',
    fontSize: 14,
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 10,
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

// export default Attendance;
