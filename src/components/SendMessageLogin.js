/* eslint-disable react-native/no-inline-styles */
import React, {Component, useEffect, useState} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Image,
} from 'react-native';
import {ModalButton} from '../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../styles/common/styles';
import {Row, Col, Picker} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SendMessage = props => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      toggle={props.toggle}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={cs.modalCustomize}>
        <Text style={cs.titleModal}>Inloggen</Text>

        <View style={cs.loadModalBox}>
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
              <Text style={cs.textModalLogin}>Stuur Knoester Trainingen</Text>
              <Text style={cs.textModalLogin}>een bericht.</Text>
            </View>
            {/* <View style={{marginTop: 40, marginBottom: 30}}>
              <ModalButton name="Schrijf hier je naam" colorText="#D4D4D4" />
            </View> */}
            {/* <View style={{marginTop: -25, marginBottom: 30}}>
              <ModalButton
                colorText="#31455E"
                name="wil graag nogmaals de inloggegevens ontvangen."
                subText="Alvast hartelijk bedankt."
              />
            </View> */}
            {/* <View style={{marginTop: -25, marginBottom: 30}}>
              <ModalButton
                name="Schrijf hier je e-mailadres"
                colorText="#D4D4D4"
              />
            </View>
            <ModalButton
              colorText="#31455E"
              name="BERICHT VERSTUREN"
              onClick={() => props.navigation.navigate('Home')}
            />
            <View style={cs.nextPopUpIconWrapper}>
              <Icon
                name="chevron-right"
                color="white"
                size={12}
                style={{marginLeft: 8, marginTop: 5}}
              />
            </View> */}
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
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(SendMessage);
