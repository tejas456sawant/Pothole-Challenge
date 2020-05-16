import React, { Component } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CurrentLocation from '../components/CurrentLocation';
import Modal from 'react-native-modal';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import { createAppContainer } from 'react-navigation';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NextButton from '../components/NextButton';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Firebase from '../components/Firebase';
import axios from 'axios';

//for location purpose
var coor1,coor2 = null;
var coordinate = {
  lat : 0,
  lon : 0
}
var getDownloadImgURL = '';
var locationOfPothole = '';
class MapForLocation extends Component {
    
    state =  {
      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.05,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },
      locationChosen: false,
      locationAdd : 'Loading....'
  }

  reverseGeo(coordinate){
      const key = "e3a9901eef8560"
      let {lat, lon} = coordinate
      
      Promise.all(
        axios.get('http://us1.locationiq.com/v1/reverse.php?key=' + key + '&lat=' + lat + '&lon=' + lon + '&format=json')
      .then(response => {
        this.setState({locationAdd : response.data.display_name})
      })
      ) 
  }

goToUploadImage = () => {
    if(coordinate.lat != 0 && coordinate.lon != 0) {
      this.props.navigation.navigate('SelectPhoto')
    } else {
      alert('Please select pothole location :(');
    }
}

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    coor1 = coords.latitude;
    coor2 = coords.longitude;
    coordinate.lat =  coords.latitude;
    coordinate.lon =  coords.longitude;
    this.reverseGeo(coordinate);
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };

  getLocationHandler = () => {
    Geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    alert("Fetching the Position failed, please pick one manually!");
  })
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <Marker coordinate={this.state.focusedLocation} title={this.state.locationAdd}/>;
      locationOfPothole = this.state.locationAdd; 
      ToastAndroid.showWithGravityAndOffset(
        this.state.locationAdd,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }

    return (
        <View style={styles.container}>
          <MapView
            initialRegion={this.state.focusedLocation}
            region={!this.state.locationChosen ? this.state.focusedLocation : null}
            style={styles.map}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
          >
            {marker}
          </MapView>
          <View style={styles.button}>
            <CurrentLocation onPress={this.getLocationHandler}></CurrentLocation>
          </View>
          <View style={styles.nextButton}>
            <NextButton onPress={this.goToUploadImage}></NextButton>
          </View>
        </View>
    );
  }
}

const Blob = RNFetchBlob.polyfill.Blob;
fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class PhotoForPothole extends Component {

  state = {
    //sample url you can set it empty but need to do some handling because image does not support empty url
    imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g',
    firebaseImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g',
    imgName: '',
    loading:false,
}

  loadSpinner() {
    if(this.state.loading) {
      return (<ActivityIndicator size="large" color="#0000ff"  style={{top:'50%'}}/>)
    }
  }

  getImage() {

        let options = {
            title: 'Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        this.setState({loading : true})
        ImagePicker.showImagePicker(options, (response) => {
            //console.warn('Response = ', response);

            if (response.didCancel) {
                console.warn('User cancelled image picker');
            }
            else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }
            else {
                let source = {uri: 'data:image/jpeg;base64,' + response.data, image: "file.png"};

                this.setState({
                    imageUri: response.uri,
                    imgName: response.fileName,
                });
                this.uploadImage(this.state.imageUri);
            }
        });
    }

    uploadImage = (uri, mime = 'application/octet-stream') => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;
        const sessionId = new Date().getTime();
        const imageRef = Firebase.storage().ref('/potholeImages/').child(this.state.imgName);
        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mime};Base64`})
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, {contentType: mime})
            })
            .then((url) => {
                uploadBlob.close(); 
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                this.storeReference(url, sessionId);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    UploadReports() {
      Firebase.database().ref(`/potholereports/`)
      .push({Coordinate : coordinate,ImageUrl : getDownloadImgURL,LocationOfPothole : locationOfPothole})
      .then(alert('Done reporting'))
      .then(this.props.navigation.navigate('DoneUploading'))
      .catch((err) => {
        alert(err)
      })
    }

    storeReference = (url) => {
        this.setState({firebaseImageUrl : url , loading : false});
        getDownloadImgURL = url;
        if(getDownloadImgURL != '') {
          const { currentUser } = Firebase.auth();
          Firebase.database().ref(`/Users/${currentUser.uid}`)
          .child('potholereports/')
          .push({Coordinate : coordinate,PotholeImgUrl : getDownloadImgURL,LocationOfPothole : locationOfPothole})
          .then(this.UploadReports())
          .catch((err) => {
            alert(err);
          })
        } else {
          alert('Unexpected error');
        }
    }

  render() {
    return (
      <View style={styles.imgUploadContainer}>
          <TouchableOpacity style={styles.welcome} onPress={this.getImage.bind(this)}>
              <Text style={{color:'white'}}>Click to upload image</Text>
          </TouchableOpacity>
          <View style={{flex: 1}}>
              <Image source={{uri: this.state.imageUri}} style={{height: '80%', width: '80%',position:'absolute',alignContent:'center',alignSelf:'center',alignItems:'center',top:"10%"}}/>
              {this.loadSpinner()}
          </View>
      </View>
  );
  }
}

class Done extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Text style={{alignContent:'center',alignItems:'center',alignSelf:'center',top:'40%',fontSize:30,left:'4%'}}>
          Thanks for reporting.
        </Text>
        <TouchableOpacity style={styles.doneuploading}>
          <Text style={{color:'white'}}>Done</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


export default class Map extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <App1/>        
      </View>
    )
  }
}

const AppTabNavigator = createMaterialTopTabNavigator({
  SelectLocation : {
    screen: MapForLocation,
    navigationOptions : {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{color:tintColor,fontSize:12}}>Select Location</Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="pin" color={tintColor} size={22} />
      )
    }
  },
  SelectPhoto: {
    screen: PhotoForPothole,
    navigationOptions : {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{color:tintColor,fontSize:12}}>Upload Photo</Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="image-filter-center-focus" color={tintColor} size={22} />
      )
    }
  },
  DoneUploading: {
    screen: Done,
    navigationOptions : {
      tabBarLabel: ({ tintColor }) => (
        <Text style={{color:tintColor,fontSize:12}}>Done</Text>
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="check" color={tintColor} size={22} />
      )
    }
  }
  }, {
    initialRouteName: 'SelectLocation',
    // order: ['Settings', 'Home'],
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    headerLeft:null,
    tabBarOptions: {
      activeTintColor: '#6F00FF',
      inactiveTintColor: '#B4B4C6',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
        padding:0,
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
  imgUploadContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "97%",
  },
  button: {
    position:"absolute",
    padding:8,
    top :"80%",
    left :"10%",
  },
  nextButton : {
    //position:"absolute",
    
    top :"-17%",
    right :"-27%",
  },
  welcome : {
    top:'5%',
    left:'19%',
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    alignContent:'center',
    padding:10,
    elevation: 2,
    width:200,
    borderRadius: 50,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  doneuploading : {
    top:'70%',
    left:'35%',
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    alignContent:'center',
    padding:10,
    elevation: 2,
    width:100,
    borderRadius: 50,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  }
});