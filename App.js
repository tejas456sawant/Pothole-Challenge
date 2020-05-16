import React, {Component} from 'react';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './src/components/NavigationService';
import Screen from './src/screens/Screen';

const RootStack = createStackNavigator(
  {
    register: {screen: Register},
    login: {screen: Login},
    screen: {screen: Screen},
  },
  {
    initialRouteName: 'login',
    swipeEnabled: true,
    animationEnabled: true,
    headerMode: 'none',
    headerLeft: null,
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
