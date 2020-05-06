/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../../styles/common/styles';
import {View, Text, AsyncStorage} from 'react-native';
import {InputField, Button} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ToastAndroid} from 'react-native';
import axios from 'axios';
import {apiActions} from './../../actions';
const PhoneSetting1 = props => {
  const [phoneNumber, setphoneNumber] = useState(0);
  const [mobile, updateMobile] = useState(props.navigation.state.params.desc);
  const editMobile = async () => {
    axios
      .post(
        global.url + 'api/student/editMobile',
        {
          mobile: mobile,
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
          // dispatch({
          //   type: allConstants.EDIT_MOBILE,
          //   data: res.data.data,
          // });
          ToastAndroid.show(
            'youre phone number has been changed sucessfully',
            ToastAndroid.SHORT,
          );
          props.navigation.navigate('ProfileSetting', {newphone: phoneNumber});
          return;
        }
        if (res.data.msg === 'fail') {
          // console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        // console.warn('error3', error);
      });
  };
  return (
    <View style={cs.mainContainer}>
      <View style={cs.textLoginContainer}>
        <Text style={cs.titleSettingPage}>Nieuw telefoonnummer</Text>
        <Text style={cs.subTitleSettingPage}>
          Schrijf hieronder je nieuwe telefoonnummer op.
        </Text>
        <View style={cs.settingInputWrapper}>
          <InputField
            value={mobile}
            keyboardType={'numeric'}
            // onSubmit={() => mobile.focus()}
            onChange={mobile => {
              updateMobile(mobile), setphoneNumber(mobile);
            }}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{color: '#31455E', fontSize: 13}}>
            Wij sturen je een e-mail om
          </Text>
          <Text style={{color: '#31455E', fontSize: 13}}>
            de verandering te bevestigen{' '}
          </Text>
        </View>
        <View style={cs.columnContainer}>
          <View>
            <Button
              onClick={() => editMobile()}
              name="OPSLAAN"
              colorButton="#5467fd"
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
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(PhoneSetting1);
