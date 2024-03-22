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
  TextInput,
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
  Input,
  Item,
  Button,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'moment';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import QRCode from 'react-native-qrcode-generator';

export default class PasscodeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsValidPasscode: true,
      Passcode: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.resetPasscode);
  }

  resetPasscode = () => {
    this.setState({Passcode: ''});
  };

  checkPasscodeLogin = () => {
    AsyncStorage.getItem('passCodeDetails', (err, result) => {
      let passResponse = JSON.parse(result);
      if (passResponse != null) {
        if (this.state.Passcode == passResponse.passcodeVal) {
          AsyncStorage.setItem('loginStatus', JSON.stringify({status: true}));
          this.setState({IsValidPasscode: true});
          AsyncStorage.getItem('WheatherApp', (err, result) => {
            let wheatherResponse = JSON.parse(result);
            console.log(wheatherResponse);
            if (wheatherResponse !== null) {
              if (wheatherResponse.isEnable)
                this.props.navigation.navigate('HideFunction');
              else this.props.navigation.navigate('Task');
            } else {
              this.props.navigation.navigate('Task');
            }
          });
        } else {
          this.setState({IsValidPasscode: false});
        }
      }
    });
  };

  render() {
    return (
      <Container>
        {this.state.loggedInUser && (
          <Header style={Styles.LoginViewappHeader}>
            <AppHeader />
          </Header>
        )}
        <View>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.LoginViewscrollView}>
              <View style={Styles.LoginViewbody}>
                <View style={Styles.LoginViewsectionContainer}>
                  <View style={Styles.LoginViewloginContainer}>
                    <Text style={Styles.ResetViewloginTitle}>
                      {'\n'}Enter Passcode{'\n'}
                    </Text>
                    <View>
                      <TextInput
                        secureTextEntry={true}
                        keyboardType="numeric"
                        style={[
                          Styles.LoginViewloginInputBoxArea,
                          {borderColor: '#ccc', borderBottomWidth: 1},
                        ]}
                        onChangeText={(Passcode) => this.setState({Passcode})}
                        value={this.state.Passcode}
                      />
                      {!this.state.IsValidPasscode && (
                        <Text style={Styles.LoginViewerrorMsg}>
                          Incorrect passcode, please try again
                        </Text>
                      )}
                    </View>
                    <View style={Styles.ResetViewbtnView}>
                      <Button
                        onPress={this.checkPasscodeLogin}
                        disabled={this.state.btnDisabled}
                        full
                        success
                        style={
                          this.state.btnDisabled
                            ? Styles.ResetViewbtnViewLayoutDisable
                            : Styles.ResetViewbtnViewLayout
                        }>
                        <Text style={Styles.ResetViewbtnViewText}> Login </Text>
                      </Button>
                      <Text
                        style={{marginTop: 10}}
                        onPress={() =>
                          this.props.navigation.push('Login', {
                            page: 'passcodeLogin',
                          })
                        }>
                        Forgot Passcode ?
                      </Text>
                      {/*<Button full danger style={Styles.ResetViewbtnViewLayout}><Text style={Styles.ResetViewbtnViewText}> Reset </Text></Button>*/}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Container>
    );
  }
}
