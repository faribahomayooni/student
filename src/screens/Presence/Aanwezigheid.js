/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { withNavigationFocus } from 'react-navigation';
import Presence from './Presence';
import AanwezigheidTeacher from '../Presence/AanwezigheidTeacher'
import PresenceTeacher from './PresenceTeacher';

const {width, height} = Dimensions.get('window');
class Aanwezigheid extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      };
    
  
  }
  

  render() {
   console.warn("**********************TypeSign**********************",this.props.TypeSign)
    const {loadMonthAttendance} = this.props;
   
    return (
     
        <View>
            {this.props.TypeSign==="teacher" ?
            <PresenceTeacher/>:
            <Presence/>
            }
         
        </View>
     
    );
   
  }
}

const styles = StyleSheet.create({
  overlay: {},
});



const mapStateToProps = state => {
    return {
     
      TypeSign:state.TypeSign
    };
  };
  
  const mapDispatchToProps= {
   
   }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Aanwezigheid);

  