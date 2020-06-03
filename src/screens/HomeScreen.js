import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  YellowBox,
  BackHandler,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
//import LinearGradient from "react-native-linear-gradient";
//import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import UpdateList from '../components/UpdateList';
import Firebase from '../components/Firebase';

YellowBox.ignoreWarnings(['componentWillMount']);

var items = [];

export default class HomeScreen extends Component {
  state = {
    title: '',
    content: '',
  };

  componentWillMount() {
    this.loadData();
  }
  loadData = () => {
    Firebase.database()
      .ref('Updates/')
      .on('child_added', (snapshot) => {
        items.push({
          title: snapshot.val().Title,
          content: snapshot.val().Content,
          key: snapshot.key,
        });
      });
  };
  printData() {
    return items.map((item) => (
      <UpdateList
        title={item.title}
        content={item.content}
        style={styles.list}
      />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text1="Updates" />
        <ScrollView style={{flex: 1, top: 100}}>{this.printData()}</ScrollView>
      </View>
    );
  }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  container1: {
    top: window.width / 3.8 + 20,
    flex: 1,
  },
  list: {
    flex: 1,
    width: '96%',
    //    marginTop:10
  },
});
