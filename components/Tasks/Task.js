import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import {Badge, Text} from 'native-base';
import styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//load component
import {getDataParamUrl, postDataUrl} from '../utility';
import AppFooter from '../Footer/Footer';
import {requestLocationPermission} from '../requestLocationPermission';
import * as RootNavigation from '../../RootNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urgentTaskToggle: false,
      warningTaskToggle: false,
      successTaskToggle: false,
      dataArray: [],
      spinner: false,
      urgentTaskTotal: 0,
      warningTaskTotal: 0,
      successTaskTotal: 0,
      active_private_mode: false,
    };
  }

  UNSAFE_componentWillMount() {
    requestLocationPermission();
    this.props.navigation.addListener('focus', this.getToDo);
  }

  getToDo = () => {
    // check the wheather page
    AsyncStorage.setItem('WheatherApp', JSON.stringify({isEnable: false}));
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });

    this.setState({
      urgentTaskToggle: false,
      warningTaskToggle: false,
      successTaskToggle: false,
    });

    this.setState({spinner: true});

    //get the task details
    getDataParamUrl('GET', 'tasks', true)
      .then((response) => {
        if (response.message == undefined) {
          this.setState({dataArray: response});
          var urgentTaskTotalVar = 0;
          var warningTaskTotalVar = 0;
          var successTaskTotalVar = 0;

          for (let taskObject of response) {
            var due_date = taskObject.due_date.split(' ');
            var newDate = due_date[0].split('/');
            var due_date_convert =
              newDate[2] +
              '-' +
              newDate[0] +
              '-' +
              newDate[1] +
              'T' +
              due_date[1];

            var due_date_task = new Date(due_date_convert);
            var today = new Date();
            today.setHours(today.getHours() + 48);

            if (taskObject.status != 2 && taskObject.status != 1) {
              if (due_date_task.getTime() < today.getTime()) {
                urgentTaskTotalVar = urgentTaskTotalVar + 1;
              } else if (due_date_task.getTime() > today.getTime()) {
                warningTaskTotalVar = warningTaskTotalVar + 1;
              }
            } else {
              successTaskTotalVar = successTaskTotalVar + 1;
            }
          }

          // set task counter numbers
          this.setState({urgentTaskTotal: urgentTaskTotalVar});
          this.setState({warningTaskTotal: warningTaskTotalVar});
          this.setState({successTaskTotal: successTaskTotalVar});
        }
        if (response.message == 'Unauthenticated.') {
          this.props.navigation.navigate('Login');
        }
        // spinner false
        this.setState({spinner: false});
      })
      .catch((error) => {
        console.log(error);
        // spinner false
        this.setState({spinner: false});
      });
  };

  urgentDateConditon(taskDetails1) {
    // convert due date in actual format
    var due_date = taskDetails1?.due_date.split(' ');
    var newDate = due_date[0].split('/');
    var due_date_convert =
      newDate[2] + '-' + newDate[0] + '-' + newDate[1] + 'T' + due_date[1];

    var due_date_task = new Date(due_date_convert);
    var today = new Date();
    today.setHours(today.getHours() + 48);

    if (taskDetails1?.status != 2 && taskDetails1?.status != 1) {
      if (due_date_task.getTime() < today.getTime()) {
        return (
          <TouchableHighlight
            underlayColor="white"
            onPress={() =>
              RootNavigation.push('TaskView', {
                taskId: taskDetails1.id,
                taskType: 'urgent',
                taskRe: '',
              })
            }
            key={taskDetails1.id}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FDDADD',
                marginTop: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontFamily: 'HelveticaNeue',
                  color: '#333333',
                  fontSize: 14,
                }}>
                {taskDetails1.title.replace(/(<([^>]+)>)/gi, '')}
              </Text>
            </View>
          </TouchableHighlight>
        );
      }
    }
  }

  warningDateConditon(taskDetails1) {
    // convert due date in actual format
    var due_date = taskDetails1?.due_date.split(' ');
    var newDate = due_date[0].split('/');
    var due_date_convert =
      newDate[2] + '-' + newDate[0] + '-' + newDate[1] + 'T' + due_date[1];

    var due_date_task = new Date(due_date_convert);
    var today = new Date();
    today.setHours(today.getHours() + 48);

    if (taskDetails1.status != 2 && taskDetails1.status != 1) {
      if (due_date_task.getTime() > today.getTime()) {
        return (
          <TouchableHighlight
            underlayColor="white"
            onPress={() =>
              RootNavigation.push('TaskView', {
                taskId: taskDetails1.id,
                taskType: 'warning',
                taskRe: '',
              })
            }
            key={taskDetails1.id}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'HelveticaNeue',
                backgroundColor: '#ECC684',
                marginTop: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontFamily: 'HelveticaNeue',
                  color: '#333333',
                  fontSize: 14,
                }}>
                {taskDetails1.title.replace(/(<([^>]+)>)/gi, '')}
              </Text>
            </View>
          </TouchableHighlight>
        );
      }
    }
  }

  successDateConditon(taskDetails1) {
    if (taskDetails1.status == 2 || taskDetails1.status == 1) {
      return (
        <TouchableHighlight
          underlayColor="white"
          onPress={() =>
            RootNavigation.push('TaskView', {
              taskId: taskDetails1.id,
              taskType: 'success',
              taskRe: '',
            })
          }
          key={taskDetails1.id}>
          <View
            style={{
              flexDirection: 'row',
              padding: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'HelveticaNeue',
              backgroundColor: '#B7DCD0',
              marginTop: 5,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'HelveticaNeue',
                color: '#333333',
                fontSize: 14,
              }}>
              {taskDetails1.title.replace(/(<([^>]+)>)/gi, '')}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }
  }

  customToggleTaskType(toggleType) {
    if (toggleType == 'urgent') {
      if (this.state.urgentTaskToggle) {
        this.setState({urgentTaskToggle: false});
      } else {
        this.setState({urgentTaskToggle: true});
      }
    }
    if (toggleType == 'warning') {
      if (this.state.warningTaskToggle) {
        this.setState({warningTaskToggle: false});
      } else {
        this.setState({warningTaskToggle: true});
      }
    }
    if (toggleType == 'success') {
      if (this.state.successTaskToggle) {
        this.setState({successTaskToggle: false});
      } else {
        this.setState({successTaskToggle: true});
      }
    }
  }

  render() {
    const newDataArray = [...this.state.dataArray];
    return (
      <View>
        <View style={{height: '96%'}}>
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <View style={styles.TaskViewheaderContainer}>
                <Text style={styles.TaskViewheaderText}>My things to do</Text>
                <Text style={styles.TaskViewtaskSubText}>
                  {'\n'}Press the coloured tabs below to view separate tasks.
                  Click any task to reply or complete.{'\n'}
                  {'\n'}
                </Text>
                <Pressable
                  style={styles.TaskViewurgentBtnSection}
                  onPress={() => this.customToggleTaskType('urgent')}>
                  <Text style={styles.TaskViewurgentBtn}>
                    Urgent! Don't forget
                  </Text>
                  <Badge style={styles.TaskViewbadgeNotification}>
                    <Text style={styles.TaskViewbadgeUrgent}>
                      {this.state.urgentTaskTotal}
                    </Text>
                  </Badge>
                </Pressable>
                {this.state.urgentTaskToggle && (
                  <View>
                    {newDataArray.map((taskDetails1) =>
                      this.urgentDateConditon(taskDetails1),
                    )}
                  </View>
                )}
                <Pressable
                  style={styles.TaskViewwarningBtnSection}
                  onPress={() => this.customToggleTaskType('warning')}>
                  <Text style={styles.TaskViewwarningBtn}>To Do</Text>
                  <Badge style={styles.TaskViewbadgeNotification}>
                    <Text style={styles.TaskViewbadgeWarning}>
                      {this.state.warningTaskTotal}
                    </Text>
                  </Badge>
                </Pressable>
                {this.state.warningTaskToggle && (
                  <View>
                    {newDataArray.map((taskDetails1) =>
                      this.warningDateConditon(taskDetails1),
                    )}
                  </View>
                )}
                <Pressable
                  style={styles.TaskViewsuccessBtnSection}
                  success
                  onPress={() => this.customToggleTaskType('success')}>
                  <Text style={styles.TaskViewsuccessBtn}>All Done</Text>
                  <Badge style={styles.TaskViewbadgeNotification}>
                    <Text style={styles.TaskViewbadgeSuccess}>
                      {this.state.successTaskTotal}
                    </Text>
                  </Badge>
                </Pressable>
                {this.state.successTaskToggle && (
                  <View>
                    {newDataArray.map((taskDetails1) =>
                      this.successDateConditon(taskDetails1),
                    )}
                  </View>
                )}
              </View>
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
            <FontAwesome5
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
