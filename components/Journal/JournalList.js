import React, {Component} from 'react';
import {
  BackHandler,
  Platform,
  SafeAreaView,
  Alert,
  ScrollView,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Button as NativeButton,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
// import KeyboardSpacer from "react-native-keyboard-spacer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, ariaAttr} from 'native-base';
import Dialog, {
  DialogContent,
  ScaleAnimation,
  SlideAnimation,
} from 'react-native-popup-dialog';
import Emoji from 'react-native-emoji';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TimeAgo from 'react-native-timeago';
import Styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';

//load component
import AppFooter from '../Footer/Footer';
import {getDataParamUrl, postDataUrl} from '../utility';
import {createIconSetFromFontello} from 'react-native-vector-icons';

const moodExpression = {
  1: 'smiley',
  2: 'expressionless',
  3: 'rage',
  4: 'disappointed',
  5: 'slightly_smiling_face',
  6: 'cry',
  7: 'grimacing',
  8: 'sob',
};

const moodStatus = {
  1: 'Very Happy',
  2: 'OK',
  3: 'Angry',
  4: 'Depressed',
  5: 'Happy',
  6: 'Unhappy',
  7: 'Anxious',
  8: 'Miserable',
};
let listener = null;
export default class JournalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup2: false,
      popup3: false,
      popup4: false,
      journalList: [],
      journalType: 2,
      moodType: 0,
      journalMsg: '',
      spinner: false,
      nextButton: false,
      active_private_mode: false,
      selected2: undefined,
      dateCustom: new Date(),
      mode: 'datetime',
      show: false,
      datePickerStatus: true,
    };
  }

  onValueChange2(value) {
    console.log(value);
    if (value == 0) {
      this.setState({datePickerStatus: true});
      this.setState({
        selected2: 1,
      });
    } else {
      this.setState({datePickerStatus: false});
      this.setState({
        selected2: 2,
      });
    }
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.getJournalList);
  }

  getJournalList = () => {
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });

    this.setState({spinner: true});
    let urlType = 'journals';
    getDataParamUrl('GET', urlType)
      .then((response) => response)
      .then((response) => {
        if (response.message == undefined) {
          response.sort(function (a, b) {
            var dateA = new Date(a.created_at),
              dateB = new Date(b.created_at);
            return dateA - dateB;
          });

          this.setState({journalList: response.reverse()});
        }
        if (response.message == 'Server Error') {
          showMessage({
            message: 'My Diary',
            description: 'Something is broken! Please try after some time.',
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
        console.log(response, 'error generated');
        // spinner false
        this.setState({spinner: false});
      });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.setState({popup2: false, popup3: false, popup4: false});
  };
  // set journal type function
  setJournalType = (journalTypeSelected) => {
    this.setState({journalType: journalTypeSelected, popup3: true});
  };

  // cancel journal type function
  cancelJournalProcess = () => {
    this.setState({popup2: false, nextButton: false});
  };

  // cancel journal type function
  cancelSubmitProcess = () => {
    this.setState({
      popup4: false,
      nextButton: false,
      moodType: 0,
      journalMsg: '',
    });
  };

  // continue warning add journal process
  continueJournalProcess = () => {
    this.setState({
      popup2: false,
      popup4: false,
      popup3: false,
      nextButton: false,
      spinner: true,
    });
    // add journal body
    let newDateItem = this.state.dateCustom;
    var newMinutes = newDateItem.getMinutes();
    if (newMinutes < 10) {
      newMinutes = '0' + newMinutes;
    }
    let newMonthSelected = newDateItem.getMonth() + 1;
    let apiDate =
      newDateItem.getDate() +
      '/' +
      newMonthSelected +
      '/' +
      newDateItem.getFullYear() +
      ' ' +
      newDateItem.getHours() +
      ':' +
      newMinutes;
    this.setState({dateCustom: new Date()});
    this.setState({datePickerStatus: true});
    var formData = {
      mood: this.state.moodType,
      entry_type: 2,
      details: this.state.journalMsg,
      when_sent: this.state.selected2,
      created_at: apiDate,
    };
    console.log(formData);
    let urlType = 'journals';
    // post journals details
    postDataUrl('POST', urlType, formData)
      .then((response) => {
        console.log(response);
        if (response.message == undefined) {
          this.setState({journalList: response.reverse()});
        } else {
          this.getJournalList();
          this.setState({moodType: 0, journalMsg: ''});
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

  resetMoodType = () => {
    this.setState({moodType: 0, nextButton: false});
  };
  // set mood type journal process
  setMoodType = (moodTypeSelected) => {
    if (moodTypeSelected == this.state.moodType) {
      this.setState({moodType: 0, nextButton: false});
    } else {
      this.setState({nextButton: true, moodType: moodTypeSelected});
    }
  };

  // show msg box for details
  continueMsgDetails = () => {
    this.setState({popup3: false, popup4: true});
  };

  // add journal body

  addJournalMsg = () => {
    Keyboard.dismiss();
    if (this.state.journalMsg !== '' || this.state.moodType > 0) {
      this.setState({popup2: true});
    } else {
      alert('Please select an Emoji or enter how you are feeling');
    }
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dateCustom;
    this.setState({show: true});
    this.setState({dateCustom: currentDate});
  };

  showMode = (currentMode) => {
    this.setState({show: true});
    this.setState({mode: currentMode});
  };

  showDatepicker = () => {
    showMode('date');
  };

  showTimepicker = () => {
    showMode('time');
  };

  render() {
    const journalListCopy = this.state.journalList;
    const countries = ['Now', 'Other'];

    // console.log(journalListCopy)
    return (
      <View>
        <SafeAreaView style={{height: '96%'}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={Styles.JournalListscrollView}>
            <View style={Styles.JournalListheaderContainer}>
              <View>
                {journalListCopy.map((journals, index) => (
                  <View key={index} style={Styles.JournalListlistItemsJournal}>
                    <View>
                      {journals.mood > 0 && (
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Text style={{marginTop:2}}>
                            Mood : {moodStatus[journals.mood]}{' '}
                          </Text>
                          <Emoji
                            name={moodExpression[journals.mood]}
                            style={{fontSize: 25, marginTop:1}}
                          />
                        </View>
                      )}
                      <Text style={Styles.JournalListaddJournalContentText}>
                        {'\n'}
                        {journals.details}
                      </Text>
                      <Text note style={Styles.JournalListjournalTimeAdded}>
                        <TimeAgo time={journals.created_at} />
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <Dialog
                visible={this.state.popup2}
                onTouchOutside={() => {
                  this.setState({popup2: false});
                }}
                dialogAnimation={
                  new ScaleAnimation({
                    initialValue: 0, // optional
                    useNativeDriver: true, // optional
                  })
                }
                dialogStyle={{backgroundColor: '#DD414F', fontSize: 16}}>
                <DialogContent>
                  <Text
                    style={[
                      Styles.JournalListdialogTitlewarning,
                      {
                        textAlign: 'center',
                        marginTop: 10,
                        color: '#fff',
                        fontWeight: 'bold',
                        marginBottom: 10,
                      },
                    ]}>
                    WARNING
                  </Text>
                  <Text style={Styles.JournalListdialogContentwarning}>
                    This diary is not monitored 24/7 meaning that your entry
                    might not be read for some time.{'\n'}
                    {'\n'}
                    If you are in danger or in a life threatening situation{' '}
                    please dial{' '}
                    <Text style={{fontWeight: 'bold'}}>
                      {global.DialNumber}
                    </Text>
                    {'\n'}
                  </Text>
                  <NativeButton
                    bordered
                    full
                    style={Styles.JournalListwarningModalCancelBtn}
                    title="Go Back"
                    onPress={() => this.cancelJournalProcess()}
                  />
                  <NativeButton
                    success
                    full
                    title="I Understand"
                    style={Styles.JournalListtypeButton}
                    onPress={() => this.continueJournalProcess()}
                  />
                </DialogContent>
              </Dialog>
              <Dialog
                visible={this.state.popup3}
                onTouchOutside={() => {
                  this.setState({
                    popup3: false,
                    moodType: 0,
                    nextButton: false,
                  });
                }}
                dialogAnimation={
                  new SlideAnimation({
                    slideFrom: 'top',
                  })
                }
                // dialogStyle={{height:400}}
                width={0.9}>
                <DialogContent styles={{backgroundColor: '#fff'}}>
                  <View>
                    <Text style={Styles.JournalListemojoTitle}>
                      How are you feeling today ?
                    </Text>
                    <Grid>
                      <Row style={Styles.JournalListRowOne}>
                        <Col>
                          {/* {this.state.moodType == 1 ? ( */}
                          <Text
                            style={
                              this.state.moodType == 1
                                ? {
                                    backgroundColor: '#9A9A9A',
                                    borderRadius: 25,
                                    fontFamily: 'Helvetica',
                                    fontSize: 14,
                                    padding: 5,
                                    alignItems: 'center',
                                  }
                                : {
                                    fontFamily: 'Helvetica',
                                    fontSize: 14,
                                    alignItems: 'center',
                                    padding: 5,
                                  }
                            }
                            onPress={() => this.setMoodType(1)}>
                            <Emoji
                              name={moodExpression[1]}
                              style={{fontSize: 25}}
                            />
                            Very Happy
                          </Text>
                        </Col>
                        <Col>
                          {this.state.moodType == 5 ? (
                            <Text
                              style={{
                                backgroundColor: '#9A9A9A',
                                borderRadius: 25,
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(5)}>
                              <Emoji
                                name={moodExpression[5]}
                                style={{fontSize: 25}}
                              />{' '}
                              Happy
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(5)}>
                              <Emoji
                                name={moodExpression[5]}
                                style={{fontSize: 25}}
                              />{' '}
                              Happy
                            </Text>
                          )}
                        </Col>
                      </Row>
                      <Row style={Styles.JournalListRowTwo}>
                        <Col>
                          {this.state.moodType == 2 ? (
                            <Text
                              style={{
                                backgroundColor: '#9A9A9A',
                                borderRadius: 25,
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(2)}>
                              <Emoji
                                name={moodExpression[2]}
                                style={{fontSize: 25}}
                              />{' '}
                              OK
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(2)}>
                              <Emoji
                                name={moodExpression[2]}
                                style={{fontSize: 25}}
                              />{' '}
                              OK
                            </Text>
                          )}
                        </Col>
                        <Col>
                          {this.state.moodType == 6 ? (
                            <Text
                              style={{
                                backgroundColor: '#9A9A9A',
                                borderRadius: 25,
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(6)}>
                              <Emoji
                                name={moodExpression[6]}
                                style={{fontSize: 25}}
                              />{' '}
                              Unhappy
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(6)}>
                              <Emoji
                                name={moodExpression[6]}
                                style={{fontSize: 25}}
                              />{' '}
                              Unhappy
                            </Text>
                          )}
                        </Col>
                      </Row>
                      <Row style={Styles.JournalListRowThree}>
                        <Col>
                          {this.state.moodType == 3 ? (
                            <Text
                              style={{
                                backgroundColor: '#9A9A9A',
                                borderRadius: 25,
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(3)}>
                              <Emoji
                                name={moodExpression[3]}
                                style={{fontSize: 25}}
                              />{' '}
                              Angry
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(3)}>
                              <Emoji
                                name={moodExpression[3]}
                                style={{fontSize: 25}}
                              />{' '}
                              Angry
                            </Text>
                          )}
                        </Col>
                        <Col>
                          {this.state.moodType == 7 ? (
                            <Text
                              style={{
                                backgroundColor: '#9A9A9A',
                                borderRadius: 25,
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(7)}>
                              <Emoji
                                name={moodExpression[7]}
                                style={{fontSize: 25}}
                              />{' '}
                              Anxious
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(7)}>
                              <Emoji
                                name={moodExpression[7]}
                                style={{fontSize: 25}}
                              />{' '}
                              Anxious
                            </Text>
                          )}
                        </Col>
                      </Row>
                      <Row style={Styles.JournalListRowfour}>
                        <Col>
                          {this.state.moodType == 4 ? (
                            <Text
                              style={{
                                backgroundColor: '#9A9A9A',
                                borderRadius: 25,
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(4)}>
                              <Emoji
                                name={moodExpression[4]}
                                style={{fontSize: 25}}
                              />{' '}
                              Depressed
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(4)}>
                              <Emoji
                                name={moodExpression[4]}
                                style={{fontSize: 25}}
                              />{' '}
                              Depressed
                            </Text>
                          )}
                        </Col>
                        <Col>
                          {this.state.moodType == 8 ? (
                            <Text
                              style={{
                                backgroundColor: '#9A9A9A',
                                borderRadius: 25,
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(8)}>
                              <Emoji
                                name={moodExpression[8]}
                                style={{fontSize: 25}}
                              />{' '}
                              Miserable
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Helvetica',
                                fontSize: 14,
                                padding: 5,
                              }}
                              onPress={() => this.setMoodType(8)}>
                              <Emoji
                                name={moodExpression[8]}
                                style={{fontSize: 25}}
                              />{' '}
                              Miserable
                            </Text>
                          )}
                        </Col>
                      </Row>
                    </Grid>
                    <Pressable
                      full
                      onPress={() => this.continueMsgDetails()}
                      title="Next"
                      style={{
                        marginTop: 260,
                        borderRadius: 5,
                        height: 50,
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                        backgroundColor:
                          this.state.nextButton === true
                            ? '#30A487'
                            : '#9A9A9A',
                      }}>
                      <Text style={Styles.JournalListtypeButtonText}>Next</Text>
                    </Pressable>
                  </View>
                </DialogContent>
              </Dialog>
              <Dialog
                visible={this.state.popup4}
                onTouchOutside={() => {
                  this.setState(
                    {
                      popup4: false,
                      moodType: 0,
                      journalMsg: '',
                      nextButton: false,
                    },
                    () => Keyboard.dismiss(),
                  );
                }}
                dialogAnimation={
                  new ScaleAnimation({
                    initialValue: 0, // optional
                    useNativeDriver: true, // optional
                  })
                }
                width={0.9}>
                <DialogContent>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                      <View>
                        <Text style={Styles.JournalListemojoTitle}>
                          What do you want to say ?
                        </Text>
                        <View regular style={Styles.JournalListtextInputBigBox}>
                          <TextInput
                            onChangeText={(journalMsg) =>
                              this.setState({journalMsg})
                            }
                            style={Styles.JournalListloginInputBoxArea}
                            rowSpan={5}
                            placeholder="Write about how you are feeling here">
                            {this.state.journalMsg}
                          </TextInput>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={[
                            Styles.JournalListemojoTitle,
                            {
                              textAlign: 'left',
                              flex: 1,
                              marginTop: 10,
                              marginBottom: 10,
                            },
                          ]}>
                          Date/Time
                        </Text>
                        <Text
                          style={[
                            Styles.JournalListemojoTitle,
                            {
                              textAlign: 'left',
                              flex: 1,
                              marginTop: 10,
                              marginBottom: 10,
                            },
                          ]}>
                          Select a Date/Time
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 25,
                          marginBottom: 40,
                        }}>
                        <View style={{width: '40%', marginLeft: 50}}>
                          <SelectDropdown
                            data={countries}
                            defaultButtonText="Select"
                            buttonStyle={{width: '62%'}}
                            buttonTextStyle={{fontSize: 15}}
                            onSelect={(selectedItem, index) => {
                              this.onValueChange2(index);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              // text represented after item is selected
                              // if data array is an array of objects then return selectedItem.property to render after item is selected
                              return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                              // text represented for each item in dropdown
                              // if data array is an array of objects then return item.property to represent item in dropdown
                              return item;
                            }}
                          />
                          <Icon name="angle-down" size={15}></Icon>
                        </View>

                        <View style={{width: '64%', marginRight: 40}}>
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.dateCustom}
                            mode={this.state.mode}
                            is24Hour={true}
                            display=""
                            onChange={this.onChange}
                            disabled={this.state.datePickerStatus}
                          />
                        </View>
                      </View>
                      <Pressable
                        full
                        title="Submit"
                        onPress={() => {
                          this.addJournalMsg();
                        }}
                        style={Styles.JournalListemojiAfterPopupBtn}>
                        <Text style={Styles.JournalListtypeButtonText}>
                          Submit
                        </Text>
                      </Pressable>
                      <Pressable
                        full
                        title="Cancel"
                        onPress={() => this.cancelSubmitProcess()}
                        style={{
                          backgroundColor: '#9A9A9A',
                          borderRadius: 5,
                          height: 50,
                          justifyContent: 'center',
                          paddingLeft: 10,
                        }}>
                        <Text style={Styles.JournalListtypeButtonText}>
                          Cancel
                        </Text>
                      </Pressable>
                    </View>
                  </TouchableWithoutFeedback>
                </DialogContent>
              </Dialog>
              <View style={{height: 60}} />

              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
              />
            </View>
          </ScrollView>
          <View style={{height: 60, backgroundColor: 'transparent'}}>
            <Grid>
              <Row>
                <Col size={100}>
                  <Button
                    style={Styles.JournalListaddJournalBtn}
                    full
                    onPress={() => {
                      this.setState({popup3: true});
                    }}>
                    <Text style={Styles.JournalListaddJournalBtnText}>
                      Add a Diary Entry
                    </Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </View>
        </SafeAreaView>
        <AppFooter
          stackName={this.props.route.name}
          navigation={this.props.navigation}
        />
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
