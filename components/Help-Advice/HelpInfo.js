import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Image} from 'react-native';
import {Container, Content, Text, Footer} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Col, Row, Grid} from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTML from 'react-native-render-html';
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from '../css/style';
import AppFooter from '../Footer/Footer';
import {getArticleDataUrl} from '../utility';

export default class HelpInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpAndList: [],
      title: '',
      description: `<h1></h1>`,
      fileUrl: '',
      bookmarkStatus: false,
      favoriteStatus: false,
      spinner: false,
      active_private_mode: false,
    };

    // AsyncStorage.getItem('article_selected', (err, result) => {
    //   // console.log(result);
    //   let resultResponse = JSON.parse(result);
    //   if (resultResponse.id !== undefined) {
    //     this.setState({title: resultResponse.title});
    //     if (resultResponse.file != '') {
    //       let fileUri = 'data:image/png;base64,' + resultResponse.file;
    //       this.setState({fileUrl: fileUri});
    //     }
    //     // console.log(resultResponse)
    //     this.setState({description: resultResponse.body});
    //     this.setState({bookmarkStatus: resultResponse.is_bookmarked});
    //     this.setState({favoriteStatus: resultResponse.is_liked});
    //   }
    // });
  }

  UNSAFE_componentWillMount() {
    this.props.navigation.addListener('focus', this.checkPrivateMode);
  }

  checkPrivateMode = () => {
    // get default setting saved
    AsyncStorage.getItem('PrivateMode', (err, result) => {
      let privateResponse = JSON.parse(result);
      if (privateResponse !== null)
        this.setState({active_private_mode: privateResponse.enable});
    });
  };

  bookmarkArticle = () => {
    // spinner true
    this.setState({spinner: true});
    // update article as favorite
    if (
      this.props.route.params.articleId !== undefined &&
      this.props.route.params.articleId > 0
    ) {
      const urlType = this.props.route.params.articleId + '/bookmark';
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
        })
        .catch((error) => {
          console.log(error);
          // spinner false
          this.setState({spinner: false});
        });
    }
  };

  addFavourite = () => {
    // get the article details
    if (
      this.props.route.params.articleId !== undefined &&
      this.props.route.params.articleId > 0
    ) {
      // spinner true
      this.setState({spinner: true});
      const urlType = this.props.route.params.articleId + '/like';
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
        })
        .catch((error) => {
          console.log(error);
          // spinner false
          this.setState({spinner: false});
        });
    }
  };

  render() {
    return (
      <View>
        <View >
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={Styles.HelpListInfoscrollView}>
              <View style={Styles.HelpListInfoheaderContainer}>
                {this.state.fileUrl != '' ? (
                  <Image
                    style={{
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      width: '100%',
                      height: 150,
                      resizeMode: 'stretch',
                    }}
                    source={{uri: this.state.fileUrl}}
                  />
                ) : (
                  <Text></Text>
                )}

                <Row style={Styles.HelpListInfoHelpBody}>
                  <Grid style={Styles.HelpListInfobottomGrid}>
                    <Col size={80}>
                      <Text style={Styles.HelpListInfobookmarkedTitle}>
                        {this.state.title}
                      </Text>
                    </Col>
                    <Col size={10}>
                      <View
                        style={{
                          fontSize: 10,
                          marginTop: 0,
                          flexDirection: 'row',
                        }}>
                        {this.state.bookmarkStatus && (
                          <Icon
                            onPress={() => this.bookmarkArticle()}
                            style={Styles.HelpListInfobookmarkedIconsOnly}
                            name="bookmark"
                          />
                        )}
                        {!this.state.bookmarkStatus && (
                          <Icon
                            onPress={() => this.bookmarkArticle()}
                            style={Styles.HelpListInfobookmarkedIconsOnly}
                            name="bookmark-border"
                          />
                        )}
                        {this.state.favoriteStatus && (
                          <Icon
                            onPress={() => this.addFavourite()}
                            style={Styles.HelpListInfobookmarkedIconsFavourite}
                            name="favorite"
                          />
                        )}
                        {!this.state.favoriteStatus && (
                          <Icon
                            onPress={() => this.addFavourite()}
                            style={Styles.HelpListInfobookmarkedIcons}
                            name="favorite-border"
                          />
                        )}
                      </View>
                    </Col>
                  </Grid>
                </Row>
                <HTML
                  baseFontStyle={{color: '#333333', fontSize: 11}}
                  containerStyle={{paddingHorizontal: 24}}
                  html={this.state.description}
                />
              </View>
              <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
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
