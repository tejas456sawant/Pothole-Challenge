import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, BackHandler, Button ,TouchableOpacity} from "react-native";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Map from './Map';
import HomeScreen from './HomeScreen';
import CommunityScreen from './CommunityScreen';
import SettingsScreen from './SettingsScreen';

export default class Screen extends Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress',function(){
      return true;
    })
  }
  render() {
    return (
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#f2f2f2'
      }}>
        <App1/>
      </SafeAreaView>
    )
  }
}

const AppTabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{color:tintColor,fontSize:11}}>HOME</Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={22} />
      )
    }
  },
  reportScreen : {
    screen: Map,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{color:tintColor,fontSize:11}}>REPORT</Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="alert-decagram" color={tintColor} size={22} />
      )
    }
  },
  communityScreen : {
    screen: CommunityScreen,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{color:tintColor,fontSize:11}}>COMMUNITY</Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="account-group" color={tintColor} size={22} />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{color:tintColor,fontSize:11}}>SETTINGS</Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="settings" color={tintColor} size={22} />
      )
    }
  }
}, {
    initialRouteName: 'Home',
    // order: ['Settings', 'Home'],
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    headerLeft:null,
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',
        borderTopWidth: 0.5,
        borderTopColor: 'grey'
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true,
      showLabel:false
    }
  })

const App1 = createAppContainer(AppTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});