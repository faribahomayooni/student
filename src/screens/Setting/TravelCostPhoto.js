/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {commonStyle as cs} from '../../styles/common/styles';
import {View, ScrollView} from 'react-native';
import {Button} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiActions} from '../../actions';
import NavigationService from '../../../src/routers/NavigationService';

const PhotoPopUp = props => {
  const id = props.navigation.getParam('id');
  const costTypeId = props.navigation.getParam('costTypeId');
  // const date = props.navigation.getParam('date');
  const date = '2020/02/04';
  const costFile = props.navigation.getParam('costFile');
  const costFileName = props.navigation.getParam('costFileName');
  const studentId = props.navigation.getParam('studentId');

  const addTravelCost = () => {
    console.warn('costTypeId', costTypeId);
    console.warn('date', date);
    props.dispatch(
      apiActions.addTravelCost(
        id,
        costTypeId,
        date,
        costFile,
        costFileName,
        studentId,
      ),
    );
  };
  
  const cancel = () => {
    NavigationService.navigate('Home');
  };
  return (
    <ScrollView>
      <View style={cs.mainContainer}>
        <View style={cs.textLoginContainer}>
          <View style={cs.ImageSectionsZone}>
            <View>{props.navigation.getParam('renderFileData')}</View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}} />
          <View>
            <Button
              colorButton="#CD51C9"
              name="UPLOAD"
              onClick={addTravelCost}
            />
            <View style={cs.nextIconPresenceWrapper}>
              <Icon
                name="chevron-right"
                color="white"
                size={12}
                style={{marginLeft: 8, marginTop: 5}}
              />
            </View>
          </View>
          <View>
            <Button colorButton="#5467fd" name="ANNULEER" onClick={cancel} />
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
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(PhotoPopUp);
