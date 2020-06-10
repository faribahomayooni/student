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
  ToastAndroid,
  Picker,
  Switch
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DateTimePicker from './../../components/DatePicker';
import Modal from 'react-native-modal';
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
      selectdata:"",
      basicListData:[],
      selected:"",
      showAllGroup:false,
      isModalVisible:false,
      date:"",
      isEnabled:true
  }
  this.actionSheet = null;
}

componentDidMount(){
     this.getGroupList()
}

componentWillUpdate(prevProps) {
   if (prevProps.isFocused !== this.props.isFocused) {  
     }
   }


  getGroupList=async()=>{
    axios
      .post(
        global.url + 'api/admin/loadBasicList',
        {
          id:30,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(async(res) => {
        if (res.data.msg === 'success') {
          this.setState({basicListData:res.data.data})
          this.props.getGroupStudent(res.data)    
        }
      })
      .catch(error => {
        console.log(error);
      }); 
}


showActionSheet = () => {
  this.ActionSheet.show();
};

AllgroupPress=()=>{
     this.setState({showAllGroup:true})
     this.setState({isModalVisible:true})
}

toggleSwitch=()=>{
  this.setState({isEnabled:!(this.state.isEnabled)})
  
}
 
  render() {   
    const Item = Picker.Item;
    const getDateFunction = newDate => {
      this.setState({date:newDate})
    };
    const changeDateFormat = selectDate => {
      // console.warn('date', selectDate.split('-').join('/'));
      return selectDate.split('-').join('/');
    };
    
    return (
      <ScrollView style={{ padding:20}}>
                <Modal
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  style={[cs.modalCamera,{backgroundColor:"white",padding:10}]}
                  isVisible={this.state.isModalVisible}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                     <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})}>
                      <View style={[cs.iconClose,{alignItems:"center",justifyContent:"center",backgroundColor:"red"}]}>
                        <Icon
                        name="close"
                          color="white"
                          size={14}
                        />
                      </View>
                      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})}>
                      <View style={[cs.iconClose,{alignItems:"center",justifyContent:"center",backgroundColor:"green"}]}>
                        <Icon
                        name="check"
                          color="white"
                          size={14}
                        />
                      </View>
                      
                    </TouchableOpacity>
                    </View>
                  <View style={{flex: 1}}>
                    {/* <View style={{flexDirection:"row"}}> */}
                   
                    {/* <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})}>
                      <View style={[cs.iconModalClose,{alignItems:"center",justifyContent:"center",backgroundColor:"blue"}]}>
                        <Icon
                        name="close"
                          color="white"
                          size={14}
                        />
                      </View>
                      
                    </TouchableOpacity> */}
                    {/* </View> */}
                    <Text style={[cs.modalCameraTitle,{color:"black",marginTop:0}]}>Bekijk Studenten</Text>
                    <Text style={[cs.modalCameraTitle,{fontWeight:"normal",color:"black",fontSize:width/28,marginTop:0}]}>Alle uw studenten in één overzicht</Text>
                    <Text style={{marginLeft:"8%",marginTop:"5%"}}>Select Date Range</Text>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                 
                       <DateTimePicker getDate={getDateFunction} style={cs.datePicker} textStyle={{fontSize:15,color:"gray",justifyContent:"center",alignSelf:"center",marginBottom:width*0.03}}/>
                       <Text>></Text>
                       <DateTimePicker getDate={getDateFunction} style={cs.datePicker} textStyle={{fontSize:15,color:"gray",justifyContent:"center",alignSelf:"center",marginBottom:width*0.03}}/>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginTop:10}}>
                       <Text>Data samenvatten?</Text>
                       <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.isEnabled ? "blue" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>this.toggleSwitch()}
                                value={this.state.isEnabled}
                              />
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginTop:10}}>
                       <Text>Voeg % toe?</Text>
                       <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.isEnabled ? "blue" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>this.toggleSwitch()}
                                value={this.state.isEnabled}
                              />
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around",marginTop:10}}>
                       <Text>Klasnotities toevoegen?</Text>
                       <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.isEnabled ? "blue" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>this.toggleSwitch()}
                                value={this.state.isEnabled}
                              />
                    </View>
                  </View>
               
                </Modal>
                <View
                    style={{
                      flexDirection: 'row',
                      marginTop:"2%",
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
              <View style={{backgroundColor:"white",backgroundColor:"white",borderRadius:10,marginTop:10,padding:10,alignItems:"center"}}>
                            <Text style={{fontSize:15,fontWeight:"bold"}}>SAMENVATTING</Text>   
                            {this.state.showAllGroup==false ? <Text style={{marginTop:"5%",marginLeft:"10%",marginRight:"10%"}}>Al uw groepen samen. Bekijk de totalenvan 
                            de groepen samen.</Text>:
                       <View style={{marginTop:"5%",marginLeft:"10%",marginRight:"10%"}}>
                          <Text>Bekijk de volgende informatie 
                          </Text>
                          <Text>Voor <Text  style={[cs.colorProfileInfo,{marginTop:"2%",marginLeft:"10%",marginRight:"10%"}]}> {this.state.selectdata.title}</Text></Text>
                      </View>
                         }
                      <ButtonNT2 marginTop={"3%"} NAME={"Bekijk Studenten"}      rightIcon={true} width={"60%"}  color={COLORS.primaryButtonColor} />
                      <ButtonNT2 marginTop={"3%"} NAME={"Bekijk Verzuim"}        rightIcon={true} width={"60%"}  color={COLORS.primaryButtonColor}/>
                      <ButtonNT2 marginTop={"3%"} NAME={"Bekijk Aanwezigheid"}   rightIcon={true} width={"60%"}  color={COLORS.primaryButtonColor}/>
                      <ButtonNT2 marginTop={"3%"} NAME={"Bekijk Groepnotities"}  rightIcon={true} width={"60%"}  color={COLORS.primaryButtonColor}/>
                      <ButtonNT2 marginTop={"3%"} NAME={"Bekijk aantal uren"}    rightIcon={true} width={"60%"}  color={COLORS.primaryButtonColor}/>
                      {this.state.showAllGroup && <View style={[cs.selectionWrapp,{marginTop:"5%",width:"90%",backgroundColor:"#eeeeee",alignItems:"center",justifyContent:"center",fontSize:10}]}>
                      <Picker
                            selectedValue={this.state.selected}
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: width*0.70,borderRadius:10,backgroundColor:"transparent" }}
                            itemStyle={{backgroundColor: 'yellow'}}
                            itemTextStyle={{backgroundColor:"pink"}}
                            onValueChange={(itemValue, itemIndex) => {this.setState({selected:itemValue})
                                this.state.basicListData.filter(obj=>obj.code===itemValue && this.setState({selectdata:obj}))
                          }}
                          > 
                      { this.state.basicListData.map(item => { 
                        return (   
                          <Item color="#fff" label={item.title} value={item.code} onClick={(e)=>console.warn("sdfhsdkjfsdkjfsd",e)}/>
                        );
                      })
                      }
                     </Picker>
                    <View style={[cs.dropDownBtn,{left:width*0.65,backgroundColor:"gray"}]}>
                        <Icon
                          name="chevron-down"
                          color="white"
                          size={12}
                          style={{marginLeft: 4, marginTop: 5}}
                        />
                      </View>
                  </View>}   
                <ButtonNT2 onPress={()=>this.AllgroupPress()} NAME={this.state.showAllGroup ?"Individuele groepen":"Alle groepe"}   leftIcon={true} width={"90%"}   color={"#1EA1DC"} padding={17} marginTop={5} /> 
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
  TypeSign:state.TypeSign
  };
};


export default withNavigationFocus   (PresenceCalendar);
