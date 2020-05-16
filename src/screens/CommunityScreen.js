import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView,YellowBox} from 'react-native';
import CardForPost from '../components/CardForPost';
import Header1 from '../components/Header1'
import Firebase from '../components/Firebase';

var cards = [];
var names = [];
YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

export default class CommunityScreen extends Component {

    UNSAFE_componentWillMount(){
        Firebase.database().ref().child('potholereports').on("value", function(snapshot) {
            snapshot.forEach(function(itemSnapshot) {
              console.log(itemSnapshot.key); // if you're using 2.x that is key()
              Firebase.database().ref(`potholereports/${itemSnapshot.key}`).on('value',snapshot => {
                cards.push({
                    location : snapshot.val().LocationOfPothole,
                    imgUrl : snapshot.val().ImageUrl,
                    key:snapshot.key
                })
              })
            });
        })
    }
    printData () {
        return (cards.map((item) => (
            <CardForPost location={item.location} imgUrl={item.imgUrl} style={styles.list} key={item.key}/>
        )))
    }

    render() {
        return (
          <View style={styles.container}>
        <Header1 text1="Community Reports"/>
             <ScrollView style={{top:'9%'}} >
                {
                    this.printData()
                }
        </ScrollView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});