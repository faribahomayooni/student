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
import PickerMe from '../../components/PickerMe'
import {commonStyle as cs} from '../../styles/common/styles';
import CalendarsChangable from  './../../components/TeacherCalendar'
import {Button} from './../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import StudentCommentModal from '../../components/StudentCommentModal'
import GroupeNoteModal from '../../components/GroupeNoteModal'
import SelectAllModal from '../../components/SelectAllModal'
import axios from 'axios';
import { withNavigationFocus } from 'react-navigation';
import { Value } from 'react-native-reanimated';

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
      dateStudentStatus:[],
      datepress:"",
      groupName: '',
      groupId: '',
      groupname: '',
      type:0,
      id:"",
      data:['Aanwezig','Afwezig','Laat'],
      change:false,
      dateserver:"",
      teacherName:"",
      studentName:"",
      groupStudent:[],
      modify:true,
      teacherlastname:"",
      changeid:"",
      comment:[],
      targetName:'',
      loadStudent:[],
      date:"",
      allDate:[],
      IsOpenNote:false,
      editpage:false,
      presentStatus:[],
      LateStatus:[],
      absentStatus:[],
      IsGroupModal:false,
      type:'',
      IndexComment:'',
      Groupe:"",
      loader:false,
      IsSelectAll:false,
      attendanceId:"",
      statusPress:[],
      index:0,
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

CleangroupId=(value)=>{
  console.warn("valueeeeee of GROUP",value)
  value===true &&  this.setState({groupId:""})
  value===false && this.setState({groupId:this.state.id})
}
 

 passGroupdata=(groupId,month)=>{
   
}

   componentDidMount() {   
    this.groupStudent(-1)
   this.savedate()
   this.setState({presentStatus:[],LateStatus:[],absentStatus:[]})
 
  }




  savedate=async(studentData)=>{  
    this.setState({presentStatus:[],absentStatus:[],LateStatus:[]})
    this.setState({datepress:studentData})
    studentData &&  this.setState({loader:true})
    axios
  .post(
    global.url + 'api/school/loadGroupStudents',
    {
      groupId:this.state.groupId,
      date:studentData  ? studentData :` ${moment().year()}/${moment().month()}/1`
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('@token'),
      },
    },
  )
  .then(async(res )=> {
   
    if (res.data.msg === 'success') {
      // console.warn("eeeeee",res.data.data)
      this.setState({attendanceId:res.data.data.FLD_PK_STUDENT_ATTENDANCE})
      const {presentStatus,LateStatus,absentStatus}= this.state
      await  this.setState({loadStudent:res.data.data})
        for(let i=0;i<this.state.loadStudent.length;i++){
          this.state.comment.push(this.state.loadStudent[i].Fld_Comment)
          // this.setState({comment:this.state.loadStudent[i].Fld_Comment})
          this.state.presentStatus[i]=((this.state.loadStudent[i].FLD_ISPRESENT===true)?true:false)  
          this.setState({presentStatus})         
           this.state.LateStatus[i]=(this.state.loadStudent[i].FLD_IS_LATE===true)?true:false 
           this.setState({LateStatus})     
           this.state.absentStatus[i]=(this.state.loadStudent[i].FLD_ISPRESENT!==true)?true:false
           this.setState({absentStatus})
           this.setState({loader:false})
         }
    }
  })
  .catch(error => {
  
  });

  }


  SaveBtn=async()=>{
    // console.warn(this.state.loadStudent,"lsdjfjsdfjhsdgfhj")
  var comment = this.state.comment
  for (var i=0; i<this.state.loadStudent.length;i++){
    // console.warn("present",this.state.presentStatus[i],"late",this.state.LateStatus[i],"datepress",this.state.datepress,"comment",comment[i])
        axios
        .post(
          global.url + 'api/school/addAttendance',
          {
           attendanceId:this.state.loadStudent[i].FLD_PK_STUDENT_ATTENDANCE,
            isPresent:this.state.presentStatus[i],
            isLate:this.state.LateStatus[i],
            date:this.state.datepress,
            comment:comment[i]

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


 
  
  groupStudent=async(teacherId )=> {  
    // console.warn("log date press for me********",this.state.datepress)
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    //  console.warn("current date",this.state.datepress,"fffff",`${moment().year()}/${moment().month()+1}/1`)
      axios
        .post(
          global.url + 'api/teacher/loadGroupsByDate',
          {
            teacherId :-1 ,
            date:this.state.datepress!=="" ? this.state.datepress:`${moment().year()}/${moment().month()}/1`
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
            // console.warn("grouppppppppppppppppppp",res.data)
        this.setState({groupStudent:res.data.data})
        this.setState({Groupe:res.data.data[0].FLD_GROUP_NAME})
        this.getGroupFunction(res.data.data[0])
            // this.setState({id:res.data.data[0].FLD_FK_GROUP})
            
          }
        })
        .catch(error => {
          // console.warn("%%%%%%%%%this is group for teacher by date",error);
        }); 
  }

  componentWillUpdate(prevProps) {
   
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({statusPress:[]})
      console.warn("status pressssssssssssssss",this.state.statusPress)
    
      this.setState({presentStatus:[],LateStatus:[],absentStatus:[]})
      this.savedate()   
      this.groupStudent(-1)     
      }
    }

    OpenNoteModal=(comment,index)=>{
      // this.state.comment.push(comment.Fld_Comment);
      this.setState({index:index})
      this.setState({itemPress:comment})
     this.setState({IsOpenNote:true})
      this.setState({IndexComment:index})
    }


    groupeNoteOpen=async()=>{
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
          this.setState({groupNote:res.data.data})  
        }
      })
      .catch(error => {
        console.warn(error);
      });

    }
    SelectAllPress=()=>{
         this.setState({IsSelectAll:true})
    }

    presentPress=(index)=>{
      const {presentStatus}=this.state
      this.state.presentStatus[index]=(this.state.presentStatus[index]===true)?false:true
      this.setState({presentStatus})
      const {absentStatus}=this.state
      this.state.absentStatus[index]=(this.state.absentStatus[index]===true)?false:true
      this.setState({absentStatus})
      const {LateStatus}=this.state
      this.state.LateStatus[index]=(this.state.presentStatus[index]===false)?false:this.state.LateStatus[index]
      this.setState({LateStatus})
      console.warn(index, this.state.presentStatus[index])
    }


    latePress=(index)=>{
      const {LateStatus}=this.state
      this.state.LateStatus[index]=(this.state.LateStatus[index]===true)?false:true
      this.setState({LateStatus})
      const {presentStatus}=this.state
      this.state.presentStatus[index]=this.state.LateStatus[index]===true ? true : this.state.presentStatus[index]
      this.setState({presentStatus})
      const {absentStatus}=this.state
      this.state.absentStatus[index]=(this.state.LateStatus[index]===true)?false:(this.state.presentStatus[index]===true) ? false:true
      this.setState({absentStatus})
      console.warn(index, this.state.LateStatus[index])
    }

    absentPress=(index)=>{
      const {absentStatus}=this.state
      this.state.absentStatus[index]=(this.state.absentStatus[index]===true)?false:true
      this.setState({absentStatus})
      const {presentStatus}=this.state
      this.state.presentStatus[index]=(this.state.presentStatus[index]===true)?false:true
      this.setState({presentStatus})
      //  this.setState({presentStatus})
      const {LateStatus}=this.state
      this.state.LateStatus[index]=(this.state.absentStatus[index]===true)?false:true
      this.setState({LateStatus})
      console.warn(index, this.state.absentStatus[index])
    }
    CloseStudentModal=(status)=>{
      // console.warn("$$$$$$$$$$$$$$$$$$",status)
    this.setState({IsOpenNote:status})  
    }
    

    CloseGroupeNoteModal=(status)=>{
      this.setState({IsGroupNote:status})
 
    }

    CloseSelectALLeModal=(status)=>{
      this.setState({IsSelectAll:status})
 
    }

    CloseGroupModal=(value)=>{
      this.setState({IsGroupModal:value})
     

    }

    Type=(value)=>{
      this.setState({type:value})
      console.warn("skdksdfhksdjfh",value==="Aanwezig",value )
      if(value==="Aanwezig"){
     this.AllStudentPresent()}else
     if(value==="Afwezig"){
       this.AllStudentAbsent()
     }else if(value==="Laat"){
      this.AllStudentLate()
     }
      
    }

    AllStudentPresent=()=>{
      for (var i=0; i<this.state.presentStatus.length ;i++){
        // console.warn(this.state.presentStatus[i])
       
        this.state.presentStatus[i]=true
        this.state.absentStatus[i]=false
       
      }
    }

    AllStudentAbsent=()=>{
      for (var i=0; i<this.state.presentStatus.length ;i++){
        // console.warn(this.state.presentStatus[i])
       
        this.state.presentStatus[i]=false
        this.state.LateStatus[i]=false
        this.state.absentStatus[i]=true
      }
    }

    AllStudentLate=()=>{
      for (var i=0; i<this.state.presentStatus.length ;i++){
        // console.warn(this.state.presentStatus[i])
        this.state.LateStatus[i]=true
        this.state.presentStatus[i]=true
        this.state.absentStatus[i]=false
      }
    }
    GroupeName=(value)=>{
      this.getGroupFunction(value)
      // console.warn("222222",value.FLD_GROUP_NAME)
      this.setState({Groupe:value.FLD_GROUP_NAME})
    }

    OpenModal=(value)=>{
      this.setState({IsSelectAll:value})

    }

    OpenGroupModal=(value)=>{
      this.setState({IsGroupModal:value})
    }

    getComment=(value)=>{
      // console.warn("valueeee of comment********************** ",value)
     this.state.comment[this.state.index]=value
    }

    allDate=(VALUE)=>{
      this.setState({allDate:[]})
      console.warn("valueeeeeee of all month@@@@@@@@@@@@",VALUE)
      //  this.state.allDate.push(VALUE)
      this.setState({allDate:VALUE})
      this.setState({statusPress:[]})
    }


  render() {
    // console.warn("&&&&&&&&&&&&&&&&&&&",this.state.allDate)
 
    const {loadMonthAttendance} = this.props;
   
    return (
      <ScrollView>   
        <StudentCommentModal   loadStudent={this.state.itemPress}  index={this.state.index} getComment={(value)=>this.getComment(value)}  CloseStudentModal={this.CloseStudentModal} IsOpenNote={this.state.IsOpenNote} />
        <GroupeNoteModal       IsGroupNote={this.state.IsGroupNote} CloseGroupeNoteModal={this.CloseGroupeNoteModal} CloseStudentModal={this.CloseStudentModal} GroupeNote={this.state.GroupeNote} />
        <SelectAllModal        Title={"Groepsbericht"} git Type={this.Type}  data={this.state.data}   CloseSelectALLeModal={this.CloseSelectALLeModal}  IsSelectAll={this.state.IsSelectAll} />
        <SelectAllModal        Title={"groepen"} Type={this.GroupeName}  data={this.state.groupStudent}   CloseSelectALLeModal={this.CloseGroupModal}  IsSelectAll={this.state.IsGroupModal} />
      
        <View
        pointerEvents={(this.state.modify===true) ? 'none':null}
         style={{
            ...(   this.state.modify===true || this.state.loader  &&  {
             
              zIndex: 2,
              width: width,
              height: height,
              backgroundColor: 'lightgray',
              opacity: 0.5,
            }),
          }}>
         { this.state.loader && 
         <View style={{position:"absolute",top:width-width/5,left:width/2-width/20}}>
            <ActivityIndicator size="large" color={"blue"} style={{zIndex:3}}/>
         </View>
         }
          <View style={cs.mainContainer}>
            <View>  
          
             <Text style={{fontWeight:"bold",fontSize:20,alignSelf:"center",marginTop:15}}>Vrijdag, 4 oktober 2019</Text>
             <View style={cs.calendarsWrapper}>
                <View style={{width: '100%'}}>    
                  <CalendarsChangable
                    CleangroupId={this.CleangroupId}
                    allDate={this.allDate}
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
                {

                this.state.allDate.length!==0 &&
               
                this.state.allDate.filter(async(obj)=>obj.date===this.state.datepress && await this.state.statusPress.push(obj)),
                    <View>
                   <View style={{flexDirection:"row",marginTop:width/35,marginLeft:width/40}}> 
                      <Text  style={{fontWeight:"bold",fontSize:width/30}}>
                          Alle aanwezigen  :
                       </Text>
                       <Text  style={{fontWeight:"bold",fontSize:width/30}}>
                        {this.state.statusPress.length!==0 && this.state.statusPress[0].present}
                       </Text>
 
                   </View>
                   <View style={{flexDirection:"row",marginTop:width/35,marginLeft:width/40}}> 
                      <Text  style={{fontWeight:"bold",fontSize:width/30}}>
                          Alle Afwezig  :
                       </Text>
                       <Text  style={{fontWeight:"bold",fontSize:width/30}}>
                      { this.state.statusPress.length!==0 &&  this.state.statusPress[0].absent}
                       </Text>
 
                   </View>
                   </View>} 
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
              
             {/* <View style={[cs.pickerContainerTeacher]}>
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
             </View> */}
             <PickerMe  group={this.state.groupStudent}  TextStyle={{marginLeft:width*0.270,width:100}} style={{width:width*0.900,alignSelf:"center",marginBottom:-width/30}} styleIcon={{marginLeft:width*0.180}}  OpenModal={this.OpenGroupModal} type={this.state.Groupe}  />
            {this.state.loadStudent.length!==0 && 
         
            <View style={{flexDirection:"row",justifyContent:"center",marginBottom:width/30}}>
                 <PickerMe  style={{justifyContent:"center"}}  TextStyle={{width:width/3}} style={{marginRight:width/35}} OpenModal={this.OpenModal } type={this.state.type}  defaultText={"Markeer iedereen als"}/>
                <TouchableOpacity onPress={()=>this.groupeNoteOpen()} >
                    <View style={cs.groupNote}>
                     <Image source={require('../../assets/images/student/presence/notepad.png')} style={{width:"15%",height:30,resizeMode:"contain",tintColor:"white"}} /> 
                    <Text style={{color:"white"}}>Groeps notitie</Text>
                    </View>
                </TouchableOpacity>
                
             </View>
             }
            {this.state.loadStudent.map((item,index)=>{
              // console.warn("present status",this.state.loadStudent[index].FLD_ISPRESENT)
              // console.warn("in render part log present status$$$",this.state.presentStatus)
            
              // console.warn(item)
              return(
                <View key={index} style={{flexDirection:"row",marginTop:10,justifyContent:"center"}}>
                  <TouchableOpacity onPress={()=>this.OpenNoteModal(item,index)}>
                      <Image source={require('../../assets/images/student/presence/notebook.png')} style={{width:20,height:20,resizeMode:"contain",marginTop:5}} />
                 </TouchableOpacity>
                <Text style={{marginTop:0,fontSize:15,marginRight:0,width:"25%",marginTop:5}}>{item.StudentFullName}</Text>
                    <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                        
                          }}>
                          <TouchableOpacity onPress={()=>this.presentPress(index)} style={[this.state.presentStatus[index]===true ?(cs.presenceStatusTeacherColor):cs.present]}>
                            <Text style={this.state.presentStatus[index]!==true ?{ color:"black",fontSize:15}:{color:"white",fontSize:15}}>Aanw</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.latePress(index)} style={[this.state.LateStatus[index]===true===true ? (cs.lateStatusSelectColor):{padding:7,borderRadius:5,backgroundColor:"white",borderWidth:0.5,marginRight:10,paddingRight:17,paddingLeft:17}]}>
                            <Text style={[this.state.LateStatus[index]===true?cs.presenceColorText:{color:"black",fontSize:15}]}>Laat</Text>
                          </TouchableOpacity>
                          {/* {console.warn("!!!!!!!!!",item.FLD_ISPRESENT===null)} */}
                          <TouchableOpacity onPress={()=>this.absentPress(index)} style={[this.state.absentStatus[index]===true  ?(cs.absentStatusTeacherColor):{padding:7,borderRadius:5,backgroundColor:"white",borderWidth:0.5,marginRight:5,paddingRight:17,paddingLeft:17}]}>
                            <Text style={this.state.absentStatus[index]===true ?[cs.presenceColorText]:{ color:"black",fontSize:15} }>Afw</Text>
                          </TouchableOpacity>
                </View>
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
                 <Button
                 name="BEWAREN"
                 imgSource={require('./../../assets/images/student/presence/saveImge.png')}
                 colorButton="#CD51C9"
                 onClick={()=>{
                   this.SaveBtn()
                  //  this.setState({editpage:false})
                 }}
               />
                   
               </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
   
  }
}



export default   withNavigationFocus (PresenceCalendar);
