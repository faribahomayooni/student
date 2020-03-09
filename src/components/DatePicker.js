/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../styles/common/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';

const DateTimePicker = props => {
  const [date, updateDate] = useState('');
  // React.useEffect(() => {
  //   props.getDate(date);
  // }, [date, props]);
  return (
    <DatePicker
      style={{
        width: 'auto',
        margin: 10,
        height: 45,
        backgroundColor: '#5467FD',
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 24,
      }}
      date={date}
      mode="date"
      //   placeholder="Kies datum"
      format="YYYY/MM/DD"
      //   minDate="2016-05-01"
      //   maxDate="2016-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          width: 0,
          height: 0,
        },
        // dateIcon: {
        //   position: 'absolute',
        //   right: 10,
        //   marginTop: 15,
        //   marginRight: 0,
        // },
        dateInput: {
          color: 'red',
          marginLeft: 0,
          height: 45,
          marginTop: 6,
          borderColor: 'transparent',
        },
        dateText: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
          justifyContent: 'flex-start',
        },
        // ... You can check the source to find the other keys.
      }}
      onDateChange={date => {
        updateDate(date);
        props.getDate(date);
      }}>
      <View style={cs.dropDownBtn}>
        <Icon
          name="chevron-down"
          color="white"
          size={12}
          style={{marginLeft: 5, marginTop: 5}}
        />
      </View>
    </DatePicker>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DateTimePicker);
