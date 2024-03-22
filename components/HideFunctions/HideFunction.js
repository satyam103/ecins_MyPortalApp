import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Feather';
import {
  Left,
  List,
  ListItem,
  Right,
  Body,
  Container,
  Content,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'moment';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HideFunction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLongitude: '', //Initial Longitude
      currentLatitude: '', //Initial Latitude
      tempratureMain: '',
      tempratureDesc: '',
      tempratureImg: '""',
      temprature: '',
      spinner: false,
      tempraturePressure: '',
      tempratureHumidity: '',
      tempratureWindSpeed: '',
      tempratureWindDirection: '',
      tempratureCloud: '',
      tempratureSunrise: '',
      tempratureSunset: '',
    };

    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json

        this.setState({currentLongitude: currentLongitude});
        this.setState({currentLatitude: currentLatitude});

        console.log(this.state.currentLatitude);
        console.log(this.state.currentLongitude);
        // spinner true
        this.setState({spinner: true});
        // get the MyEvents details
        fetch(
          'https://api.openweathermap.org/data/2.5/onecall?lat=' +
            this.state.currentLatitude +
            '&lon=' +
            this.state.currentLongitude +
            '&appid=4d56089e94ceb72dc8613d14e85f655a&units=metric',
          {
            method: 'GET',
          },
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.lat !== undefined) {
              // console.log(responseJson)
              this.setState({
                tempratureMain: responseJson.current.weather[0].main,
              });
              this.setState({
                tempratureDesc: responseJson.current.weather[0].description,
              });
              this.setState({
                tempratureImg:
                'http://openweathermap.org/img/w/' +
                responseJson.current.weather[0].icon +
                '.png',
              });
              this.setState({temprature: parseInt(responseJson.current.temp)});
              this.setState({tempratureCloud: responseJson.current.clouds});
              this.setState({
                tempratureHumidity: responseJson.current.humidity,
              });
              this.setState({
                tempraturePressure: responseJson.current.pressure,
              });
              this.setState({
                tempratureWindSpeed: responseJson.current.wind_speed,
              });
              this.setState({
                tempratureWindDirection: responseJson.current.wind_deg,
              });
              var tstart = new Date(responseJson.current.sunrise);
              var formatted = moment(responseJson.current.sunrise).format(
                'DD/MM/YYYY - HH:mm',
              );
              var tend = new Date(responseJson.current.sunset);

              var t = new Date(responseJson.current.sunrise * 1000);
              var formatted =
                ('0' + t.getHours()).slice(-2) +
                ':' +
                ('0' + t.getMinutes()).slice(-2);

              var t1 = new Date(responseJson.current.sunset * 1000);
              var formatted1 =
                ('0' + t1.getHours()).slice(-2) +
                ':' +
                ('0' + t1.getMinutes()).slice(-2);

              this.setState({tempratureSunrise: formatted});
              this.setState({tempratureSunset: formatted1});
            }
            // spinner false
            this.setState({spinner: false});
          })
          .catch((error) => {
            console.error(error + 'catch error');
          });
      },
      (error) => console.log(error.message + 'geolocation error'),
      {
        enableHighAccuracy: false,
        timeout: 20000,
      },
    );

    Geolocation.watchPosition((position) => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json

      this.setState({currentLongitude: currentLongitude});
      this.setState({currentLatitude: currentLatitude});

      console.log(this.state.currentLatitude);
      console.log(this.state.currentLongitude);
      // spinner true
      this.setState({spinner: true});
      // get the MyEvents details
      fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          this.state.currentLatitude +
          '&lon=' +
          this.state.currentLongitude +
          '&appid=4d56089e94ceb72dc8613d14e85f655a&units=metric',
        {
          method: 'GET',
        },
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.lat !== undefined) {
            console.log(responseJson.current)
            this.setState({
              tempratureMain: responseJson.current.weather[0].main,
            });
            this.setState({
              tempratureDesc: responseJson.current.weather[0].description,
            });
            this.setState({
              tempratureImg:
                'http://openweathermap.org/img/w/' +
                responseJson.current.weather[0].icon +
                '.png',
            });            
      
            this.setState({temprature: parseInt(responseJson.current.temp)});
            this.setState({tempratureCloud: responseJson.current.clouds});
            this.setState({tempratureHumidity: responseJson.current.humidity});
            this.setState({tempraturePressure: responseJson.current.pressure});
            this.setState({
              tempratureWindSpeed: responseJson.current.wind_speed,
            });
            this.setState({
              tempratureWindDirection: responseJson.current.wind_deg,
            });
            var tstart = new Date(responseJson.current.sunrise);
            var formatted = moment(responseJson.current.sunrise).format(
              'DD/MM/YYYY - HH:mm',
            );
            var tend = new Date(responseJson.current.sunset);

            var t = new Date(responseJson.current.sunrise * 1000);
            var formatted =
              ('0' + t.getHours()).slice(-2) +
              ':' +
              ('0' + t.getMinutes()).slice(-2);

            var t1 = new Date(responseJson.current.sunset * 1000);
            var formatted1 =
              ('0' + t1.getHours()).slice(-2) +
              ':' +
              ('0' + t1.getMinutes()).slice(-2);

            this.setState({tempratureSunrise: formatted});
            this.setState({tempratureSunset: formatted1});
          }
          // spinner false
          this.setState({spinner: false});
        })
        .catch((error) => {
          console.error(error + 'catch error');
        });
    });
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.setWheatherAppData);
  }

  setWheatherAppData = () => {
    //this.props.navigation.goBack(null);
    AsyncStorage.setItem('WheatherApp', JSON.stringify({isEnable: true}));
  };

  handleBackButton = () => {
    //this.props.navigation.goBack(null);
    AsyncStorage.setItem('WheatherApp', JSON.stringify({isEnable: true}));
    BackHandler.exitApp();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //this.props.navigation.goBack(null);
    AsyncStorage.setItem('WheatherApp', JSON.stringify({isEnable: true}));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <View>
        <View>
          <SafeAreaView>
            <TouchableHighlight
              underlayColor="none"
              style={{paddingBottom: 25}}
              delayLongPress={3000}
              onLongPress={() => {
                this.props.navigation.navigate('MyEvents');
              }}>
              <ScrollView
                // style={{flex: 1}}
                contentContainerStyle={{flexGrow: 1}}
                >
                <TouchableOpacity
                  underlayColor="none"
                  delayLongPress={3000}
                  onLongPress={() => {
                    this.props.navigation.navigate('MyEvents');
                  }}>
                  <TouchableOpacity
                    underlayColor="none"
                    delayLongPress={3000}
                    onLongPress={() => {
                      this.props.navigation.navigate('MyEvents');
                    }}
                    style={{paddingHorizontal: 20, marginBottom: 20}}>
                    <View style={{alignSelf: 'center'}}>
                      <Image
                        style={{width: 100, height: 100}}
                        source={this.state?.tempratureImg && {
                          uri: this.state.tempratureImg,
                        }}
                        onPress={() => this.props.navigation.navigate('MyEvents')}
                      />
                      {/* <Text style={{color:'black'}}>vvhvjhb</Text> */}
                    </View>
                    <TouchableOpacity
                      underlayColor="black"
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        borderBottomColor: '#CBCBCB',
                        borderBottomWidth: 2,
                        marginTop: 10,
                        paddingBottom: 10,
                      }}>
                      <Text
                        style={{textAlign: 'left', fontSize: 20, width: '80%'}}>
                        {this.state.tempratureMain}
                      </Text>
                      <Text style={{textAlign: 'right', fontSize: 20}}>
                        {this.state.temprature}°C
                      </Text>
                    </TouchableOpacity>

                    <View
                      button={true}
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      icon
                      style={{
                        borderBottomColor: 'transparent',
                        borderBottomWidth: 0,
                      }}>
                      <View>
                        <Image
                          source={require('../../assets/images/sunrise.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{color: '#999'}}>Sunrise</Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{textAlign: 'right', color: '#999'}}>
                          {this.state.tempratureSunrise}
                        </Text>
                      </View>
                    </View>

                    <View
                      button={true}
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      icon>
                      <View>
                        <Image
                          source={require('../../assets/images/sunset.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>
                      <View>
                        <Text style={{color: '#999'}}>Sunset</Text>
                      </View>
                      <View>
                        <Text style={{textAlign: 'right', color: '#999'}}>
                          {this.state.tempratureSunset}
                        </Text>
                      </View>
                    </View>

                    <View
                      button={true}
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      icon>
                      <View>
                        <Image
                          source={require('../../assets/images/cloud.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{color: '#999'}}>Cloud Coverage</Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{textAlign: 'right', color: '#999'}}>
                          {this.state.tempratureCloud}%
                        </Text>
                      </View>
                    </View>

                    <View
                      button={true}
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      icon>
                      <View>
                        <Image
                          source={require('../../assets/images/humidity.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{color: '#999'}}>Humidity</Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{textAlign: 'right', color: '#999'}}>
                          {this.state.tempratureHumidity}%
                        </Text>
                      </View>
                    </View>

                    <View
                      button={true}
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      icon>
                      <View>
                        <Image
                          source={require('../../assets/images/pressure.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>
                      <View>
                        <Text style={{color: '#999'}}>Pressure</Text>
                      </View>
                      <View>
                        <Text style={{textAlign: 'right', color: '#999'}}>
                          {this.state.tempraturePressure} hpa
                        </Text>
                      </View>
                    </View>

                    <View
                      button={true}
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      icon>
                      <View>
                        <Image
                          source={require('../../assets/images/wind.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{color: '#999'}}>Wind Speed</Text>
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'transparent',
                          borderBottomWidth: 0,
                        }}>
                        <Text style={{textAlign: 'right', color: '#999'}}>
                          {this.state.tempratureWindSpeed} mph
                        </Text>
                      </View>
                    </View>

                    <View
                      button={true}
                      delayLongPress={3000}
                      onLongPress={() => {
                        this.props.navigation.navigate('MyEvents');
                      }}
                      icon>
                      <View>
                        <Image
                          source={require('../../assets/images/wind-direction.png')}
                          style={{height: 25, width: 25}}
                        />
                      </View>
                      <View>
                        <Text style={{color: '#999'}}>Wind Direction</Text>
                      </View>
                      <View>
                        <Text style={{textAlign: 'right', color: '#999'}}>
                          {this.state.tempratureWindDirection}°
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
              </ScrollView>
            </TouchableHighlight>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
