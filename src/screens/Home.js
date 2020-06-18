import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View,AsyncStorage,BackHandler,Alert,ActivityIndicator, Dimensions,Text} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import DashboardBox from '../components/DashboardBox';
import axios from 'axios';
import {withNavigationFocus} from 'react-navigation'
import SavedTeacherDashboard from '../components/SavedTeacherDashboard'
import DashboardTeacherBox  from '../components/DashboardTeacherBox'


const {width,height}=Dimensions.get("window")
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type:"",
      dashboardStatus:[],
      showHome:true
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
        this.loadDashboard()
        
        }
      }


  componentWillReceiveProps(){
  this.loadDashboard()
  }


  componentDidMount=async()=>{
    this.loadDashboard()
    const { params } =this.props.navigation.state;
 var typeuser= await  AsyncStorage.getItem('@typeofsignin')
 this.setState({type:typeuser})
    // console.warn("############# type user",this.props.TypeSign)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }


  loadDashboard = async () => {
    axios
      .get(global.url + 'api/teacher/loadDashboard', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        // console.warn("=====>res in load Dashboard",res.data)
        this.setState({showHome:false})
      
        if (res.data.msg === 'success') {
          this.setState({dashboardStatus:res.data.data})
        }
        if (res.data.msg === 'fail') {
          
          return;
        }
      })
      .catch(error => {
        console.warn('error', error);
      });
  };
  
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
    // console.warn("state of dashboardstatus",this.state.dashboardStatus)
    return (
      <View style={cs.mainContainer}>
       {this.state.showHome ?
       <View style={{alignItems:"center",justifyContent:"center",marginTop:width/2}}>
       <ActivityIndicator/>
         <Text>wacht alsjeblieft</Text>
      </View>:
        this.state.type==="teacher"? 
          (this.state.dashboardStatus.length!==0 ?
          (<SavedTeacherDashboard  status={this.state.dashboardStatus} navigation={this.props.navigation}/>):
          ( <DashboardTeacherBox navigation={this.props.navigation} />)):
       
          ( <DashboardBox navigation={this.props.navigation} />)
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
