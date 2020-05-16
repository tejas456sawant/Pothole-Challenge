import React, { Component } from "react";
import { StyleSheet, View , Text,Image} from "react-native";
import MaterialIconTextbox from "../components/MaterialIconTextbox";
import SignUpButton from "../components/SignUpButton";
import SignInButton from "../components/SignInButton";
import Firebase from '../components/Firebase';
import SpinnerComponent from '../components/SpinnerComponent';
import NavigationService from '../components/NavigationService';
import LinearGradient from 'react-native-linear-gradient';

export default class Login extends Component {
  
  state = {
    email:'',
    password:'',
    errorMessage:'',
    loading:false,
  }

  renderButton() {
    if(this.state.loading) {
      return (<SpinnerComponent/>)
    }
     return (
      <View style={styles.endWrapperFillerRow}>
      <View style={styles.endWrapperFiller}></View>
      <View style={styles.materialButtonVioletRow}>
         <SignInButton 
         style={styles.materialButtonViolet1} 
         onPress={this.checkData}>
         </SignInButton>
         <SignUpButton 
         style={styles.materialButtonViolet}>
         </SignUpButton>
      </View>
      </View>
     )
  }

  onLogin() {
    this.setState({
      loading:false,
      errorMessage:'',
    })
    NavigationService.navigate('screen');
    console.log('Hello');
  }

  checkData = () => {
    const { email , password } = this.state;
    if(email === '' && password === '') {
      this.setState({errorMessage : 'Field are empty'});
    } else {
      this.setState({errorMessage : '',loading :true });
      Firebase.auth().signInWithEmailAndPassword(email,password)
      .then(this.onLogin.bind(this))
        .catch((err) => {
          this.setState({errorMessage : err.message , loading:false});
        });
      }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containGradient}>
        <LinearGradient   start={{x: 0, y: 0}} end={{x: 0, y: 1.0}}
         locations={[0,0.7]}
  colors={[ '#A600FF','#FF0043']} style={styles.linearGradient}>
          <Image source={require('./logo.png')} style={styles.Logo}/>
        </LinearGradient>

        </View>
        <View style={styles.contain1}>
        <View style={styles.materialIconTextboxColumn}>
          <MaterialIconTextbox placeholderText={'Enter Email'} textInputIcon={'email-outline'} SecureTextEntry={false} 
            style={styles.materialIconTextbox}
            onChangeText={text => this.setState({email : text})}
            keyboardType={'email-address'}
            autoCompleteType={'email'}
          ></MaterialIconTextbox>
          <MaterialIconTextbox placeholderText={'Enter Password'} textInputIcon={'key'} SecureTextEntry={true} textInputIconPass={'eye'}
            style={styles.materialIconTextbox1}
            onChangeText={text => this.setState({password : text})}
          ></MaterialIconTextbox>
          <Text style={styles.errorMessageStyle}>{this.state.errorMessage}</Text>
        </View>
        <View style={styles.materialIconTextboxColumnFiller}></View>
            {this.renderButton()}
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
  Logo:{
    alignSelf:"center",
    top:'5%',
    backgroundColor : 'transparent',
    width:'100%',
    height:'50%'
  },
  contain1:{
    position: "absolute",
    //top: '23%',
    width: '84%',
    height: 383,
    //elevation: 90,
    //backgroundColor: "#000",
    //borderColor:"#000",
    //borderWidth: 10,
    //borderRadius: 55,
    alignSelf: 'center',
    top:'23%',
    //width: 307,
    //height: 383,
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
    flex: 1,
    
  },
  materialIconTextbox: {
    
    height: 40
  },
  materialIconTextbox1: {
    height: 40,
    marginTop: 24
  },
  materialIconTextboxColumn: {
    marginTop: '20%',
    marginLeft: 22,
    marginRight: 21
  },
  materialIconTextboxColumnFiller: {
    flex: 2
  },
  endWrapperFiller: {
    flex: 1,
    flexDirection: "row"
  },
  materialButtonViolet: {
    width: 100,
    height: 36,
    marginLeft: 10,
    top:40
  },
  materialButtonViolet1: {
    width: 100,
    height: 36,
    top:40,
    marginLeft: 10
  },
  materialButtonVioletRow: {
    height: 36,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  endWrapperFillerRow: {
    height: 36,
    flexDirection: "row",
    marginBottom: 257,
    marginLeft: 63,
    marginRight: 49
  },
  errorMessageStyle : {
    alignSelf:'center',
    color:'red',
    fontSize:15,
    paddingTop:10,
  },
  linearGradient:{
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    
  }
});