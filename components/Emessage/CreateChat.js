import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  PermissionsAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Linking,
  FlatList,
  Text,
} from 'react-native';
import {Button, TextArea} from 'native-base';
import {Col, Row} from 'react-native-easy-grid';
import Styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';
import {getDataParamUrl} from '../utility';
import HTML from 'react-native-render-html';
import fetch_blob from 'react-native-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';
import FilePickerManager from 'react-native-file-picker';
import RNFS from 'react-native-fs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SoundRecorder from 'react-native-sound-recorder';
import IconEntypo from 'react-native-vector-icons/Entypo';
import ValidationComponent from 'react-native-form-validator';
import SoundPlayer from 'react-native-sound-player';

export default class CreateChat extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      msgListing: [],
      chatList: [],
      organisation_uuid: '',
      profile_uuid: '',
      access_token: '',
      allowBottomBtn: true,
      footerHeight: 110,
      footerBottomHeight: 0,
      spinner: false,
      flexProp: 0,
      spinner: false,
      scrollContainerHieght: 0,
      active_private_mode: false,
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
      flatListOffset: 0,
    };
    this.flatListRef = React.createRef();

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
        var myHeaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.access_token,
          Cookie: 'logged_in=1',
        };

        var getRequestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        var postRequestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow',
        };
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
          // spinner true
          this.setState({spinner: true});
          // get the task details
          fetch(
            global.ApiUrl +
              '/api/organisations/' +
              this.state.organisation_uuid +
              '/profile/' +
              this.state.profile_uuid +
              '/chat/updates',
            getRequestOptions,
          )
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.message == 'Server Error') {
                this.setState({spinner: false});
                showMessage({
                  message: 'Chat Log',
                  description:
                    'Something is broken! Please try after some time.',
                  type: 'danger',
                  textStyle: {fontFamily: 'HelveticaNeue'},
                  // fontWeight: 'bold',
                });
              } else if (responseJson.message == undefined) {
                // console.log(url, myHeaders);
                console.log(JSON.stringify(responseJson, null, 2));
                this.setState({chatList: responseJson});

                // update chat as read
                var result = fetch(
                  global.ApiUrl +
                    '/api/organisations/' +
                    this.state.organisation_uuid +
                    '/profile/' +
                    this.state.profile_uuid +
                    '/chat/update',
                  postRequestOptions,
                )
                  .then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({spinner: false});
                  })
                  .catch((error) => {});
              }

              if (responseJson.message == 'Unauthenticated.') {
                this.props.navigation.navigate('Login');
              }
            })
            .catch((error) => {
              console.error(error);
            });
        });
      },
    );

    if (this.props.route.params.chat != '') {
      const messageIds = this.props.route.params.chat;
      if (messageIds) {
        messageIds.map((message, index) => {
          getDataParamUrl('GET', 'notification/' + message.chat + '')
            .then((response) => {
              if (response.message == undefined) {
                // console.log(message.chat);
              }
              if (response.message == 'Unauthenticated.') {
                this.props.navigation.navigate('Login');
              }
            })
            .catch((response) => {
              console.log(response);
            });
        });
      }
    }
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.checkPrivateMode);
    // this.scrollToBottom();
  }
  componentDidMount() {
    // this.organizationDetails()
    this.scrolltoTop();
  }
  // componentDidUpdate() {
  //   const layout = this.flatListRef._listRef._scrollMetrics.offset;
  //   this.setState({flatListOffset: layout});
  // //   this.scrollToBottom();
  // }

  checkPrivateMode = () => {
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });
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
        console.log(res);
        this.setState({document_name: res.name});
        this.setState({fileName: res.name});
        this.setState({playButton: false});
        this.setState({document_uri: res.uri});

        // RNFS.readFile(res.uri, 'base64').then((res) => {
        //   this.setState({document_uri: res});
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
      try {
      } catch (error) {}
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then((result) => console.log(result));
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
          this.setState({playButton: false});
          RNFS.readFile(response.uri, 'base64').then((res) => {
            this.setState({document_uri: res});
          });
        }
      });
    }
  };

  recordAudio = async () => {
    console.log('started');
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
    this.setState({playButton: true});
    this.setState({audioRecord: false});

    let that = this;
    SoundRecorder.stop().then(function (result) {
      console.log('stopped recording, audio file saved at: ' + result.path);
      that.setState({document_name: 'sound-recording.mp3'});
      that.setState({fileName: 'sound-recording.mp3'});
      console.log(result, '=====================================');

      RNFS.readFile(result.path, 'base64').then((res) => {
        // console.log(res,"++++++++++++++++++++++++++++++++++++++++++++++++++++++")
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
      // console.log(SoundRecorder.PATH_CACHE + '/sound-recording.mp3')
      SoundPlayer.playUrl(this.state.document_uri);
      this.setState({audioPlaying: true});
      console.log(this.state.document_uri);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  // =============================================================================================================

  deletefile = () => {
    this.setState({document_name: ''});
    this.setState({fileName: ''});
    this.setState({message: ''});
    this.setState({document_uri: ''});
    this.setState({fileUploadingMsg: 'Tap the microphone to record'});
  };

  copyfile = async (documentname, attachmentname) => {
    console.log(documentname, attachmentname);
    this.setState({spinner: true});
    // fetch('GET',documentname)
    const [fileName, extName] = attachmentname.split('.');
    const fs = fetch_blob.fs;
    const config = fetch_blob.config;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;
    console.log(fs, config);
    console.log(fileDir);
    const path = fileDir + '/' + attachmentname;
    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'file download',
        mime: 'application/' + extName,
      },
    })
      // .fetch(
      //   'GET',
      //   'https://file-examples.com/storage/fe63e96e0365c0e1e99a842/2017/10/file-sample_150kB.pdf',
      //   {
      .fetch('GET', documentname, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.access_token,
        Cookie: 'logged_in=1',
      })
      .then((res) => {
        console.log('hello', path);
        FileViewer.open(path, {showOpenWithDialog: true})
          .then(() => {
            this.setState({spinner: false});
            console.log('File opened successfully');
          })
          .catch((error) => {
            this.setState({spinner: false});
            console.error('Error opening file:', error);
            alert('Error', 'No app associated with this file type.');
          });
        console.log('The file saved to ', res.path());
        alert('file downloaded successfully ');
      })
      .catch((error) => {
        this.setState({spinner: false});
        console.log(error, 'jhknjkjj');
      });

    // const fs = fetch_blob.fs;
    // const base64 = fetch_blob.base64;
    // const dirs = fetch_blob.fs.dirs;
    // if (Platform.OS === 'ios') {
    //   const file_path = dirs.DocumentDir + '/' + attachmentname;
    //   RNFS.writeFile(file_path, documentname, 'base64')
    //     .then((success) => {
    //       console.log(success)
    //       FileViewer.open(file_path)
    //         .then(() => {
    //           // success
    //         })
    //         .catch((error) => {
    //           // error
    //         });
    //     })
    //     .catch((error) => {
    //       alert(JSON.stringify(error));
    //     });
    //   this.setState({spinner: false});
    // } else {
    //   const file_path = dirs.DownloadDir + '/' + attachmentname;
    //   console.log(file_path);
    //   try {
    //     const permission = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //     );
    //     console.log(permission, 'Permission@@@');
    //     if (
    //       permission === PermissionsAndroid.RESULTS.GRANTED ||
    //       permission === 'never_ask_again'
    //     ) {
    //       console.log('here');
    //       RNFS.writeFile(file_path, documentname, 'base64')
    //         .then((success) => {
    //           console.log(success, file_path);
    //           FileViewer.open(file_path)
    //             .then(() => {
    //               console.log('2344');
    //               // success
    //             })
    //             .catch((error) => {
    //               // error
    //               console.log(error,"mmmmnmnn");
    //             });
    //         })
    //         .catch((error) => {
    //           console.log(error,"ksknn")
    //           alert(JSON.stringify(error));
    //         });
    //     } else {
    //       PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       ).then((result) => console.log(result));
    //       console.log('Permission denied');
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }
    this.setState({spinner: false});
  };

  postMsg = () => {
    console.log('Herer@2');
    this.validate({
      message: {required: true},
    });
    const url =
      global.ApiUrl +
      '/api/organisations/' +
      this.state.organisation_uuid +
      '/profile/' +
      this.state.profile_uuid +
      '/chat/store';
    console.log(url);
    var getRequestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + this.state.access_token,
        Cookie: 'logged_in=1',
      },
      redirect: 'follow',
    };

    if (this.state.message != '') {
      console.log('object');
      let newMessage = new FormData();
      newMessage.append('sms_sent', 0);
      newMessage.append('message', this.state.message);
      // var formData = {
      //   sms_sent: 0,
      //   message: this.state.message,
      // };

      if (this.state.document_name !== '') {
        let extenstionFile = this.state.document_name.split('.');
        let filename = this.state.document_name;
        let extension = extenstionFile[1];
        let base64_file = this.state.document_uri;

        newMessage.append('file', {
          filename: filename,
          extension: extension, // Adjust the file type accordingly
          base64_file: base64_file,
        });
        // formData.file = {
        //   filename: this.state.document_name,
        //   extension: extenstionFile[1],
        //   base64_file: this.state.document_uri,
        // };
      }
      // var raw = JSON.stringify(formData);
      var requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + this.state.access_token,
          Cookie: 'logged_in=1',
        },
        body: newMessage,
        redirect: 'follow',
      };
      // console.log(JSON.stringify(newMessage, null, 2));
      this.setState({spinner: true});
      fetch(url, requestOptions)
        .then((response) => {
          console.log(response, '========================');
          return response.json();
        })
        .then((responseJson) => {
          console.log(responseJson, '++++++++++++++++++++++++++');
          this.setState({allowBottomBtn: true});
          this.setState({footerHeight: 110});
          this.setState({footerBottomHeight: 0});
          this.setState({message: ''});
          this.setState({document_name: ''});
          this.setState({fileName: ''});
          this.setState({message: ''});
          this.setState({document_uri: ''});
          this.setState({flexProp: 0});
          // this.component._root.scrollToEnd();

          //     // get the task details
          fetch(
            global.ApiUrl +
              '/api/organisations/' +
              this.state.organisation_uuid +
              '/profile/' +
              this.state.profile_uuid +
              '/chat/updates',
            getRequestOptions,
          )
            .then(async (response) => {
              return await response.json();
            })
            .then((responseJson) => {
              if (responseJson.message == undefined) {
                if (responseJson.message == undefined) {
                  this.setState({chatList: responseJson});
                  //  this.component._root.scrollToEnd();
                }
              }
            })
            .catch((error) => {
              console.error(error, 'error1');
              this.setState({spinner: false});
            });
          this.setState({spinner: false});
        })
        .catch((error) => {
          this.setState({spinner: false});
          console.log(error, 'error2');
        });
    }
  };

  setMsgDetails = (details) => {
    this.setState({message: details});
    this.setState({footerHeight: 220});
    this.setState({footerBottomHeight: 100});
  };

  MsgListingHTML = (details) => {
    // console.log(JSON.stringify(details,null,2))
    var regexForTag = /(?:^<p[^>]*>)|(?:<\/p>$)/g;
    var htmlContentMessage = details.message;
    // console.log(htmlContentMessage)
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

    var listing_document_attached = false;
    if (details.document_name !== '') {
      listing_document_attached = true;
    }

    if (details.id !== undefined && details.id !== null) {
      // console.log(details.id)
      if (details.sent_by == 2) {
        let otherUser = details.updater_name;
        let splitUserVal = otherUser.split(' ');
        let newNameToBeDisplay =
          splitUserVal[0].charAt(0) + '' + splitUserVal[1].charAt(0);
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
                    html={htmlStringMessage ? htmlStringMessage : ''}
                  />
                  {listing_document_attached && (
                    <Text
                      style={{
                        color: '#fff',
                        backgroundColor: '#1A7AFF',
                        marginRight: 6,
                        marginTop: -2,
                        textAlign: 'right',
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingBottom: 2,
                        borderBottomLeftRadius: 2,
                        borderBottomRightRadius: 2,
                      }}
                      onPress={() =>
                        this.copyfile(
                          details.document_url,
                          details.document_name,
                        )
                      }>
                      {listing_document_attached && (
                        <IconEntypo
                          onPress={this.onUploadDocument}
                          style={{color: '#fff', right: 5}}
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
      } else {
        let otherUser = details.updater_name;
        splitUserVal = otherUser.split(' ');
        let newNameToBeDisplay =
          splitUserVal[0].charAt(0) + '' + splitUserVal[1].charAt(0);
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
                  {listing_document_attached && (
                    <Text
                      style={{
                        color: '#fff',
                        backgroundColor: '#1A7AFF',
                        marginRight: 10,
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
                        <IconEntypo
                          onPress={this.onUploadDocument}
                          style={{color: '#fff', right: 0}}
                          name="attachment"
                          size={13}
                        />
                      )}
                      {details.document_name}
                    </Text>
                  )}
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
                </View>
              </View>
            </View>
            <Text style={Styles.chatlistItemsDate}>{details.created_at}</Text>
          </View>
        );
      }
    }
  };

  displayMsgContent = () => {
    this.setState({allowBottomBtn: false});
    this.setState({footerHeight: 10});
    this.setState({footerBottomHeight: 40});
    this.setState({flexProp: 1});
    //  this.component._root.scrollToEnd();
  };

  handlePress = () => {
    // this.setState({flexProp: 1});
    Keyboard.dismiss();
    //  this.component._root.scrollToEnd();
  };
  scrolltoTop = (event) => {
    this.flatListRef._listRef._scrollRef.scrollTo({y: 0, animating: true});
    this.setState({flatListOffset: 0});
  };

  render() {
    return (
      <View>
        <View
          style={{height: '100%'}}
          ref={(c) => (this.component = c)}
          onContentSizeChange={(contentWidth, contentHeight) => {}}>
          <SafeAreaView>
            <View
              style={[
                Styles.CreateChatheaderContainer,
                {marginBottom: this.state.scrollContainerHieght},
              ]}>
              <Text style={Styles.CreateChatmessageTitle}>Chat Log</Text>

              {/* Message Listing Display For Specific Task */}
              <FlatList
                ref={(ref) => {
                  this.flatListRef = ref;
                }}
                style={[
                  {
                    width: '98%',
                    marginLeft: 5,
                    height: !this.state.allowBottomBtn ? '73%' : '82%',
                  },
                ]}
                inverted
                showsVerticalScrollIndicator={false}
                data={this.state.chatList}
                renderItem={({item}) => this.MsgListingHTML(item)}
                numColumns={1}
                onEndReached={({distanceFromEnd}) => {
                  if (distanceFromEnd === 0) {
                    // Hide your "Scroll to Bottom" button
                    console.log('end');
                  } else {
                    this.setState({flatListOffset: distanceFromEnd});
                    // Show your "Scroll to Bottom" button
                  }
                }}
                onLayout={() => {}}
              />
              {/* Message Listing Display For Specific Task */}
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
              />
            </View>
            {this.state.flatListOffset != 0 && (
              <TouchableOpacity
                activeOpacity={0.5}
                visible={this.state.flatListOffset}
                onPress={() => this.scrolltoTop()}
                style={{
                  position: 'absolute',
                  backgroundColor: 'grey',
                  padding: 6,
                  borderRadius: 50,
                  opacity: 0.4,
                  elevation: 5,
                  alignSelf: 'flex-end',
                  bottom: 110,
                  right: 20,
                }}>
                <Icon1
                  style={{fontSize: 24, color: 'black'}}
                  name="keyboard-arrow-down"
                />
              </TouchableOpacity>
            )}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              style={{flex: this.state.flexProp}}>
              <TouchableWithoutFeedback onPress={() => this.handlePress()}>
                <View style={styles.inner}>
                  {!this.state.allowBottomBtn && (
                    <View>
                      <TextArea
                        rowSpan={3}
                        bordered
                        name="message"
                        placeholder="Enter message"
                        onChangeText={(message) => this.setMsgDetails(message)}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          position: 'relative',
                        }}>
                        <Row style={{padding: 10}}>
                          <Col size={10}>
                            <IconEntypo
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
                          <Col size={20} style={{alignItems: 'center'}}></Col>
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
                        full
                        onPress={() => {
                          this.postMsg();
                        }}
                        style={[
                          Styles.CreateChatSendMessage,
                          {
                            backgroundColor: '#30A487',
                            marginTop: 10,
                            borderRadius: 5,
                            width: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          },
                        ]}>
                        <Text
                          uppercase={false}
                          style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontFamily: 'HelveticaNeue',
                            fontSize: 16,
                          }}>
                          Send Message
                        </Text>
                      </Button>
                    </View>
                  )}
                  {this.state.allowBottomBtn && (
                    <Button
                      warning
                      full
                      // colorScheme={'info'}
                      style={Styles.ChatButtonMessage}
                      onPress={() => {
                        this.displayMsgContent();
                      }}
                      bordered
                      light>
                      <Text
                        uppercase={false}
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontFamily: 'HelveticaNeue',
                          fontSize: 16,
                        }}>
                        Add a Message
                      </Text>
                    </Button>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  inner: {
    padding: 24,
    // bottom:0,
    // maxHeight:250
  },
});
