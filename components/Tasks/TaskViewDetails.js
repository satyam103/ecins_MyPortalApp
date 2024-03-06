import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Content,
  Footer,
} from 'react-native';
// import {  } from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Col, Row, Grid} from 'react-native-easy-grid';

//load component
import AppFooter from '../Footer/Footer';
import {Button, Container} from 'native-base';
import Styles from '../css/style';

export default class TaskViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup1: false,
    };
  }

  render() {
    return (
      <View>
        <View style={{height:'96%'}}>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.TaskViewscrollView}>
              <View style={Styles.TaskViewheaderContainer}>
                <Row>
                  <Grid
                    style={{
                      borderColor: '#F80014',
                      borderWidth: 2,
                      padding: 10,
                      marginTop: 10,
                      borderRadius: 3,
                      fontSize: 14,
                    }}>
                    <Col size={75}>
                      <Text>Attend Jobcenter Appoinment</Text>
                    </Col>
                    <Col size={25}>
                      <Icon
                        style={{
                          fontSize: 18,
                          color: '#F80014',
                          textAlign: 'right',
                        }}
                        name="warning"
                      />
                    </Col>
                  </Grid>
                </Row>
                <Grid
                  size={100}
                  style={{
                    borderColor: '#F80014',
                    borderWidth: 2,
                    padding: 10,
                    fontSize: 14,
                    marginTop: 10,
                    borderRadius: 3,
                  }}>
                  <Row>
                    <Col size={100}>
                      <Text>
                        Visit Carol at the Jobcentre for disguss child benifits
                        for your daughter, and arrange to see John for a follow
                        up.
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{marginTop: 10}}>
                    <Col size={60}>
                      <View
                        style={{
                          fontSize: 10,
                          marginTop: 0,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <CommunityIcon
                          style={{
                            fontSize: 20,
                            color: 'Red',
                            textAlign: 'right',
                            fontWeight: 'bold',
                          }}
                          name="clock"
                        />
                        <Text style={{fontSize: 12}}>
                          Date Set: 21st January 2020
                        </Text>
                      </View>
                    </Col>
                    <Col size={10}></Col>
                    <Col size={30}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                          {' '}
                          Due :{' '}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            backgroundColor: '#F80014',
                            fontSize: 12,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 3,
                            paddingBottom: 3,
                          }}>
                          End
                        </Text>
                      </View>
                    </Col>
                  </Row>
                </Grid>
                <Grid>
                  <Row
                    style={{
                      backgroundColor: '#F80014',
                      marginTop: 10,
                      padding: 5,
                    }}>
                    <Col size={70}>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        Task INCOMPLETE
                      </Text>
                    </Col>
                    <Col size={30}>
                      <View
                        style={{
                          fontSize: 10,
                          marginTop: 0,
                          flexDirection: 'row',
                          textAlign: 'right',
                        }}>
                        <Text
                          style={{color: '#fff', fontWeight: 'bold', flex: 1}}>
                          URGENT{' '}
                        </Text>
                        <CommunityIcon
                          style={{
                            fontSize: 20,
                            color: 'Red',
                            fontWeight: 'bold',
                            color: '#fff',
                            marginRight: 3,
                          }}
                          name="alert-circle-outline"
                        />
                      </View>
                    </Col>
                  </Row>
                </Grid>
                <Grid>
                  <Row
                    style={{
                      borderWidth: 1,
                      marginTop: 10,
                      paddingBottom: 5,
                      borderColor: '#77AFEB',
                    }}>
                    <Col size={100}>
                      <Text> This task has been assigned by </Text>
                    </Col>
                  </Row>
                  <Grid
                    style={{
                      borderWidth: 1,
                      marginTop: 10,
                      paddingBottom: 5,
                      borderColor: '#77AFEB',
                    }}>
                    <Row size={1} style={{padding: 5}}>
                      <Col size={20}>
                        <Text style={{textAlign: 'center', paddingTop: 30}}>
                          {' '}
                          <Icon
                            style={{
                              fontSize: 25,
                              color: 'grey',
                              fontWeight: 'bold',
                              marginRight: 3,
                            }}
                            name="call"
                          />{' '}
                          {'\n'}Call
                        </Text>
                      </Col>
                      <Col size={60}>
                        <Text style={{textAlign: 'center'}}>
                          <Image
                            source={require('../../assets/images/user_icon.jpeg')}
                            style={{height: 40, width: 40, borderRadius: 50}}
                          />
                          {'\n'}
                          {'\n'}{' '}
                          <Text style={{fontSize: 15, fontFamily: 'Helvetica'}}>
                            John Appleased
                          </Text>
                        </Text>
                      </Col>
                      <Col size={20}>
                        <Text style={{textAlign: 'center', paddingTop: 10}}>
                          <Image
                            source={require('../../assets/images/grey_message.jpg')}
                            style={{height: 30, width: 30}}
                          />
                          {'\n'}
                          {'\n'}Message
                        </Text>
                      </Col>
                    </Row>
                    <Row size={1} style={{padding: 15}}>
                      <Col size={100}>
                        <Text
                          style={{
                            fontFamily: 'HelveticaNeue',
                            color: '#6B6B6B',
                          }}>
                          Notes From Assignee{'\n'}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'HelveticaNeue',
                            color: '#6B6B6B',
                          }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,{' '}
                        </Text>
                      </Col>
                    </Row>
                  </Grid>
                </Grid>
                <View
                  style={{
                    borderBottomColor: '#77AFEB',
                    borderBottomWidth: 1,
                    marginTop: 15,
                  }}></View>
                <View>
                  <Row size={1} style={{padding: 10}}>
                    <Col size={100}>
                      <Text
                        style={{
                          fontFamily: 'HelveticaNeue',
                          color: '#6B6B6B',
                        }}>
                        My Notes{'\n'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'HelveticaNeue',
                          color: '#6B6B6B',
                        }}>
                        You have not added any notes on this task yet.{' '}
                      </Text>
                    </Col>
                  </Row>
                </View>

                <Button
                  warning
                  full
                  style={Styles.TaskViewtaskViewCompleteMsg}
                  onPress={() => {
                    this.setState({popup1: true});
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Complete Task
                  </Text>
                </Button>

                <View
                  style={{
                    borderBottomColor: '#77AFEB',
                    borderBottomWidth: 1,
                    marginTop: 15,
                  }}></View>
                <Button warning full style={Styles.TaskViewtaskViewSendMsg}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Send Message
                  </Text>
                </Button>
                <Button
                  warning
                  full
                  style={Styles.TaskViewtaskViewCompleteMsg}
                  onPress={() => {
                    this.setState({popup1: true});
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Complete Task
                  </Text>
                </Button>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        <View>
          <AppFooter
            stackName={this.props.route.name}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}
