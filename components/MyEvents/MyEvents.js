import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import AppFooter from '../Footer/Footer';
import {Button} from 'native-base';
import Attendance from './Attendance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MyEvents = (props) => {
  const [active, setActive] = useState('Upcoming');
  const [joined, setJoined] = useState(false);
  const [active_private_mode, setActivePrivateMode] = useState(false);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true);
    getData();
  });
  const getData = async () => {
    AsyncStorage.setItem('WheatherApp', JSON.stringify({isEnable: false}));
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        setActivePrivateMode(privateResponse.enable);
    });
    const joined = await AsyncStorage.getItem('joinedAt');
    if (joined) {
      setJoined(true);
      setSpinner(false);
    } else {
      setJoined(false);
      setSpinner(false);
    }
  };
  const [data, setData] = useState([
    {
      eventName: 'Event 1',
      duration: '2 hr',
      startsAt: '22/04/2024 1:30 PM',
      invitation: 'Rejected',
    },
    {
      eventName: 'Event 2',
      duration: '2 hr',
      startsAt: '21/04/2024 5:30 PM',
      invitation: 'Accepted',
    },
    {
      eventName: 'Event 3',
      duration: '2 hr',
      startsAt: '22/04/2024 5:30 PM',
      invitation: '',
    },
    {
      eventName: 'Event 4',
      duration: '2 hr',
      startsAt: '22/04/2024 7:30 PM',
      invitation: '',
    },
    {
      eventName: 'Event 5',
      duration: '2 hr',
      startsAt: '22/04/2024 9:30 PM',
      invitation: '',
    },
    {
      eventName: 'Event 6',
      duration: '2 hr',
      startsAt: '22/04/2024 1:30 PM',
      invitation: '',
    },
    {
      eventName: 'Event 7',
      duration: '2 hr',
      startsAt: '22/04/2024 1:30 PM',
      invitation: '',
    },
    {
      eventName: 'Event 8',
      duration: '2 hr',
      startsAt: '22/04/2024 1:30 PM',
      invitation: '',
    },
    {
      eventName: 'Event 9',
      duration: '2 hr',
      startsAt: '22/04/2024 1:30 PM',
      invitation: '',
    },
    {
      eventName: 'Event 10',
      duration: '2 hr',
      startsAt: '22/04/2024 1:30 PM',
      invitation: '',
    },
  ]);
  return (
    <View>
      <View style={{height: '96%'}}>
        <View
          style={{
            margin: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              My Events
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}></View>
        </View>
        <View style={{padding: 10, paddingTop: 0}}>
          <Attendance />
        </View>
        <View
          style={{
            marginHorizontal: 15,
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            elevation: 5,
            maxHeight: '50%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              borderBottomWidth: 0.5,
              borderColor: '#29A5DD',
            }}>
            <Pressable
              onPress={() => {
                setActive('Upcoming');
                console.log('Upcoming');
              }}
              style={[
                active === 'Upcoming' && {},
                {
                  width: '33%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                },
              ]}>
              <Text
                style={[
                  active === 'Upcoming' && {
                    color: '#43c2f0',
                    fontWeight: 'bold',
                  },
                ]}>
                Upcoming
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setActive('Invited');
                console.log('Invited');
              }}
              style={{
                width: '33%',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Text
                style={[
                  active === 'Invited' && {
                    color: '#43c2f0',
                    fontWeight: 'bold',
                  },
                ]}>
                Invited
              </Text>
            </Pressable>
          </View>
          <View style={{}}>
            {active === 'Upcoming' && (
              <View
                style={{
                  maxHeight: '92%',
                }}>
                <ScrollView>
                  {data ? (
                    data
                      .filter((item) => item.invitation === 'Accepted')
                      .map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              borderBottomWidth: 0.5,
                              padding: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text>{item.eventName}</Text>
                              <Text>{item.duration}</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text>Starts At</Text>
                              <Text>{item.startsAt}</Text>
                            </View>
                            {item.invitation == 'Accepted' && (
                              <Button
                                colorScheme={'green'}
                                style={{marginTop: 5}}
                                onPress={() => {
                                  if (joined) {
                                    console.log('Already joined');
                                  } else {
                                    props.navigation.navigate('ScanScreen');
                                    console.log('join new event');
                                  }
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      marginRight: 5,
                                      fontSize: 16,
                                    }}>
                                    Join event
                                  </Text>
                                </View>
                              </Button>
                            )}
                          </View>
                        );
                      })
                  ) : (
                    <View>
                      <Text>No event found.</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            )}
            {active === 'Invited' && (
              <View
                style={{
                  maxHeight: '92%',
                }}>
                <ScrollView>
                  {data
                    .filter((item) => item.invitation === '')
                    .map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            borderBottomWidth: 0.5,
                            padding: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text>{item.eventName}</Text>
                            <Text>{item.duration}</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text>Starts At</Text>
                            <Text>{item.startsAt}</Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <Pressable
                              onPress={() => {
                                data[index].invitation = 'Accepted';
                                item.invitation = 'Accepted';
                                console.log('Accepted');
                              }}
                              style={{
                                margin: 5,
                                marginRight: 20,
                                flexDirection: 'row',
                                backgroundColor: 'green',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  marginRight: 5,
                                  fontSize: 15,
                                  color: 'white',
                                }}>
                                Accept
                              </Text>
                              {/* <FontAwesome
                                  name={'check'}
                                  color={'black'}
                                  size={20}
                                /> */}
                            </Pressable>
                            <Pressable
                              onPress={() => {
                                data[index].invitation = 'Rejected';
                                item.invitation = 'Rejected';

                                console.log('Rejected');
                              }}
                              style={{
                                margin: 5,
                                marginRight: 20,
                                flexDirection: 'row',
                                backgroundColor: 'red',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  marginRight: 5,
                                  fontSize: 15,
                                  color: 'white',
                                }}>
                                Reject
                              </Text>
                              {/* <FontAwesome
                                  name={'remove'}
                                  color={'black'}
                                  size={20}
                                /> */}
                            </Pressable>
                          </View>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </View>
      <View>
        <AppFooter stackName={props.route.name} navigation={props.navigation} />
      </View>
      {active_private_mode && (
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
            onPress={() => props.navigation.navigate('HideFunction')}
            name="cloud"
          />
        </View>
      )}
    </View>
  );
};

export default MyEvents;
