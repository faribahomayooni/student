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
     componentDidMount(){
      //  this.props.Type(this.props.data[0])
       console.warn("^^^^^^^^^^^^^^",this.props.data)
     }
 
    pressPresent=(items)=>{
        this.setState({type:1})
        this.props.CloseSelectALLeModal(false)
        this.props.Type(items)
      
    }
   

render(){
  return(
    <Modal
        animationType="slide"
        transparent={true}
        transparent={true}
        visible={this.props.IsSelectAll}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{justifyContent:"center",flex:1}}>
          <View style={{backgroundColor:"#F2F3F7",margin:width/5,borderRadius:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
              
              <View>
             <Text style={{fontWeight:"bold"}}>{this.props.Title}</Text>
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
            <View style={{borderWidth:0.5,borderColor:"lighgray",marginTop:5,}}></View>
          {this.props.data.map((items,index)=>{
            // console.warn("this is groupe name",items)
            return(
              <TouchableOpacity  onPress={()=>this.pressPresent(items)} style={[cs.ModalSelectALLItems,{backgroundColor:"#F2F3F7"}]}>
              <View style={{flexDirection:"row",marginTop:width/30,marginLeft:width/20,marginBottom:width/30,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                 <Text style={{marginRight:width/30,width:width/5}}>{items.FLD_GROUP_NAME!==undefined ?items.FLD_GROUP_NAME :items }</Text>
                 {/* <Image source={require('../assets/images/student/presence/save.png')} style={cs.ImaSaveModal} />  */}
              </View>
               
            </TouchableOpacity>

            )
          })  
        }
           
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



