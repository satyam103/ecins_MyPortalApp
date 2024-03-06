import React, {Component} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import {Text} from 'native-base';

import AppFooter from '../Footer/Footer';
import Styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import {getDataParamUrl} from '../utility';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MessagesList: [],
      spinner: false,
      selectedOrgId: '',
    };
  }

  componentDidMount() {
    this.setState({spinner: true});
    AsyncStorage.getItem('organizationDetails', (err, result) => {
      let organizationResponse = JSON.parse(result);
      if (organizationResponse !== null) {
        AsyncStorage.getItem('selectedOrg', (err, result) => {
          let organizationSelectedResponse = JSON.parse(result);
          this.setState({selectedOrgId: organizationSelectedResponse.uuid});
          organizationResponse.map((organizationsResponse) => {
            if (
              organizationsResponse.uuid == organizationSelectedResponse.uuid
            ) {
              this.setState((prevState) => ({
                MessagesList: [
                  ...prevState.MessagesList,
                  {
                    uuid: organizationsResponse.uuid,
                    name: organizationsResponse.name,
                    selcted: true,
                  },
                ],
              }));
            } else {
              this.setState((prevState) => ({
                MessagesList: [
                  ...prevState.MessagesList,
                  {
                    uuid: organizationsResponse.uuid,
                    name: organizationsResponse.name,
                    selcted: false,
                  },
                ],
              }));
            }
          });
        });
      }
      this.setState({spinner: false});
    });
  }

  changeOrganizations = (uuid) => {
    this.setState({MessagesList: []});
    AsyncStorage.setItem('selectedOrg', JSON.stringify({uuid: uuid}));
    this.setState({spinner: true});
    AsyncStorage.getItem('organizationDetails', (err, result) => {
      let organizationResponse = JSON.parse(result);
      if (organizationResponse !== null) {
        AsyncStorage.getItem('selectedOrg', (err, result) => {
          let organizationSelectedResponse = JSON.parse(result);
          this.setState({selectedOrgId: organizationSelectedResponse.uuid});
          organizationResponse.map((organizationsResponse) => {
            if (
              organizationsResponse.uuid == organizationSelectedResponse.uuid
            ) {
              this.setState((prevState) => ({
                MessagesList: [
                  ...prevState.MessagesList,
                  {
                    uuid: organizationsResponse.uuid,
                    name: organizationsResponse.name,
                    selcted: true,
                  },
                ],
              }));
            } else {
              this.setState((prevState) => ({
                MessagesList: [
                  ...prevState.MessagesList,
                  {
                    uuid: organizationsResponse.uuid,
                    name: organizationsResponse.name,
                    selcted: false,
                  },
                ],
              }));
            }
          });
        });
      }
      this.setState({spinner: false});
    });
  };

  render() {
    const newMessageList = [...this.state.MessagesList];
    const showMessageList = newMessageList.map((message, index) => {
      return (
        <Pressable
          onPress={() => this.changeOrganizations(message.uuid)}
          key={index}
          avatar
          style={
            message.selcted
              ? {
                  backgroundColor: 'green',
                  borderRadius: 50,
                  marginBottom: 10,
                  padding: 10,
                }
              : Styles.MessageListItemsBg
          }>
          <View
            onPress={() => this.changeOrganizations(message.uuid)}
            style={Styles.MessageListWidthBody}>
            <Text
              onPress={() => this.changeOrganizations(message.uuid)}
              style={[
                message.selected ? {color: 'white'} : {color: 'black'},
                Styles.MessageListItemsUname,
              ]}>
              {message.name}
            </Text>
          </View>
        </Pressable>
      );
    });

    return (
      <View>
        <View style={{height: '96%'}}>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{}}>
              <View style={Styles.MessageListHeaderContainer}>
                <Text style={Styles.MessageListmessageTitle}>My Accounts</Text>
                <View style={Styles.MessageListContainer}>
                  {showMessageList}
                </View>
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                />
              </View>
            </ScrollView>
            <Pressable
              onPress={() => this.props.navigation.push('EditSettings')}
              style={{
                margin: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection:'row',
                alignItems:'center',
                // justifyContent: 'space-between',
                // alignSelf: 'center',
                // width: 60,
                // height: 60,
                // bottom: 10,
                // backgroundColor: 'black',
                // position: 'relative',
              }}>
              <Text style={{marginRight:10}}>Settings</Text>
              <Icon name='chevron-right' />
            </Pressable>
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
