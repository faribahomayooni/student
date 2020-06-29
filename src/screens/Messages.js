import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {commonStyle as cs} from './../styles/common/styles';
import BlankMessage from './../components/BlankMessage';
import Archive from './../components/Archive';
import SchoolMessage from './../components/SchoolMessage';
import {connect} from 'react-redux';
import Footer from '../components/Footer';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.FirstRoute = this.FirstRoute.bind(this);
    this.SecondRoute = this.SecondRoute.bind(this);
    this.ThirdRoute = this.ThirdRoute.bind(this);
  }
  state = {
    index: 0,
    currentRoute:"first",
    routes: [
      {key: 'first', title:this.props.TypeSign==="teacher"?'STUUR': 'NIEUW'},
      {key: 'second', title:this.props.TypeSign==="teacher"? 'NIEUW':'ARCHIEF'},
      {key: 'third', title:this.props.TypeSign==="teacher"? 'ARCHIEF':'SCHOOL'},
    ],
  };

 

  FirstRoute = () => (
    this.props.TypeSign==="teacher"?
    <View>
      <BlankMessage navigation={this.props.navigation} />
    </View>:
    <View>
    <BlankMessage navigation={this.props.navigation} />
  </View>

  );
  SecondRoute = () => (
    this.props.TypeSign==="teacher"?
    <View>
       <BlankMessage navigation={this.props.navigation} />
    </View>:
     <View>
     <Archive navigation={this.props.navigation} />
   </View>
  );
  ThirdRoute = () => (
    this.props.TypeSign==="teacher"?
    <View>
      <SchoolMessage navigation={this.props.navigation} />
    </View>:
    <View>
    <SchoolMessage navigation={this.props.navigation} />
  </View>
  );
  

  _handleIndexChange = index => this.setState({index});
  onpresstabs=(i)=>{
    this.setState({index: i})
  
    const currentRoute =  this.state.routes[i].key;
    // console.warn("%%%current rouyes",currentRoute)
    this.setState({
      currentRoute:currentRoute
    });
  }

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
              style={{
               backgroundColor : '#FFFFFF',
              //  backgroundColor: '#FFFFFF',
               flex: 1,
               alignItems: 'center',
               padding: 10,
               borderLeftWidth: 1,
               borderRightWidth: 1,
               borderColor: '#eee',
            
              }}
              onPress={() =>this.onpresstabs(i)}>
              <Animated.Text style={{color:(this.state.currentRoute === route.key) ? '#293A54' : 'lightgray', borderRadius: 12,
               marginRight: 10,
               marginLeft: 10,}}>
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
          activeColor="blue"
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


const mapStateToProps = state => {
  return {
    TypeSign:state.TypeSign
  };
};

export default connect(mapStateToProps)(Messages);