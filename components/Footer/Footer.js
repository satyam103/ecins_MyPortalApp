import React, {Component} from 'react';
import {Settings, StyleSheet, Text, View} from 'react-native';
import {Badge} from 'native-base';
import Dialog, {SlideAnimation} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCom from 'react-native-vector-icons/MaterialIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Col, Row, Grid} from 'react-native-easy-grid';

import {getDataParamUrl} from '../utility';

const date = new Date();
let currentDate = date.toISOString().split('T')[0];

export default class FooterTabsIconTextExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFooterTab: 1,
      notificationList: [],
      spinner: false,
      popup1: false,
      popup2: false,
      has_complete_access: false,
    };
  }

  openExtraOption = () => {
    this.setState({popup1: true});
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.getNotificationList);
  }

  getNotificationList = () => {
    this.setState({spinner: true});
    getDataParamUrl('GET', 'notifications?since', true)
      .then((response) => {
        if (response.message == undefined) {
          // console.log(response)
          this.setState({notificationList: response});
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
  };

  closeExtraOption = (url, payload = false) => {
    if (url == 'logout') {
      AsyncStorage.setItem('loginStatus', JSON.stringify({status: false}));
      this.setState({popup1: false});
      this.props.navigation.navigate('PasscodeLogin');
    } else if (url == 'HelpAndList') {
      this.setState({popup1: false});
      if (this.state.has_complete_access === true) {
        this.props.navigation.push(url, {payload: payload});
      } else {
        this.setState({popup2: true});
      }
    } else {
      this.setState({popup1: false});
      this.props.navigation.push(url, {payload: payload});
    }
  };

  render() {
    const newNotificationsList = [...this.state.notificationList];
    let chat = [];
    newNotificationsList.map((message, index) => {
      if (message.read_at == 'null' || message.read_at == null) {
        if (
          message.type == 'ProfileChatClientReply' ||
          message.type == 'ProfileChatUpdateSent'
        ) {
          chat.push({chat: message.id});
        }
      }
    });
    return (
      <View style={[styles.appFooter, {position: ''}]}>
        <Grid>
          <Row
            style={{
              height: 40,
              borderColor: '#B5B5B5',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              padding: 8,
              backgroundColor: '#fff',
            }}>
            <Col size={5}></Col>
            <Col size={21}>
              <IconMaterialCom
                onPress={() => this.props.navigation.push('MyEvents')}
                style={
                  this.props.stackName == 'MyEvents'
                    ? styles.highlightTabIcon
                    : this.props.stackName == 'CreateMessage'
                    ? styles.highlightTabIcon
                    : this.props.stackName == 'ViewMessage'
                    ? styles.highlightTabIcon
                    : styles.appFooterIcon
                }
                // name="qrcode"
                name="event"
              />
              <Text
                onPress={() => this.props.navigation.push('MyEvents')}
                style={
                  this.props.stackName == 'MyEvents'
                    ? styles.highlightTab
                    : this.props.stackName == 'CreateMessage'
                    ? styles.highlightTab
                    : this.props.stackName == 'ViewMessage'
                    ? styles.highlightTab
                    : styles.appFooterBtn
                }>
                {/* Attendance */}
                My Events
              </Text>
            </Col>
            <Col size={14}>
              <Icon
                onPress={() => {
                  // if (this.state.has_complete_access === true) {
                    this.props.navigation.push('Task');
                  // } else {
                  //   this.setState({popup2: true});
                  // }
                }}
                style={
                  this.props.stackName == 'Task'
                    ? styles.highlightTabIcon
                    : this.props.stackName == 'Task'
                    ? styles.highlightTabIcon
                    : styles.appFooterIcon
                }
                // name="user"
                name="th-list"
              />
              <Text
                onPress={() => {
                  // if (this.state.has_complete_access === true) {
                    this.props.navigation.push('Task');
                  // } else {
                  //   this.setState({popup2: true});
                  // }
                }}
                // onPress={() => this.props.navigation.push('Task')}

                style={
                  this.props.stackName == 'Task'
                    ? styles.highlightTab
                    : this.props.stackName == 'Task'
                    ? styles.highlightTab
                    : styles.appFooterBtn
                }>
                Task
              </Text>
            </Col>
            <Col size={5}></Col>
            <Col
              size={20}
              style={{
                textAlign: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View
                // onPress={() => this.props.navigation.push('ScanScreen')}
                onPress={() => this.openExtraOption()}
                style={{
                  backgroundColor: '#fff',
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  marginTop: -30,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 24,
                  textAlign: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  size={35}
                  onPress={() => this.openExtraOption()}
                  style={[
                    styles.appFooterMiddleIcon,
                    // this.props.stackName == 'ScanScreen' &&
                    //   styles.highlightMiddleTabIcon,
                  ]}
                  name="plus"
                />
              </View>
            </Col>
            <Col size={5}></Col>
            <Col size={21}>
              <Icon
                onPress={() => {
                  if (this.state.has_complete_access === true) {
                    this.props.navigation.push('JournalList');
                  } else {
                    this.setState({popup2: true});
                  }
                }}
                // onPress={() => this.props.navigation.push('JournalList')}

                style={
                  this.props.stackName == 'JournalList'
                    ? styles.highlightTabIcon
                    : styles.appFooterIcon
                }
                name="book"
                active
              />
              <Text
                onPress={() => {
                  if (this.state.has_complete_access === true) {
                    this.props.navigation.push('JournalList');
                  } else {
                    this.setState({popup2: true});
                  }
                }}
                // onPress={() => this.props.navigation.push('JournalList')}

                style={
                  this.props.stackName == 'JournalList'
                    ? styles.highlightTab
                    : styles.appFooterBtn
                }>
                My Diary
              </Text>
            </Col>
            <Col size={14}>
              <IconMaterialCom
                onPress={() =>
                  this.props.navigation.push('ChatMessage', {chat: chat})
                }
                style={
                  this.props.stackName == 'ChatMessage'
                    ? styles.highlightTabIcon
                    : styles.appFooterIcon
                }
                name="message"
              />
              <Text
                onPress={

                  // () => this.props.navigation.push('EditSettings')
                  () => this.props.navigation.push('ChatMessage', {chat: chat})

                }
                style={
                  this.props.stackName == 'ChatMessage'
                    ? styles.highlightTab
                    : styles.appFooterBtn
                }>
                Chat
              </Text>
              <View style={{marginLeft: -15, marginTop: 10}}>
                <Text style={styles.chatBadgeText}>
                  {chat.length > 0 && (
                    <Badge info style={styles.notificationCount}></Badge>
                  )}
                </Text>
              </View>
            </Col>
            <Col size={5}></Col>
          </Row>
        </Grid>
        <Dialog
          visible={this.state.popup1}
          onTouchOutside={() => {
            this.setState({popup1: false});
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          width={0.9}
          height={310}
          dialogStyle={{position: 'absolute', bottom: 10}}>
          <Text style={styles.footerNewNavText}>More Options</Text>
          <View style={styles.viewStyleForLine}></View>
          <View style={styles.viewContainerCustom}>
            <Grid>
              <Row>
                <Col>
                  <View style={styles.viewContain}>
                    <Text
                      style={styles.footerMoreOption}
                      onPress={() => this.closeExtraOption('HelpAndList')}>
                      <Icon
                        size={35}
                        onPress={() => this.closeExtraOption('HelpAndList')}
                        name="question-circle"
                        style={styles.footerMoreOptionIcon}
                      />
                    </Text>
                    <Text
                      onPress={() => this.closeExtraOption('HelpAndList')}
                      style={styles.footerMoreOptionText}>
                      Information & Support
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.viewContain}>
                    <Text
                      style={styles.footerMoreOption}
                      onPress={() =>
                        this.closeExtraOption('Calendar', {
                          event_date: currentDate,
                        })
                      }>
                      <Icon
                        size={35}
                        name="calendar-check-o"
                        style={styles.footerMoreOptionIcon}
                      />
                    </Text>
                    <Text
                      onPress={() =>
                        this.closeExtraOption('Calendar', {
                          event_date: currentDate,
                        })
                      }
                      style={styles.footerMoreOptionText}>
                      My Calendar
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.viewContain}>
                    <Text
                      style={styles.footerMoreOption}
                      onPress={() =>
                        this.closeExtraOption('EditSettings', {
                          event_date: currentDate,
                        })
                      }>
                      <IconMaterialCom
                        size={35}
                        name="settings"
                        style={styles.footerMoreOptionIcon}
                        onPress={() =>
                          this.closeExtraOption('EditSettings', {
                            event_date: currentDate,
                          })
                        }
                      />
                    </Text>
                    <Text
                      onPress={() =>
                        this.closeExtraOption('EditSettings', {
                          event_date: currentDate,
                        })
                      }
                      style={[
                        styles.footerMoreOptionText,
                        {textAlign: 'center', fontSize: 12},
                      ]}>
                      Settings
                    </Text>
                  </View>
                </Col>
              </Row>
              <Row style={{marginTop: 100}}>
                <Col>
                  <View style={styles.viewContain}>
                    <Text
                      style={styles.footerMoreOption}
                      onPress={() => this.closeExtraOption('MyAccount')}>
                      <IconMaterial
                        size={35}
                        onPress={() => this.closeExtraOption('MyAccount')}
                        name="account"
                        style={styles.footerMoreOptionIcon}
                      />
                    </Text>
                    <Text
                      onPress={() => this.closeExtraOption('MyAccount')}
                      style={styles.footerMoreOptionText}>
                      My Accounts
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.viewContain}>
                    <Text
                      style={styles.footerMoreOption}
                      onPress={() =>
                        this.closeExtraOption('PrivateMode', {
                          event_date: currentDate,
                        })
                      }>
                      <Icon
                        size={35}
                        name="eye-slash"
                        style={styles.footerMoreOptionIcon}
                      />
                    </Text>
                    <Text
                      onPress={() =>
                        this.closeExtraOption('PrivateMode', {
                          event_date: currentDate,
                        })
                      }
                      style={styles.footerMoreOptionText}>
                      Private Mode
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.viewContain}>
                    <Text
                      style={styles.footerMoreOption}
                      onPress={() =>
                        this.closeExtraOption('logout', {
                          event_date: currentDate,
                        })
                      }>
                      <IconMaterial
                        size={35}
                        name="logout"
                        style={styles.footerMoreOptionIcon}
                        onPress={() =>
                          this.closeExtraOption('logout', {
                            event_date: currentDate,
                          })
                        }
                      />
                    </Text>
                    <Text
                      onPress={() =>
                        this.closeExtraOption('logout', {
                          event_date: currentDate,
                        })
                      }
                      style={[
                        styles.footerMoreOptionText,
                        {textAlign: 'center', fontSize: 12},
                      ]}>
                      Logout
                    </Text>
                  </View>
                </Col>
              </Row>
              <Row style={{marginTop: 100}}>
                <Col>
                  <View style={styles.viewContain}></View>
                </Col>
              </Row>
            </Grid>
          </View>
          <View
            style={{
              borderTopColor: '#ccc',
              borderTopWidth: 2,
              marginTop: 120,
              textAlign: 'center',
            }}>
            <Text
              style={{textAlign: 'center'}}
              onPress={() => this.setState({popup1: false})}>
              <Icon size={30} name="angle-down"></Icon>
            </Text>
          </View>
        </Dialog>

        {/* subscriptin popup======================================== */}
        <Dialog
          visible={this.state.popup2}
          onTouchOutside={() => {
            this.setState({popup2: false});
          }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          width={0.9}
          // height={310}
          dialogStyle={{position: 'relative', bottom: 10}}>
          <Text style={styles.footerNewNavText}>Subscription</Text>
          <View style={styles.viewStyleForLine}></View>
          <View style={{height: 80}}>
            <Text
              // style={{justifyContent:'center'}}
              style={styles.footerNewNavText}>
              You don't have subscription to view content.
            </Text>
          </View>
          <View
            style={{
              borderTopColor: '#ccc',
              borderTopWidth: 2,
              marginTop: 40,
              textAlign: 'center',
            }}>
            <Text
              style={{textAlign: 'center'}}
              onPress={() => this.setState({popup2: false})}>
              <Icon size={30} name="angle-down"></Icon>
            </Text>
          </View>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyleForLine: {
    borderTopColor: '#ccc',
    borderTopWidth: 2,
    alignSelf: 'stretch',
    width: '100%',
  },
  viewContainerCustom: {
    height: 110,
  },
  viewContain: {
    height: 120,
    height: 70,
    alignItems: 'center',
  },
  appFooter: {
    backgroundColor: 'white',
  },
  appFooterBtn: {
    // flexShrink:1,
    flexWrap: 'wrap',
    color: '#303030',
    textTransform: 'capitalize',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  appFooterIcon: {
    color: '#303030',
    fontSize: 20,
    textAlign: 'center',
  },
  footerActiveTab: {
    backgroundColor: '#000',
  },
  highlightTab: {
    color: '#29A5DD',
    fontSize: 11,
    // flexShrink:1,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  highlightTabIcon: {
    color: '#29A5DD',
    fontSize: 20,
    textAlign: 'center',
  },
  highlightMiddleTabIcon: {
    color: '#29A5DD',
  },
  appFooterMiddleIcon: {
    color: '#303030',
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  appFooterMiddleIconView: {
    borderRadius: 50,
    padding: 10,
    // paddingTop:15,
    // paddingBottom:15,
    borderColor: '#303030',
    borderWidth: 1,
  },

  footerNewNavText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  footerMoreOption: {
    backgroundColor: '#ccc',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 20,
    marginTop: 15,
    paddingTop: 15,
    textAlign: 'center',
    overflow: 'hidden',
  },
  footerMoreOptionIcon: {
    position: 'absolute',
    top: 50,
  },
  footerMoreOptionText: {
    fontSize: 12,
  },
  chatBadgeText: {
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: -40,
    marginLeft: 44,
  },
  notificationCount: {
    width: 10,
    height: 10,
  },
});
