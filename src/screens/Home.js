import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View,AsyncStorage,BackHandler,Alert} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import DashboardBox from '../components/DashboardBox';
import {withNavigationFocus} from 'react-navigation'
import DashboardTeacherBox  from '../components/DashboardTeacherBox'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type:""
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  
  componentWillUpdate=async(prevProps)=> {
    console.warn("focuuuuuuuuuuuuuuuuuuus",prevProps.isFocused,this.props.isFocused)
      if (prevProps.isFocused !== this.props.isFocused) {
        var typeuser= await  AsyncStorage.getItem('@typeofsignin')
        this.setState({type:typeuser})
        
        }
      }

  componentDidMount=async()=>{
    const { params } =this.props.navigation.state;
 var typeuser= await  AsyncStorage.getItem('@typeofsignin')
 this.setState({type:typeuser})
    console.warn("############# type user",this.props.TypeSign)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
 
    //Code to display alert message when use click on android device back button.
    Alert.alert(
      ' Exit From App ',
      ' Do you want to exit From App ?',
      [
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
        { text: 'No', onPress: () => console.log('NO Pressed') }
      ],
      { cancelable: false },
    );
 
    // Return true to enable back button over ride.
    return true;
  }

  render() {
    return (
      <View style={cs.mainContainer}>
       {
        this.state.type==="teacher"? 
        <DashboardTeacherBox navigation={this.props.navigation} />:
        <DashboardBox navigation={this.props.navigation} />
    }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.api.user,
    TypeSign:state.TypeSign
  };
};
export default withNavigationFocus(Home);
