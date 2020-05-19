/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Modal, Text, TouchableHighlight, View, Image} from 'react-native';
import {ModalButton, InputField} from '../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../styles/common/styles';
import {Row, Col} from 'native-base';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {apiActions} from './../actions';
//  import SimpleCrypto from 'simple-crypto-js';
import {showToast} from './utility';

const KnowModal = props => {
  const [bsnNumber, changeBsnNumber] = useState('');
  const [data, changedata] = useState(0);
  const [PASS2, SETPASS2] = useState(0);
  const [toggleModal, updateToggleModal] = useState(false);

  let pass2;
  const forgotPass = () => {
    axios
      .post(
        global.url + 'api/student/forgotPassword',
        {
          BSNNumber: bsnNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // 'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        changedata(res.data.data[0]);
        if (res.data.msg === 'success') {
          let message = res.data.data[0].message;
          if (message === 15) {
            showToast("BSN Number doesn't exist.");
          } else if (message === 31) {
            showToast("Password doesn't exist.");
          } else {
            updateToggleModal(true);
            const pass = res.data.data[0].Fld_Pass2;
            var _secretKey = 'apple2020Nt2';
            // var simpleCrypto = new SimpleCrypto(_secretKey);
            // pass2 = simpleCrypto.decrypt(pass);
            SETPASS2(pass2);
          }
        }
      })
      .catch(error => {
        // console.warn('error5', error);
      });

    // const {dispatch} = props;
    // dispatch(apiActions.forgotPassword(bsnNumber));
    // setTimeout(() => {
    // if (data && data.length > 0) {
    // let message = data[0].message;
    // if (message === 15) {
    //   showToast("BSN Number doesn't exist.");
    // } else if (message === 31) {
    //   showToast("Password doesn't exist.");
    // } else {
    //   updateToggleModal(true);
    //   const pass = data[0].Fld_Pass2;
    //   var _secretKey = 'apple2020Nt2';
    //   var simpleCrypto = new SimpleCrypto(_secretKey);
    //   pass2 = simpleCrypto.decrypt(pass);
    // }
    // }
    // }, 3000);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.visible}
        toggle={props.toggle}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}>
        <View style={cs.modalCustomize}>
          <Text style={cs.titleModal}>Inloggen</Text>

          <View style={cs.modalBox}>
            <View style={cs.modalContainer}>
              <TouchableHighlight onPress={props.toggle} style={cs.closeIcon}>
                <Icon
                  name="close"
                  color="white"
                  size={14}
                  style={{marginLeft: 6, marginTop: 4}}
                />
              </TouchableHighlight>
              <View style={cs.textLoginContainer}>
                <Text style={cs.textModalLogin}>Zoek je school en stuur</Text>
                <Text style={cs.textModalLogin}>een bericht.</Text>
              </View>
              <View style={cs.forgotContainer}>
                <InputField
                  placeholder={'BSN nummer'}
                  value={bsnNumber}
                  keyboardType={'numeric'}
                  // onSubmit={() => bsnNumber.focus()}
                  onChange={bsn => {
                    changeBsnNumber(bsn);
                  }}
                />
              </View>
              <View style={cs.textLoginContainer}>
                <Text style={cs.textModalLogin}>Heb je je taalschool</Text>
                <Text style={cs.textModalLogin}>gevonden. Stuur dan</Text>
                <Text style={cs.textModalLogin}>hieronder een bericht</Text>
              </View>
              <View style={{marginTop: 40}}>
                <TouchableOpacity style={{marginTop: 40, marginBottom: 30}}>
                  <ModalButton
                    colorText="#31455E"
                    name="LAAT ZIEN"
                    onClick={() => forgotPass()}
                  />
                  <View style={cs.nextModalIconWrapper}>
                    <Icon
                      name="chevron-right"
                      color="white"
                      size={12}
                      style={{marginLeft: 8, marginTop: 5}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Row>
            <View style={cs.loginModalFooterWrapper}>
              <Col style={cs.textLogoWrapper}>
                <Text style={cs.textLogo}>Een project van </Text>
              </Col>
              <Col style={cs.imageLogoWrapper}>
                <Image
                  source={require('./../assets/images/common/NT2student_logo.png')}
                />
              </Col>
            </View>
          </Row>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={false}
        visible={toggleModal}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        // }}
      >
        <View style={cs.modalCustomize}>
          <Text style={cs.titleModal}>Inloggen</Text>

          <View style={cs.loadModalBox}>
            <View style={cs.modalContainer}>
              <TouchableHighlight
                onPress={() => updateToggleModal(false)}
                style={cs.closeIcon}>
                <Icon
                  name="close"
                  color="white"
                  size={14}
                  style={{marginLeft: 6, marginTop: 4}}
                />
              </TouchableHighlight>
              <View style={cs.textLoginModalContainer}>
                <Text style={cs.textInfoModalLogin}>Gebruikersnaam</Text>
                {data ? (
                  <Text style={cs.subtextInfoModalLogin}>
                    {data.FLD_USERNAME}
                  </Text>
                ) : null}
              </View>
              <View style={cs.textLoginModalContainer}>
                <Text style={cs.textInfoModalLogin}>Wachtwoord</Text>
                {data ? (
                  <Text style={cs.subtextInfoModalLogin}>{PASS2}</Text>
                ) : null}
              </View>
            </View>
          </View>
          <Row>
            <View style={cs.loginModalFooterWrapper}>
              <Col style={cs.textLogoWrapper}>
                <Text style={cs.textLogo}>Een project van </Text>
              </Col>
              <Col style={cs.imageLogoWrapper}>
                <Image
                  source={require('./../assets/images/common/NT2student_logo.png')}
                />
              </Col>
            </View>
          </Row>
        </View>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    forgotPass: state.api.forgotPass,
  };
};

export default connect(mapStateToProps)(KnowModal);
