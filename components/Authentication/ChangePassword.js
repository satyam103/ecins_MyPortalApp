import React from 'react';
import {SafeAreaView, ScrollView, View, Text, Image} from 'react-native';
import {Button, Item, Input} from 'native-base';
import ValidationComponent from 'react-native-form-validator';
import Styles from '../css/style';

export default class ChangePassword extends ValidationComponent {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: true,
      passwordInvalid: false,
      passwordNotMach: false,
      email: '',
      password: '',
      confirm_password: '',
    };
  }

  onChangeSetValue(textValue, typeText) {
    if (typeText == 'email') {
      this.setState({email: textValue});
    } else if (typeText == 'password') {
      this.setState({password: textValue});
    } else if (typeText == 'confirm_password') {
      this.setState({confirm_password: textValue});
    }

    if (
      this.state.email != '' &&
      this.state.password != '' &&
      this.state.confirm_password != ''
    ) {
      //if(this.state.email != ""){
      this.state.btnDisabled = false;
    }
  }

  _onPressButton = () => {
    this.validate({
      email: {email: true, required: true},
      password: {required: true},
      confirm_password: {required: true},
    });
    this.checkPassword();
  };

  async checkPassword() {
    let reg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!reg.test(this.state.password)) {
      this.setState({passwordInvalid: true});
      return false;
    } else if (this.state.password != this.state.confirm_password) {
      this.setState({passwordNotMach: true});
      this.setState({passwordInvalid: false});
      return false;
    } else {
      this.setState({passwordNotMach: false});
      this.setState({passwordInvalid: false});
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={Styles.ResetViewscrollView}>
          <View style={Styles.ResetViewloginContainer}>
            <View style={Styles.ResetViewappLogoContatainer}>
              <Image
                style={Styles.ResetViewappLogo}
                source={require('../../assets/images/myportal_logo.png')}
              />
            </View>
            <Text style={Styles.ResetViewloginTitle}>
              {'\n'}Reset Password{'\n'}
            </Text>
            <View>
              <View regular style={Styles.ResetViewloginInput}>
                <Input
                  ref="email"
                  style={Styles.ResetViewloginInputBoxArea}
                  placeholder="Email Address"
                  value={this.state.email}
                  onChangeText={(email) =>
                    this.onChangeSetValue(email, 'email')
                  }
                />
              </View>
              {this.isFieldInError('email') &&
                this.getErrorsInField('email').map((errorMessage) => (
                  <Text style={Styles.ResetViewerrorMsg}>{errorMessage}</Text>
                ))}
              <View regular style={Styles.ResetViewloginInput}>
                <Input
                  secureTextEntry={true}
                  ref="password"
                  style={Styles.ResetViewloginInputBoxArea}
                  placeholder="Password"
                  onChangeText={(password) =>
                    this.onChangeSetValue(password, 'password')
                  }
                  value={this.state.password}
                />
              </View>
              <View regular style={Styles.ResetViewloginInput}>
                <Input
                  secureTextEntry={true}
                  ref="confirm_password"
                  style={Styles.ResetViewloginInputBoxArea}
                  placeholder="Confirm Password"
                  onChangeText={(confirm_password) =>
                    this.onChangeSetValue(confirm_password, 'confirm_password')
                  }
                  value={this.state.confirm_password}
                />
              </View>
              {this.state.passwordNotMach && (
                <Text style={Styles.ResetViewerrorMsg}>
                  Passwords do not match!
                </Text>
              )}
              {this.state.passwordInvalid && (
                <Text style={Styles.ResetViewerrorMsg}>
                  Passwords do not meet the password requirements. Please try
                  again.
                </Text>
              )}
              <Text style={Styles.ResetViewinstructionText}>
                {'\n'}Passwords must contain a minimum of 8{'\n'}characters
                including:{'\n'}
              </Text>
              <Text style={Styles.ResetViewinstructionListText}>
                {'\u2022'} An upper-case letter (A, B, C)
              </Text>
              <Text style={Styles.ResetViewinstructionListText}>
                {'\u2022'} A lower-case letter (a, b, c)
              </Text>
              <Text style={Styles.ResetViewinstructionListText}>
                {'\u2022'} A number (1, 2, 3)
              </Text>
              <Text style={Styles.ResetViewinstructionListText}>
                {'\u2022'} A special character (@, !, ?){' '}
              </Text>
            </View>
            <View style={Styles.ResetViewbtnView}>
              <Button
                disabled={this.state.btnDisabled}
                full
                success
                style={
                  this.state.btnDisabled
                    ? Styles.ResetViewbtnViewLayoutDisable
                    : Styles.ResetViewbtnViewLayout
                }>
                <Text style={Styles.ResetViewbtnViewText}>
                  {' '}
                  Change Password{' '}
                </Text>
              </Button>
              {/*<Button full danger style={Styles.ResetViewbtnViewLayout}><Text style={Styles.ResetViewbtnViewText}> Reset </Text></Button>*/}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
