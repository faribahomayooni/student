import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {commonStyle as cs} from '../styles/common/styles';

export default class BlankMessage extends Component {
  render() {
    return (
      <View>
        <Text style={cs.noMessageTitle}>Geen berichten</Text>
        <Text style={cs.noMessageSecondTitle}>Je hebt alles gelezen!</Text>
        <Text style={cs.noMessageText}>
          Er zijn op dit moment geen nieuwe berichten van de school of je
          docent.
        </Text>
      </View>
    );
  }
}
