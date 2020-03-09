/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingItem(props) {
  return (
    <>
      {!props.nameIcon !== 'nothing' ? (
        <TouchableOpacity
          style={cs.infoSenderMessage}
          onPress={() =>
            props.navigation.navigate(`${props.routeNavigationName}`, {
              title: props.title,
              desc: props.desc,
              image: props.settingImg,
              personData: props.personData,
              infoData: props.infoData,
              addressData: props.addressData,
              emailSetting: props.emailSetting,
              basicListData: props.basicListData,
              appSettingData: props.appSettingData,
            })
          }>
          <Image
            source={props.settingImg}
            style={{borderRadius: 60 / 2, width: 60, height: 60}}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={cs.iconSettingName}>{props.title}</Text>
            <Text style={cs.iconSettingDesc}>{props.desc}</Text>
          </View>
          <View style={cs.settingIconChevron}>
            <Icon
              name={props.nameIcon}
              color="#8FAEC6"
              size={35}
              style={{marginLeft: 8, marginTop: 0}}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(SettingItem);
