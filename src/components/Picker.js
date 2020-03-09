/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../../src/styles/common/styles';
import {View, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const PickerScreen = props => {
  const [selected, changeSelected] = useState('');
  React.useEffect(() => {
    props.getGroup(selected);
  }, [selected, props]);

  let data = [];
  if (props.data) {
    data = props.data;
  }
  const Item = Picker.Item;
  console.log(props.data);
  return (
    <View style={cs.pickerContainer}>
      <Picker
        placeholder="Selecteer type kosten"
        style={cs.pickerWrapper}
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        selectedValue={selected}
        onValueChange={changeSelected}
        itemStyle={{backgroundColor: '#5467FD'}}>
        {data
          ? data.map(item => {
              return (
                <Item
                  color="#fff"
                  label={item.FLD_GROUP_NAME}
                  // value={item.FLD_FK_GROUP}
                  // value={item.FLD_GROUP_NAME}
                  value={item}
                />
              );
            })
          : ''}
      </Picker>
      <View style={cs.dropDownBtn}>
        <Icon
          name="chevron-down"
          color="white"
          size={12}
          style={{marginLeft: 5, marginTop: 5}}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(PickerScreen);
