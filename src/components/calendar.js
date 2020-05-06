/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Button} from './../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {commonStyle as cs} from './../styles/common/styles';
import moment from 'moment';

const CalendarsScreen = props => {
  let today = new Date();
  let mydate = moment(today, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
  const [selected, changeSelected] = React.useState(mydate);
  // React.useEffect(() => {
  //   props.getMonth(selected);
  // }, [selected, props]);

  // const test = () => {
  //   console.log(props);
  //   props.getMonth(selected);
  // };
  const onDayPress = day => {
    // console.log(day);
    changeSelected(day);
    props.getMonth(day);
  };
  // render() {
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.text}>
          Custom calendar with custom marking type
        </Text> */}
      {/* <View
        style={{
          width: '100%',
          marginBottom: 20,
        }}>
        <Button name="Meer info" colorButton="#CD51C9" onClick={test} />
        <View style={cs.nextIconPresenceWrapper}>
          <Icon
            name="chevron-right"
            color="white"
            size={12}
            style={{marginLeft: 8, marginTop: 5}}
          />
        </View>
      </View>
       */}
      <Calendar
        // onPress={onDayPress}
        // onDayPress={onDayPress}
        // onMonthChange={onDayPress}
        onMonthChange={month => {
          onDayPress(month);
        }}
        style={styles.calendar}
        // onDayLongPress={this.onDayLongPress}
        hideExtraDays
        // dayComponent={({date, state}) => {
        //   return (
        //     <View style={{flex: 1}}>
        //       <Text
        //         style={{
        //           textAlign: 'center',
        //           color: state === 'disabled' ? 'gray' : 'black',
        //         }}>
        //         {date.day}
        //       </Text>
        //     </View>
        //   );
        // }}
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
        current={selected}
        minDate={'2018-03-01'}
        markingType={'custom'}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
          // '2018-03-08': {selected: true},
          // '2018-03-10': {disabled: true},
          // '2020-03-01': {
          //   customStyles: {
          //     container: {
          //       width: '97%',
          //       backgroundColor: '#E7B52E',
          //       borderRadius: 0,
          //     },
          //     text: {
          //       color: 'white',
          //     },
          //   },
          // },
          '2018-03-02': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#E7B52E',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-03': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#E7B52E',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-04': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#E7B52E',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-05': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#F64D53',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-06': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#F64D53',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-07': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#F64D53',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-08': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#F64D53',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-09': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#88C755',
                borderRadius: 0,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-10': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#88C755',
                borderRadius: 0,
                //   marginTop: '-30%',
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-11': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#88C755',
                borderRadius: 0,
                //   marginTop: '-30%',
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-12': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#88C755',
                borderRadius: 0,
                //   marginTop: '-30%',
              },
              text: {
                color: 'white',
              },
            },
          },
          '2018-03-13': {
            customStyles: {
              container: {
                width: '97%',
                backgroundColor: '#F64D53',
                borderRadius: 0,
                //   marginTop: '-30%',
              },
              text: {
                color: 'white',
              },
            },
          },
        }}
        hideArrows={false}
      />
    </ScrollView>
  );
  // }
};

const mapStateToProps = state => {
  return {};
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
