import React, {Component, useDebugValue} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width,height}=Dimensions.get("window")
class GroupeNoteModal extends Component {
    state={
        IsGroupNote:this.props.IsGroupNote
    }
    
 

render(){
    console.warn("!!!!!!!!!!!!!!! is open Modal",this.state.IsGroupNote)
  return(
    <Modal
    style={{marginTop:width/2}}
    animationType="slide"
    transparent={true}
    visible={this.props.IsGroupNote}
    // onRequestClose={() => {
    //   Alert.alert("Modal has been closed.");
    // }}
   
   >
    
 <View style={[styles.centeredView]}>
 
  <View style={{padding:0},[styles.modalView]}>
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      
      <View>
         <Text style={{fontWeight:"bold"}}>Groepsbericht</Text>
      </View>
      <TouchableOpacity style={{width:15,height:15,borderRadius:20,backgroundColor:"red",alignItems:"center",justifyContent:"center"}} onPress={()=>this.props.CloseGroupeNoteModal(false)}>
          <Icon name="close" color="white"/>
      </TouchableOpacity>
   
    </View>
    <View style={{borderWidth:0.5,borderColor:"lighgray",marginTop:5}}></View>
   { this.props.GroupeNote!==""?  <Text>{this.props.GroupeNote}</Text>:<Text style={{alignSelf:"center",color:"gray",marginTop:10}}>Er is geen bericht om weer te geven</Text>}
    
  </View>
</View>
</Modal >)}
}


const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:width-width/10,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop:10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  });
  
export default GroupeNoteModal