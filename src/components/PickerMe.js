


import React, {Component, useDebugValue} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {commonStyle as cs} from '../styles/common/styles';

const {width,height}=Dimensions.get("window")
class GroupeNoteModal extends Component {
    state={
        IsSelectAll:false,
        type:"",
    }
 


render(){
  // var data =  JSON.stringify( this.props.group[0].FLD_GROUP_NAME)
//  console.warn("!!!!!!!!!!!!!!! is open Modal",this.props.group!==undefined && data.FLD_GROUP_NAME)
  return(
   
<View style={{flexDirection:"row",justifyContent:"center",marginBottom:width/13,backgroundColor:"#F2F3F7"}}>
                  <TouchableOpacity   onPress={()=>this.props.OpenModal(true)} style={[cs.pickerMe,{...this.props.style}]}> 
                     <Text style={{marginRight:20,...this.props.TextStyle}}>{this.props.type!=="" ?(this.props.type): (this.props.defaultText)}</Text>
                     <View style={[cs.IconDropdown,{...this.props.styleIcon}]} >
                      <Icon
                        name="chevron-down"
                        color="white"
                        size={10}
                        style={{}}
                      />
                     </View>
                  </TouchableOpacity>     
</View>)}
}


const styles = StyleSheet.create({
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalSelectAllView: {
    margin: 20,
    backgroundColor: "#F2F3F7",
    borderRadius:10,
    padding: 35,
    alignItems: "center",
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







