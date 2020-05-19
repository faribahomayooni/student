/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {commonStyle as cs} from '../../styles/common/styles';
import {NavigationAction, StackActions} from 'react-navigation';
import {
  View,
  Text,
  ScrollView,
  Image,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import {InputField, Button, Header} from '../../components/widgets';
import {apiActions} from './../../actions';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
// import SimpleCrypto from 'simple-crypto-js';
const sha256 = require('sha256');

const PasswordSetting = props => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Profile'})],
  });
  const [password, updatePassword] = useState('');
  const changePass = async () => {
    // dispatch(apiActions.loadStudentInfo());
    var _secretKey = 'apple2020Nt2';
    // var simpleCrypto = new SimpleCrypto(_secretKey);
    updatePassword(password);
    // let password2 = simpleCrypto.encrypt(password);
    // dispatch(apiActions.editPassword(password, password2));
    axios
      .post(
        global.url + 'api/student/editPassword',
        {
          password: sha256(password),
          password2: password2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(async res => {
        if (res.data.msg === 'success') {
          // dispatch({
          //   type: allConstants.EDIT_PASSWORD,
          //   data: res.data.data,
          // });
          ToastAndroid.show(
            'youre password has been changed sucessfully',
            ToastAndroid.SHORT,
          );
          props.navigation.navigate('SignIn');
          await AsyncStorage.removeItem('@token');
          this.props.navigation.dispatch(resetAction);
        }
      })
      .catch(error => {
        console.log(error);
      });

    // dispatch(apiActions.loadStudentInfo());
  };

  return (
    <ScrollView>
      <View style={cs.mainContainer}>
        <View style={cs.textLoginContainer}>
          <Text style={cs.titleSettingPage}>Nieuw wachtwoord</Text>
          <Text style={cs.subTitleSettingPage}>
            Maak hieronder je nieuwe wachtwoord aan.
          </Text>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: '#31455E', fontSize: 10}}>
              Je wachtwoord moet uit
            </Text>
            <Text style={{color: '#31455E', fontSize: 10, marginBottom: -12}}>
              minimaal 6 tekens bestaan
            </Text>
          </View>
          <View style={cs.settingInputWrapper}>
            <InputField
              type={Number}
              value={password}
              secure={true}
              onSubmit={() => password.focus()}
              onChange={password => updatePassword(password)}
            />
            <Image
              style={cs.passEye}
              source={require('./../../assets/images/common/eye.png')}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: '#31455E', fontSize: 13}}>
              Wij sturen je een e-mail om
            </Text>
            <Text style={{color: '#31455E', fontSize: 13}}>
              de verandering te bevestigen
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: '#31455E', fontSize: 13}}>
              minimaal 6 tekens bestaan
            </Text>
            <Text style={{color: '#31455E', fontSize: 13}}>
              kan alleen de school je account resetten!
            </Text>
          </View>
          <View style={cs.columnContainer}>
            <View>
              <Button
                onClick={() => changePass()}
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
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(PasswordSetting);
