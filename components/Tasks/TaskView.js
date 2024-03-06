import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
  WebView,
  Linking,
  PermissionsAndroid,
  TouchableHighlight,
  Container,
  // Content,
  // Button,
  // Footer,
  // List,
  ListItem,
  Left,
  Body,
  Right,
  // Item,
  Textarea,
} from 'react-native';
import * as mime from 'react-native-mime-types';
import fetch_blob from 'react-native-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';

import Icon from 'react-native-vector-icons/Entypo';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog, {DialogContent, ScaleAnimation} from 'react-native-popup-dialog';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Styles from '../css/style';
import FlashMessage, {FlashMessageTransition} from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import ValidationComponent from 'react-native-form-validator';
import {postDataUrl} from '../utility';
import FilePickerManager from 'react-native-file-picker';
import RNFS from 'react-native-fs';
import HTML from 'react-native-render-html';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SoundRecorder from 'react-native-sound-recorder';

//load component
import AppFooter from '../Footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'native-base';

var SavePath =
  Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
export default class TaskView extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      popup1: false,
      title: '',
      description: '',
      msgListing: [],
      prevUrl: '',
      nextUrl: '',
      firstUrl: '',
      lastUrl: '',
      due_date: '',
      done_date: '',
      completed_at: '',
      spinner: false,
      replyBtn: true,
      replyTask: false,
      taskRe: false,
      message: '',
      document_name: '',
      document_uri: '',
      fileName: '',
      attached_document_name: '',
      doneStatus: '',
      attached_document_data: '',
      show_more_clicked: false,
      show_more_status: true,
      taskPriorityType: '',
      active_private_mode: false,
      audioRecord: false,
      audioPlaying: false,
      fileUploadingMsg: 'Tap the microphone to record',
      playButton: false,
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

  recordAudio = () => {
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

    SoundRecorder.start(SoundRecorder.PATH_CACHE + '/sound-recording.mp4').then(
      function () {
        console.log('started recording');
      },
    );
  };

  recordAudioStop = () => {
    clearInterval(this.state.intervalId);
    this.setState({fileUploadingMsg: 'Tap the microphone to record'});
    this.setState({audioRecord: false});
    this.setState({playButton: true});
    let that = this;
    SoundRecorder.stop().then(function (result) {
      console.log(result);
      console.log('stopped recording, audio file saved at: ' + result.path);
      that.setState({document_name: 'sound-recording.mp4'});
      that.setState({fileName: 'sound-recording.mp4'});

      RNFS.readFile(result.path, 'base64').then((res) => {
        that.setState({document_uri: res});
      });
    });
  };

  playAudioStored = () => {
    try {
      // play the file tone.mp3
      // SoundPlayer.playSoundFile('tone', 'mp3')
      // or play from url
      alert('audio playing');
      SoundPlayer.playUrl(SoundRecorder.PATH_CACHE + '/sound-recording.mp4');
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
    this.setState({spinner: true});
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
      this.setState({spinner: false});
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
      this.setState({spinner: false});
    }
  };

  componentDidMount() {
    //get single task details
    //get storage data
    const authDetails = AsyncStorage.getItem('authDetails', (err, result) => {
      let authResponse = JSON.parse(result);
      if (authResponse === null) {
        this.props.navigation.navigate('Login');
      }
      this.setState({profile_uuid: authResponse.profile_uuid});
      this.setState({access_token: authResponse.access_token});
    });
    const organizationDetails = AsyncStorage.getItem(
      'organizationDetails',
      (err, result) => {
        let organizationResponse = JSON.parse(result);

        AsyncStorage.getItem('selectedOrg', (err, result) => {
          let selectedorganizationResponse = JSON.parse(result);
          for (let organization of organizationResponse) {
            if (organization.uuid == selectedorganizationResponse.uuid) {
              this.setState({organisation_uuid: organization.uuid});
            }
          }
          if (this.state.organisation_uuid == '') {
            this.setState({organisation_uuid: organizationResponse[0].id});
          }
        }).then((res) => {
          // set spinner
          this.setState({spinner: true});
          // get single task details
          console.log(
            global.ApiUrl +
              '/api/organisations/' +
              this.state.organisation_uuid +
              '/profile/' +
              this.state.profile_uuid +
              '/task/' +
              this.props.route.params.taskId,
          );
          fetch(
            global.ApiUrl +
              '/api/organisations/' +
              this.state.organisation_uuid +
              '/profile/' +
              this.state.profile_uuid +
              '/task/' +
              this.props.route.params.taskId,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.state.access_token,
              },
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.message == undefined) {
                this.setState({title: responseJson.title});
                this.setState({description: responseJson.instructions});
                this.setState({
                  attached_document_data: responseJson.file_base64,
                });
                this.setState({
                  attached_document_name: responseJson.document_name,
                });
                this.setState({doneStatus: responseJson.done});
                this.setState({
                  msgListing: responseJson.task_updates.reverse(),
                });
                // get due date
                if (
                  responseJson.due_date !== undefined &&
                  responseJson.due_date !== null
                ) {
                  var due_date = responseJson.due_date.split(' ');
                  if (due_date[0]) {
                    var due_date_task = due_date[0].split('-');
                    let due_date_time = responseJson.due_time;
                    this.setState({
                      due_date:
                        due_date_task[2] +
                        '/' +
                        due_date_task[1] +
                        '/' +
                        due_date_task[0].substr(-2) +
                        ' ' +
                        due_date_time,
                    });
                  }

                  // for the push notification
                  // convert due date in actual format
                  let due_date_response = responseJson.due_date.split(' ')[0];
                  let due_date_task_response = new Date(due_date_response);
                  let today = new Date();
                  today.setHours(today.getHours() + 48);
                  if (
                    responseJson.status != 2 &&
                    responseJson.status != 1 &&
                    responseJson.status !== undefined
                  ) {
                    if (due_date_task_response.getTime() < today.getTime()) {
                      this.setState({taskPriorityType: 'urgent'});
                    } else if (
                      due_date_task_response.getTime() > today.getTime()
                    ) {
                      this.setState({taskPriorityType: 'warning'});
                    }
                  } else if (
                    (responseJson.status == 2 || responseJson.status == 1) &&
                    responseJson.status !== undefined
                  ) {
                    this.setState({taskPriorityType: 'success'});
                  }
                }

                if (
                  responseJson.completed_at !== undefined &&
                  responseJson.completed_at !== null &&
                  responseJson.done != 0
                ) {
                  let completed_at = responseJson.completed_at.split(' ');
                  let removeSecond = completed_at[1].split(':');
                  if (completed_at[0]) {
                    var completed_at_task = completed_at[0].split('-');
                    this.setState({
                      completed_at:
                        completed_at_task[2] +
                        '/' +
                        completed_at_task[1] +
                        '/' +
                        completed_at_task[0].substr(-2) +
                        ' ' +
                        removeSecond[0] +
                        ':' +
                        removeSecond[1],
                    });
                  }
                }

                // update task as read
                var result = fetch(
                  global.ApiUrl +
                    '/api/organisations/' +
                    this.state.organisation_uuid +
                    '/profile/' +
                    this.state.profile_uuid +
                    '/tasks/' +
                    this.props.route.params.taskId +
                    '/update',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + this.state.access_token,
                    },
                  },
                )
                  .then((response) => response.json())
                  .then((responseJson) => {})
                  .catch((error) => {});
              }
              this.setState({spinner: false});
            })
            .catch((error) => {
              console.error(error);
            });
        });
      },
    );
  }

  displayMsgBox = () => {
    this.setState({replyBtn: false});
    this.setState({replyTask: true});
    this.component._root.scrollToEnd();
  };

  completeTaskPopup = () => {
    this.setState({popup1: true});
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
          this.setState({document_name: response.fileName});
          this.setState({fileName: response.fileName});
          RNFS.readFile(response.uri, 'base64').then((res) => {
            this.setState({document_uri: res});
          });
        }
      });
    }
  };
  onSubmitMessage = () => {
    this.validate({
      message: {required: true},
    });

    if (this.state.message != '') {
      var formData = {
        done: 0,
        message: this.state.message,
      };

      if (this.state.document_name !== '') {
        formData.filename = this.state.document_name;
        formData.files = this.state.document_uri;
      }

      // spinner true
      this.setState({spinner: true});
      let urlType = 'tasks/' + this.props.route.params.taskId + '/store';
      postDataUrl('POST', urlType, formData, true)
        .then((response) => {
          if (response.message == 'success') {
            this.setState({fileName: ''});
            // this.setState({ title: "" });
            this.setState({message: ''});
            this.setState({document_name: ''});
            this.setState({document_uri: ''});
            // get task message listing
            fetch(
              global.ApiUrl +
                '/api/organisations/' +
                this.state.organisation_uuid +
                '/profile/' +
                this.state.profile_uuid +
                '/task/' +
                this.props.route.params.taskId +
                '/updates',
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + this.state.access_token,
                },
              },
            )
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.total > 0) {
                  showMessage({
                    message: 'My things to do',
                    description: 'Your task reply has been sent.',
                    type: 'success',
                    textStyle: {fontFamily: 'HelveticaNeue'},
                    // fontWeight: 'bold',
                  });
                  let completeData = responseJson;
                  let msgListingData = responseJson.data[0];
                  this.setState({
                    msgListing: [...this.state.msgListing, msgListingData],
                  });
                }
                this.setState({spinner: false});
              })
              .catch((error) => {
                console.error(error);
              });
          } else if (response.message == 'Server Error') {
            showMessage({
              message: 'To Do',
              description: 'Message can not sent. Server Error!',
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
          // spinner false
          this.setState({spinner: false});
        });
    }
  };

  MsgListingHTML = (details, loopCount) => {
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

    if (
      details.profile !== undefined &&
      details.profile !== null &&
      details.profile.uuid !== undefined &&
      details.profile.uuid !== null &&
      details.profile.uuid == this.state.profile_uuid
    ) {
      let otherUser = details.updater_name;
      let splitUserVal = otherUser.split(' ');
      let newNameToBeDisplay =
        splitUserVal[0].charAt(0) + '' + splitUserVal[1].charAt(0);

      var listing_document_attached = false;
      if (details.document_name !== '') {
        listing_document_attached = true;
      }

      if (loopCount < this.state.msgListing.length - 2) {
        return (
          this.state.show_more_clicked && (
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
                          paddingLeft: 4,
                          paddingRight: 4,
                          paddingBottom: 2,
                          borderBottomLeftRadius: 2,
                          borderBottomRightRadius: 2,
                          marginRight: 6,
                        }}
                        onPress={() =>
                          this.copyfile(
                            details.file_base64,
                            details.document_name,
                          )
                        }>
                        {listing_document_attached && (
                          <Icon
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
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 2,
                        borderBottomLeftRadius: 2,
                        borderBottomRightRadius: 2,
                        marginRight: 6,
                      }}
                      onPress={() =>
                        this.copyfile(
                          details.file_base64,
                          details.document_name,
                        )
                      }>
                      {listing_document_attached && (
                        <Icon
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
    } else {
      let otherUser = details.updater_name;
      let splitUserVal = otherUser.split(' ');
      let newNameToBeDisplay =
        splitUserVal[0].charAt(0) + '' + splitUserVal[1].charAt(0);

      var listing_document_attached = false;
      if (details.document_name !== '') {
        listing_document_attached = true;
      }

      if (loopCount < this.state.msgListing.length - 2) {
        return (
          this.state.show_more_clicked && (
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
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      {newNameToBeDisplay}
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
                          marginRight: 1,
                          backgroundColor: '#878787',
                          textAlign: 'right',
                          paddingLeft: 4,
                          paddingRight: 4,
                          paddingBottom: 2,
                          borderBottomLeftRadius: 2,
                          borderBottomRightRadius: 2,
                        }}
                        onPress={() =>
                          this.copyfile(
                            details.file_base64,
                            details.document_name,
                          )
                        }>
                        {listing_document_attached && (
                          <Icon
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
                      color: '#fff',
                      fontWeight: 'bold',
                      textAlignVertical: 'center',
                    }}>
                    {newNameToBeDisplay}
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
                        marginRight: 1,
                        backgroundColor: '#878787',
                        textAlign: 'right',
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 2,
                        borderBottomLeftRadius: 2,
                        borderBottomRightRadius: 2,
                      }}
                      onPress={() =>
                        this.copyfile(
                          details.file_base64,
                          details.document_name,
                        )
                      }>
                      {listing_document_attached && (
                        <Icon
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
    }
  };

  TaskDoneAPI = () => {
    var formData = {
      done: 1,
    };
    this.setState({spinner: true});
    // complete Task API
    fetch(
      global.ApiUrl +
        '/api/organisations/' +
        this.state.organisation_uuid +
        '/tasks/' +
        this.props.route.params.taskId +
        '/status',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.access_token,
        },
        body: JSON.stringify(formData),
      },
    )
      .then((response) => {
        // if(responseJson=="Success"){
        this.setState({popup1: false});
        showMessage({
          message: 'My things to do',
          description:
            'The task you have just completed has been moved to ‘All Done’. Remember to check the ‘To Do’ page for more tasks.',
          type: 'success',
          textStyle: {fontFamily: 'HelveticaNeue'},
        });
        this.setState({spinner: false});
        this.setState({popup1: false});
        this.props.navigation.navigate('Task');
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  paginationTasks = (taskUrl) => {
    this.setState({show_more_clicked: true});
    this.setState({show_more_status: false});
  };

  render() {
    let replyToTask =
      this.props.route.params.taskRe == 'TaskReopened' ||
      this.state.completed_at == '' ||
      this.state.doneStatus == 0
        ? true
        : false;

    const regex = /(<((?!a)[^>]+)>)/gi;
    const resultMsgData = this.state.description.replace(regex, '');

    return (
      <Container>
        <View ref={(c) => (this.component = c)}>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.TaskDetailsViewscrollView}>
              <FlashMessage position="top" />
              <View style={Styles.TaskDetailsViewheaderContainerNew}>
                <Text style={Styles.TaskDetailsViewheaderText}>Task</Text>
                {(this.props.route.params.taskType == 'urgent' ||
                  this.state.taskPriorityType == 'urgent') && (
                  <Row>
                    <Grid
                      style={{
                        backgroundColor: '#FDDADD',
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 3,
                      }}>
                      <Row>
                        <Col size={80}>
                          <Text style={Styles.TaskViewHeading}>
                            {this.state.title}
                          </Text>
                        </Col>
                        <Col size={20}>
                          <Icon
                            style={{
                              fontSize: 18,
                              color: '#F80014',
                              textAlign: 'right',
                            }}
                            name="warning"
                          />
                        </Col>
                      </Row>
                      <View style={Styles.TaskViewLine} />
                      <Row>
                        <HTML
                          onLinkPress={(evt, href) => Linking.openURL(href)}
                          baseFontStyle={{color: '#55595c', fontSize: 13}}
                          containerStyle={Styles.TaskDetailsViewContentText}
                          html={this.state.description}
                        />
                      </Row>
                      <View style={Styles.TaskViewLine} />
                      <Row>
                        <Col size={10}>
                          {this.state.attached_document_name != '' &&
                            this.state.attached_document_name != null && (
                              <Icon
                                name="attachment"
                                size={13}
                                color="#666666"
                              />
                            )}
                        </Col>
                        <Col size={90}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              color: '#7A7474',
                            }}
                            onPress={() =>
                              this.copyfile(
                                this.state.attached_document_data,
                                this.state.attached_document_name,
                              )
                            }>
                            {this.state.attached_document_name}
                          </Text>
                        </Col>
                      </Row>
                    </Grid>
                  </Row>
                )}
                {(this.props.route.params.taskType == 'warning' ||
                  this.state.taskPriorityType == 'warning') && (
                  <Row>
                    <Grid
                      style={{
                        backgroundColor: '#ECC684',
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 3,
                        fontSize: 14,
                      }}>
                      <Row>
                        <Col size={80}>
                          <Text style={Styles.TaskViewHeading}>
                            {this.state.title}
                          </Text>
                        </Col>
                        <Col size={20}>
                          <Icon
                            style={{
                              fontSize: 18,
                              color: '#F80014',
                              textAlign: 'right',
                            }}
                            name="warning"
                          />
                        </Col>
                      </Row>
                      <View style={Styles.TaskViewLine} />
                      <Row>
                        <HTML
                          onLinkPress={(evt, href) => Linking.openURL(href)}
                          baseFontStyle={{color: '#55595c', fontSize: 13}}
                          containerStyle={Styles.TaskDetailsViewContentText}
                          html={this.state.description}
                        />
                      </Row>
                      <View style={Styles.TaskViewLine} />
                      <Row>
                        <Col size={10}>
                          {this.state.attached_document_name != '' &&
                            this.state.attached_document_name != null && (
                              <Icon
                                name="attachment"
                                size={13}
                                color="#666666"
                              />
                            )}
                        </Col>
                        <Col size={90}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              color: '#7A7474',
                            }}
                            onPress={() =>
                              this.copyfile(
                                this.state.attached_document_data,
                                this.state.attached_document_name,
                              )
                            }>
                            {this.state.attached_document_name}
                          </Text>
                        </Col>
                      </Row>
                    </Grid>
                  </Row>
                )}
                {(this.props.route.params.taskType == 'success' ||
                  this.state.taskPriorityType == 'success') && (
                  <Row>
                    <Grid
                      style={{
                        backgroundColor: '#B7DCD0',
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 3,
                        fontSize: 14,
                      }}>
                      <Row>
                        <Text style={Styles.TaskViewHeading}>
                          {this.state.title}
                        </Text>
                      </Row>
                      <View style={Styles.TaskViewLine} />
                      <Row>
                        <HTML
                          onLinkPress={(evt, href) => Linking.openURL(href)}
                          baseFontStyle={{color: '#55595c', fontSize: 13}}
                          containerStyle={Styles.TaskDetailsViewContentText}
                          html={this.state.description}
                        />
                      </Row>
                      <View style={Styles.TaskViewLine} />
                      <Row>
                        <Col size={10}>
                          {this.state.attached_document_name != '' &&
                            this.state.attached_document_name != null && (
                              <Icon
                                name="attachment"
                                size={13}
                                color="#666666"
                              />
                            )}
                        </Col>
                        <Col size={90}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 'bold',
                              color: '#7A7474',
                            }}
                            onPress={() =>
                              this.copyfile(
                                this.state.attached_document_data,
                                this.state.attached_document_name,
                              )
                            }>
                            {this.state.attached_document_name}
                          </Text>
                        </Col>
                      </Row>
                    </Grid>
                  </Row>
                )}
                <Row style={{padding: 15}}>
                  <Grid>
                    <Row style={{padding: 5}}>
                      <CommunityIcon
                        style={{
                          color: '#666666',
                          fontWeight: 'bold',
                        }}
                        name="calendar-check"
                        size={20}
                      />
                      <Text
                        style={{
                          color: '#666666',
                          fontSize: 14,
                        }}>
                        {' '}
                        Complete by: {this.state.due_date}
                      </Text>
                    </Row>

                    <Row style={{padding: 5}}>
                      {this.state.completed_at == '' && (
                        <CommunityIcon
                          style={{
                            color: '#666666',
                            fontWeight: 'bold',
                          }}
                          name="check-circle"
                          size={20}
                        />
                      )}
                      <Text
                        style={{
                          color: '#666666',
                          fontSize: 14,
                        }}>
                        {this.state.completed_at != '' && (
                          <CommunityIcon
                            style={{
                              color: '#666666',
                              textAlign: 'right',
                              fontWeight: 'bold',
                            }}
                            name="check-circle"
                            size={20}
                          />
                        )}{' '}
                        Done on : {this.state.completed_at}
                      </Text>
                    </Row>
                  </Grid>
                </Row>

                {this.state.msgListing.length > 0 && (
                  <View
                    style={{borderBottomColor: '#CCC', borderBottomWidth: 1}}>
                    <Text></Text>
                  </View>
                )}
                {this.state.msgListing.length > 2 &&
                  this.state.show_more_status && (
                    <Text
                      style={{textAlign: 'center', marginTop: 15}}
                      onPress={() => this.paginationTasks()}>
                      <Text style={{color: '#45B5FF', textAlign: 'center'}}>
                        Show more messages
                      </Text>
                    </Text>
                  )}

                {/* Message Listing Display For Specific Task */}
                <View style={{width: '100%'}}>
                  {this.state.msgListing.map((messages, index) =>
                    this.MsgListingHTML(messages, index),
                  )}
                </View>
                {/* Message Listing Display For Specific Task */}

                <View style={{borderBottomColor: '#CCC', borderBottomWidth: 1}}>
                  <Text></Text>
                </View>

                {replyToTask && this.state.replyBtn && (
                  <Button
                    full
                    warning
                    style={{backgroundColor: '#FBAC02', borderRadius: 5}}
                    onPress={() => this.displayMsgBox()}>
                    <Text
                      style={{
                        fontFamily: 'HelveticaNeue',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                      uppercase={false}>
                      Reply to Message
                    </Text>
                  </Button>
                )}
                {this.state.replyTask && (
                  <View>
                    <Item regular style={Styles.CreateMessagetextInputBigBox}>
                      <Textarea
                        ref="confirm_password"
                        style={Styles.CreateMessageloginInputBoxArea}
                        rowSpan={5}
                        placeholder="Add your Reply / Question / Update here"
                        value={this.state.message}
                        onChangeText={(message) =>
                          this.setState({message})
                        }></Textarea>
                    </Item>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'relative',
                        marginTop: -30,
                      }}>
                      <Row style={{padding: 10}}>
                        <Col size={10}>
                          <Icon
                            onPress={this.SingleFilePicker.bind(this)}
                            style={{
                              color: '#666666',
                              flex: 1,
                            }}
                            name="attachment"
                            size={13}
                          />
                        </Col>
                        <Col size={80}>
                          {this.state.fileName != '' ? (
                            <TouchableHighlight>
                              <Text
                                style={{
                                  fontFamily: 'Helvetica',
                                  fontSize: 13,
                                  color: '#666666',
                                }}>
                                {this.state.fileName}
                                {'  '}
                                {this.state.playButton && (
                                  <FeatherIcon
                                    name="play"
                                    size={13}
                                    onPress={() =>
                                      this.copyfile(
                                        this.state.document_uri,
                                        this.state.document_name,
                                      )
                                    }></FeatherIcon>
                                )}
                                {'  '}
                                <FeatherIcon
                                  name="trash"
                                  onPress={this.deletefile}></FeatherIcon>
                              </Text>
                            </TouchableHighlight>
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
                        <Col size={30} style={{alignItems: 'center'}}></Col>
                      </Row>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'relative',
                      }}>
                      <Row style={{padding: 10}}>
                        <Col size={10}>
                          {this.state.audioRecord && (
                            <FeatherIcon
                              onPress={this.recordAudioStop}
                              style={{
                                color: '#666666',
                                flex: 1,
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
                      info
                      full
                      style={Styles.CreateMessageaddMsgBtn}
                      onPress={this.onSubmitMessage}>
                      <Text style={Styles.CreateMessageaddMsgBtnText}>
                        Send Message
                      </Text>
                    </Button>
                  </View>
                )}
                {replyToTask && (
                  <Button
                    warning
                    full
                    style={Styles.TaskDetailsViewtaskViewCompleteMsg}
                    onPress={() => {
                      this.completeTaskPopup();
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'HelveticaNeue',
                        fontSize: 16,
                      }}>
                      Complete Task
                    </Text>
                  </Button>
                )}
              </View>

              <Dialog
                visible={this.state.popup1}
                onTouchOutside={() => {
                  this.setState({popup1: false});
                }}
                dialogAnimation={
                  new ScaleAnimation({
                    initialValue: 0, // optional
                    useNativeDriver: true, // optional
                  })
                }
                width={0.9}
                overlayBackgroundColor="#000"
                overlayOpacity={1}
                containerStyle={{overflowY: 'auto'}}>
                <DialogContent>
                  {(this.props.route.params.taskType == 'urgent' ||
                    this.state.taskPriorityType == 'urgent') && (
                    <Text
                      style={{
                        borderColor: '#F80014',
                        borderWidth: 2,
                        padding: 10,
                        marginTop: 20,
                        borderRadius: 3,
                        fontSize: 14,
                      }}>
                      {this.state.title}
                      <Icon
                        style={{
                          fontSize: 18,
                          color: '#F80014',
                          textAlign: 'right',
                        }}
                        name="warning"
                      />
                    </Text>
                  )}

                  {(this.props.route.params.taskType == 'warning' ||
                    this.state.taskPriorityType == 'warning') && (
                    <Text
                      style={{
                        borderColor: '#FBAC02',
                        borderWidth: 2,
                        padding: 10,
                        marginTop: 20,
                        borderRadius: 3,
                        fontSize: 14,
                      }}>
                      {this.state.title}
                      <Icon
                        style={{
                          fontSize: 18,
                          color: '#FBAC02',
                          textAlign: 'right',
                        }}
                        name="warning"
                      />
                    </Text>
                  )}

                  {(this.props.route.params.taskType == 'success' ||
                    this.state.taskPriorityType == 'success') && (
                    <Text
                      style={{
                        borderColor: '#279C74',
                        borderWidth: 2,
                        padding: 10,
                        marginTop: 20,
                        borderRadius: 3,
                        fontSize: 14,
                      }}>
                      {this.state.title}
                      <Icon
                        style={{
                          fontSize: 18,
                          color: '#279C74',
                          textAlign: 'right',
                        }}
                        name="warning"
                      />
                    </Text>
                  )}

                  {(this.props.route.params.taskType == 'urgent' ||
                    this.state.taskPriorityType == 'urgent') && (
                    <HTML
                      onLinkPress={(evt, href) => Linking.openURL(href)}
                      baseFontStyle={{color: '#55595c', fontSize: 13}}
                      containerStyle={{
                        borderColor: '#F80014',
                        borderWidth: 2,
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 3,
                      }}
                      html={this.state.description}
                    />
                  )}
                  {(this.props.route.params.taskType == 'warning' ||
                    this.state.taskPriorityType == 'warning') && (
                    <HTML
                      onLinkPress={(evt, href) => Linking.openURL(href)}
                      baseFontStyle={{color: '#55595c', fontSize: 13}}
                      containerStyle={{
                        borderColor: '#FBAC02',
                        borderWidth: 2,
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 3,
                      }}
                      html={this.state.description}
                    />
                  )}
                  {(this.props.route.params.taskType == 'success' ||
                    this.state.taskPriorityType == 'success') && (
                    <HTML
                      onLinkPress={(evt, href) => Linking.openURL(href)}
                      baseFontStyle={{color: '#55595c', fontSize: 13}}
                      containerStyle={{
                        borderColor: '#279C74',
                        borderWidth: 2,
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 3,
                      }}
                      html={this.state.description}
                    />
                  )}
                  <Text>
                    {this.state.attached_document_name != '' &&
                      this.state.attached_document_name != null && (
                        <Icon
                          style={{
                            fontSize: 13,
                            color: '#666666',
                            right: 0,
                            flex: 1,
                          }}
                          name="attachment"
                        />
                      )}
                    <Text style={{fontSize: 11}}>
                      {this.state.attached_document_name}
                    </Text>
                  </Text>

                  <Row style={{marginTop: 10, marginBottom: 20}}>
                    <Grid>
                      <Col size={50}>
                        <Text style={{color: '#000', fontSize: 10}}>
                          <CommunityIcon
                            style={{
                              fontSize: 15,
                              color: 'red',
                              textAlign: 'right',
                              fontWeight: 'bold',
                            }}
                            name="calendar-check"
                          />{' '}
                          Complete by: {this.state.due_date}
                        </Text>
                      </Col>
                      <Col size={5}></Col>
                      <Col size={45}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 10,
                            fontWeight: 'bold',
                          }}>
                          <CommunityIcon
                            style={{
                              fontSize: 15,
                              color: '#279C74',
                              textAlign: 'right',
                              fontWeight: 'bold',
                            }}
                            name="check-circle"
                          />{' '}
                          Done on : {this.state.completed_at}
                        </Text>
                      </Col>
                    </Grid>
                  </Row>
                  <Button
                    full
                    onPress={() => {
                      this.setState({popup1: false});
                    }}
                    style={Styles.TaskDetailsViewtypeButton}>
                    <Text style={Styles.TaskDetailsViewtypeButtonText}>
                      Go Back
                    </Text>
                  </Button>
                  <Button
                    full
                    warning
                    onPress={() => {
                      this.TaskDoneAPI();
                    }}
                    style={Styles.TaskDetailsViewtypeButtonGreen}>
                    <Text style={Styles.TaskDetailsViewtypeButtonText}>
                      Complete Task
                    </Text>
                  </Button>
                </DialogContent>
              </Dialog>
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
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
