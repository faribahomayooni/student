/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import SettingItem from '../../components/SettingItem';

class HelpCentre extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollView>
        <View style={cs.mainContainer}>
          <View style={cs.pageTitleWrapper}>
            <Text style={cs.pageTitle}>Helpcentrum</Text>
            <View style={cs.settingContainer}>
              <View style={cs.settingWrapper}>
                <SettingItem
                  routeNavigationName="HelpCentreOpen"
                  navigation={this.props.navigation}
                  title="Situatie 1"
                  desc="Ik kan niet inloggen!!"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/data-visualization.png')}
                />
                <SettingItem
                  routeNavigationName="HelpCentreOpen"
                  navigation={this.props.navigation}
                  title="Situatie 2"
                  desc="Wat is mijn wachtwoord?"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/anxiety.png')}
                />
                <SettingItem
                  routeNavigationName="HelpCentreOpen"
                  navigation={this.props.navigation}
                  title="Situatie 3"
                  desc="Hoe stuur ik reiskosten op!?"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/rating.png')}
                />
                <SettingItem
                  routeNavigationName="HelpCentreOpen"
                  navigation={this.props.navigation}
                  title="Situatie 4"
                  desc="Hoe werkt de presentielijst?"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/okay.png')}
                />
                <SettingItem
                  routeNavigationName="HelpCentreOpen"
                  navigation={this.props.navigation}
                  title="Situatie 5"
                  desc="Ik kan niet komen, wat nu?"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/conversation.png')}
                />
                <View style={{margin: 10, alignItems: 'center'}}>
                  <Text
                    style={{color: '#31455E', fontSize: 13, fontWeight: '700'}}>
                    - LAAT MEER ZIEN -
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(HelpCentre);
