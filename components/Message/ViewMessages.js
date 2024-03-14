import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  PermissionsAndroid,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import {Text, TextArea, Button, Image} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../css/style';
import {Col, Row} from 'react-native-easy-grid';
import DocumentPicker from 'react-native-document-picker';
import FilePickerManager from 'react-native-file-picker';
import RNFS from 'react-native-fs';
import ValidationComponent from 'react-native-form-validator';
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from 'react-native-flash-message';
import * as mime from 'react-native-mime-types';
import fetch_blob from 'react-native-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import IconAttachment from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SoundRecorder from 'react-native-sound-recorder';
import SoundPlayer from 'react-native-sound-player';

import AppFooter from '../Footer/Footer';
import {getDataParamUrl, postDataUrl} from '../utility';

export default class MessageList extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      document_name: '',
      document_uri: '',
      file: '',
      allMessages: [],
      show: false,
      spinner: false,
      showAddMsgBtn: true,
      fileName: '',
      attached_document_name: '',
      show_more_status: true,
      show_more_list: false,
      active_private_mode: false,
      audioRecord: false,
      audioPlaying: false,
      fileUploadingMsg: 'Tap the microphone to record',
      playButton: true,
      flexProp: 0,
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

  componentDidMount() {
    // get default setting saved
    const authDetails = AsyncStorage.getItem('authDetails', (err, result) => {
      let authResponse = JSON.parse(result);
      if (authResponse === null) {
        this.props.navigation.navigate('Login');
      }
    });

    this.setState({spinner: true});
    let urlType = 'emessages/' + this.props.route.params.messageId;
    getDataParamUrl('GET', urlType, true)
      .then((response) => {
        this.setState({attached_document_name: response.document_name});
        this.setState({attached_document_data: response.document});
        if (response != '') {
          this.setState({
            allMessages: response.emessage_profile_updates.reverse(),
          });
        }
        if (response.message == 'Unauthenticated.') {
          this.props.navigation.navigate('Login');
        }
        // spinner false
        this.setState({spinner: false});
      })
      .catch((response) => {
        // spinner false
        this.setState({spinner: false});
      });
  }

  recordAudio = async () => {
    this.setState({audioRecord: true});
    this.setState({fileUploadingMsg: 'Recording...'});

    let timeCounter = 0;
    var that = this;
    var intervalId = setInterval(function () {
      if (timeCounter % 3 == 0) {
        that.setState({fileUploadingMsg: 'Recording...'});
      } else {
        that.setState({fileUploadingMsg: 'Recording...'});
      }
      timeCounter = timeCounter + 1;
    }, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});

    try {
      const grants = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      console.log('record audio', grants);
      if (grants === PermissionsAndroid.RESULTS.GRANTED) {
        SoundRecorder.start(
          SoundRecorder.PATH_CACHE + '/sound_recording.mp3',
        ).then(function () {
          console.log('started recording');
        });
      } else {
        console.log('Sound recording permission not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  };

  recordAudioStop = () => {
    clearInterval(this.state.intervalId);
    this.setState({fileUploadingMsg: 'Tap the microphone to record'});
    this.setState({audioRecord: false});
    this.setState({playButton: true});

    let that = this;
    SoundRecorder.stop().then(function (result) {
      console.log('stopped recording, audio file saved at: ' + result.path);
      that.setState({document_name: 'sound-recording.mp3'});
      that.setState({fileName: 'sound-recording.mp3'});

      RNFS.readFile(result.path, 'base64').then((res) => {
        // that.setState({document_uri: res});
        that.setState({document_uri: result.path});
      });
    });
  };

  playAudioStored = () => {
    try {
      // play the file tone.mp3
      // SoundPlayer.playSoundFile('tone', 'mp3')
      // or play from url
      alert('audio playing');
      // SoundPlayer.playUrl(SoundRecorder.PATH_CACHE + '/sound-recording.mp4');
      SoundPlayer.playUrl(this.state.document_uri);
      this.setState({audioPlaying: true});
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  deletefile = () => {
    this.setState({document_name: ''});
    this.setState({fileName: ''});
    this.setState({message: ''});
    this.setState({document_uri: ''});
    this.setState({fileUploadingMsg: 'Tap the microphone to record'});
  };

  copyfile = async (documentname, attachmentname) => {
    const fs = fetch_blob.fs;
    const base64 = fetch_blob.base64;
    const dirs = fetch_blob.fs.dirs;
    if (Platform.OS === 'ios') {
      const file_path = dirs.DocumentDir + '/' + attachmentname;
      RNFS.writeFile(file_path, documentname, 'base64')
        .then((success) => {
          FileViewer.open(file_path)
            .then(() => {
              // success
            })
            .catch((error) => {
              // error
            });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    } else {
      const file_path = dirs.DownloadDir + '/' + attachmentname;

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          RNFS.writeFile(file_path, documentname, 'base64')
            .then((success) => {
              FileViewer.open(file_path)
                .then(() => {
                  // success
                })
                .catch((error) => {
                  // error
                });
            })
            .catch((error) => {
              alert(JSON.stringify(error));
            });
        } else {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  async SingleFilePicker() {
    if (Platform.OS === 'ios') {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        this.setState({document_name: res.name});
        this.setState({fileName: res.name});
        this.setState({playButton: false});
        RNFS.readFile(res.uri, 'base64').then((res) => {
          this.setState({document_uri: res});
        });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          Alert.alert('Canceled');
        } else {
          Alert.alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    } else {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });

        this.setState({document_name: res.name});
        this.setState({fileName: res.name});
        this.setState({playButton: false});
        // RNFS.readFile(res.uri, 'base64').then((res) => {
        this.setState({document_uri: res.uri});
        // });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          Alert.alert('Canceled');
        } else {
          Alert.alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    }
  }
  onUploadDocument = () => {
    if (Platform.OS === 'ios') {
      console.log('ios');
    } else {
      const options = {
        title: 'File Picker',
        chooseFileButtonTitle: 'Choose File...',
      };

      FilePickerManager.showFilePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled file picker');
        } else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        } else {
          alert('else condition');
          this.setState({document_name: response.fileName});
          this.setState({fileName: response.fileName});
          this.setState({playButton: false});
          RNFS.readFile(response.uri, 'base64').then((res) => {
            this.setState({document_uri: res});
          });
        }
      });
    }
  };

  onSubmitMessage = () => {
    Keyboard.dismiss();
    const newState = [...this.state.allMessages];

    this.validate({
      message: {required: true},
    });

    if (this.state.message != '') {
      // var formData = {
      //   done: 0,
      //   message: this.state.message,
      // };
      let formData = new FormData();
      formData.append('done', 0);
      formData.append('message', this.state.message);

      if (this.state.document_name !== '') {
        // formData.filename = this.state.document_name;
        // formData.files = this.state.document_uri;
        let extenstionFile = this.state.document_name.split('.');
        let filename = this.state.document_name;
        let extension = extenstionFile[1];
        let base64_file = this.state.document_uri;

        formData.append('file', {
          filename: filename,
          extension: extension, // Adjust the file type accordingly
          base64_file: base64_file,
        });
      }

      this.setState({spinner: true});
      let urlType =
        'emessages/' + this.props.route.params.messageId + '/update';

      postDataUrl('POST', urlType, formData, true)
        .then((response) => {
          if (response.message != '') {
            this.setState({fileName: ''});
            this.setState({message: ''});
            this.setState({filename: ''});
            this.setState({files: ''});
            newState.push(response);
            this.setState({allMessages: newState});
            showMessage({
              message: 'My Messages',
              description: 'Your message reply has been sent.',
              type: 'success',
              textStyle: {fontFamily: 'HelveticaNeue'},
              // fontWeight: 'bold',
            });
            // spinner false
            this.setState({spinner: false});
          } else if (response.message == 'Server Error') {
            showMessage({
              message: 'My E-Messages',
              description: 'Message can not Sent!! Server Error.',
              type: 'danger',
              textStyle: {fontFamily: 'HelveticaNeue'},
              // fontWeight: 'bold',
            });
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

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({show: false});
      this.setState({showAddMsgBtn: true});
    } else {
      this.setState({show: true});
      this.setState({showAddMsgBtn: false});
    }
  };

  paginationTasks = () => {
    this.setState({show_more_list: true});
    this.setState({show_more_status: false});
  };

  MsgListingHTML = (details, loopcount) => {
    var regexForTag = /(?:^<p[^>]*>)|(?:<\/p>$)/g;
    var htmlContentMessage = details.message;
    var htmlStringMessageContent = htmlContentMessage.replace(regexForTag, '');
    var htmlStringMessageContent1 = htmlStringMessageContent.replace(
      /&nbsp;<\/p><p>/g,
      '',
    );
    var htmlStringMessageContent2 = htmlStringMessageContent1.replace(
      /<\/p><p>/g,
      '<br/><br/>',
    );
    var htmlStringMessage = htmlStringMessageContent2.replace(
      /<\/p><p>&nbsp;/g,
      '',
    );

    if (details.id !== undefined && details.id !== null) {
      if (details.read_by_user) {
        let splitmainUserVal;
        let mainUser = details.updater_name;
        splitmainUserVal = mainUser.split(' ');
        let mainnewNameToBeDisplay =
          splitmainUserVal[0].charAt(0) + '' + splitmainUserVal[1].charAt(0);

        var listing_document_attached = false;
        if (details.document_name !== '') {
          listing_document_attached = true;
        }

        if (loopcount < this.state.allMessages.length - 2) {
          return (
            this.state.show_more_list && (
              <View style={{marginTop: 20}}>
                <View style={{alignSelf: 'flex-start'}}>
                  <View
                    style={{textAlign: 'left', textAlignVertical: 'center'}}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        borderRadius: 30 / 2,
                        backgroundColor: '#E1E1E1',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          backgroundColor: '#c',
                          color: '#fff',
                          fontWeight: 'bold',
                          textAlignVertical: 'center',
                        }}>
                        {mainnewNameToBeDisplay}
                      </Text>
                    </View>
                    <View style={{marginLeft: 40}}>
                      <View style={Styles.leftSideMsg} />
                      <HTML
                        note
                        onLinkPress={(evt, href) => Linking.openURL(href)}
                        tagsStyles={{a: {color: '#fff'}}}
                        baseFontStyle={{color: '#fff'}}
                        containerStyle={{
                          backgroundColor: '#878787',
                          borderRadius: 2,
                          padding: 5,
                        }}
                        html={htmlStringMessage}
                      />

                      {listing_document_attached && (
                        <Text
                          style={{
                            color: '#fff',
                            backgroundColor: '#878787',
                            textAlign: 'right',
                            borderBottomLeftRadius: 2,
                            borderBottomRightRadius: 2,
                            fontSize: 12,
                            marginRight: 1,
                            paddingRight: 2,
                            paddingBottom: 2,
                            marginTop: -2,
                          }}
                          onPress={() =>
                            this.copyfile(
                              details.file_base64,
                              details.document_name,
                            )
                          }>
                          {listing_document_attached && (
                            <IconAttachment
                              onPress={this.onUploadDocument}
                              style={{color: '#fff', right: 0}}
                              name="attachment"
                              size={13}
                            />
                          )}
                          {details.document_name}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <Text style={Styles.chatlistItemsDate}>
                  {details.created_at}
                </Text>
              </View>
            )
          );
        } else {
          return (
            <View style={{marginTop: 20}}>
              <View style={{alignSelf: 'flex-start'}}>
                <View style={{textAlign: 'left', textAlignVertical: 'center'}}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 30 / 2,
                      backgroundColor: '#E1E1E1',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        backgroundColor: '#E1E1E1',
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                      }}>
                      {mainnewNameToBeDisplay}
                    </Text>
                  </View>
                  <View style={{marginLeft: 40}}>
                    <View style={Styles.leftSideMsg} />
                    <HTML
                      note
                      onLinkPress={(evt, href) => Linking.openURL(href)}
                      tagsStyles={{a: {color: '#fff'}}}
                      baseFontStyle={{color: '#fff'}}
                      containerStyle={{
                        backgroundColor: '#878787',
                        borderRadius: 2,
                        padding: 5,
                      }}
                      html={htmlStringMessage}
                    />
                    {listing_document_attached && (
                      <Text
                        style={{
                          color: '#fff',
                          backgroundColor: '#878787',
                          textAlign: 'right',
                          borderBottomLeftRadius: 2,
                          borderBottomRightRadius: 2,
                          fontSize: 12,
                          marginRight: 1,
                          paddingRight: 2,
                          paddingBottom: 2,
                          marginTop: -2,
                        }}
                        onPress={() =>
                          this.copyfile(
                            details.file_base64,
                            details.document_name,
                          )
                        }>
                        {listing_document_attached && (
                          <IconAttachment
                            onPress={this.onUploadDocument}
                            style={{color: '#fff', right: 0}}
                            name="attachment"
                            size={13}
                          />
                        )}
                        {details.document_name}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <Text style={Styles.chatlistItemsDate}>{details.created_at}</Text>
            </View>
          );
        }
      } else {
        let splitUserVal;
        let otherUser = details.updater_name;
        splitUserVal = otherUser.split(' ');
        let newNameToBeDisplay =
          splitUserVal[0].charAt(0) + '' + splitUserVal[1].charAt(0);

        var listing_document_attached = false;
        if (details.document_name !== '') {
          listing_document_attached = true;
        }

        if (loopcount < this.state.allMessages.length - 2) {
          return (
            this.state.show_more_list && (
              <View style={{marginTop: 20}}>
                <View style={{alignSelf: 'flex-end'}}>
                  <View
                    style={{textAlign: 'right', textAlignVertical: 'center'}}>
                    <View style={{marginRight: 38}}>
                      <HTML
                        note
                        onLinkPress={(evt, href) => Linking.openURL(href)}
                        tagsStyles={{a: {color: '#fff'}}}
                        baseFontStyle={{color: '#fff'}}
                        containerStyle={{
                          backgroundColor: '#1A7AFF',
                          borderRadius: 2,
                          padding: 5,
                          paddingRight: 5,
                          marginRight: 6,
                        }}
                        html={htmlStringMessage}
                      />
                      {listing_document_attached && (
                        <Text
                          style={{
                            color: '#fff',
                            backgroundColor: '#1A7AFF',
                            textAlign: 'right',
                            borderBottomLeftRadius: 2,
                            borderBottomRightRadius: 2,
                            fontSize: 12,
                            marginRight: 6,
                            paddingRight: 2,
                            paddingBottom: 2,
                            marginTop: -2,
                          }}
                          onPress={() =>
                            this.copyfile(
                              details.file_base64,
                              details.document_name,
                            )
                          }>
                          {listing_document_attached && (
                            <IconAttachment
                              onPress={this.onUploadDocument}
                              style={{color: '#fff', right: 0}}
                              name="attachment"
                              size={13}
                            />
                          )}
                          {details.document_name}
                        </Text>
                      )}
                      <View style={Styles.rightSideMsg} />
                    </View>
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        top: 0,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        borderRadius: 30 / 2,
                        backgroundColor: '#E1E1E1',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: '#fff',
                          fontWeight: 'bold',
                          textAlignVertical: 'center',
                        }}>
                        {newNameToBeDisplay}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={Styles.chatlistItemsDateRight}>
                  {details.created_at}
                </Text>
              </View>
            )
          );
        } else {
          return (
            <View style={{marginTop: 20}}>
              <View style={{alignSelf: 'flex-end'}}>
                <View style={{textAlign: 'right', textAlignVertical: 'center'}}>
                  <View style={{marginRight: 38}}>
                    <HTML
                      note
                      onLinkPress={(evt, href) => Linking.openURL(href)}
                      tagsStyles={{a: {color: '#fff'}}}
                      baseFontStyle={{color: '#fff'}}
                      containerStyle={{
                        backgroundColor: '#1A7AFF',
                        borderRadius: 2,
                        padding: 5,
                        paddingRight: 5,
                        marginRight: 6,
                      }}
                      html={htmlStringMessage}
                    />
                    {listing_document_attached && (
                      <Text
                        style={{
                          color: '#fff',
                          backgroundColor: '#1A7AFF',
                          textAlign: 'right',
                          borderBottomLeftRadius: 2,
                          borderBottomRightRadius: 2,
                          fontSize: 12,
                          marginRight: 6,
                          paddingRight: 2,
                          paddingBottom: 2,
                          marginTop: -2,
                        }}
                        onPress={() =>
                          this.copyfile(
                            details.file_base64,
                            details.document_name,
                          )
                        }>
                        {listing_document_attached && (
                          <IconAttachment
                            onPress={this.onUploadDocument}
                            style={{color: '#fff', right: 0}}
                            name="attachment"
                            size={13}
                          />
                        )}
                        {details.document_name}
                      </Text>
                    )}
                    <View style={Styles.rightSideMsg} />
                  </View>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      top: 0,
                      width: 30,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 30 / 2,
                      backgroundColor: '#E1E1E1',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color: '#fff',
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                      }}>
                      {newNameToBeDisplay}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={Styles.chatlistItemsDateRight}>
                {details.created_at}
              </Text>
            </View>
          );
        }
      }
    }
  };

  handlePress = () => {
    Keyboard.dismiss();
  };

  render() {
    const oldMessages = this.state.allMessages;
    return (
      <TouchableWithoutFeedback onPress={() => this.handlePress()}>
        <View>
          <View>
            <SafeAreaView>
              <View style={Styles.CreateMessageheaderContainer}>
                <Text style={Styles.CreateMessagemessageTitle}>
                  My Messages
                </Text>
                <ScrollView
                  keyboardShouldPersistTaps={'handled'}
                  style={[{height: this.state.show ? '58%' : '86%'}]}>
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
                        <Text style={Styles.CreateMessagelistItemsTitle}>
                          {this.props.route.params.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}>
                          <Text
                            style={[Styles.listItemsTitles, {fontSize: 12}]}>
                            {this.props.route.params.title}
                          </Text>
                          <Text style={Styles.listItemsDate}>
                            {this.props.route.params.dateSent}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={Styles.CreateMessageviewForm}>
                    {this.props.route.params.description !== '' && (
                      <View
                        regular
                        style={Styles.CreateMessagetextInputBigBoxHtml}>
                        <HTML
                          onLinkPress={(evt, href) => Linking.openURL(href)}
                          baseFontStyle={{color: '#55595c', fontSize: 13}}
                          containerStyle={{paddingHorizontal: 10}}
                          html={this.props.route.params.description}
                        />
                      </View>
                    )}
                    {this.state.attached_document_name != '' &&
                      this.state.attached_document_name != null && (
                        <Text
                          style={{
                            marginTop: -20,
                            paddingLeft: 15,
                            fontSize: 15,
                          }}
                          onPress={() =>
                            this.copyfile(
                              this.state.attached_document_data,
                              this.state.attached_document_name,
                            )
                          }>
                          <IconAttachment
                            style={{
                              fontSize: 18,
                              color: '#666666',
                              right: 0,
                              flex: 1,
                            }}
                            name="attachment"
                          />
                          {this.state.attached_document_name}
                        </Text>
                      )}
                    {this.state.allMessages.length > 2 &&
                      this.state.show_more_status && (
                        <Text
                          style={{textAlign: 'center', marginTop: 15}}
                          onPress={() => this.paginationTasks()}>
                          <Text style={{color: '#45B5FF', textAlign: 'center'}}>
                            Show more messages
                          </Text>
                        </Text>
                      )}
                    <View style={{marginBottom: 20, width: '100%'}}>
                      {oldMessages.map((messages, index) =>
                        this.MsgListingHTML(messages, index),
                      )}
                    </View>
                  </View>
                </ScrollView>
              </View>
              {this.state.showAddMsgBtn && (
                <Button
                  warning
                  full
                  style={Styles.ViewMessageaddMsgBtn}
                  onPress={this.ShowHideComponent}>
                  <Text
                    style={Styles.CreateMessageaddMsgBtnText}
                    uppercase={false}>
                    Reply to Message{' '}
                  </Text>
                </Button>
              )}
              {this.state.show ? (
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : null}
                  // style={{flex: this.state.flexProp}}
                >
                  <TouchableWithoutFeedback onPress={() => this.handlePress()}>
                    <View style={{top: 10, bottom: 2, marginHorizontal: 10}}>
                      <View regular style={Styles.CreateMessagetextInputBigBox}>
                        <TextArea
                          style={Styles.CreateMessageloginInputBoxArea}
                          rowSpan={3}
                          name="message"
                          placeholder="Enter message"
                          onChangeText={(message) =>
                            this.setState({message})
                          }></TextArea>
                      </View>
                      <View style={Styles.adFile}>
                        <Row style={{padding: 10}}>
                          <Col size={10}>
                            <IconAttachment
                              onPress={this.SingleFilePicker.bind(this)}
                              style={{
                                color: '#666666',
                                flex: 1,
                                top: 5,
                              }}
                              size={13}
                              name="attachment"
                            />
                          </Col>
                          <Col size={90}>
                            {this.state.fileName != '' ? (
                              <Text
                                style={{
                                  fontFamily: 'Helvetica',
                                  fontSize: 12,
                                  color: '#666666',
                                }}>
                                {this.state.fileName}
                                {'  '}
                                {this.state.playButton && (
                                  <FeatherIcon
                                    name="play"
                                    size={13}
                                    onPress={() =>
                                      this.playAudioStored()
                                    }></FeatherIcon>
                                )}
                                {'  '}
                                <FeatherIcon
                                  name="trash"
                                  onPress={this.deletefile}></FeatherIcon>
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontFamily: 'Helvetica',
                                  fontSize: 13,
                                  color: '#666666',
                                }}>
                                Click paperclip to attach file
                              </Text>
                            )}
                          </Col>
                        </Row>
                      </View>
                      <View style={Styles.recordAudio}>
                        <Row style={{paddingHorizontal: 10}}>
                          <Col size={10}>
                            {this.state.audioRecord && (
                              <FeatherIcon
                                onPress={this.recordAudioStop}
                                style={{
                                  color: '#666666',
                                  flex: 1,
                                  top: 5,
                                }}
                                name="mic"
                                size={13}
                              />
                            )}
                            {!this.state.audioRecord && (
                              <FeatherIcon
                                onPress={this.recordAudio}
                                style={{
                                  color: '#666666',
                                  flex: 1,
                                  top: 5,
                                }}
                                name="mic-off"
                                size={13}
                              />
                            )}
                          </Col>
                          <Col size={80}>
                            {this.state.fileName != '' ? (
                              <Text
                                style={{
                                  fontFamily: 'Helvetica',
                                  fontSize: 13,
                                  color: '#666666',
                                }}>
                                {this.state.fileUploadingMsg}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontFamily: 'Helvetica',
                                  fontSize: 13,
                                  color: '#666666',
                                }}>
                                {this.state.fileUploadingMsg}
                              </Text>
                            )}
                          </Col>
                          <Col size={10} style={{alignItems: 'center'}}></Col>
                        </Row>
                      </View>

                      {this.isFieldInError('message') &&
                        this.getErrorsInField('message').map(
                          (errorMessage, i) => (
                            <Text style={Styles.LoginViewerrorMsg}>
                              {errorMessage}
                            </Text>
                          ),
                        )}
                      <Button
                        onPress={this.onSubmitMessage}
                        warning
                        full
                        style={Styles.ViewMessagesBtn}>
                        <Text
                          style={Styles.ViewMessagesBtnText}
                          uppercase={false}>
                          Send Message
                        </Text>
                      </Button>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              ) : null}
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
              />
            </SafeAreaView>
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
