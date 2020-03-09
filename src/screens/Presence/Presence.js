/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import Progress from './../../components/Progress';
import CalendarsScreen from './../../components/calendar';
import {Row, Col} from 'native-base';
import {Button} from './../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';

class Presence extends Component {
  constructor(props) {
    let myDate = new Date();

    super(props);
    this.state = {
      date: {
        // year: 2018,
        // month: 3,
        // day: 1,
        // timestamp: 1519862400000,
        // dateString: '2018-03-01',
        year: 2018,
        month: 3,
        day: 1,
        timestamp: 1519862400000,
        dateString: '2018-03-01',
      },
    };
    this.getMonthFunction = this.getMonthFunction.bind(this);
  }
  getMonthFunction = month => {
    this.setState({
      date: month,
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={cs.mainContainer}>
          <View style={cs.profileInfo} />
          <View>
            <Text style={cs.titleMyPresence}>Samenvatting</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={cs.progressText}>
              <Text style={cs.BoldProgressInfo}>Rania</Text>
              <Text style={cs.RegularProgressInfo}>, je bent</Text>
            </Text>
            <Progress />
            <Text style={cs.progressBottomText}> van de lessen</Text>
            <Text style={cs.progressBottomText}> aanwezig geweest.</Text>
            <View style={cs.calendarsWrapper}>
              {/* <View> */}
              <TouchableOpacity
                // onPress={() =>
                //   this.props.navigation.navigate('PresenceCalendar')
                // }
                onPress={() => {
                  console.log(this.state.date);
                  this.props.navigation.navigate('PresenceCalendar', {
                    date: this.state.date,
                  });
                }}
                style={{width: '100%'}}>
                <CalendarsScreen
                  getMonth={this.getMonthFunction}
                  navigation={this.props.navigation}
                />
              </TouchableOpacity>
              {/* </View> */}
            </View>
            {/* <View
              style={{
                width: '100%',
                marginBottom: 20,
              }}>
              <Button
                name="Meer info"
                colorButton="#CD51C9"
                onClick={() =>
                  this.props.navigation.navigate('PresenceCalendar')
                }
              />
              <View style={cs.nextIconPresenceWrapper}>
                <Icon
                  name="chevron-right"
                  color="white"
                  size={12}
                  style={{marginLeft: 8, marginTop: 5}}
                />
              </View>
            </View> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Presence);
