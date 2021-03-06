import React from 'react';
import {View, Image,StatusBar} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import AsyncStorage from '@react-native-community/async-storage';
  import SplashScreen from 'react-native-splash-screen'
class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 1000),
    );
  };

  async componentDidMount() {
    SplashScreen.hide();
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    const token = await AsyncStorage.getItem('@token');
    if (data !== null) {
      if (token != null || token != undefined) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('SignIn');
      }
      // this.props.navigation.navigate('Home');
    }
  
      const { params } =this.props.navigation.state;
  //  var typeuser= await  AsyncStorage.getItem('@typeofsignin')
  //  this.setState({type:typeuser})
  //     console.warn("############# type user",this.state.type==="teacher")
 
  }

  render() {
    return (
      <>
        <View style={styles.viewStyles}>
          {/* <StatusBar 
          backgroundColor="#293A54"
          barStyle='light-content'
          /> */}
          {/* <Image
            style={cs.stretch}
            source={require('./../assets/images/common/Logo.png')}
          />
          <Image
            style={cs.gifSplash}
            source={require('./../assets/images/common/loader-white.gif')}
          /> */}
        </View>
      </>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#293A54',
  
  },
};

export default Splash;
