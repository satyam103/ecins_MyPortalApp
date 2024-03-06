import React, {Component} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'native-base';

export default class BackButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onBack();
  }

  onBack = () => {
    console.log(this.props);
  };

  render() {
    return (
      <Button onPress={() => this.onBack()}>
        <Icon style={{fontSize: 18}} name="keyboard-arrow-left" />
        <Text>Task</Text>
      </Button>
    );
  }
}
