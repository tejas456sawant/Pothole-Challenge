import React, { Component } from "react";
import { StyleSheet, View ,Text} from "react-native";
import MaterialIconTextbox from "../components/MaterialIconTextbox";
import AlreadyRegister from "../components/AlreadyRegister";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import Firebase from '../components/Firebase';
import NavigationService from '../components/NavigationService';
export default class Register extends Component {

  state = {
    username:'',
    email:'',
    password:'',
    number:'',
    errorMessage:'',
  }

  storeData = () => {

    const {username,email,password,number} = this.state;
    console.log(username,email,password,number);
    Firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(this.registerUser.bind(this))
    .catch((err) => {
      this.setState({errorMessage : err.message})
    })
  }

  registerUser() {
    const { currentUser } = Firebase.auth();
    const {username,email,password,number} = this.state;
    if (username != '' && number != '') {
      Firebase.database().ref(`/Users/${currentUser.uid}/`)
      .push({Username : username,Email : email,Password : password,Phone : number})
      .then(NavigationService.navigate('screen')) 
      .catch((err) => {
        this.setState({errorMessage : err.message})
      })
    } else {
      this.setState({errorMessage : 'username or number field is empty'})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MaterialIconTextbox placeholderText={'Enter Username'} textInputIcon={'account-outline'}
          onChangeText={text => this.setState({username : text})}
          style={styles.materialIconTextbox1}
        ></MaterialIconTextbox>
        <MaterialIconTextbox placeholderText={'Enter Number'} textInputIcon={'phone'}
          style={styles.materialIconTextbox2}
          onChangeText={text => this.setState({number : text})}
          keyboardType={'phone-pad'}
        ></MaterialIconTextbox>
        <MaterialIconTextbox placeholderText={'Enter Password'} textInputIcon={'key'} textInputIconPass={'eye'} SecureTextEntry={true}
          style={styles.materialIconTextbox3}
          onChangeText={text => this.setState({password : text})}
        ></MaterialIconTextbox>
        <MaterialIconTextbox placeholderText={'Enter Email'} textInputIcon={'email-outline'}
          style={styles.materialIconTextbox4}
          onChangeText={text => this.setState({email : text})}
          keyboardType={'email-address'}
        ></MaterialIconTextbox >
        <AlreadyRegister style={styles.materialButtonViolet}></AlreadyRegister>
        <MaterialButtonViolet1 
          style={styles.materialButtonViolet1}
          onPress={this.storeData}
        ></MaterialButtonViolet1>
        <View style={{flex:1}}><Text style={styles.errorMessageStyle}>{this.state.errorMessage}</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  materialIconTextbox1: {
    height: 42,
    marginTop: 140,
    marginLeft: 22,
    marginRight: 22
  },
  materialIconTextbox2 : {
    height: 42,
    marginTop: 160,
    marginLeft: 22,
    marginRight: 22
  },
  materialIconTextbox3: {
    height: 42,
    marginTop: -111,
    marginLeft: 22,
    marginRight: 22
  },
  materialIconTextbox4: {
    height: 42,
    marginTop: -108,
    marginLeft: 22,
    marginRight: 22
  },
  materialButtonViolet: {
    height: 36,
    marginTop: 187,
    marginLeft: 80,
    marginRight: 80
  },
  materialButtonViolet1: {
    height: 36,
    marginTop: 15,
    marginLeft: 130,
    marginRight: 130
  },
  errorMessageStyle : {
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    color:'red',
    fontSize:15,
    paddingTop:10,
  }
});