import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import {commonStyle as cs} from './../styles/common/styles';
import {commonStyle as cs} from '../styles/common/styles';

export default class Archive extends Component {
  render() {
    return (
      <ScrollView>
        <View>
          {/* <Text style={cs.noMessageTitle}>Geen berichten</Text>
        <Text style={cs.noMessageSecondTitle}>Je hebt alles gelezen!</Text> */}
          <Text style={cs.archiveText}>
            Hieronder staan alle berichten van je docent. Hier kun je alles
            makkelijk teruglezen.
          </Text>
          <View style={cs.messageContainer}>
            <TouchableOpacity style={cs.chatWrapper}>
              <View style={cs.infoSenderMessage}>
                <Image
                  style={cs.messageProfile}
                  source={require('./../assets/images/student/message/NoPath.png')}
                />
                <Text style={cs.messageProfileName}>Jannie Make</Text>
              </View>
              <Text style={cs.messageText}>
                Li Europan lingues es membres del sam familie. Lor separat
                existentie es un myth. Por scientie, musica, sport etc, litot
                Europa usa li sam vocabular. Li lingues differe solmen in li
                grammatica, …..
              </Text>
              <View style={cs.messageBoxTriangle} />
            </TouchableOpacity>
          </View>
          <View style={cs.messageDateWrapper}>
            <Text style={cs.messageDateText}>Geplaatst op 05-10-2018</Text>
          </View>
          <View style={cs.messageContainer}>
            <TouchableOpacity style={cs.chatWrapper}>
              <View style={cs.infoSenderMessage}>
                <Image
                  style={cs.messageProfile}
                  source={require('./../assets/images/student/message/NoPath-kopie.png')}
                />
                <Text style={cs.messageProfileName}>Jannie Make</Text>
              </View>
              <Text style={cs.messageText}>
                Huiswerk is blz. 12, 13, 14 Volgende week toets thema 3
              </Text>
              <View style={cs.messageBoxTriangle}></View>
            </TouchableOpacity>
          </View>
          <View style={cs.messageDateWrapper}>
            <Text style={cs.messageDateText}>Geplaatst op 05-10-2018</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
