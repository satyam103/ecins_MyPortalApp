import React from 'react';
import {View, Alert} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Text,
  Item,
  Footer,
  Input,
  Textarea,
  Button,
  Image,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../css/style';
import {Col, Row} from 'react-native-easy-grid';
import FilePickerManager from 'react-native-file-picker';
import RNFS from 'react-native-fs';
import ValidationComponent from 'react-native-form-validator';
import Spinner from 'react-native-loading-spinner-overlay';
import AppFooter from '../Footer/Footer';
import {postDataUrl} from '../utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MessageList extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      document_name: '',
      document_uri: '',
      file: '',
      spinner: false,
      active_private_mode: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.checkPrivateMode);
  }

  checkPrivateMode = () => {
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });
  };

  onUploadDocument = () => {
    const options = {
      title: 'File Picker',
      chooseFileButtonTitle: 'Choose File...',
    };

    FilePickerManager.showFilePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        this.setState({document_name: response.fileName});

        RNFS.readFile(response.uri, 'base64').then((res) => {
          this.setState({document_uri: res});
        });
      }
    });
  };

  onSubmitMessage = () => {
    this.validate({
      title: {required: true},
      message: {required: true},
    });

    if (this.state.title != '' && this.state.message != '') {
      var formData = {
        filename: this.state.document_name,
        files: this.state.document_uri,
        done: 0,
        message: this.state.message,
      };
      // spinner true
      this.setState({spinner: true});
      let urlType = 'tasks/' + this.props.route.params.taskId + '/store';

      postDataUrl('POST', urlType, formData, true)
        .then((response) => {
          if (response.message == 'success') {
            Alert.alert('Your Message has been Sent');
          }
          if (response.message == 'Unauthenticated.') {
            this.props.navigation.navigate('Login');
          }
          // spinner false
          this.setState({spinner: false});
        })
        .catch((response) => {
          console.log(response);
          // spinner false
          this.setState({spinner: false});
        });
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={Styles.CreateMessageheaderContainer}>
            <Text style={Styles.CreateMessagemessageTitle}>New E-Message</Text>
            <View style={Styles.CreateMessagelistContainer}>
              <View avatar style={Styles.CreateMessagelistItemsBg}>
                <View>
                  <Image
                    small
                    style={Styles.CreateMessagelistThumbnail}
                    source={require('../../assets/images/user_icon.jpeg')}
                  />
                </View>
                <View style={Styles.CreateMessagelistWidthBody}>
                  {/* <Text>{JSON.stringify(this.props, null, 2)}</Text>   */}
                  <Text style={Styles.CreateMessagelistItemsTitle}>
                    {this.props.route.name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={Styles.CreateMessageviewForm}>
              <View regular style={Styles.CreateMessagetextInput}>
                <Input
                  ref="password"
                  style={Styles.CreateMessageloginInputBoxArea}
                  placeholder="Message Title..."
                  value={this.state.title}
                  onChangeText={(title) => this.setState({title})}
                />
              </View>
              {this.isFieldInError('title') &&
                this.getErrorsInField('title').map((errorMessage, i) => (
                  <Text style={Styles.LoginViewerrorMsg}>{errorMessage}</Text>
                ))}
              <View regular style={Styles.CreateMessagetextInputBigBox}>
                <Textarea
                  ref="confirm_password"
                  style={Styles.CreateMessageloginInputBoxArea}
                  rowSpan={10}
                  placeholder="Write Something..."
                  value={this.state.message}
                  onChangeText={(message) =>
                    this.setState({message})
                  }></Textarea>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  position: 'relative',
                  marginTop: -30,
                }}>
                <Row>
                  <Col size={90}>
                    <Text
                      style={{
                        fontFamily: 'Helvetica',
                        fontSize: 12,
                        color: '#666666',
                      }}>
                      {' '}
                      click the paper clip icon to attach a file
                    </Text>
                  </Col>
                  <Col size={10}>
                    <Icon
                      onPress={this.onUploadDocument}
                      style={{
                        fontSize: 20,
                        color: '#666666',
                        right: 0,
                        flex: 1,
                      }}
                      name="attachment"
                    />
                  </Col>
                </Row>
              </View>
              {this.isFieldInError('message') &&
                this.getErrorsInField('message').map((errorMessage, i) => (
                  <Text style={Styles.LoginViewerrorMsg}>{errorMessage}</Text>
                ))}
              <Button warning full style={Styles.CreateMessageaddMsgBtn}>
                <Text
                  style={Styles.CreateMessageaddMsgBtnText}
                  onPress={this.onSubmitMessage}>
                  Add Message
                </Text>
              </Button>
            </View>
            <Spinner visible={this.state.spinner} textContent={'Loading...'} />
          </View>
        </Content>
        <View>
          <AppFooter
            stackName={this.props.route.name}
            navigation={this.props.navigation}
          />
        </View>
        {this.state.active_private_mode && (
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              padding: 5,
              backgroundColor: '#999999',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Icon
              size={30}
              style={{textAlign: 'right', color: '#fff'}}
              onPress={() => this.props.navigation.navigate('HideFunction')}
              name="cloud"
            />
          </View>
        )}
      </Container>
    );
  }
}
