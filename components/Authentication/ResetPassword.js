import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
// import {
//   Content,
//   Accordion,
//   Badge,
//   Item,
//   Input,
//   Separator,
// } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ValidationComponent from 'react-native-form-validator';
import Styles from '../css/style';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default class ResetPassword extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      urgentTaskToggle: false,
      warningTaskToggle: false,
      successTaskToggle: false,
      email: '',
    };
  }

  _onPressButton = () => {
    this.validate({
      email: {email: true, required: true},
    });

    if (this.state.email != '') {
      this.resetPassword();
    }
  };

  async resetPassword() {
    //Reset Password Post Method
    var formData = {
      email: this.state.email.toLowerCase(),
    };

    var result = await fetch(
      global.ApiUrl + '/api/organisations/password/email/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        showMessage({
          message: 'Reset Password',
          description: 'We have sent your reset password email',
          type: 'default',
          textStyle: {fontFamily: 'HelveticaNeue'},
        });
      })
      .catch((error) => {
        this.setState({loginError: true});
      });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={Styles.LoginViewscrollView}>
          <View style={Styles.LoginViewbody}>
            <View style={Styles.ForgotViewloginContainer}>
              <View style={Styles.ForgotViewappLogoContatainer}>
                <Image
                  style={Styles.ForgotViewappLogo}
                  source={require('../../assets/images/myportal_logo.png')}
                />
              </View>
              <Text style={Styles.ForgotViewloginTitle}>
                {'\n'}Reset Password{'\n'}
              </Text>
              <View>
                <View regular style={Styles.ForgotViewloginInput}>
                  <TextInput
                    style={Styles.ForgotViewloginInputBoxArea}
                    placeholder="Email Address"
                    onChangeText={(email) => this.setState({email})}
                  />
                </View>
                {this.isFieldInError('email') &&
                  this.getErrorsInField('email').map((errorMessage) => (
                    <Text style={Styles.ResetViewerrorMsg}>{errorMessage}</Text>
                  ))}
                <Text style={Styles.ForgotViewinstructionText}>
                  {'\n'}To reset your password, enter your email address then
                  click the green [Submit] button below.{'\n'}
                </Text>
              </View>
              <View style={Styles.ForgotViewbtnView}>
                <Button
                  full
                  success
                  style={Styles.ForgotViewbtnViewLayout}
                  onPress={this._onPressButton}
                  title="Submit"
                />
              </View>
            </View>
            <FlashMessage position="top" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
