import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CarfForPost extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View
          style={{
            height: 250,
            width: 330,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: this.props.imgUrl}}
            style={styles.cardItemImagePlace}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{this.props.location}</Text>
        </View>
        <View style={styles.actionBody}>
          <TouchableOpacity style={styles.actionButton1}>
            <Icon name={'thumb-up'} style={styles.iconStylePass} />
            <Text style={styles.actionText1}>REPORT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton2}>
            <Icon name={'thumb-down'} style={styles.iconStylePass} />
            <Text style={styles.actionText2}>FALSE REPORT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    opacity: 1,
    backgroundColor: '#FFF',
    flexWrap: 'nowrap',
    elevation: 3,
    borderRadius: 2,
    borderColor: '#CCC',
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: 'hidden',
    marginBottom: '14%',
    width: '99%',
  },
  cardItem1Style: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    width: 40,
    height: 40,
    backgroundColor: '#CCC',
    borderRadius: 20,
  },
  headerContent: {
    justifyContent: 'center',
    paddingLeft: 16,
  },
  textStyle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'roboto-regular',
    lineHeight: 20,
  },
  noteTextStyle: {
    color: '#000',
    opacity: 0.5,
    fontSize: 14,
    fontFamily: 'roboto-regular',
    lineHeight: 16,
  },
  cardItemImagePlace: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
    minHeight: 210,
    marginTop: '3%',
  },
  body: {
    padding: 16,
  },
  bodyText: {
    color: '#424242',
    fontSize: 14,
    lineHeight: 20,
  },
  actionBody: {
    flexDirection: 'row',
    padding: 8,
  },
  actionButton1: {
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 36,
    padding: 8,
    width: '50%',
    flexDirection: 'row',
    backgroundColor: '#3F51B5',
    borderRadius: 50,
  },
  actionText1: {
    color: 'white',
    opacity: 0.9,
    fontSize: 14,
    paddingLeft: 10,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  actionButton2: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 36,
    marginLeft: 8,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#3F51B5',
    borderRadius: 50,
  },
  actionText2: {
    color: 'white',
    opacity: 0.9,
    fontSize: 14,
    paddingLeft: 10,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconStylePass: {
    marginLeft: '4%',
    color: '#ffcc66',
    fontFamily: 'Roboto',
    fontSize: 24,
    paddingLeft: 0,
    margin: 0,
  },
});
