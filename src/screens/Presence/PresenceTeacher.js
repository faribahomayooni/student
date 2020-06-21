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
  Image
} from 'react-native';
import Progress from './../../components/Progress';
import ActionSheet from 'react-native-actionsheet';
import {commonStyle as cs} from '../../styles/common/styles';
// import CalendarsScreen from './../../components/Calenderunchange';
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
      group: 0,
      count: 0,
      changedata:[],
      selected: '',
      groupName: '',
      groupId: '',
      groupname: '',
      type:3,
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
      targetName:'',
      loadStudent:[],
      date:"",
      editpage:false,
      month:  parseInt(
        '2018-03-01'.substring(5, 7),
       10,
     ),
      date: {
        // year: 2018,
        // month: 3,
        // day: 1,
        // timestamp: 1519862400000,
        // dateString: '2018-03-01',
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
  console.warn("********************************************************************hihi",newGroup.FLD_PK_GROUP)
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
  //  this.props.dispatch(
  //    apiActions.loadMonthAttendance(
  //      newGroup.FLD_FK_GROUP,
  //      userId,
  //      this.state.month,
  //    ),
  //  );
 }
 

 passGroupdata=(groupId,month)=>{
   
}

  async componentDidMount() {
    // this.getStudentStatus()
      console.warn("teacher caaaaaaaaaaaaaaaaaaaalendar@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.groupStudent(-1)
 this.loadTeacherInfo()
    // this.props.dispatch(apiActions.loadStudentGroup(-1));
    // this.loadMonthAttendance();
  }


  // getStudentStatus=async(date)=>{
 
  //   axios
  //   .post(
  //     global.url + 'api/school/loadGroupStudents',
  //     {
  //       groupId: this.state.groupId,
  //       date:date
       
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': await AsyncStorage.getItem('@token'),
  //       },
  //     },
  //   )
  //   .then(res => {
  
  //      console.warn("++++++++++++++++++++++++",res)
  //     if (res.data.msg === 'success') {
       
  //         this.setState({teacherName:res.data.data[0].TeacherName,teacherlastname:res.data.data[0].TeacherLastName,targetName:res.data.data[0].TrajectName})
        
        
  //     }
  //   })
  //   .catch(error => {
  //     // console.warn(error);
  //   });
  
  // }
 

  savedate=async(studentData)=>{
    this.setState({loadStudent:studentData})
   console.warn("!!!!!!!!!!!!!!",studentData)
    //  this.setState({loadStudent:student})
    
   

  
  }


  SaveBtn=async()=>{
    this.setState({editpage:false})
    for(var i=0;i<this.state.changedata.length;i++){
    
      var info=this.state.changedata[i]
      //  console.warn("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",info)
     
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
      // this.savedate()
    
      this.loadTeacherInfo()
      this.groupStudent(-1)
      
      }
    }

  render() {
   console.warn("student groups@@@@%%%%",this.props.loadStudentGroup)
    const {loadMonthAttendance} = this.props;
   
    return (
      <ScrollView>     
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
              <View>
                {/* <PickerScreen
                  getGroup={this.getGroupFunction}
                  data={this.state.groupStudent}
                /> */}
              </View>
         
             
             <View style={cs.calendarsWrapper}>
              {/* <TouchableOpacity
               
                onPress={() => {
                   this.setState({editpage:true})
                }}
                style={{width: '100%'}}> */} 
                <View style={{width: '100%'}}>
                
                
                  <CalendarsChangable
                    navigation={this.props.navigation}
                    group={this.state.group}
                    type={this.state.type}
                    groupId={this.state.groupId}
                    change={this.state.change}
                    count={this.state.count}
                    // dateinmonth={this.props.loadMonthAttendance!==undefined && this.props.loadMonthAttendance}
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
                    // flex: 1,
                    // backgroundColor: 'rgba(238,196,97,0.57)',
                    marginLeft: 12,
                    marginRight: 12,
                  
                  }}>
                  <Text
                    style={{
                      color: '#31455E',
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
              {/* <TouchableOpacity onPress={this.showActionSheet}>
              <ActionSheet
                ref={o => (this.ActionSheet = o)}
                title={'Selecteer uw school'}
                options={}
                cancelButtonIndex={3}
                destructiveButtonIndex={1}
                onPress={index => {
                 
                }}
              />
              <Text style={cs.selectionInputText}> Selecteer uw school</Text>

              <View style={cs.selectIconWrapper}>
                <Icon
                  name="chevron-down"
                  color="#fff"
                  size={12}
                  style={{marginLeft: 5, marginTop: 4}}
                />
              </View>
            </TouchableOpacity> */}
             <View style={[cs.pickerContainerTeacher]}>
      <Picker
        placeholder="Selecteer type kosten"
        style={{backgroundColor:"transparent"}}
        // mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        selectedValue={this.props.groupId}
        onValueChange={(e)=>this.getGroupFunction(e)}
        placeholderStyle={{ color: 'none' }}
        itemStyle={{backgroundColor:"blue"}}>
           
        {this.state.groupStudent
          ? this.state.groupStudent.map(item => {
            // {console.warn("asaaaaaaaaaaaaaaaaa",item.FLD_GROUP_NAME)}
              return (
                <Item
                  color="#fff"
                  backgroundColor="none"
                  label={item.FLD_GROUP_NAME}
                  // value={item.FLD_FK_GROUP}
                  // value={item.FLD_GROUP_NAME}
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
   {this.state.loadStudent.map((item,index)=>{
     console.warn(item)
     return(
      <View key={index} style={{flexDirection:"row",justifyContent:"center",marginTop:10}}>
      <Image source={require('../../assets/images/student/presence/notebook.png')} />
      <Text style={{marginTop:10}}>{item.StudentFullName}</Text>
      <Button style={{marginTop:10}}>status</Button>
    </View>
     )
   }) }
              
             
            </View>
          </View>
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
    // loadStudentGroup: state.api.loadStudentGroup,
      // loadMonthAttendance: state.api.loadMonthAttendance,
  };
};


export default   withNavigationFocus (PresenceCalendar);
