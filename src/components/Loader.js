import React from 'react';
import {View, Image} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
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
  }

  render() {
    return (
      <>
        <View style={styles.viewStyles}>
          <Image
            style={cs.stretch}
            source={require('./../assets/images/common/Logo.png')}
          />
          <Image
            style={cs.gifSplash}
            source={require('./../assets/images/common/loader-white.gif')}
          />
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

export default SplashScreen;
