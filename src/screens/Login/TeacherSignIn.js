/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {commonStyle as cs} from '../../styles/common/styles';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Row, Col} from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import {InputField, Button, Header} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
var schoolOptions = [
  'De Taalkans',
  'Toekomst jaren',
  'Knoester Trainingen',
  'Cancel',
];

class TeacherSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.actionSheet = null;
    this.signIn = this.signIn.bind(this);
  }
  signIn() {
    this.props.navigation.navigate('Home');
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  // showActionSheet() {
  //   if (this.actionSheet !== null) {
  //     // Call as you would ActionSheet.show(config, callback)
  //     this.actionSheet._root.showActionSheet(
  //       {
  //         options: schoolOptions,
  //         cancelButtonIndex: CANCEL_INDEX,
  //         destructiveButtonIndex: DESTRUCTIVE_INDEX,
  //         title: 'Selecteer uw school',
  //       },
  //       buttonIndex => {
  //         this.setState({clicked: schoolOptions[buttonIndex]});
  //       },
  //     );
  //   }
  // }
  state = {user: ''};
  updateUser = user => {
    this.setState({user: user});
  };
  render() {
    let {
      username,
      password,
      rememberMe,
      emailActive,
      passwordActive,
    } = this.state;
    return (
      <View style={cs.mainContainer}>
        <View style={cs.columnContainer}>
          <Header name={'Inloggen'} />
        </View>

        <View style={cs.textLoginContainer}>
          <Text style={cs.textLogin}>Vul hier uw</Text>
          <Text style={cs.textLogin}>logingegevens in.</Text>
        </View>

        <View style={cs.inputsWrapper}>
          <InputField
            // heading="Email address"
            onfocus={() => {
              this.setState({emailActive: true, passwordActive: false});
            }}
            value={username}
            active={emailActive}
            keyboard={'email-address'}
            reference={component => (this.email = component)}
            placeholder="Uw e-mailadres"
            onSubmit={() => this.password.focus()}
            onChange={username => this.setState({username})}
          />
          <View style={cs.borderBottom} />
          <InputField
            // heading="Password"
            onfocus={() => {
              this.setState({passwordActive: true, emailActive: false});
            }}
            value={password}
            active={passwordActive}
            secure={true}
            placeholder="Uw wachtwoord"
            reference={component => (this.password = component)}
            onSubmit={() => {
              this.setState({passwordActive: false});
            }}
            onChange={password => this.setState({password})}
          />
          <Image
            style={cs.passEye}
            source={require('./../../assets/images/common/eye.png')}
          />
        </View>

        <View style={cs.columnContainer}>
          <View style={cs.rowContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={value => {
                this.setState({rememberMe: value});
              }}
              tintColors={{true: '#5467fd'}}
              style={cs.checkboxCustom}
            />
            <Text style={cs.checkEmailText}>
              E-mailadres onthouden op deze computer
            </Text>
          </View>
          <View style={cs.textLoginContainer}>
            <Text style={cs.textSelection}>Kies hier uw school</Text>
          </View>
          <View style={cs.selectionWrapper}>
            <TouchableOpacity onPress={this.showActionSheet}>
              <ActionSheet
                ref={o => (this.ActionSheet = o)}
                title={'Selecteer uw school'}
                options={schoolOptions}
                cancelButtonIndex={3}
                destructiveButtonIndex={1}
                onPress={index => {
                  /* do something */
                }}
              />
              <Text style={cs.selectionInputText}> Selecteer uw school</Text>

              <View style={cs.selectIconWrapper}>
                <Icon
                  name="chevron-down"
                  color="#fff"
                  size={12}
                  style={{marginLeft: 5, marginTop: 4}}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Button
              colorButton="#5467fd"
              name="INLOGGEN"
              onClick={() => this.signIn()}
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
        <Row>
          <View style={cs.loginFooterWrapper}>
            <Col style={cs.textLogoWrapper}>
              <Text style={cs.textLogo}>Een project van </Text>
            </Col>
            <Col style={cs.imageLogoWrapper}>
              <Image
                source={require('./../../assets/images/common/NT2student_logo.png')}
              />
            </Col>
          </View>
        </Row>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(TeacherSignIn);
