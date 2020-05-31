/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View,StyleSheet, Dimensions,ScrollView,TouchableOpacity,Image} from 'react-native';
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
        typeTemplate:"Transfrom"
     
    }
  }

async componentDidMount() {
  
  }

  render() {
    console.warn("sdsd",this.props.navigation.state.params.typeTemplate)  
    return (
      <View style={{alignItems:"center",padding:15}}>
                     <TouchableOpacity    style={[cs.buttondashbord,{width:"100%",alignSelf:"center"}]} onPress={()=> this.CanSelected()}>
                                <Text style={{color:"white",alignSelf:"center",fontSize:16}}>Submit</Text>
                     </TouchableOpacity>
              <View style={{padding:10,justifyContent:"space-around",padding:10,width:width,marginTop:10}}>
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
                      {this.props.navigation.state.params.typeTemplate==="ThreeRow" &&  <View >
                           
                            <View style={cs.pairBox}>
                                    <View
                                    style={cs.boxesWrapper}>
                                      <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[0].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[0].ImageText}</Text>
                                    </View>
                            </View>
                                <View style={cs.pairBox}>
                                    <View
                                
                                    style={cs.boxesWrapper}>
                                      <Image style={cs.boxPairImageStyle} source={this.props.navigation.state.params.selectedItems[1].imageName} />
                                            <Text style={cs.pairBoxFont}>{this.props.navigation.state.params.selectedItems[1].ImageText}</Text>
                                    </View>
                                </View> 
                                <View style={cs.pairBox}>
                                    <View
                                    style={cs.boxesWrapper}>
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
                         <View style={cs.pairBox}>
                                <View
                               
                                style={cs.boxesPairWrapper}>
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
                      
                         <View style={cs.pairBox}>
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
