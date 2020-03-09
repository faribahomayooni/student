/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, Image, Linking} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import {Button} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Pdf from 'react-native-pdf';

function Privacy(props) {
  const settingData = props.navigation.getParam('appSettingData');
  const openURL = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };
  return (
    <ScrollView>
      <View style={cs.mainContainer}>
        {/* <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={cs.pdf}
        /> */}
        <View style={{alignItems: 'center'}}>
          <Text style={cs.pageTitle}>{props.navigation.getParam('title')}</Text>
          <Text style={cs.subTitleSettingPage}>
            Download hieronder het privacy- en klachtenreglement.
          </Text>
        </View>
        <View style={cs.settingContainer}>
          <View style={cs.settingWrapper}>
            <View style={cs.helpCentreDetail}>
              <Image
                source={require('./../../assets/images/student/setting/privacy-policy.png')}
                style={{borderRadius: 60 / 2, width: 60, height: 60}}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={cs.privacyTitle}>
                  Download hier het privacyreglement
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                margin: 20,
                paddingRight: 20,
                paddingLeft: 20,
                width: '100%',
              }}>
              <Button
                onClick={() => {
                  openURL(
                    `${global.url}app/setting/prv-${settingData[0].FLD_privacy_regulations_file}`,
                  );
                }}
                name="DOWNLOAD"
                colorButton="#5467fd"
              />
              <View style={cs.nextIconSettingWrapper}>
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
        <View style={cs.settingContainer}>
          <View style={cs.settingWrapper}>
            <View style={cs.helpCentreDetail}>
              <Image
                source={require('./../../assets/images/student/setting/privacy-policy(1).png')}
                style={{borderRadius: 60 / 2, width: 60, height: 60}}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={cs.privacyTitle}>
                  Download hier het klachtenreglement
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                margin: 20,
                paddingRight: 20,
                paddingLeft: 20,
                width: '100%',
              }}>
              <Button
                onClick={() => {
                  openURL(
                    `${global.url}app/setting/cmp-${settingData[0].FLD_Complaints_procedure_file}`,
                  );
                }}
                name="DOWNLOAD"
                colorButton="#5467fd"
              />
              <View style={cs.nextIconSettingWrapper}>
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
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Privacy);
