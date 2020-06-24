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
        IsSelectAll:this.props.IsSelectAll,
        type:0,
    }
 

    pressPresent=()=>{
        this.setState({type:1})
        this.props.CloseSelectALLeModal(false)
        this.props.Type("Aanwezig")
        // setInterval(() => {
        //     this.props.CloseSelectALLeModal(false)
        //    }, 200)
       
    }
    pressAbsent=()=>{
        this.setState({type:2})
        this.props.CloseSelectALLeModal(false)
        this.props.Type("Afwezig")
        // setInterval(() => {
        //     this.props.CloseSelectALLeModal(false)
        //    }, 200)
    }
    pressLate=()=>{
        this.setState({type:3})
        this.props.CloseSelectALLeModal(false)
        this.props.Type("Laat")
        // setInterval(() => {
        //     this.props.CloseSelectALLeModal(false)
        //    }, 200)
    }

render(){
    console.warn("!!!!!!!!!!!!!!! is open Modal",this.state.IsSelectAll)
  return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.IsSelectAll}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{justifyContent:"center",flex:1}}>
          <View style={{backgroundColor:"white",margin:width/5,borderRadius:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
              
              <View>
                 <Text style={{fontWeight:"bold"}}>Groepsbericht</Text>
              </View>
              <TouchableOpacity onPress={()=>this.props.CloseSelectALLeModal(false)} style={cs.IconModal} >
                      <Icon
                        name="chevron-down"
                        color="white"
                        size={10}
                        style={{}}
                      />
              </TouchableOpacity>
           
            </View>
            <View style={{borderWidth:0.5,borderColor:"lighgray",marginTop:5}}></View>
            <TouchableOpacity  onPress={()=>this.pressPresent()} style={[cs.ModalSelectALLItems,{backgroundColor:this.state.type===1 ? "#78CD51":"white"}]}>
              <View style={{flexDirection:"row",marginTop:width/30,marginLeft:width/20,marginBottom:width/30}}>
                 <Text style={{marginRight:width/30,width:width/5}}>Aanwezig</Text>
                 <Image source={require('../assets/images/student/presence/save.png')} style={cs.ImaSaveModal} /> 
              </View>
               
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.pressAbsent()} style={[cs.ModalSelectALLItems,{backgroundColor:this.state.type===2 ? "#78CD51":"white"}]}>
              <View style={{flexDirection:"row",marginTop:width/30,marginLeft:width/20,marginBottom:width/30}}>
                 <Text style={{marginRight:width/30,width:width/5}}>Afwezig</Text>
                 <Image source={require('../assets/images/student/presence/save.png')} style={cs.ImaSaveModal} /> 
              </View>
               
            </TouchableOpacity>
            {/* <View style={{backgroundColor:this.state.type===3? "#78CD51":"white",marginLeft:width/20}}> */}
            <TouchableOpacity onPress={()=>this.pressLate()} style={[cs.ModalSelectALLItems,{backgroundColor:this.state.type===3 ? "#78CD51":"white"}]}>
              <View style={{flexDirection:"row",marginTop:width/30,marginLeft:width/20,marginBottom:width/30,}}>
                 <Text style={{marginRight:width/30,width:width/5}}>Laat</Text>
                 <Image source={require('../assets/images/student/presence/save.png')} style={cs.ImaSaveModal} /> 
              </View>
               
            </TouchableOpacity>
      
            {/* </View> */}
        </View>
        </View>
      </Modal>)}
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



