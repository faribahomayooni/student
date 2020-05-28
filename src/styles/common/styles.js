import {StyleSheet, Dimensions} from 'react-native';
import COLORS from './../variables';
// const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

export const commonStyle = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#293A54',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    height: 300,
  },
  stretch: {
    top: -40,
  },
  gifSplash: {
    top: 5,
    width: 65,
    height: 65,
  },
  home_icon: {
    zIndex: 1,
  },
  footer_style: {
    zIndex: 0,
    backgroundColor: '#000',
  },
  inactiveText: {
    fontSize: 14,
    color: COLORS.primaryGrayText,
  },
  activeText: {
    fontSize: 14,
    color: COLORS.primaryButtonColor,
  },
  mainContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#F2F3F7',
  },
  rowContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -25,
    marginBottom: -8,
  },
  columnContainer: {
    flex: 0.2,
    marginTop: 20,
  },
  textLogin: {
    color: COLORS.primaryTextColor,
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  textSelection: {
    color: COLORS.primaryTextColor,
    fontSize: 20,
    marginTop: 40,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  textModalLogin: {
    color: '#F5F5F5',
    fontSize: 20,
    marginTop: 7,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  textInfoModalLogin: {
    color: '#F5F5F5',
    fontSize: 21,
    fontWeight: '700',
    marginTop: 7,
    alignSelf: 'center',
    // fontWeight: 'normal',
    marginLeft: 20,
  },
  subtextInfoModalLogin: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 7,
    alignSelf: 'flex-start',
    // fontWeight: 'normal',
    marginLeft: 20,
  },
  textLoginContainer: {
    flex: 0.1,
    marginTop: 5,
    marginBottom: 20,
  },

  loading:{
    zIndex: 2,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'lightgray',
    opacity: 0.5,
  },
  textLoginModalContainer: {
    flex: 1,
    marginTop: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  buttonColor: {
    backgroundColor: COLORS.primaryButtonColor,
  },
  inputsWrapper: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5,
    height: 100,
    margin: 10,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectionWrapper: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5,
    height: 50,
    margin: 15,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  borderBottom: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  ProfileBorderBottom: {
    borderBottomColor: COLORS.primaryColor,
    borderBottomWidth: 3,
    marginTop: 20,
    marginRight: 150,
    marginLeft: 150,
  },
  checkBoxEmail: {
    // borderRadius: 10,
    // backgroundColor: '#fff',
  },
  checkEmailText: {
    marginTop: 30,
    fontSize: 14,
    color: COLORS.mutedTextColor,
  },
  checkboxCustom: {
    marginTop: 30,
    fontSize: 10,
    color: COLORS.mutedTextColor,
    // backgroundColor: '#fff',
    borderColor: 'transparent',
    // width: 2,
    // height: 20,
    marginRight: 20,
    left: 5,
  },
  nextIconWrapper: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'rgba(38,54,181,1)',
    width: 22,
    height: 22,
    marginTop: 22,
    right: Dimensions.get('window').width / 15,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  nextIconSettingWrapper: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'rgba(38,54,181,1)',
    width: 22,
    height: 22,
    marginTop: 22,
    right: Dimensions.get('window').width / 10,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  nextIconPresenceWrapper: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'rgba(139,53,136,1)',
    width: 22,
    height: 22,
    marginTop: 22,
    right: Dimensions.get('window').width / 15,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  iconModalOpen: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#B426B5',
    width: 25,
    height: 25,
    marginTop: 22,
    right: Dimensions.get('window').width / 20,
    // alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  iconModalClose: {
    borderRadius: 30,
    // display: 'flex',
    position: 'relative',
    backgroundColor: '#B426B5',
    width: 25,
    height: 25,
    marginTop: 22,
    right: Dimensions.get('window').width / 20,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  nextPopUpIconWrapper: {
    borderRadius: 30,
    display: 'flex',
    // position: 'absolute',
    backgroundColor: 'rgba(212,212,212,1)',
    width: 22,
    height: 22,
    marginTop: -30,
    right: Dimensions.get('window').width / 18,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  settingIconChevron: {
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    width: 22,
    height: 22,
    marginLeft: 'auto',
    right: Dimensions.get('window').width / 15,
    borderColor: 'transparent',
    marginVertical: 12,
  },
  nextModalIconWrapper: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#D4D4D4',
    width: 22,
    height: 22,
    marginTop: 22,
    right: Dimensions.get('window').width / 25,
    borderColor: 'transparent',
  },
  nextModalIconBtn: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#D4D4D4',
    width: 22,
    height: 22,
    marginTop: 15,
    right: Dimensions.get('window').width / 25,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  dropDownBtn: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'rgba(38,54,181,1)',
    width: 22,
    height: 22,
    marginTop: 15,
    right: Dimensions.get('window').width / 25,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  closeIcon: {
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'rgba(38,54,181,1)',
    width: 22,
    height: 22,
    marginTop: -2,
    right: Dimensions.get('window').width / 50,
    alignSelf: 'flex-end',
    borderColor: 'transparent',
  },
  wideBtnLogin: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  WideButton: {
    height: 100,
    marginVertical: 10,
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    margin: 10,
  },
  wideButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  wideButtonSubText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#fff',
  },
  loginFooterWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 'auto',
    paddingBottom: 0,
  },
  loginModalFooterWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 'auto',
    top: -60,
    paddingBottom: 0,
  },
  textLogoWrapper: {
    flex: 0,
    alignItems: 'flex-end',
    marginRight: screenWidth / 40,
    marginTop: 35,
  },
  imageLogoWrapper: {
    flex: 0,
    alignItems: 'flex-end',
    marginRight: 15,
    marginTop: 20,
  },
  textLogo: {
    fontSize: 18,
    color: COLORS.primaryTextColor,
    fontWeight: '100',
  },
  passEye: {
    marginTop: -35,
    bottom: 7,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  tabStyle: {
    backgroundColor: '#aaa',
  },
  endTopTab: {
    marginRight: 20,
    marginTop: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  startTopTab: {
    marginLeft: 20,
    marginTop: 20,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  middleTopTab: {
    marginTop: 20,
  },
  textColor: {
    color: COLORS.primaryTextColor,
  },
  selectionInputText: {
    color: '#D4D4D4',
    fontSize: 20,
    fontWeight: 'normal',
    marginLeft: 10,
    marginTop: 7,
  },
  selectIconWrapper: {
    display: 'flex',
    right: screenWidth / 25,
    alignSelf: 'flex-end',
    marginVertical: 8,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: '#BFC0C1',
    width: 22,
    height: 22,
  },
  modalCustomize: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: -50,
  },
  modalBox: {
    width: 300,
    height: 350,
    padding: 10,
    // flex: 1,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadModalBox: {
    marginTop: 100,
    width: 300,
    height: 200,
    padding: 10,
    // flex: 1,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleModal: {
    color: COLORS.primaryTextColor,
    fontSize: 22,
    marginTop: -20,
    marginBottom: 20,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  modalContainer: {
    // padding: 10,
    flex: 1,
    backgroundColor: 'transparent',
  },
  pageTitle: {
    color: COLORS.primaryTextColor,
    fontSize: 22,
    marginTop: 0,
    fontWeight: 'bold',
  },
  pageTitleWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  boxesWrapper: {
    borderRadius: 10,
    backgroundColor: '#fff',
    height: screenHeight * 0.2,
    width: screenWidth * 0.567,
    margin: 10,
    // marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxesTeacherWrapper: {
    borderRadius: 15,
    backgroundColor: '#fff',
    height: screenHeight * 0.08,
    width: screenWidth * 0.230,
   margin:5,
    borderStyle:"dashed",
    borderWidth:1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxesTeacherWrapperdec:{
    borderRadius: 10,
    backgroundColor: '#fff',
    height: screenHeight * 0.06,
    width: screenWidth * 0.1500,
   margin:5,
    borderStyle:"dashed",
    borderWidth:1,
    alignItems: 'center',
    alignSelf: 'center',

  },
  boxesPairWrapper: {
    borderRadius: 10,
    backgroundColor: '#fff',
    height: screenHeight * 0.16,
    width: '100%',
    flex: 1,
    margin: 10,
    // marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  boxtDashbordStyle:{
    borderRadius: 10,
    backgroundColor: '#fff',
    height: screenHeight * 0.15,
    width: screenWidth * 0.357,
    margin: 10,
    borderStyle:"dashed",
    borderWidth:1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxtDashbordStyletit:{
    alignItems: 'center',
    borderRadius: 5,
    // borderColor:"gray",
    height: screenHeight * 0.04,
    width: screenWidth * 0.10,
    // flex: 1,
     margin: 5,
    borderStyle:"dashed",
    borderWidth:1,  
    // alignSelf: 'center',
    shadowRadius: 3.84,
  },

  borderTeacher:{
    alignItems: 'center',
    borderRadius: 10,
    borderColor:"gray",
    // backgroundColor: '#fff',
    height: screenHeight * 0.16,
    width: '100%',
    flex: 1,
    margin: 10,
    borderStyle:"dashed",
    borderWidth:1,
    // marginTop: 50,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    
    alignSelf: 'center',
    // shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  borderTeachertop:{
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 10,
    borderColor:"black",
    // backgroundColor: '#fff',
    height: screenHeight * 0.16,
    width: '100%',
    flex: 1,
    margin: 10,
    borderStyle:"dashed",
    borderWidth:1,
    // marginTop: 50,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // alignItems: 'center',
    // alignSelf: 'center',
    // shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  boxImageStyle: {
    // height: screenHeight * 0.12,
    // width: screenWidth * 0.87,
    resizeMode: 'cover',
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  boxPairImageStyle: {
    // height: screenHeight * 0.12,
    // width: screenWidth * 0.35,
    resizeMode: 'cover',
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  attendanceFont: {
    fontSize: 21,
    fontWeight: '600',
    color: COLORS.primaryColor,
    padding: 10,
    bottom: 5,
  },
  pairBoxFont: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primaryColor,
    margin: 10,
    bottom: 5,
  },
  pairBox: {
  //  width:screenWidth/2,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  pairBoxarray: {
    // flexWrap:"wrap",
      width:screenWidth/2-30,
       flexDirection: 'row',
      alignSelf: 'center',
    },
  pairBoxTeacher: {
    flexDirection: 'row',
     marginTop:0,
    alignSelf: 'center',
  },
  buttondashbordStyle:{
    backgroundColor:"#5467fd",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    padding:5,
    width:"100%"
    // justifyContent:"center"

  }
  ,
  noMessageTitle: {
    color: COLORS.primaryColor,
    alignSelf: 'center',
    fontSize: 39,
    marginTop: screenHeight * 0.15,
    fontWeight: '700',
  },
  noMessageSecondTitle: {
    color: COLORS.primaryTextColor,
    alignSelf: 'center',
    fontSize: 22,
    marginTop: screenHeight * 0.05,
    fontWeight: '700',
  },
  noMessageText: {
    color: COLORS.primaryTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: screenHeight * 0.03,
    fontSize: 18,
    paddingRight: 50,
    paddingLeft: 50,
  },
  archiveText: {
    color: COLORS.primaryTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: screenHeight * 0.03,
    fontSize: 17,
    fontWeight: '100',
    paddingRight: 10,
    paddingLeft: 10,
  },
  chatWrapper: {
    padding:20,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 'auto',
    width: '100%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  settingWrapper: {
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 'auto',
    width: '100%',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },
  messageText: {
    color: '#707070',
    fontSize: 17,
    fontWeight: '100',
    padding: 15,
    marginLeft: 10,
  },
  notificationText:{
    color: '#707070',
    fontSize: 17,
    fontWeight: '100',
    padding: 15,
    marginLeft: 10,
    marginTop:20

  },
  messageProfile: {
    width: 60,
    height:60,
    marginTop:10,
    resizeMode:"contain"
  },
  dynamicTeacherImage: {
    width: 70,
    height: 60,
  },
  defaultTeacherImage: {
    width:65,
    height: 65,
    // backgroundColor:"red",
    // borderRadius:20,
    // borderColor:"gray"
  },
  infoandimage:{

  },
  notificationImage:{
    width:300,
    height:200,
    padding:10,
    borderRadius:5,
    resizeMode:"contain"
  },

  infoSenderMessage: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: -10,
    alignSelf: 'flex-start',
    width: '100%',
  
  },
 contentmessage: {
  // flexDirection: 'row',
  margin: 10,
  marginBottom: -10,
  alignSelf: 'flex-start',
  width: '100%',

  },
  titleimage:{
   flexDirection: 'row',
   justifyContent:'space-around',
  // margin: 10,
  // marginBottom: -10,
  //  alignSelf: 'center',
  // width: '100%',

  },
  infoAddress: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: -30,
    alignSelf: 'flex-start',
    width: '100%',
  },
  helpCentreDetail: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: -10,
    alignSelf: 'flex-start',
  },
  messageProfileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryTextColor,
    margin: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  schoolLogo:{
 width:60,height:60,
 resizeMode:"contain"
  },
  iconSettingName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryTextColor,
    margin: 10,
    marginVertical: 5,
  },
  iconSettingDesc: {
    fontSize: 16,
    color: '#8FAEC6',
    margin: 15,
    marginTop: 0,
    // marginVertical: 5,
  },
  helpCentreDesc: {
    fontSize: 15,
    color: COLORS.primaryTextColor,
    margin: 15,
    marginTop: 0,
  },
  privacyTitle: {
    fontSize: 22,
    color: '#707070',
    margin: 15,
    marginTop: 0,
    paddingRight: 20,
    paddingLeft: 10,
  },
  mySchoolTitle: {
    fontSize: 17,
    color: COLORS.primaryTextColor,
    marginTop: 0,
  },
  mySchoolDesc: {
    color: COLORS.primaryTextColor,
    fontSize: 12,
    marginTop: 10,
  },
  messageBoxTriangle: {
    alignSelf: 'center',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    marginBottom: -12,
    transform: [{rotate: '180deg'}],
  },
  messageDateText: {
    color: COLORS.primaryColor,
    fontSize: 15,
  },
  messageDateWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 10,
  },
  messageContainer: {
    paddingRight: 15,
    paddingLeft: 15,
  //  marginTop: -30,
  },
  settingContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: -10,
    flexDirection: 'row',
  },
  moreBtn: {
    color: '#707070',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 15,
  },
  messageImg: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    right: 20,
  },
  mySchoolImg: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    right: 20,
    marginTop: 20,
  },
  reserveBtnText: {
    alignSelf: 'center',
    backgroundColor: '#78CD51',
    borderColor: '#B2B2B2',
    borderRadius: 8,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
  },
  reserveBtn: {
    fontSize: 17,
    color: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
    justifyContent:"center"
  },
  BoldProfileInfo: {
    color: COLORS.primaryTextColor,
    fontSize: 19,
    fontWeight: 'bold',
  },
  BoldProgressInfo: {
    color: COLORS.primaryTextColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  RegularProfileInfo: {
    color: COLORS.primaryTextColor,
    fontSize: 19,
    fontWeight: 'normal',
  },
  RegularProgressInfo: {
    color: COLORS.primaryTextColor,
    fontSize: 16,
    fontWeight: 'normal',
  },
  colorProfileInfo: {
    color: COLORS.primaryColor,
    fontSize: 19,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  titlePresence: {
    alignSelf: 'center',
    color: COLORS.primaryColor,
    fontSize: 26,
    marginTop: 15,
  },
  titleMyPresence: {
    alignSelf: 'center',
    color: COLORS.primaryTextColor,
    fontSize: 26,
    marginTop: 15,
  },
  progressText: {
    marginTop: 20,
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 16,
    color: COLORS.primaryTextColor,
  },
  progressBottomText: {
    marginTop: -5,
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 16,
    color: COLORS.primaryTextColor,
  },
  settingText: {
    alignSelf: 'center',
    fontSize: 16,
    color: COLORS.primaryTextColor,
    fontWeight: '600',
  },
  fontProgress: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
  progressCircle: {
    margin: 10,
  },
  powerSetting: {
    flexDirection: 'row',
    margin: 20,
  },
  titleSettingPage: {
    color: COLORS.primaryTextColor,
    fontSize: 26,
    marginTop: 10,
    marginBottom: 25,
    alignSelf: 'center',
    fontWeight: '700',
  },
  subTitleSettingPage: {
    color: COLORS.primaryTextColor,
    fontSize: 24,
    paddingTop: 20,
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center',
    fontWeight: '100',
  },
  settingInputWrapper: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    height: 48,
    margin: 10,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickerWrapper: {
    backgroundColor: 'transparent',
    // margin: 10,
  },
  knowPickerWrapper: {
    backgroundColor: '#F2F3F7',
    borderRadius: 12,
    height: 45,
    // margin: 10,
  },
  pickerContainer: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 12,
    borderColor: 'transparent',
    height: 45,
    marginTop: 40,
    marginBottom: 20,
    marginRight: 12,
    marginLeft: 12,
  },
  forgotContainer: {
    backgroundColor: '#F2F3F7',
    borderRadius: 12,
    borderColor: 'transparent',
    height: 42,
    paddingTop: 7,
    marginTop: 60,
    marginBottom: 0,
    marginRight: 12,
    marginLeft: 12,
  },
  schoolTrainingTitle: {
    color: COLORS.primaryTextColor,
    // alignSelf: 'flex-start',
    fontSize: 21,
    fontWeight: 'bold',
  },
  addressSubTitle: {
    color: '#8FAEC6',
    fontSize: 17,
    fontWeight: 'bold',
  },
  addressTitle: {
    color: '#8FAEC6',
    fontSize: 17,
  },
  calendarsWrapper: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 'auto',
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  presenceStatusColor: {
    backgroundColor: '#88C755',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 18,
    paddingLeft: 18,
    margin: 2,
    marginTop: -10,
  },
  lateStatusColor: {
    backgroundColor: '#E7B52E',
    paddingTop:5,
    paddingBottom: 5,
    paddingRight: 18,
    paddingLeft: 18,
    margin: 2,
    marginTop: -10,
  },
  absentStatusColor: {
    backgroundColor: '#F64D53',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 18,
    paddingLeft: 18,
    margin: 2,
    marginTop: -10,
  },
  presenceColorText: {
    color: '#fff',
    fontWeight: '700',
  },
  summaryPresence: {
    alignSelf: 'center',
    color: COLORS.primaryTextColor,
    fontSize: 22,
    marginTop: 15,
    textAlign: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  modalCamera: {
    backgroundColor: '#CD51C9',
    marginRight: screenWidth / 8,
    marginLeft: screenWidth / 8,
    marginTop: screenHeight / 4,
    marginBottom: screenHeight / 4,
    borderRadius: 10,
  },
  modalCameraTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '700',
    marginTop: 20,
  },
  modalCameraBtn: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    margin: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  ImageSectionsZone: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  imagesSelected: {
    width: 215,
    height: 365,
    padding: 10,
    borderWidth: 2,
    borderColor: '#5467FD',
    marginHorizontal: 3,
  },
  photoBtnConfirm: {
    height: 47,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#5467fd',
    alignItems: 'center',
    margin: 10,
    marginBottom: -2,
  },
  photoTextConfirm: {
    color: '#fff',
    fontSize: 16,
    marginLeft: -25,
    fontWeight: '700',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  nameView: {
    flex: 1,
    width: 100,
    height: 100,
  },
});
