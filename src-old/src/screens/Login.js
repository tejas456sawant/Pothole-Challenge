import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MaterialIconTextbox from '../components/MaterialIconTextbox';
import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';
import Firebase from '../components/Firebase';
import SpinnerComponent from '../components/SpinnerComponent';
import NavigationService from '../components/NavigationService';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
    loading: false,
  };

  renderButton() {
    if (this.state.loading) {
      return <SpinnerComponent />;
    }
    return (
      <View style={styles.endWrapperFillerRow}>
        <View style={styles.endWrapperFiller} />
        <View style={styles.materialButtonVioletRow}>
          <SignInButton
            style={styles.materialButtonViolet1}
            onPress={this.checkData}
          />
          <SignUpButton style={styles.materialButtonViolet} />
        </View>
      </View>
    );
  }

  onLogin() {
    this.setState({
      loading: false,
      errorMessage: '',
    });
    NavigationService.navigate('screen');
    console.log('Hello');
  }

  checkData = () => {
    const {email, password} = this.state;
    if (email === '' && password === '') {
      this.setState({errorMessage: 'Field are empty'});
    } else {
      this.setState({errorMessage: '', loading: true});
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.onLogin.bind(this))
        .catch(() => {
          this.setState({
            errorMessage: 'Authentication Failed',
            loading: false,
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.materialIconTextboxColumn}>
          <MaterialIconTextbox
            placeholderText={'Enter Email'}
            textInputIcon={'email-outline'}
            SecureTextEntry={false}
            style={styles.materialIconTextbox}
            onChangeText={text => this.setState({email: text})}
          />
          <MaterialIconTextbox
            placeholderText={'Enter Password'}
            textInputIcon={'key'}
            SecureTextEntry={true}
            textInputIconPass={'eye'}
            style={styles.materialIconTextbox1}
            onChangeText={text => this.setState({password: text})}
          />
          <Text style={styles.errorMessageStyle}>
            {this.state.errorMessage}
          </Text>
        </View>
        <View style={styles.materialIconTextboxColumnFiller} />
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialIconTextbox: {
    height: 40,
  },
  materialIconTextbox1: {
    height: 40,
    marginTop: 24,
  },
  materialIconTextboxColumn: {
    marginTop: 194,
    marginLeft: 22,
    marginRight: 21,
  },
  materialIconTextboxColumnFiller: {
    flex: 1,
  },
  endWrapperFiller: {
    flex: 1,
    flexDirection: 'row',
  },
  materialButtonViolet: {
    width: 100,
    height: 36,
    marginLeft: 5,
    top: 40,
  },
  materialButtonViolet1: {
    width: 100,
    height: 36,
    top: 40,
    marginLeft: 10,
  },
  materialButtonVioletRow: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  endWrapperFillerRow: {
    height: 36,
    flexDirection: 'row',
    marginBottom: 257,
    marginLeft: 63,
    marginRight: 49,
  },
  errorMessageStyle: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 15,
    paddingTop: 10,
  },
});
