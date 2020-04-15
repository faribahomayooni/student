/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
import {Button} from './../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {commonStyle as cs} from './../styles/common/styles';
import moment from 'moment';

var count = 0;
const {width, height} = Dimensions.get('window');
const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)
// It is not possible to reserve some to current day.
let _markedDates = {
    [_today]: {disabled: true},disableTouchEvent: true 
}
class CalendarsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      dynamicdate: [],
      abdate: null,
      studentstatus: [],
      group: '',
    };
  }

  componentDidUpdate = async () => {
    for (let i = 0; i <= count; i++) {
      this.state.studentstatus.pop();
    }
    this.state.studentstatus.pop();
    console.warn('dfddddddddddddddddddddd', this.props.loadMonthAttendance);
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
      });
    count = this.state.studentstatus.length;
    // this.state.studentstatus.remove();

    console.warn(
      'studentstatus*****',

      this.state.studentstatus,
    );
    if (count !== 0 && monthinfo !== this.props.loadMonthAttendance) {
      var monthinfo = this.props.loadMonthAttendance;
      this.setState({group: this.props.group});
      this.anotherFunc();
    }
  };
  componentDidMount() {
    console.warn('month in group calendar', this.props.loadMonthAttendance);
    let today = new Date();
    let mydate = moment(today, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
    // const [selected, changeSelected] = React.useState(mydate);
    // const [dynamicdate, changedate] = React.useState(null);
    // this.anotherFunc();
  }

  anotherFunc = () => {
    // this.state.studentstatus.pop();
    console.warn('ooooooooooooooooofff', this.state.studentstatus);
    var obj = this.state.studentstatus.reduce(
      (c, v) =>
        Object.assign(c, {
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
    this.setState({studentstatus: []});
    this.setState({dynamicdate: obj});
    console.warn('obj', obj);
  };

  // const test = () => {
  //   console.log(props);
  //   props.getMonth(selected);
  // };
  onDayPress = day => {
    console.log(day);
    this.setState({selected: day});
    this.props.getMonth(day);
  };
  render() {
    console.warn(
      '===>student status',
      this.state.studentstatus,

      // this.state.nextDays,
    );
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            position: 'absolute',
            top: height / 4,
            left: width / 3,
            // backgroundColor: 'red',
            width: 100,
            height: 100,
            zIndex: 2,
          }}>
          {this.props.loadMonthAttendance === undefined && (
            <View>
              <ActivityIndicator size="large" color="blue" />
              <Text style={{color: '#0000ff', textAlign: 'center'}}>
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
        {/* <Calendar
          onMonthChange={month => {
            this.onDayPress(month);
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
          current={this.state.selected}
          minDate={'2019-02-01'}
          markingType={'custom'}
          markedDates={_markedDates}
          hideArrows={false}
        /> */}
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
