/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, Image} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
function HelpCentreOpen(props) {
  return (
    <ScrollView>
      <View style={cs.mainContainer}>
        <View style={{alignSelf: 'center'}}>
          <Text style={cs.pageTitle}>Helpcentrum</Text>
        </View>
        <View style={cs.settingContainer}>
          <View style={cs.settingWrapper}>
            <View style={cs.helpCentreDetail}>
              <Image
                source={props.navigation.getParam('image')}
                style={{borderRadius: 60 / 2, width: 60, height: 60}}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={cs.iconSettingName}>
                  {props.navigation.getParam('desc')}
                </Text>
                <Text style={cs.helpCentreDesc}>Hoe kan ik dit oplossen?</Text>
              </View>
            </View>
            <View style={{marginTop: 10, paddingRight: 20, paddingLeft: 20}}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 20,
                  color: '#707070',
                }}>
                The quick, brown fox jumps over a lazy dog. DJs flock by when
                MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog,
                flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex!
                Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt
                fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs
                vex bold Jim. Quick zephyrs blow, vexing daft Jim. Charged
                foppers
              </Text>
            </View>
            <View style={{margin: 10, alignItems: 'center'}}>
              <Text style={{color: '#31455E', fontSize: 13, fontWeight: '700'}}>
                - LAAT MEER ZIEN -
              </Text>
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

export default connect(mapStateToProps)(HelpCentreOpen);
