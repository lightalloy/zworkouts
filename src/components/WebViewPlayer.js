import React, { PureComponent } from 'react';
import {
  View,
  WebView,
  StyleSheet,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';

export class WebViewPlayer extends PureComponent {
  render() {
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
