import React from 'react';
import {ScrollView, View, Text, TouchableHighlight} from 'react-native';
import {List, ListItem, Thumbnail, Badge, Image} from 'native-base';
import Dialog, {ScaleAnimation} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';

import * as RootNavigation from '../../RootNavigation.js';
import styles from '../css/style';
import {getDataParamUrl} from '../utility';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      notificationList: [],
      notificationListLoop: [],
      spinner: false,
      pageLoad: 1,
      dynamicContent: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.getNotificationList);
  }

  getNotificationList = () => {
    this.setState({spinner: true});
    getDataParamUrl('GET', 'notifications?since', true)
      .then((response) => {
        // console.log(JSON.stringify(response, undefined, 2))
        if (response.message == undefined) {
          this.setState({notificationList: []});
          this.setState({dynamicContent: []});
          this.setState({notificationList: response});
          this.showNotificationLableFirst();
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
  };

  notificationPopup = () => {
    if (this.state.visible == false) {
      this.setState({visible: true});
    }
  };

  markNotified = (value) => {
    const markedList = [...this.state.notificationList];
    this.setState({visible: false});

    if (value.id != '') {
      // spinner true
      this.setState({spinner: true});

      getDataParamUrl('GET', 'notification/' + value.id + '')
        .then((response) => {
          if (response.message == undefined) {
            const newrecord = markedList.filter(
              (markedLis) => markedLis.id !== value.id,
            );
            this.setState({notificationList: newrecord});
          }
          // spinner false
          this.setState({spinner: false});
        })
        .catch((response) => {
          // spinner false
          this.setState({spinner: false});
        });
    }
    // console.log(value);
    if (
      value.type == 'ProfileEventReminder' ||
      value.type == 'ProfileEventCreated' ||
      value.type == 'ProfileEventUpdated' ||
      value.type == 'ProfileEventDeleted'
    ) {
      let event_date = value.event_date ? value.event_date : '';
      RootNavigation.push('Calendar', {
        payload: {
          event_id: value.data.entity_id,
          event_date: event_date,
        },
      });
    } else if (
      value.type == 'ProfileTaskCreated' ||
      value.type == 'ProfileTaskUpdated' ||
      value.type == 'ProfileTaskReopened' ||
      value.type == 'ProfileTaskClosed' ||
      value.type == 'ProfileTaskReminder' ||
      value.type == 'ProfileTaskOverdue'
    ) {
      let taskType;
      let taskRe =
        value.type == 'ProfileTaskReopened' ? 'ProfileTaskReopened' : '';

      let urlType = 'task/' + value.data.entity_id;
      getDataParamUrl('GET', urlType, true).then((response) => {
        if (response.message == 'Server Error') {
          showMessage({
            message: 'Notification',
            description: 'Something went wrong! Please try again',
            type: 'danger',
            textStyle: {fontFamily: 'HelveticaNeue'},
          });
        } else if (response.message == undefined) {
          if (response.due_date !== undefined && response.due_date !== null) {
            // convert due date in actual format
            let due_date = response.due_date.split(' ')[0];
            let due_date_task = new Date(due_date);
            let today = new Date();
            today.setHours(today.getHours() + 48);
            if (response.status != 2 && response.status != 1) {
              if (due_date_task.getTime() < today.getTime()) {
                taskType = 'urgent';
              } else if (due_date_task.getTime() > today.getTime()) {
                taskType = 'warning';
              }
            } else if (response.status == 2 || response.status == 1) {
              taskType = 'success';
            }
          }
          RootNavigation.push('TaskView', {
            taskId: value.data.entity_id,
            taskType: taskType,
            taskRe: taskRe,
          });
        }
      });
    } else if (
      value.type == 'ProfileEmessageCreated' ||
      value.type == 'ProfileEmessageUpdated'
    ) {
      let urlType = 'emessages/' + value.data.entity_id;
      getDataParamUrl('GET', urlType, true).then((response) => {
        // console.log(response);
        if (response.message == 'Server Error') {
          showMessage({
            message: 'Notification',
            description: 'Something went wrong! Please try again',
            type: 'danger',
            textStyle: {fontFamily: 'HelveticaNeue'},
          });
        } else if (response != '') {
          RootNavigation.push('ViewMessage', {
            messageId: response.emessages.id,
            name: value.data.name,
            title: value.data.title,
            dateSent: moment(value.created_at).format('DD/MM/YYYY - h:mm'),
            description: response.emessages.description,
          });
        }
      });
    }
  };

  showNotificationLableFirst() {
    const items = this.state.notificationList;
    items.map((value, index) => {
      if (value.read_at == 'null' || value.read_at == null) {
        if (
          value.type !== 'ProfileChatClientReply' &&
          value.type !== 'ProfileChatUpdateSent'
        ) {
          if (this.state.dynamicContent.length < 10) {
            this.state.dynamicContent.push(value);
            return;
          }
        }
      }
    });
  }

  showNotificationLable() {
    var currentPageCount = this.state.pageLoad + 1;
    this.setState({pageLoad: currentPageCount});
    const items = this.state.notificationList;
    this.setState({dynamicContent: []});
    var itemListNotification = [];
    items.map((value, index) => {
      if (value.read_at == 'null' || value.read_at == null) {
        if (
          value.type !== 'ProfileChatClientReply' &&
          value.type !== 'ProfileChatUpdateSent'
        ) {
          if (itemListNotification.length < currentPageCount * 10) {
            itemListNotification.push(value);
          }
        }
      }
    });
    this.setState({dynamicContent: itemListNotification});
  }

  getDynamicData() {
    // const uniqueNames = Array.from(new Set(this.state.dynamicContent));
    let filterArrayNotification = this.state.dynamicContent.filter(
      (ele, ind) =>
        ind ===
        this.state.dynamicContent.findIndex((elem) => elem.id === ele.id),
    );
    if(filterArrayNotification.length === 0) {
      return (
      <Text style={{margin:10,fontSize1:14}}>No notifications</Text>
      );
    }

    const showNotification = filterArrayNotification.map((value, index) => {
      const notifiType =
        value.type == 'ProfileTaskCreated'
          ? 'Task New'
          : value.type == 'ProfileTaskUpdated'
          ? 'Task Reply'
          : value.type == 'ProfileEmessageCreated'
          ? 'Emessage New'
          : value.type == 'ProfileEventCreated'
          ? 'Event New'
          : value.type == 'ProfileEventUpdated'
          ? 'Event Updated'
          : value.type == 'ProfileEventDeleted'
          ? 'Event Removed'
          : value.type == 'ProfileTaskReopened'
          ? 'Task Reopened'
          : value.type == 'ProfileTaskClosed'
          ? 'Task Closed'
          : value.type == 'ProfileTaskReminder'
          ? 'Task Reminder'
          : value.type == 'ProfileTaskOverdue'
          ? 'Task Overdue'
          : value.type == 'ProfileEventReminder'
          ? 'Event Tomorrow'
          : value.type == 'ProfileEmessageUpdated'
          ? 'Emessage Reply'
          : '';
      let createdDate =
        value.type == 'ProfileEmessageUpdated' ||
        value.type == 'ProfileTaskClosed' ||
        value.type == 'ProfileTaskUpdated' ||
        value.type == 'ProfileTaskReopened' ||
        value.type == 'ProfileTaskOverdue'
          ? value.created_at
          : value.type == 'ProfileEventUpdated' ||
            value.type == 'ProfileEventDeleted' ||
            value.type == 'ProfileEventReminder'
          ? value.updated_at
          : value.data.created_at;
      return (
        <View key={value.id}>
          <Text
            style={styles.notificationListText}
            onPress={() => {
              this.markNotified(value);
            }}>
            <Text style={{color: '#878787', fontSize: 12}}>
              {notifiType} - {value.data.name}
              {'\n'}
            </Text>
            {value.data.title}
            {'\n'}
            <TimeAgo style={styles.ChatListchatLogAction} time={createdDate} />
          </Text>
        </View>
      );
    });

    return showNotification;
  }

  render() {
    let total = 0;

    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }) => {
      const paddingToBottom = 2;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };
    total = this.state.dynamicContent.length;
    // console.log(total);

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          onPress={() => this.notificationPopup()}
          underlayColor="none">
          <Image
            small
            alt="Notification"
            style={
              total > 0
                ? {marginRight: -5, height: 40, width: 40}
                : {marginRight: 10, height: 40, width: 40}
            }
            source={require('../../assets/images/user_icon.jpeg')}
          />
        </TouchableHighlight>
        {total > 0 && (
          <View style={styles.notificationBadgeCount}>
            <Icon
              name="notifications"
              style={{
                fontSize: 18,
                marginRight: -10,
                marginLeft: -6,
                color: 'red',
              }}
              onPress={() => {
                this.notificationPopup();
              }}
            />
          </View>
        )}

        <Text style={styles.notificationBadgeText} >{total>99? '99+': total>0 ? total :''}</Text>
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({visible: false});
          }}
          dialogAnimation={
            new ScaleAnimation({
              initialValue: 0, // optional 
              useNativeDriver: true, // optional
            })
          }
          dialogStyle={{
            top: 70,
            right: 10,
            position: 'absolute',
            height: 450,
          }}
          width={0.7}
          overlayOpacity={0.1}>
          <ScrollView
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                this.showNotificationLable();
              }
            }}
            scrollEventThrottle={10}>
            <View>{this.getDynamicData()}</View>
            <Spinner visible={this.state.spinner} textContent={'Loading...'} />
          </ScrollView>
        </Dialog>
      </View>
    );
  }
}

export default Notifications;
