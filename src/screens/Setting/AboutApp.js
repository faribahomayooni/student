/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import {Row, Col} from 'native-base';

function AboutApp(props) {
  return (
    <ScrollView>
      <View style={cs.mainContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/student/setting/NT2student_logo.png')}
          />
        </View>
        <View style={cs.settingContainer}>
          <View style={cs.settingWrapper}>
            <View
              style={{
                marginTop: 10,
                margin: 20,
                paddingRight: 20,
                paddingLeft: 20,
                width: '100%',
              }}>
              <Text style={cs.mySchoolDesc}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </Text>
            </View>
            <Row style={{marginTop: -15}}>
              <Col>
                <View
                  style={{
                    paddingLeft: 20,
                    marginBottom: 20,
                  }}>
                  <Text style={cs.mySchoolDesc}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren
                  </Text>
                </View>
              </Col>
              <Col>
                <View
                  style={{
                    // paddingLeft: 20,
                    marginBottom: 20,
                    marginLeft: 20,
                    marginTop: 7,
                  }}>
                  <Image
                    source={require('./../../assets/images/student/setting/Tekengebied1.png')}
                  />
                </View>
              </Col>
            </Row>
            <Row style={{marginTop: -10, marginBottom: 15}}>
              <TouchableOpacity
                title="Click me"
                onPress={() => {
                  Linking.openURL('http://nt2student.nl');
                }}>
                <Text
                  style={{color: '#92C29F', fontSize: 20, fontWeight: '700'}}>
                  www.nt2student.nl
                </Text>
              </TouchableOpacity>
            </Row>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(AboutApp);
