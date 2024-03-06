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
import SoundRecorder from 'react-native-sound-recorder';
import {PermissionsAndroid} from 'react-native';

//import QRCode from 'react-native-qrcode-generator';

export default class Passcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDisabled: true,
      Passcode: '',
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

  changePasscodeData = (PasscodeData) => {
    this.setState({Passcode: PasscodeData});
    console.log(this.state.Passcode.length);
    if (this.state.Passcode.length > 2) {
      this.setState({initialDisabled: false});
    }
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
                      {'\n'}Set Login Passcode{'\n'}
                    </Text>
                    <View>
                      <TextInput
                        secureTextEntry={true}
                        keyboardType="numeric"
                        style={[
                          Styles.LoginViewloginInputBoxArea,
                          {borderColor: '#ccc', borderBottomWidth: 1},
                        ]}
                        onChangeText={(Passcode) =>
                          this.changePasscodeData(Passcode)
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
      </Container>
    );
  }
}
