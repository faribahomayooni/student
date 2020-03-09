import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {commonStyle as cs} from './../styles/common/styles';
import BlankMessage from './../components/BlankMessage';
import Archive from './../components/Archive';
import SchoolMessage from './../components/SchoolMessage';
import Footer from '../components/Footer';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.FirstRoute = this.FirstRoute.bind(this);
    this.SecondRoute = this.SecondRoute.bind(this);
    this.ThirdRoute = this.ThirdRoute.bind(this);
  }
  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'NIEUW'},
      {key: 'second', title: 'ARCHIEF'},
      {key: 'third', title: 'SCHOOL'},
    ],
  };

  FirstRoute = () => (
    <View>
      <BlankMessage navigation={this.props.navigation} />
    </View>
  );
  SecondRoute = () => (
    <View>
      <Archive navigation={this.props.navigation} />
    </View>
  );
  ThirdRoute = () => (
    <View>
      <SchoolMessage navigation={this.props.navigation} />
    </View>
  );

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 150 : 0,
                ),
              }),
            ),
            0,
            0,
          );

          return (
            <TouchableOpacity
              style={
                route.title === 'ARCHIEF' ? styles.tabItem3 : styles.tabItem
              }
              onPress={() => this.setState({index: i})}>
              <Animated.Text style={({color}, styles.tabStyle)}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
    third: this.ThirdRoute,
  });

  render() {
    return (
      <View style={cs.mainContainer}>
        <TabView
          // navigation={this.props.navigation}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
        {/* <Footer navigation={this.props.navigation} activeTab={'Message'} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 2,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 10,
    marginLeft: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  tabItem3: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  tabStyle: {
    color: '#D4D4D4',
    fontSize: 19,
    fontWeight: '600',
  },
});
