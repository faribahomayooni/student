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
import axios from 'axios';
import {Button} from './../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {commonStyle as cs} from './../styles/common/styles';
import moment from 'moment';

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
      
     
    };
  }


  loadStudentInfo = async () => {
    console.warn("tokennnnnnnn", await AsyncStorage.getItem('@token'))
   
    console.warn("groupid",this.props.groupId)
    axios
      .post(global.url + 'api/school/loadGroupSchedule', {
      
        headers: {
          'Content-Type':  'application/x-www-form-urlencoded',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
        'groupId': this.props.groupId ,
      
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

  componentDidMount(){
    console.warn("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.props.id,this.state.studentid)
    this.loadStudentInfo()
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
  
 componentWillReceiveProps(nexxt,dat){
  console.warn("===>count and counter",this.props.count,this.state.counter)
  //  this.setState({groupid:""})
   console.warn("checkeeeeeeeeeeeeeeed%%%%%%%%%%%",this.props.id,this.state.studentid)
   if(this.state.counter!==this.props.count)
 {  console.warn("-0------------------------------------------------->","wento with differerny groupid")
 if(this.state.studentid!==nexxt.groupId){
   this.setState({studentid:nexxt.groupId})
   console.warn("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
   this.setState({studentstatus:[]})
 
 }
  
// this.setState({studentstatus:[]})
nexxt.loadMonthAttendance !== undefined &&
     nexxt.loadMonthAttendance.filter(obj => {
        console.warn('88888888888', obj.FLD_ISPRESENT);
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
      this.anotherFunc();
    
    }
// this.reloaddata()
 }
reloaddata(){
    // this.loadStudentInfo()
  
    // var datalenght = this.props.loadMonthAttendance.length;
    this.props.loadMonthAttendance !== undefined &&
      this.props.loadMonthAttendance.filter(obj => {
        console.log('88888888888', obj.FLD_ISPRESENT);
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
  componentDidMount() {
console.warn("*****groupid*******",this.loadStudentInfo())

    console.warn('month in group calendar', this.props.loadMonthAttendance);
    let today = new Date();
    let mydate = moment(today, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
    // const [selected, changeSelected] = React.useState(mydate);
    // const [dynamicdate, changedate] = React.useState(null);
    // this.anotherFunc();
  }

  anotherFunc = async() => {
   
    console.warn('faribaaaaaaaaaaaaaaaaaaaaaaa', this.state.studentstatus);
    var obj = await this.state.studentstatus.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: {selected: true,marked: true},
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
      
 
    this.setState({dynamicdate: obj});
    console.warn(
      'obj***************',
      obj
    );
    if(this.props.loadMonthAttendance){
     this.setState({counter:this.state.counter+1})}
    console.warn('obj', obj);
  };


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
    
//  this.state.change===true  &&  this.reloaddata()
    this.loadStudentInfo()
    console.warn(this.state.fariba,"fariba state,",
      'dynamic date do you change???????????????????,*************',
      this.state.dynamicdate,
    );
    console.warn(
      '===>student status',
      this.state.studentstatus,

      // this.state.nextDays,
    );
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
          // onMonthChange={month => {
          //   this.onDayPress(month);
          // }}
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
          
          onDayPress={day => {
            // var index={}
             this.setState({press:true})
            // var indexelemnt=   this.state.studentstatus.filter(obj=>obj.date===day.dateString.toString())
            // var info=  this.state.studentstatus.indexOf(indexelemnt)
            // console.warn(indexelemnt,"=====>indexelemtn@@@@@",info)
            this.state.studentstatus.push({
              date:day.dateString,
              type:this.props.type,
            });
            
            console.warn(
              'date in ****',
            
              day,"000000000000000000000",this.state.studentstatus
            );

           let obj = this.state.studentstatus.reduce(
              (c, v) =>
                Object.assign(c, {
                  [v]: {selected: true,disabled: true},
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
            // this.setState({studentstatus: []});
         
             this.setState({dynamicdate: obj});
            // this.anotherFunc();
            // this.setState:({selecteddays:"active"})
            // this.setState(
            //   {
            //     // selecteddays:"active",
            //     dateSelected: {
            //       [day.dateString]: {selected: true, selectedColor: '#466A8F'},
            //     },
            //   },
            //   () => {
            //     console.warn(
            //       'selected days in calendar',
            //       this.state.dateSelected,
            //     );
            //   },
            // );
          }}
           current={this.state.selected}
          minDate={'2018-02-01'}
          markingType={'custom'}
          markedDates={this.state.dynamicdate}
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
