import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View,AsyncStorage} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import DashboardBox from '../components/DashboardBox';
import DashboardTeacherBox  from '../components/DashboardTeacherBox'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type:""
    };
  }
  componentDidMount=async()=>{
    const { params } =this.props.navigation.state;
 var typeuser= await  AsyncStorage.getItem('@typeofsignin')
 this.setState({type:typeuser})
    console.warn("############# type user",this.state.type==="teacher")
  }

  render() {
    return (
      <View style={cs.mainContainer}>
       {this.state.type==="teacher" ? 
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
  };
};
export default connect(mapStateToProps)(Home);
