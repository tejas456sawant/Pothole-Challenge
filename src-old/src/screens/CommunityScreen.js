import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CardForPost from '../components/CardForPost';

export default class CommunityScreen extends Component {
    render() {
        return (
          <View style={styles.container}>
            <CardForPost/>
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