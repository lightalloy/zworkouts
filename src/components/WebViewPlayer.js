import React, { Component } from 'react';
import {
  View,
  AppState,
  WebView,
  StyleSheet,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';

export class WebViewPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { appState: AppState.currentState };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  }

  render() {
    if (this.state.appState === 'active') {
      return (
        <View style={{ height: 260 }}>
          <WebView
            style={styles.WebViewContainer}
            javaScriptEnabled
            domStorageEnabled
            source={{ uri: `https://www.youtube.com/embed/${this.props.youtubeId}` }}
          />
        </View>);
    }

    return <View style={{ height: 260 }} />;
  }
}

const styles = StyleSheet.create({
  WebViewContainer: {
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    marginBottom: 20,
  },
});

WebViewPlayer.propTypes = {
  youtubeId: PropTypes.string.isRequired,
};

WebViewPlayer.defaultProps = { };
export default WebViewPlayer;
