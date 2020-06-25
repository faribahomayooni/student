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
import { withNavigationFocus } from 'react-navigation';
import moment from 'moment';
import {month} from '../../src/actions/api.actions'
var DISABLED_DAYS = []
var count = 0;
const {width, height} = Dimensions.get('window');
const FirstDot = { key: 'First', color: 'red' };
const SecondDot = { key: 'Second', color: 'red' };
const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};
class CalendarsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
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
     loadStudentGroup:[],
     changemodedate:[],
      resloadmonthattendance:"",
     modify:0,
     changedisablemode:false,
    };
  }

loadmonth=async(date)=>{
  console.warn("state of month and year in moment ",this.state.month===""?`${moment().year()}/0${moment().month()+1}/01}`:`${this.state.year}/0${this.state.month}/01`)
   var startDATE =date==undefined?`${moment().year()}/0${moment().month()+1}/01`:`${date.year}/0${date.month}/01`;
  var endDate =date==undefined?`${moment().year()}/0${moment().month()+1}/30`:`${date.year}/0${date.month}/30`;
  axios
  .post(
    global.url + 'api/school/LoadCalendar',
    {
      groupId:this.props.groupId,
      endDate: endDate.toString(),
      startDate: startDATE.toString(),
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
      console.warn("@@@@@@@@@@@@@@@@@@ res for load month",res.data.data)
      this.setState({resloadmonthattendance:res.data.data})
      res.data.data !== undefined &&
      res.data.data.filter(obj => {
        if (obj.STATUS === 2) {
          this.state.studentstatus.push({
            date: obj.selected_date,
            type: 3,
            status:obj.CountStudent
          });
        } 
       
      });
  
        this.anotherFunc();
    }
  })
  .catch(error => {
  
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
          if (res.data.msg === 'success') {
          
          this.setState({markedDates:[]})
         
           this.setState({disable:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']})
             var data=  res.data.data.filter(async(obj)=>{
              if(this.state.disabledate.indexOf(obj.FLD_DAY_NAME)===-1){
                await  this.state.disabledate.push(obj.FLD_DAY_NAME)}})
             
              }
              for(var i=0;i<this.state.disabledate.length;i++){
                var indexelemt= this.state.disable.indexOf(this.state.disabledate[i])
              
                if(indexelemt!==-1){
                  // this.state.disable.splice(indexelemt,1)
                }
                  this.state.month!==""?
                (  
                   this.setState({
                    markedDates: this.getDaysInMonth(this.state.month - 1, this.state.year, this.state.disable)
                  })):
                 ( this.setState({markedDates:this.getDaysInMonth(moment().month(), moment().year(),this.state.disable)}))
                
                  this.setState({markedDates:{...this.state.dynamicdate,...this.state.markedDates}})
                  setTimeout(()=>{this.setState({changedisablemode: false})},5000);
              
          }
        
          if (res.data.msg === 'fail') {
          
            return;
          }
        })
        .catch(error => {
        
        });
  
  };


  loadStudentInfo2=()=>{
  
    ( this.setState({markedDates:this.getDaysInMonth(moment().month(), moment().year(),this.state.disable)}))
    
  }

  componentDidMount(){
    this.loadmonth()
    let today = new Date();
    let mydate = moment(today, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
    const {loadMonthAttendance} = this.props;
    this.loadStudentInfo()
   }


  
 componentWillReceiveProps=async(nexxt,dat)=>{
    console.warn("WILLRECIEVE^^^^^^^^^^^^^^^^^^^^^^^^^^ddddd^^^",this.state.studentid!==nexxt.groupId)
  // this.func()
   if(this.state.counter!==this.props.count)
 {  
  if(this.state.studentid!==nexxt.groupId){
    this.setState({studentstatus:[]})
    this.loadStudentInfo()
    this.setState({changedisablemode:true})
    this.setState({disable:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']});
    this.setState({modify:true})
    this.props.changegroup(this.state.modify)
    this.setState({studentid:nexxt.groupId})
    this.setState({studentstatus:[]})
    this.setState({dynamicdate:[]})
 }
 this.setState({press:false})
if(this.state.press!==true){
  this.loadmonth()

}
 
    }


 }

getDaysInMonth(month, year, days) {
  let pivot =moment.utc([year, month])
  let firstDay = moment(pivot).startOf('month')
  const dow = firstDay.day()
  let endDay = moment(pivot).endOf('month')
  let dates = {}
  const disabled = {disabled:true,disableTouchEvent:true }
  while(pivot.isBefore(endDay)) {
   days.forEach((day) => {  
      dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
    })
    pivot.add(4, 'days')
  }
var data=  Object.keys(dates)
var filterdate=data.filter(obj=>obj===this.state.studentstatus.date)
 
  return dates
}


anotherFunc = async() => {
//  console.warn("tessssssssssssssssssssssssssssssssssssst")
  var obj = await this.state.studentstatus.reduce(
    (c, v) =>
      Object.assign(c, {
         [v.date]: {         
          customStyles: {
            container: {
              width: '95%',
              backgroundColor:
                (v.type === 1 && '#E7B52E') ||
                (v.type === 2 && '#F64D53') ||
                (v.type === 3 && '#88C755'),
              borderRadius: 0,
            },
            text: {
              color: 'white',
              fontSize:12,
            },
           
          },
         

          
        },
      
      }),
      
    {},
  );
    
   this.setState({dynamicdate:obj,changedisablemode:false})
   this.setState({markedDates:{...this.state.markedDates,...obj}})
};
  edit=(day)=>{
 
            this.props.savedate(day.dateString)

  }

  
  componentWillUpdate(prevProps) {
     if (prevProps.isFocused !== this.props.isFocused) {
       this.loadmonth()
      this.setState({id:""})
       this.setState({studentstatus:[],dynamicdate:[]})
       this.setState({markedDates:[]})
      //  this.loadmonth()
  
       }
     }
 

 
  render() {
   
    const {loadMonthAttendance} = this.props;
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            ...(( this.state.resloadmonthattendance=== undefined  ) && {
              
              position: 'absolute',
              zIndex: 2,
              width: width,
              height: height,
              backgroundColor: 'lightgray',
              opacity: 0.5,
            }),
          }}>
          {( this.state.resloadmonthattendance === undefined  ) && (
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
        <Calendar
      
        scrollEnabled={true}
          onMonthChange={async(date) => {
               this.loadmonth(date)
               this.setState({month:date.month})
               this.setState({year:date.year})
          this.state.resloadmonthattendance.filter(obj => {
        if (obj.FLD_IS_LATE === 1) {
            this.state.studentstatus.push({
            date: obj.selected_date,
            type: 3,
            status:obj.CountStudent
          });
        } 
     
      });
      this.setState({
        markedDates: this.getDaysInMonth(date.month - 1, date.year, this.state.disable)
      })
      this.anotherFunc();          
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
          
          onDayPress={(day) => {
        
     this.edit(day)
          }} 
           current={this.state.selected}
          minDate={'2018-02-01'}
          markingType={'custom'}
          markedDates={this.state.markedDates}
          hideArrows={false}
          disabledByDefault={true}
         
        />
       
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    // loadMonthAttendance: state.api.loadMonthAttendance,
  };
};


export default   connect (mapStateToProps) && withNavigationFocus (CalendarsScreen);

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
