/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Container, Tab, Tabs, StyleProvider} from 'native-base';
import TeacherSignIn from './../Login/TeacherSignIn';
import StudentSignIn from './../Login/StudentSignIn';
import {connect} from 'react-redux';
import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
class SignIn extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container>
          <Tabs tabBarUnderlineStyle={{borderBottomWidth: 2}}>
            <Tab
              tabStyle={{backgroundColor: '#fff'}}
              textStyle={{color: '#D4D4D4'}}
              activeTabStyle={{backgroundColor: '#fff'}}
              activeTextStyle={{color: '#31455E', fontWeight: 'normal'}}
              heading="STUDENT INLOGGEN">
              <StudentSignIn navigation={this.props.navigation} />
            </Tab>
            <Tab
              heading="DOCENT INLOGGEN"
              tabStyle={{backgroundColor: '#fff'}}
              textStyle={{color: '#D4D4D4'}}
              activeTabStyle={{backgroundColor: '#fff'}}
              activeTextStyle={{color: '#31455E', fontWeight: 'normal'}}>
              <TeacherSignIn navigation={this.props.navigation} />
            </Tab>
          </Tabs>
        </Container>
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(SignIn);
