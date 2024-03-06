import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataParamUrl} from '../utility';
import Styles from '../css/style';
import HTML from 'react-native-render-html';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    const authDetails = AsyncStorage.getItem('authDetails', (err, result) => {
      let authResponse = JSON.parse(result);
      if (authResponse === null) {
        this.props.navigation.navigate('Login');
      }
    });

    getDataParamUrl('GET', 'calendar')
      .then((response) => {
        if (response.appts !== undefined) {
          this.setState({items: response});
          setTimeout(() => {
            for (let i = -15; i < 85; i++) {
              const time =
                Math.floor(new Date().getTime()) + i * 24 * 60 * 60 * 1000;
              const strTime = this.timeToString(time);
              this.state.items[strTime] = [];
              if (this.state.items.appts !== undefined) {
                for (let userObject of this.state.items.appts) {
                  if (strTime == userObject.start_date) {
                    console.log('if condition');
                    this.state.items[strTime].push({
                      name: userObject.title,
                      information: userObject.information,
                      start_date: userObject.start_date,
                      start_time: userObject.start_time,
                      end_date: userObject.end_date,
                      end_time: userObject.end_time,
                      isEvent: true,
                    });
                  }
                  if (strTime == userObject.end_date) {
                    console.log('else condition');
                    if (!this.state.items[strTime]) {
                      this.state.items[strTime].push({
                        name: userObject.title,
                        information: userObject.information,
                        start_date: userObject.start_date,
                        start_time: userObject.start_time,
                        end_date: userObject.end_date,
                        end_time: userObject.end_time,
                        isEvent: true,
                      });
                    }
                  }
                }
              }
              // For Task display in calendar
              if (this.state.items.tasks !== undefined) {
                for (let userObject of this.state.items.tasks) {
                  let taskCreatedDateData = userObject.created_at;
                  let taskCreatedDataExplode = taskCreatedDateData.split(' ');
                  let taskdueDateData = userObject.due_date.split(' ');
                  //console.log(taskCreatedDataExplode);
                  if (strTime == taskdueDateData[0]) {
                    //if (!this.state.items[strTime]){
                    this.state.items[strTime].push({
                      name: userObject.title,
                      information: userObject.instructions,
                      start_date: taskCreatedDataExplode[0],
                      start_time: taskCreatedDataExplode[1],
                      end_date: taskdueDateData[0],
                      end_time: userObject.due_time,
                      isEvent: false,
                    });
                    // }
                  }
                }
              }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach((key) => {
              newItems[key] = this.state.items[key];
            });
            this.setState({
              items: newItems,
            });
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.props.route.params.payload.event_date}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (this.state.items.appts !== undefined) {
          this.state.items[strTime] = [];
          for (let userObject of this.state.items.appts) {
            if (strTime == userObject.start_date) {
              this.state.items[strTime].push({
                name: userObject.title,
                information: userObject.information,
                start_date: userObject.start_date,
                start_time: userObject.start_time,
                end_date: userObject.end_date,
                end_time: userObject.end_time,
                isEvent: true,
              });
            }
            if (strTime == userObject.end_date) {
              if (!this.state.items[strTime]) {
                this.state.items[strTime].push({
                  name: userObject.title,
                  information: userObject.information,
                  start_date: userObject.start_date,
                  start_time: userObject.start_time,
                  end_date: userObject.end_date,
                  end_time: userObject.end_time,
                  isEvent: true,
                });
              }
            }
          }
        }

        // For Task display in calendar
        if (this.state.items.tasks !== undefined) {
          for (let userObject of this.state.items.tasks) {
            let taskCreatedDateData = userObject.created_at;
            let taskCreatedDataExplode = taskCreatedDateData.split(' ');
            let taskdueDateData = userObject.due_date.split(' ');
            //console.log(taskCreatedDataExplode);
            if (strTime == taskdueDateData[0]) {
              //if (!this.state.items[strTime]){
              this.state.items[strTime].push({
                name: userObject.title,
                information: userObject.instructions,
                start_date: taskCreatedDataExplode[0],
                start_time: taskCreatedDataExplode[1],
                end_date: taskdueDateData[0],
                end_time: userObject.due_time,
                isEvent: false,
              });
              //}
            }
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  updateDateString(dateStr) {
    let spltStr = dateStr.split('-');
    if (spltStr.length > 0) {
      return spltStr[2] + '/' + spltStr[1] + '/' + spltStr[0];
    }
  }

  updateTimeString(timeStr) {
    let spltStr = timeStr.split(':');
    if (spltStr.length > 0) {
      return spltStr[0] + ':' + spltStr[1];
    }
  }

  renderItem(item) {
    var regexForTag = /(?:^<p[^>]*>)|(?:<\/p>$)/g;
    var htmlContentMessage = item.information;
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

    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}>
        <Text
          style={{
            fontFamily: 'Helvetica',
            color: '#666666',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          {item.name}
          {'\n'}
        </Text>
        <Text style={{fontFamily: 'Helvetica', color: '#666666', fontSize: 12}}>
          <HTML
            note
            onLinkPress={(evt, href) => Linking.openURL(href)}
            tagsStyles={{a: {color: '#fff'}}}
            baseFontStyle={{
              color: '#666666',
              fontSize: 12,
              fontFamily: 'Helvetica',
            }}
            html={htmlStringMessage}
          />
          {'\n'}
        </Text>
        <Text style={{fontFamily: 'Helvetica', color: '#666666', fontSize: 12}}>
          {item.isEvent ? 'Starts' : 'Set on'}:{' '}
          {this.updateDateString(item.start_date)}{' '}
          {this.updateTimeString(item.start_time)}
        </Text>
        <Text
          style={{
            fontFamily: 'Helvetica',
            color: '#666666',
            fontSize: 12,
            marginTop: 3,
          }}>
          {item.isEvent ? 'Ends' : 'Complete by'}:{' '}
          {this.updateDateString(item.end_date)}{' '}
          {this.updateTimeString(item.end_time)}
        </Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>No Tasks or Events</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
