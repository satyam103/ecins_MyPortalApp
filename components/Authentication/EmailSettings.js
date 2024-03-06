import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Switch,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from '../css/style';
import {postDataUrl} from '../utility';
import {getDataParamUrl} from '../utility';
import AppFooter from '../Footer/Footer';

export default class Settings extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      active_task_new_notification: 'off',
      active_task_reply_notification: 'off',
      active_task_overdue_notification: 'off',
      active_task_closed_notification: 'off',
      active_task_reopen_notification: 'off',
      active_emessage_new_notification: 'off',
      active_emessage_reply_notification: 'off',
      active_event_new_notification: 'off',
      active_event_edit_updated_notification: 'off',
      active_event_cancelled_removed_notification: 'off',
      active_event_reminder_notification: 'off',
      active_chat_new_notification: 'off',
      active_once_per_day_notification: 'off',
      active_task_reminder_notification: 'off',
    };

    // get default setting saved
    this.setState({spinner: true});
    getDataParamUrl('GET', 'settings')
      .then((response) => {
        if (response.active_task_new_notification == 'on')
          this.setState({active_task_new_notification: true});
        else this.setState({active_task_new_notification: false});

        if (response.active_task_reply_notification == 'on')
          this.setState({active_task_reply_notification: true});
        else this.setState({active_task_reply_notification: false});

        if (response.active_task_overdue_notification == 'on')
          this.setState({active_task_overdue_notification: true});
        else this.setState({active_task_overdue_notification: false});

        if (response.active_task_closed_notification == 'on')
          this.setState({active_task_closed_notification: true});
        else this.setState({active_task_closed_notification: false});

        if (response.active_task_reopen_notification == 'on')
          this.setState({active_task_reopen_notification: true});
        else this.setState({active_task_reopen_notification: false});

        if (response.active_emessage_new_notification == 'on')
          this.setState({active_emessage_new_notification: true});
        else this.setState({active_emessage_new_notification: false});

        if (response.active_emessage_reply_notification == 'on')
          this.setState({active_emessage_reply_notification: true});
        else this.setState({active_emessage_reply_notification: false});

        if (response.active_event_new_notification == 'on')
          this.setState({active_event_new_notification: true});
        else this.setState({active_event_new_notification: false});

        if (response.active_event_edit_updated_notification == 'on')
          this.setState({active_event_edit_updated_notification: true});
        else this.setState({active_event_edit_updated_notification: false});

        if (response.active_event_cancelled_removed_notification == 'on')
          this.setState({active_event_cancelled_removed_notification: true});
        else
          this.setState({active_event_cancelled_removed_notification: false});

        if (response.active_event_reminder_notification == 'on')
          this.setState({active_event_reminder_notification: true});
        else this.setState({active_event_reminder_notification: false});

        if (response.active_chat_new_notification == 'on')
          this.setState({active_chat_new_notification: true});
        else this.setState({active_chat_new_notification: false});

        if (response.active_once_per_day_notification == 'on')
          this.setState({active_once_per_day_notification: true});
        else this.setState({active_once_per_day_notification: false});

        if (response.active_task_reminder_notification == 'on')
          this.setState({active_task_reminder_notification: true});
        else this.setState({active_task_reminder_notification: false});
      })
      .catch((response) => {
        // console.log(response)
        // spinner false
        this.setState({spinner: false});
      });
  }

  _onPressUpdateSetting = (value, settingType) => {
    if (settingType == 'active_task_new_notification') {
      this.setState({active_task_new_notification: value.switchValue});
    }

    if (settingType == 'active_task_reply_notification') {
      this.setState({active_task_reply_notification: value.switchValue});
    }

    if (settingType == 'active_task_overdue_notification') {
      this.setState({active_task_overdue_notification: value.switchValue});
    }

    if (settingType == 'active_task_closed_notification') {
      this.setState({active_task_closed_notification: value.switchValue});
    }

    if (settingType == 'active_task_reopen_notification') {
      this.setState({active_task_reopen_notification: value.switchValue});
    }

    if (settingType == 'active_emessage_new_notification') {
      this.setState({active_emessage_new_notification: value.switchValue});
    }

    if (settingType == 'active_emessage_reply_notification') {
      this.setState({active_emessage_reply_notification: value.switchValue});
    }

    if (settingType == 'active_event_new_notification') {
      this.setState({active_event_new_notification: value.switchValue});
    }

    if (settingType == 'active_event_edit_updated_notification') {
      this.setState({
        active_event_edit_updated_notification: value.switchValue,
      });
    }

    if (settingType == 'active_event_cancelled_removed_notification') {
      this.setState({
        active_event_cancelled_removed_notification: value.switchValue,
      });
    }

    if (settingType == 'active_event_reminder_notification') {
      this.setState({active_event_reminder_notification: value.switchValue});
    }

    if (settingType == 'active_chat_new_notification') {
      this.setState({active_chat_new_notification: value.switchValue});
    }

    if (settingType == 'active_once_per_day_notification') {
      this.setState({active_once_per_day_notification: value.switchValue});
    }

    if (settingType == 'active_task_reminder_notification') {
      this.setState({active_task_reminder_notification: value.switchValue});
    }

    var settingsData = {
      active_emessage_new_notification:
        this.state.active_emessage_new_notification == true ? 'on' : 'off',
      active_emessage_reply_notification:
        this.state.active_emessage_reply_notification == true ? 'on' : 'off',
      active_event_cancelled_removed_notification:
        this.state.active_event_cancelled_removed_notification == true
          ? 'on'
          : 'off',
      active_event_edit_updated_notification:
        this.state.active_event_edit_updated_notification == true
          ? 'on'
          : 'off',
      active_event_new_notification:
        this.state.active_event_new_notification == true ? 'on' : 'off',
      active_event_reminder_notification:
        this.state.active_event_reminder_notification == true ? 'on' : 'off',
      active_task_closed_notification:
        this.state.active_task_closed_notification == true ? 'on' : 'off',
      active_task_new_notification:
        this.state.active_task_new_notification == true ? 'on' : 'off',
      active_task_overdue_notification:
        this.state.active_task_overdue_notification == true ? 'on' : 'off',
      active_task_reopen_notification:
        this.state.active_task_reopen_notification == true ? 'on' : 'off',
      active_task_reply_notification:
        this.state.active_task_reply_notification == true ? 'on' : 'off',
      active_chat_new_notification:
        this.state.active_chat_new_notification == true ? 'on' : 'off',
      active_once_per_day_notification:
        this.state.active_once_per_day_notification == true ? 'on' : 'off',
      active_task_reminder_notification:
        this.state.active_task_reminder_notification == true ? 'on' : 'off',
    };

    postDataUrl('post', 'settings', settingsData);
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        {/* {this.state.loggedInUser && (
          <Header style={Styles.LoginViewappHeader}>
            <AppHeader />
          </Header>
        )} */}
        <View>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.LoginViewscrollView}>
              <View style={Styles.TaskDetailsViewheaderContainerNew}>
                <Text style={styles.mainTitle}>Notification Settings</Text>
                <Text style={styles.mainSubTitle}>Email notifications</Text>
                <View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_once_per_day_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_once_per_day_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Unread Notifications (Once per day)</Text>
                        {!this.state.active_once_per_day_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_once_per_day_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_once_per_day_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_once_per_day_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_once_per_day_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_chat_new_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_chat_new_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Chat - New</Text>
                        {!this.state.active_chat_new_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_chat_new_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_chat_new_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_chat_new_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_chat_new_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_emessage_new_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_emessage_new_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Emessage - New</Text>
                        {!this.state.active_emessage_new_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_emessage_new_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_emessage_new_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_emessage_new_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_emessage_new_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_emessage_reply_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_emessage_reply_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Emessage - Reply</Text>
                        {!this.state.active_emessage_reply_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_emessage_reply_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_emessage_reply_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_emessage_reply_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_emessage_reply_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_event_new_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_event_new_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - New</Text>
                        {!this.state.active_event_new_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_event_new_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_event_new_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_new_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_event_new_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_event_reminder_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_event_reminder_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - Reminder</Text>
                        {!this.state.active_event_reminder_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_event_reminder_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_event_reminder_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_reminder_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_event_reminder_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state
                          .active_event_cancelled_removed_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state
                          .active_event_cancelled_removed_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - Removed</Text>
                        {!this.state
                          .active_event_cancelled_removed_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state
                          .active_event_cancelled_removed_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_event_cancelled_removed_notification:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_cancelled_removed_notification',
                              );
                            },
                          )
                        }
                        value={
                          this.state.active_event_cancelled_removed_notification
                        }
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_event_edit_updated_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_event_edit_updated_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Event - Updated</Text>
                        {!this.state.active_event_edit_updated_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_event_edit_updated_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {
                              active_event_edit_updated_notification:
                                switchValue,
                            },
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_event_edit_updated_notification',
                              );
                            },
                          )
                        }
                        value={
                          this.state.active_event_edit_updated_notification
                        }
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_new_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_new_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - New</Text>
                        {!this.state.active_task_new_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_new_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_new_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_new_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_new_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_closed_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_closed_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Closed</Text>
                        {!this.state.active_task_closed_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_closed_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_closed_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_closed_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_closed_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_overdue_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_overdue_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Overdue</Text>
                        {!this.state.active_task_overdue_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_overdue_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_overdue_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_overdue_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_overdue_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_reopen_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_reopen_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Reopened</Text>
                        {!this.state.active_task_reopen_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_reopen_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_reopen_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_reopen_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_reopen_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_reply_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_reply_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Reply</Text>
                        {!this.state.active_task_reply_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_reply_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_reply_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_reply_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_reply_notification}
                      />
                    </View>
                  </View>
                  <View avatar style={styles.notificationView}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        {!this.state.active_task_reminder_notification && (
                          <Icon size={20} active name="bell-slash" />
                        )}
                        {this.state.active_task_reminder_notification && (
                          <Icon size={20} active name="bell" />
                        )}
                      </View>
                      <View style={{borderBottomColor: '#fff', marginLeft: 10}}>
                        <Text>Task - Reminder</Text>
                        {!this.state.active_task_reminder_notification && (
                          <Text note>Off</Text>
                        )}
                        {this.state.active_task_reminder_notification && (
                          <Text note>On</Text>
                        )}
                      </View>
                    </View>
                    <View style={{borderBottomColor: '#fff'}}>
                      <Switch
                        onValueChange={(switchValue) =>
                          this.setState(
                            {active_task_reminder_notification: switchValue},
                            function () {
                              this._onPressUpdateSetting(
                                {switchValue},
                                'active_task_reminder_notification',
                              );
                            },
                          )
                        }
                        value={this.state.active_task_reminder_notification}
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
