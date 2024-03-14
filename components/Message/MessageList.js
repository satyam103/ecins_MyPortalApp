import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View, Text, Pressable} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Footer,
  Image,
} from 'native-base';

import AppFooter from '../Footer/Footer';
import Styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import {getDataParamUrl} from '../utility';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MessagesList: [],
      spinner: false,
      error: false,
      active_private_mode: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.checkPrivateMode);
  }

  checkPrivateMode = () => {
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });
  };

  componentDidMount() {
    // get default setting saved
    this.setState({spinner: true});
    getDataParamUrl('GET', 'emessages', true)
      .then((response) => {
        if (response.message == 'Server Error') {
          showMessage({
            message: 'My E-Messages',
            description: 'Something is broken! Please try after some time.',
            type: 'danger',
            textStyle: {fontFamily: 'HelveticaNeue'},
            // fontWeight: 'bold',
          });
        } else if (response != '') {
          if (response.message === undefined) {
            this.setState({MessagesList: response});
          } else {
            this.setState({error: true});
          }
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
  }

  render() {
    let showMessageList;
    showMessageList = <Text style={{marginLeft:10}}>No messages available</Text>;
    if (this.state.error) {
      showMessageList = <Text>No messages available</Text>;
    } else if (this.state.MessagesList.length > 0) {
      const newMessageList = [...this.state.MessagesList];

      showMessageList = newMessageList.map((message, index) => {
        return (
          <Pressable
            key={index}
            avatar
            style={Styles.MessageListItemsBg}
            onPress={() =>
              this.props.navigation.push('ViewMessage', {
                messageId: message.emessage_id,
                name: message.userName,
                title: message.title,
                dateSent: message.date_sent,
                description: message.emessages.description,
              })
            }>
            <View>
              <Image
                small
                style={Styles.MessageListThumbnail}
                source={require('../../assets/images/user_icon.jpeg')}
              />
            </View>
            <View style={Styles.MessageListWidthBody}>
              <Text style={Styles.MessageListItemsTitles}>
                {message.userName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text style={Styles.MessageListItemsUname}>
                  {message.title}
                </Text>
                <Text style={Styles.MessageListItemsDate}>
                  {message.date_sent}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      });
    }
    return (
      <View>
        <SafeAreaView style={{height: '96%'}}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={Styles.MessageListHeaderContainer}>
              <Text
                style={[
                  Styles.MessageListmessageTitle,
                  {
                    fontWeight: 'bold',
                    paddingLeft: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                ]}>
                My Messages
              </Text>
              <View style={Styles.MessageListContainer}>{showMessageList}</View>
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
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
