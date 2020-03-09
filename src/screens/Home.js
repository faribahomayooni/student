import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import DashboardBox from '../components/DashboardBox';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={cs.mainContainer}>
        <DashboardBox navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.api.user,
  };
};
export default connect(mapStateToProps)(Home);
