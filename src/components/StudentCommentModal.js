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
        IsOpenNote:this.props.IsOpenNote,
        StudentComment:""
    }
  
    SaveComment=()=>{
      const {StudentComment}=this.state
      this.props.getComment(StudentComment)
      this.props.CloseStudentModal(false)
    }

render(){
   const {loadStudent,index}=this.props
  //  console.warn("!!!!!!!!!!!!!!! comments in student",loadStudent.Fld_Comment)
  return(
 <Modal
   style={{marginTop:width/2}}
   animationType="slide"
   transparent={true}
   visible={this.props.IsOpenNote }
   onRequestClose={() => {
     Alert.alert("Modal has been closed.");
   }}
  >
   
<View style={[styles.centeredView]}>
 <View style={{padding:0},[styles.modalView]}>
   <View style={{flexDirection:"row",justifyContent:"space-between"}}> 
        <View>
            <Text style={{fontWeight:"bold"}}>Voeg aantekeningen toe</Text>
        </View>
        <TouchableOpacity style={{width:15,height:15,borderRadius:20,backgroundColor:"red",alignItems:"center",justifyContent:"center"}} onPress={()=>this.props.CloseStudentModal(false)}>
            <Icon name="close" color="white"/>
        </TouchableOpacity>
   </View>
   <View style={{borderWidth:0.5,borderColor:"lighgray",marginTop:5}}></View>
     <Text style={{marginTop:5}}>Opmerking</Text>
       <TextInput
        numberOfLines={10}
        multiline={true}
           style={{padding:10, borderColor: 'lightgray', borderWidth: 1 ,marginTop:10,height:width/2, justifyContent: "flex-start"}}
           onChangeText={text => this.setState({StudentComment:text})}
        value={loadStudent!==undefined && loadStudent.Fld_Comment}
         />
         <View style={{flexDirection:"row",marginTop:5}}>
               <TouchableOpacity  onPress={()=> this.props.CloseStudentModal(false)} style={{backgroundColor:"red",borderRadius:5,padding:5,marginRight:5}}>
                   <Text style={{color:"white"}}>sluiten</Text>
               </TouchableOpacity>
               <TouchableOpacity  onPress={()=>this.SaveComment()} style={{backgroundColor:"green",borderRadius:5,padding:5}}>
                   <Text  style={{color:"white"}}>Bevestiging</Text>
               </TouchableOpacity>
         </View>
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