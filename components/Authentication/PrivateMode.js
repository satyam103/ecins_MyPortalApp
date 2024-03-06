import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Container,
  Content,
  Accordion,
  Button,
  Badge,
  Item,
  Input,
  Separator,
  ListItem,
  Left,
  Body,
  Right,
  Switch,
  List,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '../css/style';
import {postDataUrl} from '../utility';
import {getDataParamUrl} from '../utility';
import AppHeader from '../Header/AppHeader';

export default class PrivateMode extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      active_private_mode: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.getSettingsList);
  }

  getSettingsList = () => {
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });
  };

  _onPressUpdateSetting = (value, settingType) => {
    AsyncStorage.setItem(
      'PrivateMode',
      JSON.stringify({enable: value.switchValue}),
    );
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        {this.state.loggedInUser && (
          <View style={Styles.LoginViewappHeader}>
            <AppHeader />
          </View>
        )}
        <View style={{height: '96%'}}>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.LoginViewscrollView}>
              <View style={Styles.TaskDetailsViewheaderContainerNew}>
                <Text style={styles.mainTitle}>Private Mode</Text>
                <Text style={styles.mainSubTitle}>
                  Keep your MyPortal360 app hidden from others by disguising it
                  as a weather app.You can do this by turning on the setting
                  using the switch below.{'\n'}
                  {'\n'}
                </Text>
                <View>
                  <View avatar style={{flexDirection: 'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{alignSelf:'center'}}>
                        {!this.state.active_private_mode && (
                          <Icon size={20} active name="eye" />
                        )}
                        {this.state.active_private_mode && (
                          <Icon size={20} active name="eye-slash" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff',marginLeft:15}}>
                        <Text>Private Mode</Text>
                        {!this.state.active_private_mode && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_private_mode && <Text note>On</Text>}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_private_mode: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_private_mode',
                              );
                            },
                          )
                        }
                        value={this.state.active_private_mode}
                      />
                    </View>
                  </View>
                </View>
                <Text style={styles.mainSubTitle}>
                  Tap the cloud icon at any time to hide the app. To unhide
                  MyPortal360 from the weather app, tap and hold the screen for
                  3 seconds
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        {this.state.loggedInUser && (
          <View>
            <AppFooter
              stackName={this.props.route.name}
              navigation={this.props.navigation}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainSubTitle: {
    marginTop: 10,
  },
  borderElement: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
});
