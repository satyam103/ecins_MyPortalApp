import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default class AppHeader extends Component {
  render() {
    return (
      <View style={stylesHeader.headerApp}>
        <Image source={require('../../assets/images/myportal.png')} />
      </View>
    );
  }
}

const stylesHeader = StyleSheet.create({
  headerApp: {
    textAlign: 'center',
    height: 60,
    paddingTop: 10,
  },
});
