/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';

export default class SchoolMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {} = this.props;
    return (
      <ScrollView>
        <View>
          <Text style={cs.archiveText}>
            Hieronder staan alle berichten van je docent. Hier kun je alles
            makkelijk teruglezen.
          </Text>
          <View style={cs.messageContainer}>
            <View style={cs.chatWrapper}>
              <View style={cs.infoSenderMessage}>
                <Image
                  style={cs.messageProfile}
                  source={require('./../assets/images/student/message/kt-test.png')}
                />
                <Text style={cs.messageProfileName}>ONA Cursus</Text>
              </View>
              <Text style={cs.messageText}>
                Er gaat een nieuwe ONA cursus beginnen in December 2019. Geef
                jezelf op! ...
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                  this.props.navigation.navigate('ReadMessage');
                }}>
                <Text style={cs.moreBtn}>lees meer...</Text>
              </TouchableOpacity>
              <View style={cs.messageBoxTriangle} />
            </View>
          </View>
          <View style={cs.messageDateWrapper}>
            <Text style={cs.messageDateText}>Geplaatst op 05-10-2018</Text>
          </View>
          <View style={cs.messageContainer}>
            <View style={cs.chatWrapper}>
              <View style={cs.infoSenderMessage}>
                <Image
                  style={cs.messageProfile}
                  source={require('./../assets/images/student/message/kt-test.png')}
                />
                <Text style={cs.messageProfileName}>Extra Training</Text>
                <Image
                  style={cs.messageImg}
                  source={require('./../assets/images/student/message/kn_nieuwlogo_2017_topgoed.png')}
                />
              </View>
              <Text style={cs.messageText}>
                Er gaat een nieuwe training beginnen in augustus 2018. Geef
                jezelf op! ...
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ReadMessage');
                }}
                style={{alignSelf: 'flex-end'}}>
                <Text style={cs.moreBtn}>lees meer...</Text>
              </TouchableOpacity>
              <View style={cs.messageBoxTriangle} />
            </View>
          </View>
          <View style={cs.messageDateWrapper}>
            <Text style={cs.messageDateText}>Geplaatst op 05-10-2018</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
