/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, useDebugValue} from 'react';
import {connect} from 'react-redux';
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
import COLORS from '../../../src/styles/variables';
import {commonStyle as cs} from '../../styles/common/styles';
import {Button} from './../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ButtonNT2 from "./../../components/ButtonNT2"
import { withNavigationFocus } from 'react-navigation';

const {width, height} = Dimensions.get('window');
class PresenceCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
  }

  }
  render() {
    return (
      <ScrollView style={{ backgroundColor:'#f2f3f4',padding:20}}>
                <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      alignSelf: 'center',
                    
                    }}>
                        <TouchableOpacity onPress={()=>this.setState({type:3})} style={[this.state.type===3 &&({borderWidth: 3,borderColor:"blue",borderRadius:5}),cs.presenceStatusColor]}>
                        <Text style={cs.presenceColorText}>AANWEZIG</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({type:1})} style={[this.state.type===1 &&({borderWidth:3,borderColor:"blue",borderRadius:5}),cs.lateStatusColor]}>
                        <Text style={cs.presenceColorText}>TE LAAT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({type:2})} style={[this.state.type===2 &&({borderWidth:3,borderColor:"blue",borderRadius: 5}),cs.absentStatusColor]}>
                        <Text style={cs.presenceColorText}>AFWEZIG</Text>
                        </TouchableOpacity>
              </View>
              <View style={{backgroundColor:"white",backgroundColor:"white",borderRadius:10,marginTop:20,padding:10}}>
                       <Text style={{fontSize:15,fontWeight:"bold",alignSelf:"center"}}>SAMENVATTING</Text>   
                       <Text style={{marginTop:"5%",alignSelf:"center"}}>Al uw groepen samen. Bekijk de totalenvan 
                       de groepen samen.</Text>  
                <ButtonNT2  NAME={"Bekijk Studenten"}  rightIcon={true} width={"50%"} color={COLORS.primaryButtonColor}/>
                <ButtonNT2  NAME={"Bekijk Verzuim"}  rightIcon={true} width={"50%"} color={COLORS.primaryButtonColor}/>
                <ButtonNT2  NAME={"Bekijk Aanwezigheid"}  rightIcon={true} width={"50%"} color={COLORS.primaryButtonColor}/>
                <ButtonNT2  NAME={"Bekijk Groepnotities"}  rightIcon={true} width={"50%"} color={COLORS.primaryButtonColor}/>
                <ButtonNT2  NAME={"Bekijk aantal uren"} rightIcon={true} width={"50%"} color={COLORS.primaryButtonColor}/>
                <ButtonNT2  NAME={"Individuele groepen"} leftIcon={true} width={"80%"} color={"#1EA1DC"}/>
                
                
              </View>
              
      </ScrollView>
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
