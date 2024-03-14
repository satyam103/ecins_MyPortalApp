import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Feather';
import {
  Button,
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'moment';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {stat} from 'react-native-fs';
//import QRCode from 'react-native-qrcode-generator';

export default class ChangePasscode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDisabled: true,
      Passcode: '',
      OldPasscode: '',
    };
  }

  setPasscodeData = () => {
    let responseJson = {
      passcodeEnable: true,
      passcodeVal: this.state.Passcode,
    };
    // get auth details and update login details inside json
    AsyncStorage.setItem('passCodeDetails', JSON.stringify(responseJson));
    this.props.navigation.navigate('Task');
  };

  changePasscodeData = (PasscodeData, status) => {
    if (status == 'new') {
      this.setState({Passcode: PasscodeData});
    }
    if (this.state.Passcode.length > 2) {
      this.setState({initialDisabled: false});
    }
  };

  render() {
    return (
      <View>
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
                      {'\n'}Change Passcode{'\n'}
                    </Text>
                    <View style={{marginTop: 5}}>
                      <Text>New Passcode</Text>
                      <TextInput
                        secureTextEntry={true}
                        keyboardType="numeric"
                        style={[
                          Styles.LoginViewloginInputBoxArea,
                          {
                            borderColor: '#ccc',
                            borderWidth: 1,
                            paddingBottom: 2,
                            paddingTop: 2,
                            borderRadius: 5,
                            marginTop: 5,
                          },
                        ]}
                        onChangeText={(Passcode) =>
                          this.changePasscodeData(Passcode, 'new')
                        }
                        value={this.state.Passcode}
                      />
                      <Text style={{marginTop: 10}}>
                        Passcode must be at least 4 digits
                      </Text>
                    </View>
                    <View style={Styles.ResetViewbtnView}>
                      <Button
                        disabled={this.state.initialDisabled}
                        onPress={this.setPasscodeData}
                        full
                        success
                        style={
                          this.state.initialDisabled
                            ? Styles.ResetViewbtnViewLayoutDisable
                            : Styles.ResetViewbtnViewLayout
                        }>
                        <Text style={Styles.ResetViewbtnViewText}>
                          {' '}
                          Save Passcode{' '}
                        </Text>
                      </Button>
                      {/*<Button full danger style={Styles.ResetViewbtnViewLayout}><Text style={Styles.ResetViewbtnViewText}> Reset </Text></Button>*/}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}
