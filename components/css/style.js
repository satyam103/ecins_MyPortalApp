import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Login Screen Css
  LoginViewloginContainer: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  LoginViewappLogoContatainer: {
    textAlign: 'center',
  },
  LoginViewError: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },
  ProfileViewMsg: {
    fontFamily: 'HelveticaNeueMed',
    fontSize: 12,
    color: '#5a1219',
    textAlign: 'center',
  },
  ProfileViewError: {
    borderColor: '#da4453',
    backgroundColor: '#e6808a',
    padding: 10,
  },
  LoginViewappLogo: {
    width: 280,
    height: 135,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  LoginViewerrorMsg: {
    color: 'red',
  },
  LoginViewstyleborderlayout: {
    height: 2,
    marginTop: 10,
    backgroundColor: '#7EABDF',
  },
  LoginViewloginTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'HelveticaNeue',
    color: '#333333',
  },
  LoginViewloginInput: {
    marginTop: 10,
    borderRadius: 10,
    color: '#666666',
    fontFamily: 'HelveticaNeue',
    flexDirection:'row',
    alignItems:'center',
    borderWidth:0.5,
    borderRadius:8,
    justifyContent:'space-between'
    // padding:10,
  },
  LoginViewloginInputBoxArea: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'HelveticaNeue',
    height: 35,
    width: '100%',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  LoginViewbtnView: {
    marginTop: 5,
  },
  LoginViewbtnViewLayout: {
    borderRadius: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  LoginViewbtnViewText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'HelveticaNeue',
  },
  LoginViewbtnViewLayoutForgot: {
    borderRadius: 10,
    marginTop: 10,
    fontSize: 16,
    borderWidth:1,
    borderColor: '#4A90E2',
    backgroundColor: 'none',
    fontFamily: 'HelveticaNeue',
  },

  // Forgot Screen Css
  ForgotViewloginContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    marginBottom: 40,
  },
  ForgotViewappLogoContatainer: {
    textAlign: 'center',
  },
  ForgotViewappLogo: {
    width: 280,
    height: 135,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ForgotViewinstructionText: {
    fontFamily: 'HelveticaNeue',
    fontWeight: 'normal',
    color: '#333333',
    fontSize: 12,
  },
  ForgotViewstyleborderlayout: {
    height: 2,
    marginTop: 10,
    backgroundColor: '#7EABDF',
  },
  ForgotViewloginTitle: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
  ForgotViewloginInput: {
    marginTop: 10,
    borderRadius: 10,
  },
  ForgotViewloginInputBoxArea: {
    fontSize: 14,
    color: '#666666',
    borderWidth: 1,
  },
  ForgotViewbtnView: {
    marginTop: 5,
  },
  ForgotViewbtnViewLayout: {
    borderRadius: 10,
    marginTop: 10,
  },
  ForgotViewbtnViewText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
  },

  //Reset View Css

  ResetViewloginContainer: {
    marginTop: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    marginBottom: 40,
  },
  ResetViewappLogoContatainer: {
    textAlign: 'center',
  },
  ResetViewappLogo: {
    width: 280,
    height: 135,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ResetViewerrorMsg: {
    color: 'red',
  },
  ResetViewinstructionText: {
    fontFamily: 'HelveticaNeue',
    fontWeight: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333333',
  },
  ResetViewstyleborderlayout: {
    height: 2,
    marginTop: 10,
    backgroundColor: '#7EABDF',
  },
  ResetViewloginTitle: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
  ResetViewloginInput: {
    marginTop: 10,
    borderRadius: 10,
    padding: 0,
  },
  ResetViewloginInputBoxArea: {
    fontSize: 12,
    fontFamily: 'HelveticaNeue',
    color: '#666666',
    padding: 10,
  },
  ResetViewbtnView: {
    marginTop: 5,
  },
  ResetViewbtnViewLayout: {
    borderRadius: 10,
    marginTop: 10,
  },
  ResetViewbtnViewLayoutDisable: {
    borderRadius: 10,
    marginTop: 10,
    opacity: 0.5,
  },
  ResetViewbtnViewText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'HelveticaNeue',
  },
  ResetViewinstructionListText: {
    paddingLeft: 15,
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    color: '#333333',
  },

  // Task View Css

  TaskViewheaderText: {
    color: '#333333',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
  },
  TaskViewtaskSubText: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'HelveticaNeue',
  },
  TaskViewaccordianTask: {
    borderColor: 'transparent',
  },
  TaskViewurgentBtnSection: {
    backgroundColor: '#F80014',
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TaskViewwarningBtnSection: {
    backgroundColor: '#FBAC02',
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TaskViewsuccessBtnSection: {
    backgroundColor: '#279C74',
    marginTop: 10,
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  TaskViewurgentBtn: {
    fontWeight: 'bold',
    fontSize:15,
    fontFamily:'HelveticaNeue'
  },
  TaskViewwarningBtn: {
    fontWeight: 'bold',
    fontSize:15,
    fontFamily:'HelveticaNeue'
  },
  TaskViewsuccessBtn: {
    fontSize:15,
    fontWeight: 'bold',
    fontFamily:'HelveticaNeue',
  },
  TaskViewbadgeNotification: {
    backgroundColor: '#fff',
    fontFamily: 'HelveticaNeue',
  },
  TaskViewbadgeUrgent: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
  },
  TaskViewbadgeWarning: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
  },
  TaskViewbadgeSuccess: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
  },

  // Task Details View Css
  TaskDetailsViewheaderContainer: {
    marginTop: 25,
    paddingHorizontal: 24,
  },
  TaskDetailsViewheaderContainerNew: {
    marginTop: 25,
    paddingHorizontal: 24,
    marginBottom: 25,
  },
  TaskDetailsViewheaderText: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
  },
  TaskDetailsViewContentText: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'HelveticaNeue',
  },
  TaskViewLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.6,
    borderWidth: 0.1,
    marginTop: 10,
    marginBottom: 10,
  },
  TaskViewHeading: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
  },
  TaskDetailsViewtaskViewSendMsg: {
    color: '#FFF',
    marginTop: 25,
    borderRadius: 5,
    borderColor: '#45B5FF',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  CreateChatSendMessage: {
    color: '#FFF',
    borderRadius: 5,
    backgroundColor: 'transparent',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  TaskDetailsViewtaskViewCompleteMsg: {
    backgroundColor: '#30A487',
    color: '#FFF',
    marginTop: 10,
    borderRadius: 5,
    borderRadius: 5,
  },
  TaskDetailsViewtypeButton: {
    backgroundColor: '#9A9A9A',
    borderRadius: 5,
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  TaskDetailsViewtypeButtonGreen: {
    backgroundColor: '#30A487',
    marginTop: 10,
    borderRadius: 5,
  },
  TaskDetailsViewtypeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
  },

  // Create Message Css
  CreateMessageaddMsgBtnText: {
    color: '#fff',
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
    fontSize: 16,
  },
  CreateMessageloginInputBoxArea: {
    color: '#666666',
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    width: '100%',
  },
  CreateMessageheaderContainer: {
    width: '100%',
  },
  TaskViewSendBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  CreateMessageaddMsgBtn: {
    borderRadius: 5,
    padding: 10,
    // marginTop:-28,
    // alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  ViewMessageaddMsgBtn: {
    borderRadius: 5,
    top:10,
    bottom: 2,
    position: 'relative',
    backgroundColor: '#FBAC02',
    marginHorizontal:10
  },
  CreateMessagelistContainer: {
    width: '95%',
    marginHorizontal:10
  },
  CreateMessagetextInput: {
    borderRadius: 5,
    fontSize: 1,
    height: 30,
  },
  CreateMessagetextInputBigBox: {
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30,
  },
  CreateMessagetextInputBigBoxHtml: {
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 30,
    padding: 10,
  },
  CreateMessageviewForm: {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom:5
  },
  CreateMessagelistItemsBg: {
    backgroundColor: '#D9D9D9',
    marginBottom: 15,
    padding: 10,
    borderRadius: 20,
    flexDirection:'row'
  },
  CreateMessagelistThumbnail: {
    // marginBottom: 10,
    // marginTop: 10,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    height:50,
    width:50,
    borderRadius:50,
    // padding:10
  },
  CreateMessagelistItemsTitle: {
    fontSize: 12,
    color: '#333333',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    fontFamily: 'HelveticaNeue',
  },
  CreateMessagelistItemsSubtitle: {
    fontSize: 12,
  },
  CreateMessagemessageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    color: '#333333',
    fontFamily: 'HelveticaNeue',
  },
  CreateMessagelistWidthBody: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    fontWeight: 'bold',
    marginLeft:10,
    justifyContent:'center',
    width:'80%'
  },
  listItemsTitles: {
    fontSize: 13,
    borderBottomWidth: 0,
    fontWeight: 'bold',
  },
  listItemsDate: {
    fontSize: 11,
    borderBottomWidth: 0,
  },
  listItemsDateRight: {
    fontSize: 11,
    borderBottomWidth: 0,
    textAlign: 'right',
    marginRight: 12,
  },
  chatlistItemsDate: {
    fontSize: 11,
    borderBottomWidth: 0,
    marginLeft: 40,
  },
  chatlistItemsDateRight: {
    fontSize: 11,
    borderBottomWidth: 0,
    textAlign: 'right',
    marginRight: 45,
  },
  adFile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    position: 'relative',
    marginTop: -25
  },
  recordAudio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginTop: -10
  },
  addFiles: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    color: '#666666',
  },
  listWidthBody: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  // Chat List Css
  chatTextArea: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ChatListheaderContainer: {
    width: '100%',
  },
  ChatListlistContainer: {
    width: '100%',
  },
  ChatListlistItemsBg: {
    backgroundColor: '#fff',
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
  },
  ChatListlistItemsTitle: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'HelveticaNeue',
  },
  ChatListlistItemsSubtitle: {
    fontSize: 12,
    color: '#8F8E94',
    fontFamily: 'HelveticaNeue',
  },
  ChatListmessageType: {
    backgroundColor: '#279A75',
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    padding: 2,
    width: 40,
    paddingLeft: 10,
    borderRadius: 3,
  },
  ChatListlistWidthBody: {
    width: '100%',
  },
  ChatListchatLogAction: {
    color: '#878787',
    fontSize: 10,
    fontFamily: 'HelveticaNeue',
  },

  // Help List Css
  HelpListheaderContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  HelpListbookmarkedListItem: {
    borderBottomColor: '#CBCBCB',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  HelpListbookmarkedList: {
    marginLeft: -20,
  },
  HelpListbookmarkedDescription: {
    fontSize: 14,
  },
  HelpListbookmarkedTitle: {
    fontFamily: 'HelveticaNeue',
    fontSize: 13,
    color: '#333333',
    fontWeight: 'bold',
    marginTop: 20,
  },
  HelpListbookmarkedIcons: {
    textAlign: 'right',
    marginTop: 60,
    fontSize: 20,
  },
  HelpListbookmarkedIconsFavourite: {
    color: 'red',
    marginTop: 60,
    fontSize: 20,
  },

  // Help Info Css
  HelpListInfoheaderContainer: {
    width: '100%',
  },
  HelpListInfoHelpBody: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  HelpListInfomarginPage: {
    paddingHorizontal: 24,
  },
  HelpListInfobookmarkedListItem: {
    borderBottomColor: '#CBCBCB',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  HelpListInfobookmarkedList: {
    marginLeft: -20,
  },
  HelpListInfobookmarkedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  HelpListInfobookmarkedDescription: {
    fontSize: 14,
  },
  HelpListInfobookmarkedIcons: {
    // alignItems: 'flex-end',
    textAlign: 'right',
    // marginTop:60,
    fontSize: 20,
    // borderWidth:1,
    borderColor: '#333',
  },
  HelpListInfobookmarkedIconsOnly: {
    textAlign: 'right',
    fontSize: 20,
    borderColor: '#333',
    marginRight: 10,
  },
  HelpListInfobottomGrid: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
    paddingBottom: 2,
  },
  HelpListInfodescriptiontitle: {
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 24,
  },
  HelpListInfodescriptionContent: {
    fontSize: 12,
    paddingHorizontal: 24,
  },
  HelpListInfobookmarkedIconsFavourite: {
    color: 'red',
    // marginTop:60,
    fontSize: 20,
  },

  // Journal List Css
  JournalListheaderContainer: {
    marginTop: 0,
    paddingHorizontal: 24,
  },
  JournalListdialogContent: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'HelveticaNeue',
    color: '#333333',
  },
  JournalListemojiPopupBtn: {
    marginTop: 220,
    backgroundColor: '#9A9A9A',
  },
  JournalListemojiPopupResetBtn: {
    marginTop: 5,
    backgroundColor: '#9A9A9A',
  },
  JournalListheaderText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
  },
  JournalListtypeButton: {
    backgroundColor: '#9A9A9A',
    borderRadius: 5,
    marginTop: 10,
  },
  JournalListtypeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
  },
  JournalListdialogTitlewarning: {
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  JournalListdialogContentwarning: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'HelveticaNeue',
  },
  JournalListwarningModal: {
    backgroundColor: '#DD414F',
  },
  JournalListwarningModalCancelBtn: {
    backgroundColor: '#920613',
    borderColor: '#DD414F',
    borderRadius: 5,
  },
  JournalListemojoTitle: {
    marginTop: 15,
    marginBottom: 15,
    fontFamily: 'HelveticaNeue',
    backgroundColor: '#fff',
  },
  JournalListemojiContainerCells: {
    backgroundColor: '#fff',
  },
  JournalListemojiFooter: {
    backgroundColor: 'transparent',
    marginTop: 160,
  },
  JournalListcancelBtnEmoji: {
    color: '#fff',
    fontWeight: 'bold',
  },
  JournalListemojiAfterPopupBtn: {
    backgroundColor: '#30A487',
    width: '100%',
    height: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  JournalListaddJournalBtn: {
    backgroundColor: '#30A487',
    borderRadius: 5,
    marginTop: -15,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    color: '#fff',
    textAlign: 'center',
  },
  JournalListaddJournalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
  },
  JournalListaddJournalContentText: {
    color: '#A9A7AC',
  },
  JournalListlistItemsJournal: {
    marginLeft: 0,
  },
  JournalListjournalTimeAdded: {
    alignSelf: 'flex-end',
    marginTop: 0,
    position: 'absolute',
  },
  JournalListExpression: {
    color: 'blue',
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
  },
  JournalListText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: 'bold',
  },
  JournalListRowTwo: {
    height: 60,
    borderColor: '#B5B5B5',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  JournalListRowOne: {
    height: 60,
    borderColor: '#B5B5B5',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  JournalListRowThree: {
    height: 60,
    borderColor: '#B5B5B5',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  JournalListRowfour: {
    height: 60,
    borderColor: '#B5B5B5',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  JournalListEmojiSize: {
    fontSize: 25,
  },

  // Create Chat Css
  ChatButtonMessage: {
    backgroundColor: '#FBAC02',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    bottom: 10,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
  },
  CreateChatheaderContainer: {
    width: '95%',
  },
  CreateChataddMsgBtn: {
    borderRadius: 5,
    marginTop: 20,
  },
  CreateChatlistContainer: {
    width: '95%',
  },
  CreateChattypeButtonGreen: {
    backgroundColor: '#30A487',
    marginTop: -40,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  CreateChatmessageListing: {
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  CreateChatmessageListingRight: {
    textAlign: 'right',
    alignItems: 'flex-end',
    width: '60%',
    paddingHorizontal: 24,
  },
  CreateChatleftMsg: {
    backgroundColor: '#878787',
    padding: 5,
    color: '#fff',
    textAlign: 'left',
    marginTop: 2,
  },
  CreateChatrightMsg: {
    backgroundColor: '#1A7AFF',
    padding: 5,
    color: '#fff',
    textAlign: 'right',
    marginTop: 2,
  },
  CreateChattextInput: {
    borderRadius: 5,
    fontSize: 1,
    height: 30,
  },
  CreateChattextInputBigBox: {
    borderRadius: 5,
    marginTop: 20,
  },
  CreateChatviewForm: {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  CreateChatlistItemsBg: {
    backgroundColor: '#D9D9D9',
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 50,
  },
  CreateChatlistThumbnail: {
    marginBottom: 10,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    borderRadius: 50,
  },
  CreateChatlistItemsTitle: {
    fontSize: 14,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  CreateChatlistItemsSubtitle: {
    fontSize: 12,
  },
  CreateChatmessageTitle: {
    fontWeight: 'bold',
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  CreateChatlistWidthBody: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  CreateChatDetailsBoxArea: {
    borderColor: '#CBCBCB',
    paddingHorizontal: 20,
    borderWidth: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  // Task View Css
  TaskViewheaderContainer: {
    marginTop: 25,
    paddingHorizontal: 24,
    flexDirection: 'column',
  },
  TaskViewtaskViewSendMsg: {
    backgroundColor: '#FBAC02',
    color: '#FFF',
    marginTop: 40,
    borderRadius: 5,
  },
  TaskViewtaskViewCompleteMsg: {
    backgroundColor: '#279C74',
    color: '#FFF',
    marginTop: 10,
    borderRadius: 5,
    borderRadius: 5,
  },
  TaskViewtypeButton: {
    backgroundColor: '#9A9A9A',
    borderRadius: 5,
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  TaskViewtypeButtonGreen: {
    backgroundColor: '#30A487',
    marginTop: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  TaskViewtypeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rightSideMsg: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{rotate: '90deg'}],
    borderBottomColor: '#1A7AFF',
    position: 'absolute',
    right: 0,
    top: 10,
  },
  leftSideMsg: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{rotate: '150deg'}],
    borderBottomColor: '#878787',
    position: 'absolute',
    left: -6,
    top: 10,
  },
  // HideFunction
  hideFunctionWeatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733',
    paddingHorizontal: 20,
  },
  hideFunctionHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideFunctionTempText: {
    fontSize: 48,
    color: '#fff',
  },
  hideFunctionBodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  hideFunctionTitle: {
    fontSize: 48,
    color: '#fff',
  },
  hideFunctionSubtitle: {
    fontSize: 24,
    color: '#fff',
  },

  // MessageList
  MessageListHeaderContainer: {
    width: '100%',
  },
  MessageListContainer: {
    width: '95%',
    marginHorizontal: 10
  },
  MessageListItemsBg: {
    backgroundColor: '#D9D9D9',
    marginBottom: 15,
    padding: 10,
    borderRadius: 20,
    flexDirection:'row'
  },
  MessageListThumbnail: {
    borderColor: 'transparent',
    borderBottomWidth: 0,
    height:50,
    width:50,
    borderRadius:50,
  },
  MessageListItemsUname: {
    fontSize: 14,
    fontFamily: 'HelveticaNeue',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  MessageListItemsTitles: {
    fontSize: 13,
    borderBottomWidth: 0,
  },
  MessageListItemsDate: {
    fontSize: 11,
    borderBottomWidth: 0,
  },
  MessageListlistItemsSubtitle: {
    fontSize: 12,
  },
  MessageListmessageTitle: {
    fontFamily: 'HelveticaNeue',
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  MessageListWidthBody: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    fontWeight: 'bold',
    marginLeft:10,
    justifyContent:'center',
    width:'80%'
  },

  // View messages
  ViewMessagesBtn: {
    alignSelf: 'flex-end',
    bottom: 0,
    width: '100%',
    padding: 3,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: '#30A487',
    marginBottom: 25,
  },
  ViewMessagesBtnText: {
    color: '#fff',
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
  },
  ViewMessagesList: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  ViewMessagesImageText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 12,
  },
  ViewMessagesText: {
    color: '#fff',
    backgroundColor: '#878787',
    borderRadius: 2,
    padding: 5,
    fontWeight: 'bold',
    width: '97%',
    marginLeft: -4,
    marginTop: 5,
  },
  ViewMessagesText1: {
    color: '#fff',
    backgroundColor: '#1A7AFF',
    borderRadius: 2,
    padding: 5,
    fontWeight: 'bold',
    width: '97%',
    marginRight: -10,
  },
  rightViewSideMsg: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{rotate: '90deg'}],
    borderBottomColor: '#1A7AFF',
    position: 'absolute',
    right: 0,
    top: 20,
  },
  leftViewSideMsg: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{rotate: '150deg'}],
    borderBottomColor: '#878787',
    position: 'absolute',
    left: -10,
    top: 25,
  },
  topNotificationMsg: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderStyle: 'solid',
    overflow: 'scroll',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{rotate: '0deg'}],
    borderBottomColor: '#fff',
    position: 'absolute',
    right: 8,
    top: 35,
    position: 'absolute',
    zIndex: 999,
  },
  notificationCount: {
    textAlign: 'right',
    fontFamily: 'HelveticaNeue',
  },
  notificationListText: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  notificationBadgeCount: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  notificationBadgeText: {
    color: 'red',
    fontSize: 14,
    marginTop: -5,
    marginLeft: -10,
    marginRight: 5,
  },
});
