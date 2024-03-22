import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '../css/style';
import {postDataUrl} from '../utility';
import {getDataParamUrl} from '../utility';
import AppFooter from '../Footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const date = new Date();
let currentDate = date.toISOString().split('T')[0];

export default class EditSettings extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeExtraOption = (url, payload = false) => {
    if (url == 'logout') {
      AsyncStorage.setItem('loginStatus', JSON.stringify({status: false}));
      this.setState({popup1: false});
      this.props.navigation.navigate('PasscodeLogin');
    } else {
      this.setState({popup1: false});
      this.props.navigation.push(url, {payload: payload});
    }
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        {this.state.loggedInUser && (
          <Header style={Styles.LoginViewappHeader}>
            <AppHeader />
          </Header>
        )}
        <View style={{height: '96%'}}>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.LoginViewscrollView}>
              <View style={Styles.TaskDetailsViewheaderContainerNew}>
                <Text style={styles.mainTitle}>Settings</Text>
                <View>
                  <Pressable
                    style={{flexDirection: 'row', marginVertical: 10}}
                    onPress={() => this.props.navigation.push('EmailSettings')}>
                    <View style={{marginRight: 10}}>
                      <Text>Manage Email Notifications</Text>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                      <IconFont name="chevron-right" />
                    </View>
                  </Pressable>
                  <Pressable
                    style={{flexDirection: 'row', marginVertical: 10}}
                    onPress={() => this.props.navigation.push('Settings')}>
                    <View style={{marginRight: 10}}>
                      <Text>Manage Push Notifications</Text>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                      <IconFont name="chevron-right" />
                    </View>
                  </Pressable>
                  <Pressable
                    style={{flexDirection: 'row', marginVertical: 10}}
                    onPress={() =>
                      this.props.navigation.push('ChangePasscode')
                    }>
                    <View style={{marginRight: 10}}>
                      <Text>Create/Change Passcode</Text>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                      <IconFont name="chevron-right" />
                    </View>
                  </Pressable>
                  {/* <Pressable
                    style={{flexDirection: 'row', marginVertical: 30}}
                    onPress={() =>
                      this.closeExtraOption('logout', {
                        event_date: currentDate,
                      })
                    }>
                    <View style={{marginRight: 10}}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          marginBottom: 10,
                          marginTop: 10,
                          fontSize: 18,
                        }}>
                        Logout
                      </Text>
                    </View> */}
                    {/* <View style={{alignSelf: 'center'}}>
                      <IconFont name="chevron-right" />
                    </View> */}
                  {/* </Pressable> */}
                </View>
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
