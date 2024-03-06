import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native';

const Stack = createStackNavigator();

const Routes = () => (
  <Button
    title="Go to Login Page"
    onPress={() => navigation.navigate('Login')}
  />
);
export default Routes;
