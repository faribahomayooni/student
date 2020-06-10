/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, useDebugValue} from 'react';
import {connect} from 'react-redux';
import COLORS from '../../src/styles/variables';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
// import {commonStyle as cs} from '../../styles/common/styles';
// import {Button} from './../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { withNavigationFocus } from 'react-navigation';
import {commonStyle as cs} from '../styles/common/styles';
import Form from '../../native-base-theme/components/Form';

const {width, height} = Dimensions.get('window');
class PresenceCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
  }

  }
 
 

  render() {
   console.warn("student groups@@@@%%%%",this.props.loadStudentGroup)
    const {loadMonthAttendance} = this.props;
   
    return (

               <TouchableOpacity onPress={this.props.onPress} style={{marginTop:this.props.marginTop,alignSelf:"center",width:this.props.width,backgroundColor:this.props.color,padding:this.props.padding || 7,borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                  <View style={{flexDirection:"row"}}>
                        {this.props.rightIcon &&    <Icon
                            name="cog"
                            color="white"
                            size={15}
                            style={{}}
                            />}
                            <Text style={{color:"white",fontSize:15,marginLeft:5,marginRight:5}}>{this.props.NAME}</Text>
                            {this.props.leftIcon &&    <View style={[cs.nextIconWrapper,{left:"60%"}]}>
                                                            <Icon
                                                              name="chevron-right"
                                                              color="white"
                                                              size={12}
                                                              style={{marginLeft: 8, marginTop: 5}}
                                                            />
                                                            
         
                                </View>}
                  </View>
              </TouchableOpacity>

    );
   
  }
}

const styles = StyleSheet.create({
  overlay: {},
});

const mapStateToProps = state => {
  return {
  
  };
};


export default    (PresenceCalendar);
