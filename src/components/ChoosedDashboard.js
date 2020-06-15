/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View,StyleSheet, Dimensions,ScrollView,TouchableOpacity,Image,AsyncStorage,ToastAndroid} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import {getnotification} from '../actions/notificationAction';
import {getGroupStudent} from '../actions/TravelcostAction'
import {connect} from 'react-redux';
import axios from 'axios';

const {width,height}=Dimensions.get("window")
class DashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state={
        typeTemplate:"Transfrom",
        Items:[]
    }
  }

async componentDidMount() {
  const {selectedItems} =this.props.navigation.state.params
  selectedItems.filter(obj=>{console.warn(obj.index),this.state.Items.push(obj.index)})
  console.warn("jdfkjdfskdfg",this.state.Items)
  
  }

  submitDashboard=async()=>{

   console.warn("44444444444444444444444444444444444")
    const {typeTemplate}=this.props.navigation.state.params
 
    axios
      .post(global.url + 'api/teacher/saveDashboard',
      {
        layoutId:(typeTemplate=="TwoRow" && 1)  || (typeTemplate==="ThreeRow" && 2) || (typeTemplate==="default"  && 3)  || (typeTemplate==="Transfrom" && 4),
        
        icons:JSON.stringify(this.state.Items) 
      },
       {    
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },    
      })
      .then(res => {
        console.warn('===>res for save dashboardType', res.data);
        if (res.data.msg === 'success') {
          ToastAndroid.show(
            'youre dashboard saved sucessfully',
            ToastAndroid.SHORT,
          );
        this.props.navigation.navigate("Home",{resetSelected:true})

        }
        if (res.data.msg === 'fail') {
          // console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        console.warn('error for save Dahboard', error);
      });
  }

  render() {
    const {typeTemplate}=this.props.navigation.state.params
   var  icons=JSON.stringify(this.state.Items) 
    console.warn(typeTemplate,layoutId)
  var  layoutId=(typeTemplate=="TwoRow" && 1)  || (typeTemplate==="ThreeRow" && 2) || (typeTemplate==="default"  && 3)  || (typeTemplate==="Transfrom" && 4)
  console.warn("2222222222222222222",typeTemplate,layoutId,icons)
    return (
      <View style={{alignItems:"center",padding:15}}>
        
        <ScrollView>
              <View style={{justifyContent:"space-around",marginTop:10,}}>
                          {this.props.navigation.state.params.typeTemplate==="TwoRow" && <View style={{marginTop:width/5}} >
                              
                                <View style={[cs.pairBox]}>
                                        <View
                                    
                                          style={[cs.boxesWrapper,{width:width*0.70}]}>
                                            <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[0].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[0].ImageText}</Text>
                                        </View>
                                </View>
                                 <View  style={[cs.pairBox,{marginTop:10}]}>
                                        <View
                                    
                                        style={[cs.boxesWrapper,{width:width*0.70}]}>
                                          <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[1].ImageText}</Text>
                                        </View>
                                 </View> 
                            </View> }
                      {this.props.navigation.state.params.typeTemplate==="ThreeRow" &&  <View  style={{marginBottom:width*0.15}}>
                           
                            <View style={[cs.pairBox]}>
                                    <View
                                    style={[cs.boxesWrapperthree]}>
                                      <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[0].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[0].ImageText}</Text>
                                    </View>
                            </View>
                                <View style={[cs.pairBox]}>
                                    <View
                                
                                style={[cs.boxesWrapperthree]}>
                                      <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[1].ImageText}</Text>
                                    </View>
                                </View> 
                                <View style={[cs.pairBox]}>
                                    <View
                                    style={[cs.boxesWrapperthree]}>
                                      <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[2].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[2].ImageText}</Text>
                                    </View>
                                </View> 
                        </View> }
                    
                  <View>
                
                   {this.props.navigation.state.params.typeTemplate==="default"  &&
                   <View >
                   
                         <View style={cs.boxesWrapper}>
                                  <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[0].imageName} />
                                   <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[0].ImageText}</Text>
                         </View>
                         <View style={[cs.pairBox,{width:width*0.80}]}>
                                <View
                               
                                style={[cs.boxesPairWrapper,{width:width*0.20}]}>
                                  <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[1].ImageText}</Text>
                                </View>
                                <View
                               
                                style={cs.boxesPairWrapper}>
                                      <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[2].imageName} />
                                      <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[2].ImageText}</Text>
                                </View>
                          </View>
                            <View style={cs.pairBox}>
                                <View style={cs.boxesPairWrapper}>
                                        <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[3].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[3].ImageText}</Text>
                                </View>
                              { this.props.navigation.state.params.selectedItems.length>4 &&  <View
                               
                                style={cs.boxesPairWrapper}>
                                  <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[4].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[4].ImageText}</Text>
                                </View>}
                            </View> 
                      </View> }
                
                     {this.props.navigation.state.params.typeTemplate==="Transfrom"  &&
                     <View >
                      
                         <View style={[cs.pairBox,{width:width*0.80}]}>
                                <View 
                                style={[cs.boxesPairWrapper,{  transform: [
                               
                                   { rotateZ: "-20deg" }
                                  ]}]}>
                                            <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[0].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[0].ImageText}</Text>
                                </View>
                                <View
                               style={[cs.boxesPairWrapper,{  transform: [
                             
                               { rotateZ: "15deg" }
                              ],marginTop:20,marginLeft:15}]}>
                                          <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[1].ImageText}</Text>
                                </View>
                          </View>
                          <View style={cs.boxesWrapper}>
                                   <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[2].imageName} />
                                   <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[2].ImageText}</Text>
                         </View>
                            <View style={cs.pairBox}>
                                <View style={cs.boxesPairWrapper}>
                                           <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[3].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[3].ImageText}</Text>
                                </View>
                               {this.props.navigation.state.params.selectedItems.length>4 && 
                               <View style={[cs.boxesPairWrapper,{  transform: [
                               
                               { rotateZ: "-20deg" }
                              ]}]}>
                                       <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[4].imageName} />
                                        <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[4].ImageText}</Text>
                                </View>}
                            </View> 
                      </View> }
                     
                    
                  </View>
              </View>
              </ScrollView> 
            
              <TouchableOpacity style={[cs.buttondashbordStyle,{position:"absolute",bottom:0,top:width,padding:20,marginTop:width*0.15,height:width*0.023}]} onPress={()=> this.submitDashboard()}>
               <Text style={{color:"white"}}>Submit</Text>
              </TouchableOpacity>
            {/* </View> */}
      </View>
      
    );
  }
}

const mapStateToProps = state => {

  
 
 return { loadBasicList: state.api.loadBasic,
         notification:state.notification,
         GroupStudent:state.GroupStudent
        }
};


const mapDispatchToProps= {
 getnotification,
 getGroupStudent
}

const styles = StyleSheet.create({
 
});

export default connect(mapStateToProps,mapDispatchToProps)(DashboardBox);
