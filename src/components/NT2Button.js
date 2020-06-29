/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../../src/styles/common/styles';
import {View, Picker} from 'react-native';
import {Button} from '../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
const NT2Button = props => {
  const [selected, changeSelected] = useState('');
  React.useEffect(() => {
    // props.getGroup(selected);
  }, [selected, props]);

  
  const Item = Picker.Item;
  console.warn("__________________________________+++***********************",selected);
  return (
    <View style={{...props.style}} >
        <View style={{marginTop: 0}}>
            <Button
              colorButton={props.Color}
              name={props.name}
              onClick={() => {
            //   console.warn("!!!!!!!!!!!!!!!!!!",this.props.navigation)
                  props.navigation.navigate(props.route, {
                     
                    })
                 
              }}
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
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(NT2Button);
