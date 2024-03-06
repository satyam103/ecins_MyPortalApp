import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Footer,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppFooter from '../Footer/Footer';
import TimeAgo from 'react-native-timeago';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from '../css/style';
import {getDataParamUrl} from '../utility';
import {Image} from 'react-native';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
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
    getDataParamUrl('GET', 'chat/updates', true)
      .then((response) => {
        if (response.message == undefined) {
          this.setState({chatList: response});
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
    return (
      <View>
        <SafeAreaView style={{height:'96%'}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={Styles.ChatListscrollView}>
            <View style={Styles.ChatListheaderContainer}>
              <View style={Styles.ChatListlistContainer}>
                {this.state.chatList.map((journals) => (
                  <View
                    avatar
                    style={Styles.ChatListlistItemsBg}
                    onPress={() =>
                      this.props.navigation.navigate('ChatMessage', {
                        chatId: journals.id,
                      })
                    }>
                    <View>
                      <Image
                        // small
                        source={require('../../assets/images/user_icon.jpeg')}
                      />
                    </View>
                    <View>
                      <Text style={Styles.ChatListlistItemsTitle}>
                        {journals.updater_name}
                      </Text>
                      <Text note style={Styles.ChatListlistItemsSubtitle}>
                        {journals.message}
                      </Text>
                      <Text note style={Styles.ChatListchatLogAction}>
                        <TimeAgo time={journals.updated_at} />
                      </Text>
                    </View>
                    <View>
                      <Text note style={Styles.ChatListmessageType}>
                        NEW
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
