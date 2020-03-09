import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from 'react-native';
// eslint-disable-next-line no-unused-vars
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
import PropTypes from 'prop-types';

export default class Footer extends Component {
  static propTypes = {
    activeTab: PropTypes.string,
  };

  static defaultProps = {
    activeTab: 'Home',
  };

  constructor(props) {
    super(props);
    // this.state = {
    //   isLoading: true,
    //   Home: true,
    //   Presence: false,
    //   Message: false,
    //   Profile: false,
    // };
  }

  render() {
    let {activeTab} = this.props;
    let home_Img =
      activeTab === 'Home'
        ? require('./../assets/images/common/home001-E031-active.png')
        : require('./../assets/images/common/home001-E031.png');
    let presence_Img =
      activeTab === 'Presence'
        ? require('./../assets/images/common/edit001-E069-active.png')
        : require('./../assets/images/common/edit001-E069.png');
    let message_Img =
      activeTab === 'Message'
        ? require('./../assets/images/common/mail001-E02D-active.png')
        : require('./../assets/images/common/mail001-E02D.png');
    let profile_Img =
      activeTab === 'Profile'
        ? require('./../assets/images/common/user023-E183-active.png')
        : require('./../assets/images/common/user023-E183.png');
    // const {isCurrentRoute, navigate} = NavigationService;
    return (
      <ImageBackground
        style={styles.footerContainer}
        resizeMode={'stretch'}
        // source={require('../assets/img/footer/footer.png')}
      >
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Image style={styles.imageStyle} source={home_Img} />
          {activeTab === 'Home' ? (
            <Text style={styles.activeTextFooter}>Home</Text>
          ) : (
            <Text style={styles.TextFooter}>Home</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            this.props.navigation.navigate('Presence');
          }}>
          <Image style={styles.imageStyle} source={presence_Img} />
          {activeTab === 'Presence' ? (
            <Text style={styles.activeTextFooter}>Aanwezigheid</Text>
          ) : (
            <Text style={styles.TextFooter}>Aanwezigheid</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            this.props.navigation.navigate('Messages');
          }}>
          <Image style={styles.imageStyle} source={message_Img} />
          {activeTab === 'Message' ? (
            <Text style={styles.activeTextFooter}>berichten</Text>
          ) : (
            <Text style={styles.TextFooter}>berichten</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}>
          <Image style={styles.imageStyle} source={profile_Img} />
          {activeTab === 'Profile' ? (
            <Text style={styles.activeTextFooter}>profiel</Text>
          ) : (
            <Text style={styles.TextFooter}>profiel</Text>
          )}
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    height: screenHeight * 0.12,
    // width: screenWidth * 1,
    marginBottom: -10,
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    marginRight: -11,
    marginLeft: -11,
  },
  imageContainer: {
    flex: 1,
    // marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 10,
  },
  button: {
    borderRadius: 0,
  },
  TextFooter: {
    fontSize: 10,
    color: '#31455E',
    marginTop: 5,
  },
  activeTextFooter: {
    fontSize: 10,
    color: '#5467FD',
    marginTop: 5,
  },
});
