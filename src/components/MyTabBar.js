import React ,{useState}from 'react'
import {Image,View,Text,AsyncStorage} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import {connect} from 'react-redux';


//  function MyTabBar(screenProps) {
  class MyTabBar extends React.Component{
    state={
      messageCounter:0
    }
    // const [count, setCount] = useState(0);
    // Declare a new state variable, which we'll call "count"

componentDidMount=async()=>{
  var data=await AsyncStorage.getItem('@notification')
  this.setState({messageCounter:data})
  console.warn("********************* react navigation icons",this.state.messageCounter)

}
  
      
     
    
render(){
  console.warn(this.props.notification.length,"**** this is notification lenght")
  return  ( 
    // focused ? (
    //   <Image
    //     style={{tintColor: global.brandColor, padding: 15, margin: 10}}
    //     source={require('./../assets/images/common/edit001-E069-active.png')}
    //   />
    // ) : (
    //   <Image
    //     style={{padding: 15, margin: 10}}
    //     source={require('./../assets/images/common/edit001-E069.png')}
    //   />
    // ))
    <View>
     
     {this.props.notification.length!==0  ?<IconBadge
        MainElement={<Image
          style={{padding: 15, margin: 10}}
          source={require('./../assets/images/common/mail001-E02D.png')}
        /> }
        BadgeElement={<Text style={{ color: 'white'}}>{ this.props.notification.length}</Text>}
      />:
      <Image
         style={{tintColor: global.brandColor}}
              source={require('./../assets/images/common/mail001-E02D.png')}
            />
        }
    </View>
  );
    }
  }
  const mapStateToProps = state => {
    // console.warn(state,"stateaaaaaaaaaaaaaaaaaaaaaaaa")
    
   
   return { loadBasicList: state.api.loadBasic,
           notification:state.notification,
           GroupStudent:state.GroupStudent
          }
  };

  export default connect(mapStateToProps)(MyTabBar);
// export default MyTabBar