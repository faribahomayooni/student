/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect, connectAdvanced} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  AsyncStorage
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {apiActions} from '../actions';
import axios from 'axios';
import qs from 'qs'
import {Button} from './../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {commonStyle as cs} from './../styles/common/styles';
import moment from 'moment';
var DISABLED_DAYS = []
var count = 0;
const {width, height} = Dimensions.get('window');
class CalendarsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextDays: [
        {date: '2020-03-01', type: 1},
        {date: '2020-03-05', type: 3},
        {date: '2020-03-08', type: 3},
        {date: '2020-03-07', type: 1},
        {date: '2020-03-18', type: 2},
        {date: '2020-03-17', type: 2},
        {date: '2020-03-28', type: 1},
        {date: '2020-03-29', type: 1},
      ],
      counter: 0,
      selected: '',
      dynamicdate: [],
      abdate: null,
      studentstatus: [],
      group: '',
      press:false,
      day:'',
      studentid:"",
      disabledate:[],
      disable:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
      markedDates:"",
     dateinmonth:"",
     LOADMONTH:"",
     month:'',
     year:'',
     changemodedate:[],
     resloadmonthattendance:"",
     modify:0
    };
  }

loadmonth=async()=>{
  var userId=  parseInt(await AsyncStorage.getItem('@userId'))
  axios
  .post(
    global.url + 'api/student/loadMonthAttendance',
    {
      groupId: this.props.groupId,
      userId: userId,
      monthId: this.state.month===""? await this.props.month:this.state.month,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('@token'),
      },
    },
  )
  .then(res => {
    // console.warn('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',userId,this.props.month,this.props.groupId, res.data.data);
    if (res.data.msg === 'success') {
      // this.setState({disable:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']})
    //  this.setState({studentstatus:[]})
      // this.setState({markedDates:[]})
      this.setState({resloadmonthattendance:res.data.data})
     res.data.data !== undefined &&
 res.data.data.filter(obj => {
        // console.warn('88888888888', obj.FLD_ISPRESENT);
        if (obj.FLD_IS_LATE === 1) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 1,
          });
        } else if (obj.FLD_ISPRESENT === 1) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 3,
          });
        } else if (obj.FLD_ISPRESENT === 0) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 2,
          });
         
        }
      
         
        
      });
      this.anotherFunc();
    }
  })
  .catch(error => {
    console.log(error);
  });


}

  loadStudentInfo = async () => {
    axios({
      method: 'post',
      url: global.url + 'api/school/loadGroupSchedule',
      data: qs.stringify({
        groupId: this.props.groupId ,
        
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'x-access-token': await AsyncStorage.getItem('@token'),
      }
    })
      .then((res) => {
          // this.setState({studentInfo: res.data});
        
          if (res.data.msg === 'success') {
            // console.log("=====???????????????????????????????????????????????????")
          this.setState({markedDates:[]})
          // this.setState({studentstatus:[]})
           this.setState({disable:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']})
             var data=  res.data.data.filter(async(obj)=>{
              if(this.state.disabledate.indexOf(obj.FLD_DAY_NAME)===-1){
                await  this.state.disabledate.push(obj.FLD_DAY_NAME)}})
             
              }
              for(var i=0;i<this.state.disabledate.length;i++){
                var indexelemt= this.state.disable.indexOf(this.state.disabledate[i])
                // datedis =this.state.disable.filter(obj=>obj!==this.state.disabledate[indexelemt])
                if(indexelemt!==-1){
                  this.state.disable.splice(indexelemt,1)}
                  this.state.month!==""?
                (  
                   this.setState({
                    markedDates: this.getDaysInMonth(this.state.month - 1, this.state.year, this.state.disable)
                  })):
                 ( this.setState({markedDates:this.getDaysInMonth(moment().month(), moment().year(),this.state.disable)}))
                //  this.loadmonth()
                  this.setState({markedDates:{...this.state.dynamicdate,...this.state.markedDates}})
                // DISABLED_DAYS=DISABLED_DAYS.splice(indexelemt,1)
            //     console.warn("^^^^^^^^^^^^^^^^^^^",indexelemt,"==>DIASABLE",this.state.disable)
            // console.warn('===>schedule group days', this.state.disabledate);
          }
          // this.setState({disabledate:datedis})
          if (res.data.msg === 'fail') {
            console.warn('fail', res.data);
            return;
          }
        })
        .catch(error => {
          console.warn('error', error);
        });
    
  
    // console.warn("tokennnnnnnn", await AsyncStorage.getItem('@token'))
   
    // console.warn("groupid",this.props.groupId)
    // axios
    //   .post(global.url + 'api/school/loadGroupSchedule', {
      
    //     headers: {
    //       'Content-Type':  'application/x-www-form-urlencoded',
    //       'x-access-token': await AsyncStorage.getItem('@token'),
    //     },
    //     'groupId': this.props.groupId ,
      
    //   })
    //   .then(res => {
    //     this.setState({studentInfo: res.data});
    //     console.warn('===>res when call twice for component', res);
    //     if (res.data.msg === 'success') {
    //     }
    //     if (res.data.msg === 'fail') {
    //       console.warn('fail', res.data);
    //       return;
    //     }
    //   })
    //   .catch(error => {
    //     console.warn('error', error);
    //   });
  };

  componentDidMount(){
    this.setState({month:this.props.month})
    const {loadMonthAttendance} = this.props;
  //  console.warn("loadmonth attendance+++++++++++++++++++++===============",this.state.month)
   
    // console.warn("disable date",DISABLED_DAYS,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.props.id,this.state.studentid)
    // this.loadStudentInfo()
  }
  // componentDidUpdate = async () => {
  //   this.loadStudentInfo()
  //   this.props.loadMonthAttendance===undefined && this.setState({press:false})
  //   var id=this.props.groupId
  //  if(this.state.press===false){
  //   console.warn('dfddddddddddddddddddddd', this.props.loadMonthAttendance);
  //   // var datalenght = this.props.loadMonthAttendance.length;
  //   this.props.loadMonthAttendance !== undefined &&
  //     this.props.loadMonthAttendance.filter(obj => {
  //       console.log('88888888888', obj.FLD_ISPRESENT);
  //       if (obj.FLD_IS_LATE === 1) {
  //         this.state.studentstatus.push({
  //           date: obj.FLD_DATE.slice(0, 10),
  //           type: 1,
  //         });
  //       } else if (obj.FLD_ISPRESENT === 1) {
  //         this.state.studentstatus.push({
  //           date: obj.FLD_DATE.slice(0, 10),
  //           type: 3,
  //         });
  //       } else if (obj.FLD_ISPRESENT === 0) {
  //         this.state.studentstatus.push({
  //           date: obj.FLD_DATE.slice(0, 10),
  //           type: 2,
  //         });
         
  //       }
        
  //         // this.state.studentstatus.push({
  //         //   date:this.state.day.dateString,
  //         //   type: 2,
  //         // });
        
  //     });
  //   count = this.state.studentstatus.length;
  //   // this.state.studentstatus.remove();

  //   console.warn('status for o function',  monthinfo !== this.props.loadMonthAttendance);
  //   if (this.state.fariba===0||count !== 0 || monthinfo !== this.props.loadMonthAttendance) {
  //     var monthinfo = this.props.loadMonthAttendance;
  //     this.setState({group: this.props.group});
  //     this.anotherFunc();
  //   }}
  // };.

//   componentWillReceiveContext()
// {
//   if(this.state.counter!==this.props.count){
//   this.setState({markedDates:{...this.state.dynamicdate,...this.state.markedDates}})}
// }  
 componentWillReceiveProps=async(nexxt,dat)=>{
  // console.warn("========================>marke data",this.state.markedDates)
//  console.warn(this.state.dynamicdate.filter(obj=>obj.),"markdate+++++++++++++++++++++++++++++++-----------------------")
  // console.warn("===>count and counter",this.props.count,this.state.counter)
  //  this.setState({groupid:""})
  //  console.warn("checkeeeeeeeeeeeeeeed%%%%%%%%%%%",this.props.id,this.state.studentid)
  
   
   if(this.state.counter!==this.props.count)
 {  
    // console.warn("-0------------------------------------------------->","wento with differerny groupid")
 this.loadStudentInfo()
//  this.setState({markedDates:this.getDaysInMonth(moment().month(), moment().year(),this.state.disable)})
// var colorful=this.state.dynamicdate
// (colorful!==undefined ||this.state.markedDates!==undefined || this.state.markedDates!=="" )&&
  // this.setState({markedDates:{...this.state.dynamicdate,...this.state.markedDates}})

 this.setState({disabledate:[]})

 if(this.state.studentid!==nexxt.groupId){
  this.setState({disable:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']});
  this.setState({modify:1})
  this.props.changegroup(this.state.modify)
  // this.setState({markedDates:this.getDaysInMonth(moment().month(), moment().year(),this.state.disable)})
   this.setState({studentid:nexxt.groupId})
  //  console.warn("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    this.setState({studentstatus:[]})
   this.setState({disabledate:[]})
   
  //  this.state.disable.push(this.state.disabledate)
 
 }
 this.setState({dateinmonth:nexxt.loadMonthAttendance})
// this.setState({studentstatus:[]})
// console.warn("load month attendanc",this.props.loadMonthAttendance)
if(this.state.press!==true){
this.loadmonth()
this.setState({press:false})
}
//  await nexxt.loadMonthAttendance !== undefined &&
//  nexxt.loadMonthAttendance.filter(obj => {
//         console.warn('88888888888', obj.FLD_ISPRESENT);
//         if (obj.FLD_IS_LATE === 1) {
//           this.state.studentstatus.push({
//             date: obj.FLD_DATE.slice(0, 10),
//             type: 1,
//           });
//         } else if (obj.FLD_ISPRESENT === 1) {
//           this.state.studentstatus.push({
//             date: obj.FLD_DATE.slice(0, 10),
//             type: 3,
//           });
//         } else if (obj.FLD_ISPRESENT === 0) {
//           this.state.studentstatus.push({
//             date: obj.FLD_DATE.slice(0, 10),
//             type: 2,
//           });
         
//         }
      
//           // this.state.studentstatus.push({
//           //   date:this.state.day.dateString,
//           //   type: 2,
//           // });
        
//       });
//       this.anotherFunc();
    
    }
// this.reloaddata()

 }
reloaddata(){
    // this.loadStudentInfo()
  
    // var datalenght = this.props.loadMonthAttendance.length;
    this.props.loadMonthAttendance !== undefined &&
      this.props.loadMonthAttendance.filter(obj => {
        // console.log('88888888888', obj.FLD_ISPRESENT);
        if (obj.FLD_IS_LATE === 1) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 1,
          });
        } else if (obj.FLD_ISPRESENT === 1) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 3,
          });
        } else if (obj.FLD_ISPRESENT === 0) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 2,
          });
         
        }
        
          // this.state.studentstatus.push({
          //   date:this.state.day.dateString,
          //   type: 2,
          // });
        
      });
    // count = this.state.studentstatus.length;
    // // this.state.studentstatus.remove();

    // console.warn('status for o function',  monthinfo !== this.props.loadMonthAttendance);
  
    //   var monthinfo = this.props.loadMonthAttendance;
    //   this.setState({group: this.props.group});
    //   this.anotherFunc();
    // }

    
}

getDaysInMonth(month, year, days) {
  
  // console.warn("days for disable in marked element~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",days)
  
  let pivot =moment.utc([year, month])
  // const end =  moment(pivot).endOf('month')
  
 let firstDay = moment(pivot).startOf('month')
 const dow = firstDay.day()
 console.warn("===.warn",dow)
 let endDay = moment(pivot).endOf('month')
  // console.warn("start day",pivot,"end date",endDay,"==>firstday:",firstDay)
//  let monthRange = moment.range(firstDay, endDay);
  let dates = {}
  const disabled = { disabled: true,disableTouchEvent: true }
  while(pivot.isBefore(endDay)) {
  // console.warn("disabe date in react native calndr",this.state.disabledate)
   days.forEach((day) => {  
      dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
    })
    // console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!????", pivot.add(7, 'days'))
    pivot.add(4, 'days')
  }
  
 
// console.warn("&&&&dates&&&&&&@@@@@@@@@@@@@@@@@@@*********&&&&&&&&&&&&&&&&&&",this.state.dynamicdate,"date @@@@@@",dates)
  return dates
}


anotherFunc = async() => {
   
  // console.warn('faribaaaaaaaaaaaaaaaaaaaaaaa', this.state.studentstatus);
  var obj = await this.state.studentstatus.reduce(
    (c, v) =>
      Object.assign(c, {
        // [v]: {selected: true,marked: true},
        [v.date]: {
          
          customStyles: {
            container: {
              width: '97%',
              backgroundColor:
                (v.type === 1 && '#E7B52E') ||
                (v.type === 2 && '#F64D53') ||
                (v.type === 3 && '#88C755'),
              borderRadius: 0,
            },
             disabled:{disableTouchEvent: true},
            text: {
              color: 'white',
            },
          },
        },
      }),
    {},
  );
    
this.setState({dynamicdate:obj})
  // this.state.dynamicdate.push(obj);
  // console.warn(
  //   'obj***************',
  //   obj
  // );
   this.setState({markedDates:{...this.state.markedDates,...this.state.dynamicdate}})
  if(this.props.loadMonthAttendance){
   this.setState({counter:this.state.counter+1})}
  // console.warn('obj', obj);
};


  componentDidMount() {
    // this.loadMonthAttendance()
// console.warn("*****groupid*******",this.loadStudentInfo())

    // console.warn('month in group calendar', this.props.loadMonthAttendance);
    let today = new Date();
    let mydate = moment(today, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
    // const [selected, changeSelected] = React.useState(mydate);
    // const [dynamicdate, changedate] = React.useState(null);
    // this.anotherFunc();
  }

  

  // const test = () => {
  //   console.log(props);
  //   props.getMonth(selected);
  // };
  // onDayPress = day => {
  //   console.log(day);
  //   this.setState({selected: day});
  //   this.props.getMonth(day);
  // };

  
  render() {
    const {loadMonthAttendance} = this.props;
    
//  this.state.change===true  &&  this.reloaddata()
    // this.loadStudentInfo()
  //  console.warn("******month *****",this.props.month)
  //   console.warn(
  //     'dynamic date do you change???????????????????,*************',
  //     this.state.dynamicdate,
  //   );
  //   console.warn(
  //     '===>student status',
  //     this.state.studentstatus,

  //     // this.state.nextDays,
  //   );
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            ...(this.props.loadMonthAttendance === undefined && {
              position: 'absolute',
              zIndex: 2,
              width: width,
              height: height,
              backgroundColor: 'lightgray',
              opacity: 0.5,
            }),
          }}>
          {this.props.loadMonthAttendance === undefined && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: width / 2,
                marginRight: 25,
                zIndex: 3,
              }}>
              <ActivityIndicator size="large" color="#2e7d32" />
              <Text style={{color: '#2e7d32', textAlign: 'center'}}>
                please wait
              </Text>
            </View>
          )}
        </View>

        {/* {this.anotherFunc()} */}
        {/* <Text>{this.state.absentdays}</Text> */}
        {/* <View>
          {this.state.dynamicdate.map((index, items) => {
            return <Text>{items}</Text>;
          })}
        </View> */}
        <Calendar
          onMonthChange={async(date) => {
               this.loadmonth()
            
           
            // console.warn('loadmonth attendance after render @@@@@@@@@',this.props.loadMonthAttendance);
            this.setState({month:date.month})
            this.setState({year:date.year})
          // this.setState({studentstatus:[]})
            // var userId=  parseInt(await AsyncStorage.getItem('@userId'))
            // console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",date,userId,this.props.id,date.month)
         
            // this.props.dispatch(
            //   apiActions.loadMonthAttendance(
            //     this.props.groupId,
            //     userId,
            //     date.month ,
            //   ),
            // );
            // this.props.loadMonthAttendance !== undefined &&
          await   this.props.loadMonthAttendance.filter(obj => {
        // console.warn('loadmonth attendance after render @@@@@@@@@',this.props.loadMonthAttendance);
        if (obj.FLD_IS_LATE === 1) {
            this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 1,
          });
        } else if (obj.FLD_ISPRESENT === 1) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 3,
          });
        } else if (obj.FLD_ISPRESENT === 0) {
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 2,
          });
         
        }
      
          // this.state.studentstatus.push({
          //   date:this.state.day.dateString,
          //   type: 2,
          // });
        
      });
      this.setState({
        markedDates: this.getDaysInMonth(date.month - 1, date.year, this.state.disable)
      })
      this.anotherFunc();
            console.warn("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^>load month attendanc", await this.state.dateinmonth)
            
          }}
          style={styles.calendar}
          hideExtraDays
          theme={{
            textSectionTitleColor: '#31455E',
            selectedDayBackgroundColor: '#5467FD',
            selectedDayTextColor: '#fff',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            selectedDotColor: '#ffffff',
            arrowColor: '#31455E',
            indicatorColor: '#5467FD',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 19,
            textDayHeaderFontSize: 14,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                borderColor: '#aaa',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
          }}
          
        //   onDayPress={async(day) => {
          
        //      this.setState({press:true})
        //    var data=  this.state.studentstatus.filter(obj=>obj.date!==day.dateString)
          
        // await   this.setState({studentstatus:data})
          
        //     this.state.studentstatus.push({
        //       date:day.dateString,
        //       type:this.props.type,
        //     });
          
        //    let obj = this.state.studentstatus.reduce(
        //       (c, v) =>
        //         Object.assign(c, {
        //           [v]: {selected: true,disabled: true},
        //           [v.date]: {
            
        //             customStyles: {
        //               container: {
        //                 width: '97%',
        //                 backgroundColor:
        //                   (v.type === 1 && '#E7B52E') ||
        //                   (v.type === 2 && '#F64D53') ||
        //                   (v.type === 3 && '#88C755'),
        //                 borderRadius: 0,
        //               },
        
        //               text: {
        //                 color: 'white',
        //               },
        //             },
        //           },
              
        //         }),
        //       {},
        //     );
        
         
        //      this.setState({dynamicdate: obj});
        //      this.loadStudentInfo()
        //      this.setState({markedDates:{...this.state.dynamicdate,...this.state.markedDates}})
           
        //       var change=  this.state.changemodedate.filter(obj=>obj.date!==day.dateString)
        //     this.setState({changemodedate:change})
        //     this.state.changemodedate.push({date:day.dateString,
        //       type:this.props.type})
        //       this.props.savedate(day.dateString,this.props.type,this.state.resloadmonthattendance)
        //   }}
           current={this.state.selected}
          minDate={'2018-02-01'}
          markingType={'custom'}
          markedDates={this.state.markedDates}
          hideArrows={false}
        />
       
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadMonthAttendance: state.api.loadMonthAttendance,
  };
};
export default connect(mapStateToProps)(CalendarsScreen);

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    paddingTop: 5,
    borderColor: '#ddd',
    height: 350,
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    // backgroundColor: 'gray',
  },
});
