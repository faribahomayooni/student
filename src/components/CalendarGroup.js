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
     changemodedate:[],
    //  resloadmonthattendance:"",
     modify:0,
     changedisablemode:false,
    };
  }

loadmonth=async()=>{
  console.warn("**************",this.props.groupId)
  var userId=  parseInt(await AsyncStorage.getItem('@userId'))
  axios
  .post(
    global.url + 'api/student/loadMonthAttendance',
    {
      groupId:this.props.groupId,
      userId: userId,
      monthId: this.state.month===""? new Date().getMonth()+1:this.state.month,
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
      console.warn("==================>11",res.data.data !== undefined,res.data)
      this.setState({resloadmonthattendance:res.data.data})
      // this.props.getMonthdata(res.data.data)
      res.data.data !== undefined &&
      res.data.data.filter(obj => {
        console.warn("aaaaaaaaaaaa",res.data)
        if (obj.FLD_IS_LATE === 1) {
          
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 1,
          });
        } else if (obj.FLD_ISPRESENT === 1) {
          console.warn("bbbbbbbbbbbbbbbb")
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 3,
          });
        } else if (obj.FLD_ISPRESENT === 0) {
          console.warn("cccccccccccccccccc")
          this.state.studentstatus.push({
            date: obj.FLD_DATE.slice(0, 10),
            type: 2,
          });
        } 
      });
      // console.warn("###################################")
        this.anotherFunc();
    }
  })
  .catch(error => {
    // console.log(error);
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
            // console.warn('fail', res.data);
            return;
          }
        })
        .catch(error => {
          // console.warn('error', error);
        });
  
  };


  loadStudentInfo2=()=>{
  
    ( this.setState({markedDates:this.getDaysInMonth(moment().month(), moment().year(),this.state.disable)}))
    
      // this.setState({markedDates:{...this.state.dynamicdate,...this.state.markedDates}})
      // setTimeout(()=>{this.setState({changedisablemode: false})},10000);
 
  }

  componentDidMount(){
    let today = new Date();
    let mydate = moment(today, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
    // this.setState({month:this.props.month})
    const {loadMonthAttendance} = this.props;
    this.loadStudentInfo()
    // this.loadmonth()
    
   }

  // groupdata=(a,b,c)=>{
  //   console.warn("&&&&&&&&&&&&&&",a,b,c)
  // }
// func=async()=>{
//   var userId=  parseInt(await AsyncStorage.getItem('@userId'))
//   var  id=this.props.groupId
//   var token= await AsyncStorage.getItem('@token')
//  var mont = this.state.month===""? new Date().getMonth()+1:this.state.month
//   month(userId,id,mont,token)
// }

  
 componentWillReceiveProps=async(nexxt,dat)=>{
  // this.func()
   if(this.state.counter!==this.props.count)
 {  
  if(this.state.studentid!==nexxt.groupId){
    this.loadStudentInfo()
    this.setState({changedisablemode:true})
    this.setState({disable:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']});
    this.setState({modify:true})
    this.props.changegroup(this.state.modify)
    this.setState({studentid:nexxt.groupId})
    this.setState({studentstatus:[]})
    this.setState({dynamicdate:[]})
//    this.setState({disabledate:[]})
  
 }
// this.setState({dateinmonth:nexxt.loadMonthAttendance})
 this.setState({press:false})
if(this.state.press!==true){
  // this.setState({dynamicdate:[]})
  this.loadmonth()

}
 
    }


 }

getDaysInMonth(month, year, days) {
  let pivot =moment.utc([year, month])
  let firstDay = moment(pivot).startOf('month')
  const dow = firstDay.day()
  // console.warn("===.warn",dow)
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
  // console.warn("&&&&&&&&&&&&&&&&&&&&&&&0",filterdate)
 
  return dates
}


anotherFunc = async() => {
 console.warn("tessssssssssssssssssssssssssssssssssssst")
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
           
            text: {
              color: 'white',
            },
            dots:[
              {key:"vacation", color:"white",selectedDotColor:"red"},
              {key:"vacation", color:"blue",selectedDotColor:"red"}
            ]
          },
        },
      }),
    {},
  );
    
   this.setState({dynamicdate:obj,changedisablemode:false})
   this.setState({markedDates:{...this.state.markedDates,...obj}})
  //  console.warn("66666666666666666666666666666",this.state.markedDates)
  //   if(this.props.loadMonthAttendance){
  //  this.setState({counter:this.state.counter+1})}
};
  edit=async(day)=>{
   
     this.setState({press:true})
     var data=  this.state.studentstatus.filter(obj=>obj.date!==day.dateString)
       
     await   this.setState({studentstatus:data})
       
         this.state.studentstatus.push({
           date:day.dateString,
           type:this.props.type,
         });
       
        let obj = this.state.studentstatus.reduce(
           (c, v) =>
             Object.assign(c, {
               [v]: {selected: true},
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
     
                   text: {
                     color: 'white',
                   },
                 
                 },
               },
           
             }),
           {},
         );
       
         await   this.setState({dynamicdate:{...this.state.dynamicdate,...obj}})
         this.setState({markedDates:{...this.state.markedDates,...this.state.dynamicdate}})
          //  this.loadStudentInfo2()
           var change=  this.state.changemodedate.filter(obj=>obj.date!==day.dateString)
         this.setState({changemodedate:change})
         this.state.changemodedate.push({date:day.dateString,
           type:this.props.type})
           this.props.savedate(day.dateString,this.props.type,this.state.resloadmonthattendance)
          //  console.warn("####################",this.state.studentstatus,this.state.dynamicdate)
  }

  // componentDidMount() {
   
  // }

  componentWillUpdate(prevProps) {
    
    // console.warn("sdssssssssssssss",prevProps , this.props.isFocused)
     if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({id:""})
       this.setState({studentstatus:[],dynamicdate:[]})
       this.setState({markedDates:[]})
       this.loadmonth()
      //  this.anotherFunc()

      //  this.loadStudentInfo()
      //  this.groupStudent(-1)
       // this.props.dispatch(apiActions.loadStudentGroup(-1));
       // this.loadMonthAttendance();
       //Call any action to update you view
       //fetch data when the component is focused
       //To prevent extra component re-renders, you may need to write some logic in shouldComponentUpdate
       }
     }
 

 
  render() {
    // console.warn("dynamic date",this.state.dynamicdate,"************student status********",this.state.studentstatus)
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
          onMonthChange={async(date) => {
               this.loadmonth()
               this.setState({month:date.month})
               this.setState({year:date.year})
        await   this.state.resloadmonthattendance.filter(obj => {
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
      this.setState({
        markedDates: this.getDaysInMonth(date.month - 1, date.year, this.state.disable)
      })
      this.anotherFunc();
            // console.warn("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^>load month attendanc", await this.state.dateinmonth)
            
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
            this.props.edit!==true  ?
         this.props.activeEditPage(true)
       :
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
