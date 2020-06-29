import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image,TouchableOpacity,Alert,ScrollView, Dimensions,AsyncStorage} from 'react-native';
import {commonStyle as cs} from '../styles/common/styles';
import {connect} from 'react-redux';



const {width,height}=Dimensions.get("window")
 class SendTeacherMessage extends React.Component {
  state={
     

  }
  componentDidMount(){
   
  }

 componentWillReceiveProps(){
  
 }

  componentWillUpdate(prevProps) {
    
       }

  render() {
    return (
      <ScrollView>       
      <View>  
      <View>
          <View>
               <Text style={cs.noMessageTitle}>Geen berichten</Text>
            </View>
      </View>    
  </View>
  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
 
})

const mapStateToProps = state => {
 return { loadBasicList: state.api.loadBasic,
         notification:state.notification,
         TypeSign:state.TypeSign
        }
};



 export default  connect(mapStateToProps)(SendTeacherMessage) ;
