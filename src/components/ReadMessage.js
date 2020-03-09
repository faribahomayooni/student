import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../styles/common/styles';

function ReadMessage(props) {
  return (
    <View style={{backgroundColor: '#F2F3F7'}}>
      <View style={cs.messageContainer}>
        <View style={cs.chatWrapper}>
          <View style={cs.infoSenderMessage}>
            <Image
              style={cs.messageProfile}
              source={require('./../assets/images/student/message/kt-test.png')}
            />
            <Text style={cs.messageProfileName}>Jannie Make</Text>
          </View>
          <Text style={cs.messageText}>
            Er gaat een nieuwe ONA cursus beginnen in December 2019. Geef jezelf
            op!
          </Text>
          <Text style={cs.messageText}>
            De cursus is de laatste van dit jaar. Er is plaats voor 12 cursisten
            maximaal.
          </Text>
          <Text style={cs.messageText}>
            Wees er snel bij! Reserveer hieronder je plaats.{' '}
          </Text>

          <TouchableOpacity style={cs.reserveBtnText}>
            <Text style={cs.reserveBtn}>
              Ik geef me op! Reserveer mijn plaats
            </Text>
          </TouchableOpacity>
          <View style={cs.messageBoxTriangle} />
        </View>
      </View>
      <View style={cs.messageDateWrapper}>
        <Text style={cs.messageDateText}>
          Geplaatst op 05-10-2019 door Hein
        </Text>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(ReadMessage);
