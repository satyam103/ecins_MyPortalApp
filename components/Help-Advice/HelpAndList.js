import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {
  Text,
  Accordion,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Styles from '../css/style';
import Spinner from 'react-native-loading-spinner-overlay';
import {NavigationEvents} from 'react-navigation';
import {showMessage} from 'react-native-flash-message';

import AppFooter from '../Footer/Footer';
import {getDataParamUrl} from '../utility';
import {getArticleDataUrl} from '../utility';

export default class MessageList extends Component {
  constructor(props) {
    // get super props
    super(props);
    this.state = {
      helpAndList: [],
      spinner: false,
      collapseBookmark: false,
      bookmarkedList: [],
      active_private_mode: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.getHelpAdviceList);
  }

  //componentDidMount() {
  getHelpAdviceList = () => {
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });

    this.setState({spinner: true});
    getDataParamUrl('GET', 'articles')
      .then((response) => {
        // console.log(JSON.stringify(response,null,2))
        if (response.message == undefined) {
          this.setState({bookmarkedList: []});
          this.setState({helpAndList: response});
          this.state.helpAndList.sort(function (a, b) {
            var textA = a.category_name.toUpperCase();
            var textB = b.category_name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });

          this.state.helpAndList.map((helpAndListCategory) => {
            helpAndListCategory.articles.map((article) => {
              if (article.is_bookmarked) {
                this.state.bookmarkedList.push(article);
              }
            });
          });

          this.state.bookmarkedList.sort(function (a, b) {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });
        }
        if (response.message == 'Server Error') {
          showMessage({
            message: 'Information & Support',
            description: 'Something is broken! Please try after some time.',
            type: 'danger',
            textStyle: {fontFamily: 'HelveticaNeue'},
            // fontWeight: 'bold',
          });
        }
        if (response.message == 'Unauthenticated.') {
          this.props.navigation.navigate('Login');
        }
        // spinner false
        this.setState({spinner: false});
      })
      .catch((response) => {
        // console.log(response)
        // spinner false
        this.setState({spinner: false});
      });
  };
  // getHelpAdviceList= () => {

  // }

  bookmarkArticle = (article) => {
    // spinner true
    this.setState({spinner: true});
    // update article as favorite
    var articleId = article.id;
    if (articleId !== undefined && articleId > 0) {
      const urlType = articleId + '/bookmark';
      getArticleDataUrl(urlType)
        .then((response) => {
          if (response == 1) {
            if (this.state.bookmarkStatus) {
              this.setState({bookmarkStatus: false});
            } else {
              this.setState({bookmarkStatus: true});
            }
          }
          // spinner false
          this.setState({spinner: false});
          this.getHelpAdviceList();
        })
        .catch((error) => {
          console.log(error);
          // spinner false
          this.setState({spinner: false});
        });
    }
  };

  addFavourite = (article) => {
    // get the article details
    if (article.id !== undefined && article.id > 0) {
      var articleId = article.id;
      this.setState({spinner: true});
      const urlType = articleId + '/like';
      getArticleDataUrl(urlType)
        .then((response) => {
          if (response == 1) {
            if (this.state.favoriteStatus) {
              this.setState({favoriteStatus: false});
            } else {
              this.setState({favoriteStatus: true});
            }
          }
          // spinner false
          this.setState({spinner: false});
          this.getHelpAdviceList();
        })
        .catch((error) => {
          console.log(error);
          // spinner false
          this.setState({spinner: false});
        });
    }
  };

  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'transparent',
          borderBottomColor: '#CBCBCB',
          borderBottomWidth: 2,
          borderStyle: 'solid',
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}>
        <Text style={{fontWeight: '600', fontSize: 15, color: '#333333'}}>
          {' '}
          {item.category_name}
        </Text>
        {expanded ? (
          <Icon style={{fontSize: 18}} name="keyboard-arrow-down" />
        ) : (
          <Icon style={{fontSize: 18}} name="keyboard-arrow-right" />
        )}
      </View>
    );
  }
  _renderContent = (item) => {
    return (
      <View
        style={{
          padding: 10,
          marginLeft: 20,
          fontSize: 12,
        }}>
        {item.articles.map((article) => (
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomColor: '#CBCBCB',
              borderBottomWidth: 2,
            }}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 14,
                paddingBottom: 10,
                width: '70%',
              }}
              onPress={() => this.navigateHelpScreen(article)}>
              {article.title}
            </Text>
            <Text style={{textAlign: 'right', paddingRight: 0}}>
              {article.is_bookmarked && (
                <Icon
                  onPress={() => this.bookmarkArticle(article)}
                  style={[
                    Styles.HelpListbookmarkedIconsFavourite,
                    {fontSize: 20},
                  ]}
                  name="bookmark"
                />
              )}
              {!article.is_bookmarked && (
                <Icon
                  onPress={() => this.bookmarkArticle(article)}
                  style={[Styles.HelpListbookmarkedIcons, {fontSize: 20}]}
                  name="bookmark-border"
                />
              )}
              <Text> </Text>
              {article.is_liked && (
                <Icon
                  onPress={() => this.addFavourite(article)}
                  style={[
                    Styles.HelpListbookmarkedIconsFavourite,
                    {fontSize: 20, color: 'red'},
                  ]}
                  name="favorite"
                />
              )}
              {!article.is_liked && (
                <Icon
                  onPress={() => this.addFavourite(article)}
                  style={[Styles.HelpListbookmarkedIcons, {fontSize: 20}]}
                  name="favorite-border"
                />
              )}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  collapseBookmark = () => {
    console.log(this.state.helpAndList)
    if (this.state.collapseBookmark == false) {
      this.setState({collapseBookmark: true});
    } else {
      this.setState({collapseBookmark: false});
    }
  };

  async navigateHelpScreen(article) {
    // navigate to the route
    AsyncStorage.setItem('article_selected', JSON.stringify(article));
    this.props.navigation.navigate('HelpInfo', {articleId: article.id});
  }

  render() {
    const newHelpList = [...this.state.helpAndList];
    let showHelpAndList = this.state.bookmarkedList.map((article) => {
      if (article.is_bookmarked) {
        return (
          <View key={article.id} style={Styles.HelpListbookmarkedListItem}>
            <View>
              <Text
                onPress={() => this.navigateHelpScreen(article)}
                style={Styles.HelpListbookmarkedDescription}>
                {article.title}
              </Text>
            </View>
            <View style={{marginRight: -15}}>
              <Text>
                {article.is_bookmarked && (
                  <Icon
                    onPress={() => this.bookmarkArticle(article)}
                    style={Styles.HelpListInfobookmarkedIconsOnly}
                    name="bookmark"
                  />
                )}
                {!article.is_bookmarked && (
                  <Icon
                    onPress={() => this.bookmarkArticle(article)}
                    style={Styles.HelpListInfobookmarkedIconsOnly}
                    name="bookmark-border"
                  />
                )}
                <View style={{width: 10}}></View>
                {article.is_liked && (
                  <Icon
                    onPress={() => this.addFavourite(article)}
                    style={Styles.HelpListbookmarkedIconsFavourite}
                    name="favorite"
                  />
                )}
                {!article.is_liked && (
                  <Icon
                    onPress={() => this.addFavourite(article)}
                    style={Styles.HelpListbookmarkedIcons}
                    name="favorite-border"
                  />
                )}
              </Text>
            </View>
          </View>
        );
      }
    });

    return (
      <View>
        <View >
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.HelpListscrollView}>
              <View style={Styles.HelpListheaderContainer}>
                <TouchableOpacity onPress={() => this.collapseBookmark()}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20,
                      marginHorizontal:10
                    }}>
                    <Text
                      style={[
                        Styles.HelpListbookmarkedTitle,
                        {textAlign: 'left', fontWeight: 'bold', fontSize: 13},
                      ]}>
                      BOOKMARKED
                    </Text>
                    <Text style={{textAlign: 'right'}}>
                      {!this.state.collapseBookmark && (
                        <Icon
                          name="keyboard-arrow-down"
                          size={20}
                          style={{paddingTop: 50, textAlign: 'right'}}
                        />
                      )}
                      {this.state.collapseBookmark && (
                        <Icon
                          name="keyboard-arrow-right"
                          size={20}
                          style={{paddingTop: 50, textAlign: 'right'}}
                        />
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                {!this.state.collapseBookmark && (
                  <View style={Styles.HelpListbookmarkedList}>
                    {showHelpAndList}
                  </View>
                )}
                <Text style={Styles.HelpListbookmarkedTitle}>CATEGORIES</Text>
                <Accordion
                  style={{ backgroundColor: "#fff" }}
                  dataArray={newHelpList}
                  animation={true}
                  expanded={true}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                  headerStyle={{ borderLeftWidth: 0, borderRightWidth: 0 }}
                  contentStyle={{ borderLeftWidth: 0, borderRightWidth: 0 }}
                />
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        {/* <View>
          <AppFooter
            stackName={this.props.route.name}
            navigation={this.props.navigation}
          />
        </View> */}
        {this.state.active_private_mode && (
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              padding: 5,
              backgroundColor: '#999999',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Icon
              size={30}
              style={{textAlign: 'right', color: '#fff'}}
              onPress={() => this.props.navigation.navigate('HideFunction')}
              name="cloud"
            />
          </View>
        )}
      </View>
    );
  }
}
