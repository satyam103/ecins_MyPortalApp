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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AppFooter from '../Footer/Footer';
import Styles from '../css/style';
import {postDataUrl} from '../utility';
import {getDataParamUrl} from '../utility';

export default class Settings extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      active_task_new_notification_push: 'off',
      active_task_reply_notification_push: 'off',
      active_task_overdue_notification_push: 'off',
      active_task_closed_notification_push: 'off',
      active_task_reopen_notification_push: 'off',
      active_emessage_new_notification_push: 'off',
      active_emessage_reply_notification_push: 'off',
      active_event_new_notification_push: 'off',
      active_event_edit_updated_notification_push: 'off',
      active_event_cancelled_removed_notification_push: 'off',
      active_event_reminder_notification_push: 'off',
      active_chat_new_notification_push: 'off',
      active_task_reminder_notification_push: 'off',
    };

    // get default setting saved
    this.setState({spinner: true});
    getDataParamUrl('GET', 'settings')
      .then((response) => {
        if (response.active_task_new_notification_push == 'on')
          this.setState({active_task_new_notification_push: true});
        else this.setState({active_task_new_notification_push: false});

        if (response.active_task_reply_notification_push == 'on')
          this.setState({active_task_reply_notification_push: true});
        else this.setState({active_task_reply_notification_push: false});

        if (response.active_task_overdue_notification_push == 'on')
          this.setState({active_task_overdue_notification_push: true});
        else this.setState({active_task_overdue_notification_push: false});

        if (response.active_task_closed_notification_push == 'on')
          this.setState({active_task_closed_notification_push: true});
        else this.setState({active_task_closed_notification_push: false});

        if (response.active_task_reopen_notification_push == 'on')
          this.setState({active_task_reopen_notification_push: true});
        else this.setState({active_task_reopen_notification_push: false});

        if (response.active_emessage_new_notification_push == 'on')
          this.setState({active_emessage_new_notification_push: true});
        else this.setState({active_emessage_new_notification_push: false});

        if (response.active_emessage_reply_notification_push == 'on')
          this.setState({active_emessage_reply_notification_push: true});
        else this.setState({active_emessage_reply_notification_push: false});

        if (response.active_event_new_notification_push == 'on')
          this.setState({active_event_new_notification_push: true});
        else this.setState({active_event_new_notification_push: false});

        if (response.active_event_edit_updated_notification_push == 'on')
          this.setState({active_event_edit_updated_notification_push: true});
        else
          this.setState({active_event_edit_updated_notification_push: false});

        if (response.active_event_cancelled_removed_notification_push == 'on')
          this.setState({
            active_event_cancelled_removed_notification_push: true,
          });
        else
          this.setState({
            active_event_cancelled_removed_notification_push: false,
          });

        if (response.active_event_reminder_notification_push == 'on')
          this.setState({active_event_reminder_notification_push: true});
        else this.setState({active_event_reminder_notification_push: false});

        if (response.active_chat_new_notification_push == 'on')
          this.setState({active_chat_new_notification_push: true});
        else this.setState({active_chat_new_notification_push: false});

        if (response.active_task_reminder_notification_push == 'on')
          this.setState({active_task_reminder_notification_push: true});
        else this.setState({active_task_reminder_notification_push: false});
      })
      .catch((response) => {
        // console.log(response)
        // spinner false
        this.setState({spinner: false});
      });
  }

  _onPressUpdateSetting = (value, settingType) => {
    if (settingType == 'active_task_new_notification_push') {
      this.setState({active_task_new_notification_push: value.switchValue});
    }

    if (settingType == 'active_task_reply_notification_push') {
      this.setState({active_task_reply_notification_push: value.switchValue});
    }

    if (settingType == 'active_task_overdue_notification_push') {
      this.setState({active_task_overdue_notification_push: value.switchValue});
    }

    if (settingType == 'active_task_closed_notification_push') {
      this.setState({active_task_closed_notification_push: value.switchValue});
    }

    if (settingType == 'active_task_reopen_notification_push') {
      this.setState({active_task_reopen_notification_push: value.switchValue});
    }

    if (settingType == 'active_emessage_new_notification_push') {
      this.setState({active_emessage_new_notification_push: value.switchValue});
    }

    if (settingType == 'active_emessage_reply_notification_push') {
      this.setState({
        active_emessage_reply_notification_push: value.switchValue,
      });
    }

    if (settingType == 'active_event_new_notification_push') {
      this.setState({active_event_new_notification_push: value.switchValue});
    }

    if (settingType == 'active_event_edit_updated_notification_push') {
      this.setState({
        active_event_edit_updated_notification_push: value.switchValue,
      });
    }

    if (settingType == 'active_event_cancelled_removed_notification_push') {
      this.setState({
        active_event_cancelled_removed_notification_push: value.switchValue,
      });
    }

    if (settingType == 'active_event_reminder_notification_push') {
      this.setState({
        active_event_reminder_notification_push: value.switchValue,
      });
    }

    if (settingType == 'active_chat_new_notification_push') {
      this.setState({active_chat_new_notification_push: value.switchValue});
    }

    if (settingType == 'active_task_reminder_notification_push') {
      this.setState({
        active_task_reminder_notification_push: value.switchValue,
      });
    }

    var settingsData = {
      active_emessage_new_notification_push:
        this.state.active_emessage_new_notification_push == true ? 'on' : 'off',
      active_emessage_reply_notification_push:
        this.state.active_emessage_reply_notification_push == true
          ? 'on'
          : 'off',
      active_event_cancelled_removed_notification_push:
        this.state.active_event_cancelled_removed_notification_push == true
          ? 'on'
          : 'off',
      active_event_edit_updated_notification_push:
        this.state.active_event_edit_updated_notification_push == true
          ? 'on'
          : 'off',
      active_event_new_notification_push:
        this.state.active_event_new_notification_push == true ? 'on' : 'off',
      active_event_reminder_notification_push:
        this.state.active_event_reminder_notification_push == true
          ? 'on'
          : 'off',
      active_task_closed_notification_push:
        this.state.active_task_closed_notification_push == true ? 'on' : 'off',
      active_task_new_notification_push:
        this.state.active_task_new_notification_push == true ? 'on' : 'off',
      active_task_overdue_notification_push:
        this.state.active_task_overdue_notification_push == true ? 'on' : 'off',
      active_task_reopen_notification_push:
        this.state.active_task_reopen_notification_push == true ? 'on' : 'off',
      active_task_reply_notification_push:
        this.state.active_task_reply_notification_push == true ? 'on' : 'off',
      active_chat_new_notification_push:
        this.state.active_chat_new_notification_push == true ? 'on' : 'off',
      active_task_reminder_notification_push:
        this.state.active_task_reminder_notification_push == true
          ? 'on'
          : 'off',
    };

    postDataUrl('post', 'settings', settingsData);
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
                <Text style={styles.mainTitle}>Notification Settings</Text>
                <Text style={styles.mainSubTitle}>Push notifications</Text>
                <View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_chat_new_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_chat_new_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Chat - New</Text>
                        {!this.state.active_chat_new_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_chat_new_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_chat_new_notification_push: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_chat_new_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_chat_new_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_emessage_new_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_emessage_new_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Emessage - New</Text>
                        {!this.state.active_emessage_new_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_emessage_new_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_emessage_new_notification_push:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_emessage_new_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_emessage_new_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state
                          .active_emessage_reply_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_emessage_reply_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Emessage - Reply</Text>
                        {!this.state
                          .active_emessage_reply_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_emessage_reply_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_emessage_reply_notification_push:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_emessage_reply_notification_push',
                              );
                            },
                          )
                        }
                        value={
                          this.state.active_emessage_reply_notification_push
                        }
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_event_new_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_event_new_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - New</Text>
                        {!this.state.active_event_new_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_event_new_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_event_new_notification_push: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_new_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_event_new_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state
                          .active_event_reminder_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_event_reminder_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - Reminder</Text>
                        {!this.state
                          .active_event_reminder_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_event_reminder_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_event_reminder_notification_push:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_reminder_notification_push',
                              );
                            },
                          )
                        }
                        value={
                          this.state.active_event_reminder_notification_push
                        }
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state
                          .active_event_cancelled_removed_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state
                          .active_event_cancelled_removed_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - Removed</Text>
                        {!this.state
                          .active_event_cancelled_removed_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state
                          .active_event_cancelled_removed_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_event_cancelled_removed_notification_push:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_cancelled_removed_notification_push',
                              );
                            },
                          )
                        }
                        value={
                          this.state
                            .active_event_cancelled_removed_notification_push
                        }
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state
                          .active_event_edit_updated_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state
                          .active_event_edit_updated_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - Updated</Text>
                        {!this.state
                          .active_event_edit_updated_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state
                          .active_event_edit_updated_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_event_edit_updated_notification_push:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_edit_updated_notification_push',
                              );
                            },
                          )
                        }
                        value={
                          this.state.active_event_edit_updated_notification_push
                        }
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_new_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_new_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - New</Text>
                        {!this.state.active_task_new_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_new_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_new_notification_push: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_new_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_new_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_closed_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_closed_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Closed</Text>
                        {!this.state.active_task_closed_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_closed_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_closed_notification_push: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_closed_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_closed_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_overdue_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_overdue_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Overdue</Text>
                        {!this.state.active_task_overdue_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_overdue_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_task_overdue_notification_push:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_overdue_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_overdue_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_reopen_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_reopen_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Reopened</Text>
                        {!this.state.active_task_reopen_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_reopen_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_reopen_notification_push: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_reopen_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_reopen_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_reply_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_reply_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Reply</Text>
                        {!this.state.active_task_reply_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_reply_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_reply_notification_push: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_reply_notification_push',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_reply_notification_push}
                      />
                    </View>
                  </View>
                  <View
                    avatar
                    style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_reminder_notification_push && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_reminder_notification_push && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Reminder</Text>
                        {!this.state.active_task_reminder_notification_push && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_reminder_notification_push && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_task_reminder_notification_push:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_reminder_notification_push',
                              );
                            },
                          )
                        }
                        value={
                          this.state.active_task_reminder_notification_push
                        }
                      />
                    </View>
                  </View>
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
  notificationView: {
    borderBottomColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
