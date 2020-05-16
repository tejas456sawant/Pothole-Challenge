import React, { Component } from "react";
import { StyleSheet, View ,Text} from "react-native";
import MaterialIconTextbox from "../components/MaterialIconTextbox";
import AlreadyRegister from "../components/AlreadyRegister";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import Firebase from '../components/Firebase';
import LinearGradient from 'react-native-linear-gradient';
import SpinnerComponent from '../components/SpinnerComponent';
import NavigationService from '../components/NavigationService';

export default class Register extends Component {

  state = {
    username:'',
    email:'',
    password:'',
    number:'',
    errorMessage:'',
    loading : false
  }

  storeData = () => {
    this.setState({loading : true});
    const {username,email,password,number} = this.state;
    console.log(username,email,password,number);
    Firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(this.registerUser.bind(this))
    .catch((err) => {
      this.setState({errorMessage : err.message,loading:false})
    })
  }

  registerUser() {
    const {username ,email,password,number} = this.state;
    const { currentUser } = Firebase.auth();
    if (username != '' && number != '') {
      Firebase.database().ref(`/Users/${currentUser.uid}/`)
      .child('userinfo/')
      .push({Username : username,Email : email,Password : password,Phone : number})
      .then(NavigationService.navigate('screen')) 
      .catch((err) => {
        this.setState({errorMessage : err.message,loading:false})
      })
    } else {
      this.setState({errorMessage : 'username or number field is empty',loading:false})
    }
  }

  renderButton() {
    if(this.state.loading) {
      return (<SpinnerComponent/>)
    }
    return (
      <View style={{flex:1}}>
      <AlreadyRegister style={styles.materialButtonViolet}>
      </AlreadyRegister>
        <MaterialButtonViolet1 
          style={styles.materialButtonViolet1}
          onPress={this.storeData}
        >
        </MaterialButtonViolet1>
        </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containGradient}>
        <LinearGradient   start={{x: 0.0, y: 0}} end={{x: 0, y: 1.0}}
         locations={[0,0.67]}
        colors={['#ff00c4','#FF0043']} style={styles.linearGradient}>
        </LinearGradient></View>
        <View style={styles.contain1}>
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
        {this.renderButton()}
        <View style={{flex:1,alignContent:'center',alignItems:'center'}}><Text style={styles.errorMessageStyle}>{this.state.errorMessage}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containGradient:{
    position:"absolute",
    height:"45%",
    width:"100%",
    zIndex:-1,
  
  },
  contain1:{
    position: "absolute",
    paddingTop: '7%',
    //top: '23%',
    //width: '84%',
    //height: '54%',
    //elevation: 90,
    //backgroundColor: "#000",
    //borderColor:"#000",
    //borderWidth: 10,
    //borderRadius: 55,
    alignSelf: 'center',
    top:'10%',
    width: '84%',
    height: 483,
    backgroundColor: "rgba(255,255,255,1)",
    //elevation: 60,
    elevation: 10,
    borderRadius: 45,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowColor: "#456177",
    shadowOpacity: 0.39,
    shadowRadius: 5
  },
  container: {
    flex: 1
  },
  materialIconTextbox1: {
    height: 42,
    marginTop: 30,
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
    alignSelf:"center",
    alignContent:'center',
    alignItems:'center',
    width:'50%',
    height: 36,
    marginTop: 187,
  },
  materialButtonViolet1: {
    height: 36,
    backgroundColor:"#FF0060",
    alignSelf:"center",
    marginTop: 35,
    //marginLeft: 130,
    //marginRight: 130
  },
  linearGradient:{
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60
  }
});