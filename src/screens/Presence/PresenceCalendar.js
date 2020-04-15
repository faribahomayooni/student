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
  ToastAndroid
} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import CalendarsScreen from './../../components/CalendarGroup';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from './../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiActions} from '../../actions';
// import AsyncStorage from '@react-native-community/async-storage';
import PickerScreen from './../../components/Picker';
import axios from 'axios';

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
      modify:true,
      teacherlastname:"",
      targetName:'',
      studentInfo:null,
      month: parseInt(
         this.props.navigation.getParam('date').dateString.substring(5, 7),
        10,
      ),
    };
    // this.getGroupFunction = this.getGroupFunction.bind(this);
  }

  changegroup=(mode)=>{
    setTimeout(()=>{this.setState({modify: false})},10000);
    // console.warn("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    // this.setState({modify:mode===1?false:true})

  }

   getGroupFunction= async(newGroup)=> {
     this. getTeacherName()
  // console.warn("********************************************************************hihi")
   
    this.setState({group: this.state.group + 1});
    this.setState({change:true})
    const userId = parseInt(await AsyncStorage.getItem('@userId'));
    // console.warn('userId', userId);
    if(this.state.id!==newGroup.FLD_FK_GROUP){
      this.setState({id:newGroup.FLD_FK_GROUP})
      this.setState({count:this.state.count+1})
    }
    this.setState({
      groupName: newGroup.FLD_GROUP_NAME,
      groupId: newGroup.FLD_FK_GROUP,
    });
    // this.setState({id:newGroup.FLD_FK_GROUP})
    // console.warn('dsfdf', newGroup.FLD_FK_GROUP, userId, this.state.month);
    // this.loadMonthAttendance(newGroup.FLD_FK_GROUP, userId, this.state.month);
    this.props.dispatch(
      apiActions.loadMonthAttendance(
        newGroup.FLD_FK_GROUP,
        userId,
        this.state.month,
      ),
    );
  }

  // loadMonthAttendance = async (groupId, userId, monthId) => {
  //   const user = parseInt(await AsyncStorage.getItem('@userId'));
  //   console.warn('userId', user);
  //   console.warn('sdjfhksfksdfsdjfg', groupId, userId, monthId);
  //   axios
  //     .post(
  //       global.url + 'api/student/loadMonthAttendance',
  //       {
  //         groupId: groupId,
  //         userId: userId,
  //         monthId: monthId,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-access-token': await AsyncStorage.getItem('@token'),
  //         },
  //       },
  //     )
  //     .then(res => {
  //       console.warn('responseeee', res);
  //       if (res.data.msg === 'success') {
  //         return res.data.data;
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  async componentDidMount() {

  this.loadStudentInfo()
  
    // this.loadStudentGroup(-1);
    this.props.dispatch(apiActions.loadStudentGroup(-1));
    this.loadMonthAttendance();
  }


  getTeacherName=async()=>{
    console.warn("{{{{{{{{{{{{{{{{{{",this.state.id)
    axios
    .post(
      global.url + 'api/school/loadGroupInfo',
      {
        groupId: this.state.id,
       
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      },
    )
    .then(res => {
  
      console.warn("++++++++++++++++++++++++",res.data.data[0])
      if (res.data.msg === 'success') {
       
          this.setState({teacherName:res.data.data[0].TeacherName,teacherlastname:res.data.data[0].TeacherLastName,targetName:res.data.data[0].TrajectName})
        
        
      }
    })
    .catch(error => {
      console.warn(error);
    });
  
  }
 

  savedate=async(date,type,dateinfo)=>{
    
    this.props.loadMonthAttendance.filter(obj=>{
    // console.warn("****************************************",obj)
   
    if((obj.FLD_DATE.slice(0, 10)===date)===true){
     
    
      type===1 &&  (obj['obj.FLD_IS_LATE ']=1);
      type===3 &&(obj['FLD_ISPRESENT']=1)
      type===2 &&( obj['FLD_ISPRESENT']=0) || (obj['FLD_IS_LATE']=0) 
      // console.warn("2222222222222222222",obj)
      this.state.changedata.push(obj)
    }
  
   
  })
//  console.warn("======================+++++++++",this.state.changedata)

  

  }

  loadStudentInfo = async () => {
    axios
      .get(global.url + 'api/student/loadInfo', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        this.setState({studentInfo: res.data});
        console.warn('===>res when call twice for component', res);
        if (res.data.msg === 'success') {
        }
        if (res.data.msg === 'fail') {
          console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        console.warn('error', error);
      });
  };
  


  SaveBtn=async()=>{
    for(var i=0;i<this.state.changedata.length;i++){
    
      var info=this.state.changedata[i]
      // console.warn("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",info)
     
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
        //  console.warn("ffffffffffffffffffffffff",res.data)
          if (res.data.msg === 'success') {
            ToastAndroid.show(
              'Twoje zmiany zostały pomyślnie zarejestrowane',
              ToastAndroid.SHORT,
            );
            this.props.navigation.navigate('Presence')
           
          }
        })
        .catch(error => {
          console.warn(error);
        });
      }
  }
  // loadStudentGroup = async studentId => {
  //   console.warn('ttttttttttttttttttttt', await AsyncStorage.getItem('@token'));
  //   axios
  //     .post(
  //       global.url + 'api/student/loadStudentGroup',
  //       {
  //         studentId: studentId,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-access-token': await AsyncStorage.getItem('@token'),
  //         },
  //       },
  //     )
  //     .then(res => {
  //       if (res.data.msg === 'success') {
  //         console.warn('group res', res.data.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
  
    const {loadMonthAttendance} = this.props;
    // console.warn('count in parent', this.state.count);
    // console.warn('loadMonthAttendance', loadMonthAttendance);
    return (
      <ScrollView>
       
        <View
        pointerEvents={(this.props.loadMonthAttendance===undefined || this.state.modify===true) ? 'none':null}
         style={{
            ...(  this.props.loadMonthAttendance === undefined  || this.state.modify===true  &&  {
             
              zIndex: 2,
              width: width,
              height: height,
              backgroundColor: 'lightgray',
              opacity: 0.5,
            }),
          }}>
          <View style={cs.mainContainer}>
          {this.props.loadMonthAttendance === undefined || this.state.modify===true  && (
            <View
              style={{
                position:"absolute",
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: width -width/10,
                marginLeft:width/2-45,
                zIndex: 3,
              }}>
              <ActivityIndicator size="large" color="#2e7d32" />
              <Text style={{color: '#2e7d32', textAlign: 'center'}}>
                please wait
              </Text>
            </View>
          )}
            <View style={cs.profileInfo} />
            {/* <View
            style={{
              position: 'absolute',
              top: height / 2,
              left: width / 2,
              backgroundColor: 'red',
              width: 100,
              height: 100,
              zIndex: 2,
            }}>
            {this.props.loadMonthAttendance === undefined && (
              <View>
                <ActivityIndicator
                  size="large"
                  color="red"
                  style={{height: 100, width: 100}}
                />
                <Text style={{color: '#0000ff', textAlign: 'center'}}>
                  please wait
                </Text>
              </View>
            )}
          </View> */}
            <View>
              <View style={{alignItems: 'center', marginTop: 20}}>
                <View style={{alignItems: 'center', direction: 'row'}}>
                
                    {/* <View>
                        <Text style={cs.RegularProfileInfo}> Imię nauczyciela:</Text> 
                        <Text style={cs.BoldProfileInfo}>
                     
                      {this.state.teacherName}  {this.state.teacherlastname}
                    </Text>
                    </View> */}
                   
                  <Text>
                  <Text style={cs.BoldProfileInfo}>
                  {this.state.studentInfo !== null &&
                  this.state.studentInfo.data[0].firstname}{' '}
                    </Text>
                    <Text style={cs.RegularProfileInfo}>, jouw groep </Text>
                  </Text>
                  <View>
                    <Text style={cs.colorProfileInfo}>
                      {this.state.groupName}
                    </Text>
                  </View>
                </View>
                <Text>
                  <Text style={cs.RegularProfileInfo}>
                    heeft les op{' '}
                    <Text style={cs.colorProfileInfo}>dinsdag </Text>
                    en <Text style={cs.colorProfileInfo}>donderdag.</Text>
                  </Text>
                </Text>
              </View>
              <View>
                <PickerScreen
                  getGroup={this.getGroupFunction}
                  data={this.props.loadStudentGroup}
                />
              </View>
              <View
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
              </View>
              <View style={cs.calendarsWrapper}>
                <View style={{width: '100%'}}>
                  <CalendarsScreen
                    navigation={this.props.navigation}
                    group={this.state.group}
                    type={this.state.type}
                    groupId={this.state.id}
                    change={this.state.change}
                    count={this.state.count}
                    dateinmonth={this.props.loadMonthAttendance!==undefined && this.props.loadMonthAttendance}
                    month={this.state.month}
                    savedate={this.savedate}
                    changegroup={this.changegroup}
                  />
                </View>
              </View>
              <View
                style={{
                  marginBottom: 20,
                  width: '100%',
                }}>
                <Button
                  name="AANWEZIG"
                  imgSource={require('./../../assets/images/student/presence/saveImge.png')}
                  colorButton="#CD51C9"
                  onClick={()=>
                    this.SaveBtn()
                  }
                />
                <View
                  style={{
                    marginTop: 5,
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

                <View>
                  <Text style={cs.summaryPresence}>
                    Bekijk een samenvatting van je aanwezigheid.{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginBottom: 20,
                  }}>
                  <Button
                    name="SAMENVATTING"
                    colorButton="#5467FD"
                    onClick={() =>
                      this.props.navigation.navigate('PresenceCalendar')
                    }
                  />
                  <View style={cs.nextIconWrapper}>
                    <Icon
                      name="chevron-right"
                      color="white"
                      size={12}
                      style={{marginLeft: 8, marginTop: 5}}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
    // : (
    //   <ActivityIndicator
    //     size="large"
    //     stytle={{
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       flex: 1,
    //       backgroundColor: 'red',
    //     }}
    //   />
    // );
  }
}

const styles = StyleSheet.create({
  overlay: {},
});

const mapStateToProps = state => {
  return {
    loadStudentGroup: state.api.loadStudentGroup,
    loadMonthAttendance: state.api.loadMonthAttendance,
  };
};

export default connect(mapStateToProps)(PresenceCalendar);
