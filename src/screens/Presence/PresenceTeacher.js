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
  TouchableHighlight,
  AsyncStorage,
  ToastAndroid,
  Picker,
  Image
  ,Modal,
  TextInput
} from 'react-native';
import moment from 'moment';
import COLORS from '../../../src/styles/variables';
import Progress from './../../components/Progress';
import ActionSheet from 'react-native-actionsheet';
import {commonStyle as cs} from '../../styles/common/styles';
import CalendarsChangable from  './../../components/TeacherCalendar'
import {Button} from './../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiActions} from '../../actions';
import PickerScreen from './../../components/Picker';
import axios from 'axios';
import { withNavigationFocus } from 'react-navigation';

const {width, height} = Dimensions.get('window');
class PresenceCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GroupeNote:"",
      IsGroupNote:false,
      group: 0,
      count: 0,
      changedata:[],
      selected: '',
      datepress:"",
      groupName: '',
      groupId: '',
      groupname: '',
      type:0,
      id:"",
      change:false,
      dateserver:"",
      teacherName:"",
      studentName:"",
      groupStudent:[],
      modify:true,
      teacherlastname:"",
      teacherInfo:null,
      changeid:"",
      comment:"",
      targetName:'',
      loadStudent:[],
      date:"",
      IsOpenNote:false,
      editpage:false,
      month:  parseInt(
        '2018-03-01'.substring(5, 7),
       10,
     ),
      date: {
        year: 2018,
        month: 4,
        day: 1,
        timestamp: 1519862400000,
        dateString: '2018-04-01',
      },
    };
    this.getMonthFunction = this.getMonthFunction.bind(this);
    this.actionSheet = null;
  }
  getMonthFunction = month => {
    this.setState({
      date: month,
    });
  }


  showActionSheet = () => {
    this.ActionSheet.show();
  };
  
  changegroup=(mode)=>{
    setTimeout(()=>{this.setState({modify: false})},1000);
  }

  getGroupFunction= (newGroup)=> {
  this.setState({id:""})
   this.setState({group: this.state.group + 1});
   this.setState({change:true})
   if(this.state.id!==newGroup.FLD_FK_GROUP){
     this.setState({id:newGroup.FLD_PK_GROUP })  
     this.setState({count:this.state.count+1})
 
   }
   this.setState({
     groupName: newGroup.FLD_GROUP_NAME,
     groupId: newGroup.FLD_PK_GROUP,
   });

   this.passGroupdata(newGroup.FLD_FK_GROUP,this.state.month)
 
 }
 

 passGroupdata=(groupId,month)=>{
   
}

  async componentDidMount() {
    this.groupStudent(-1)
   this.loadTeacherInfo()
  }




  savedate=async(studentData)=>{
    this.setState({datepress:studentData})
    console.warn("!!!!!!!!!!!!!!",studentData)
    axios
  .post(
    global.url + 'api/school/loadGroupStudents',
    {
      groupId:this.state.groupId,
      date:studentData!==undefined ? studentData : ` ${moment().year()}/${moment().month()}/1`
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('@token'),
      },
    },
  )
  .then((res )=> {
    if (res.data.msg === 'success') {
      console.warn("@@@@@@@@@@@@@@@@@@ res for load student",res.data.data)
      this.setState({loadStudent:res.data.data})
        this.anotherFunc();
    }
  })
  .catch(error => {
  
  });

  
  
  }


  SaveBtn=async()=>{
    this.setState({editpage:false})
    for(var i=0;i<this.state.changedata.length;i++){
      var info=this.state.changedata[i]
        axios
        .post(
          global.url + 'api/student/saveAttendance',
          {
            id: this.state.changedata[i].FLD_PK_STUDENT_ATTENDANCE,
            isPresent:this.state.changedata[i].FLD_ISPRESENT,
            isLate:this.state.changedata[i].FLD_IS_LATE
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': await AsyncStorage.getItem('@token'),
            },
          },
        )
        .then(res => {
         
          if (res.data.msg === 'success') {
            ToastAndroid.show(
              'Twoje zmiany zostały pomyślnie zarejestrowane',
              ToastAndroid.SHORT,
            );
      
          }
        })
        .catch(error => {
       
        });
      }
  }


  loadTeacherInfo = async () => {
    axios
      .get(global.url + 'api/teacher/loadInfo', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        console.warn("===============name@@@@@@@@@@@@@@@@@",res.data)
        this.setState({teacherInfo: res.data});
        // console.warn('===>res when call twice for component', res);
        if (res.data.msg === 'success') {
        }
        if (res.data.msg === 'fail') {
          // console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        console.warn('error', error);
      });
  };
  
  activeEditPage=(status)=>{
    // console.warn("++++++++++++++",status)
    this.setState({editpage:status})

  }

  groupStudent=async(teacherId )=> {  
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.warn("current date",utc)
      axios
        .post(
          global.url + 'api/teacher/loadGroupsByDate',
          {
            teacherId :-1 ,
            date:'2020/06/01'
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
            console.warn("grouppppppppppppppppppp",res.data)
        this.setState({groupStudent:res.data.data})
        this.getGroupFunction(res.data.data[0])
            // this.setState({id:res.data.data[0].FLD_FK_GROUP})
            
          }
        })
        .catch(error => {
          console.warn(error);
        });
  
      
    
  }
  componentWillUpdate(prevProps) {
    // this.setState({loadStudent:[]})
    
   console.warn("focuuuuuuuuuuuuuuuuuuus",prevProps.isFocused, this.props.isFocused)
    if (prevProps.isFocused !== this.props.isFocused) {
      this.savedate()
      // this.savedate()
    
      this.loadTeacherInfo()
      this.groupStudent(-1)
      
      }
    }

    OpenNoteModal=(comment)=>{
      console.warn("@@@@@@@@@@@****",comment!==null)
      this.setState({comment:comment.Fld_Comment}),this.setState({IsOpenNote:true})
    
      

    }


    groupeNoteOpen=async()=>{
      console.warn("###############",this.state.datepress)
      this.setState({IsGroupNote:true})
      axios
      .post(
        global.url + 'api/school/loadGroupNote',
        {
          groupId :this.state.groupId ,
          date:this.state.datepress
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
          console.warn("note group",res.data)
          this.setState({groupNote:res.data.data})
    
          
        }
      })
      .catch(error => {
        console.warn(error);
      });

    }

  render() {
   console.warn("student groups@@@@%%%%",this.props.loadStudentGroup)
    const {loadMonthAttendance} = this.props;
   
    return (
      <ScrollView>   
            <Modal
            style={{marginTop:width/2}}
            animationType="slide"
            transparent={true}
            visible={this.state.IsOpenNote}
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
              <TouchableOpacity style={{width:15,height:15,borderRadius:20,backgroundColor:"red",alignItems:"center",justifyContent:"center"}} onPress={()=>this.setState({IsOpenNote:false})}>
                  <Icon name="close" color="white"/>
              </TouchableOpacity>
           
            </View>
            <View style={{borderWidth:0.5,borderColor:"lighgray",marginTop:5}}></View>
              <Text style={{marginTop:5}}>Opmerking</Text>
                <TextInput
                 numberOfLines={10}
                 multiline={true}
                    style={{padding:10, borderColor: 'lightgray', borderWidth: 1 ,marginTop:10,height:width/2, justifyContent: "flex-start"}}
                    onChangeText={text => this.setState({comment:text})}
                    value={this.state.comment}
                  />
                  <View style={{flexDirection:"row",marginTop:5}}>
                        <TouchableOpacity  onPress={()=>this.setState({IsOpenNote:false})} style={{backgroundColor:"red",borderRadius:5,padding:5,marginRight:5}}>
                            <Text style={{color:"white"}}>sluiten</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"green",borderRadius:5,padding:5}}>
                            <Text  style={{color:"white"}}>Bevestiging</Text>
                        </TouchableOpacity>
                  </View>
          </View>
        </View>
      </Modal >
      <Modal
            style={{marginTop:width/2}}
            animationType="slide"
            transparent={true}
            visible={this.state.IsGroupNote}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
           >
            
         <View style={[styles.centeredView]}>
         
          <View style={{padding:0},[styles.modalView]}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              
              <View>
                 <Text style={{fontWeight:"bold"}}>Groepsbericht</Text>
              </View>
              <TouchableOpacity style={{width:15,height:15,borderRadius:20,backgroundColor:"red",alignItems:"center",justifyContent:"center"}} onPress={()=>this.setState({IsGroupNote:false})}>
                  <Icon name="close" color="white"/>
              </TouchableOpacity>
           
            </View>
            <View style={{borderWidth:0.5,borderColor:"lighgray",marginTop:5}}></View>
           { this.state.GroupeNote!==""?  <Text>{this.state.GroupeNote}</Text>:<Text style={{alignSelf:"center",color:"gray",marginTop:10}}>Er is geen bericht om weer te geven</Text>}
            
          </View>
        </View>
      </Modal >
        <View
        pointerEvents={(this.state.modify===true) ? 'none':null}
         style={{
            ...(   this.state.modify===true  &&  {
             
              zIndex: 2,
              width: width,
              height: height,
              backgroundColor: 'lightgray',
              opacity: 0.5,
            }),
          }}>
          <View style={cs.mainContainer}>
            <View>  
            {/* <View
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
          </View> */}
         
             <Text style={{fontWeight:"bold",fontSize:20,alignSelf:"center",marginTop:15}}>Vrijdag, 4 oktober 2019</Text>
             <View style={cs.calendarsWrapper}>
                <View style={{width: '100%'}}>    
                  <CalendarsChangable
                    navigation={this.props.navigation}
                    group={this.state.group}
                    type={this.state.type}
                    groupId={this.state.groupId}
                    change={this.state.change}
                    count={this.state.count}
                    month={this.state.month}
                    savedate={this.savedate}
                    changegroup={this.changegroup}
                    getMonth={this.getMonthFunction}
                    edit={this.state.editpage}
                    changeid={this.state.changeid}
                    groupdata={this.passGroupdata()}
                    activeEditPage={(status)=>this.activeEditPage(status)}
                  />
                 
                  
                </View>
                {/* </TouchableOpacity> */}
              </View>
            
              <View
                style={{
                  marginBottom: 20,
                  width: '100%',
                }}>
                
                <View
                  style={{
                    marginTop: 5,
                    marginLeft: 12,
                    marginRight: 12,
                  
                  }}>
                  <Text
                    style={{
                      marginTop:10,
                      fontSize: 16,
                      fontStyle: 'italic',
                    }}>
                   Aanwezigheid voor
                  </Text>
                </View>

                <View
               >
                  
                </View>
              </View>
              
             <View style={[cs.pickerContainerTeacher]}>
                <Picker
                  placeholder="Selecteer type kosten"
                  style={{backgroundColor:"transparent",}}
                  // mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={this.props.groupId}
                  onValueChange={(e)=>this.getGroupFunction(e)}
                  placeholderStyle={{ color: 'none' }}
                  itemStyle={{backgroundColor:"blue"}}>
                    
                  {this.state.groupStudent
                    ? this.state.groupStudent.map(item => {
                        return (
                          <Item
                            color="#fff"
                            backgroundColor="none"
                            label={item.FLD_GROUP_NAME}
                            value={item}
                          />
                        );
                      })
                    : ''}
                </Picker>
                <View style={cs.dropDownBtn}>
                  <Icon
                    name="chevron-down"
                    color="white"
                    size={12}
                    style={{marginLeft: 5, marginTop: 5}}
                  />
                </View>
             </View>
            {this.state.loadStudent.length!==0 && <View style={{flexDirection:"row",justifyContent:"center",marginBottom:width/13}}>
                  <TouchableOpacity style={cs.pickerMe}> 
                     <Text style={{marginTop:2,marginRight:20}}>Markeer iedereen als</Text>
                     <View style={{borderRadius:20,width:20,height:20,backgroundColor:"gray",alignItems:"center",justifyContent:"center"}} >
                      <Icon
                        name="chevron-down"
                        color="white"
                        size={10}
                        style={{}}
                      />
                     </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.groupeNoteOpen()} style={cs.groupNote}>
                     <Image source={require('../../assets/images/student/presence/notepad.png')} style={{width:"15%",height:30,resizeMode:"contain",tintColor:"white"}} />
                     <Text style={{color:"white"}}>Groeps notitie</Text>
                </TouchableOpacity>
                
             </View>}
            {this.state.loadStudent.map((item,index)=>{
              console.warn(item)
              return(
                <View key={index} style={{flexDirection:"row",marginTop:10,justifyContent:"center"}}>
                  <TouchableOpacity onPress={()=>this.OpenNoteModal(item)}>
                      <Image source={require('../../assets/images/student/presence/notebook.png')} style={{width:20,height:20,resizeMode:"contain",marginTop:5}} />
                 </TouchableOpacity>
                {/* <Text style={{marginTop:0}}>{item.FLD_DATE}</Text> */}
                <Text style={{marginTop:0,fontSize:15,marginRight:0,width:"25%",marginTop:5}}>{item.StudentFullName}</Text>
                    <View
                          style={{
                            flexDirection: 'row',
                            // marginTop: 20,
                            alignSelf: 'center',
                        
                          }}>
                          <TouchableOpacity onPress={()=>this.setState({type:3})} style={[item.FLD_ISPRESENT===1 || this.state.type===3 ?(cs.presenceStatusColor):{padding:7,borderRadius:5,backgroundColor:"white",alignItems:"center",borderWidth:0.5,marginRight:10,paddingRight:17,paddingLeft:17}]}>
                            <Text style={[cs.presenceColorText],item.FLD_IS_LATE===1 || this.state.type===1 &&{ color:"black",fontSize:20}}>Aanw</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.setState({type:1})} style={[item.FLD_IS_LATE===1 || this.state.type===1 ? (cs.lateStatusColor):{padding:7,borderRadius:5,backgroundColor:"white",borderWidth:0.5,marginRight:10,paddingRight:17,paddingLeft:17}]}>
                            <Text style={[cs.presenceColorText],item.FLD_IS_LATE===1 || this.state.type===1 &&{ color:"black",fontSize:20}}>Laat</Text>
                          </TouchableOpacity>
                          {console.warn("!!!!!!!!!",item.FLD_ISPRESENT===null)}
                          <TouchableOpacity onPress={()=>this.setState({type:2})} style={[item.FLD_ISPRESENT!==null || this.state.type===2 ?(cs.absentStatusColor):{padding:7,borderRadius:5,backgroundColor:"white",borderWidth:0.5,marginRight:5,paddingRight:17,paddingLeft:17}]}>
                            <Text style={[cs.presenceColorText],item.FLD_ISPRESENT!==null || this.state.type===2 &&{ color:"black",fontSize:20} }>Afw</Text>
                          </TouchableOpacity>
                </View>
                
                {/* <Button style={{marginTop:0}}>status</Button> */}
              </View>
              )
            }) }
              
              <View
                 style={{
                   marginTop:10,
                   flex: 1,
                   backgroundColor: 'rgba(238,196,97,0.57)',
                   marginLeft: 12,
                   marginRight: 12,
                   padding: 5,
                   borderColor: '#C99400',
                   borderWidth: 2,
                   borderRadius: 8,
                 }}>
                 <Text
                   style={{
                     color: '#31455E',
                     fontSize: 12,
                     fontStyle: 'italic',
                   }}>
                   LET OP: De aanwezigheid voor vandaag is nog niet 'bewaard'
                 </Text>
               </View>
               <View
                 style={{
                   width: '100%',
                   marginBottom: 20,
                 }}>
                 <TouchableOpacity style={cs.btnstyle}>
                   <View style={{flexDirection:"row",justifyContent:"center"}}>
                     <Image source={require('../../assets/images/student/presence/save.png')} style={{width:width/20,height:width/20,marginRight:width/30}} /> 
                     <Text style={{color:"white",fontWeight:"bold",fontSize:width/25}}>BEWAREN</Text> 
                     <View style={[cs.nextIconWrapper,{backgroundColor :"#B426B5"}]}>
                      <Icon
                        name="chevron-right"
                        color="white"
                        size={12}
                        style={{marginLeft: 8, marginTop: 5}}
                      />
                    </View>   
                   </View>          
                 </TouchableOpacity>
                   
               </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
   
  }
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
  overlay: {},
});

const mapStateToProps = state => {
  return {
    // loadStudentGroup: state.api.loadStudentGroup,
      // loadMonthAttendance: state.api.loadMonthAttendance,
  };
};


export default   withNavigationFocus (PresenceCalendar);
