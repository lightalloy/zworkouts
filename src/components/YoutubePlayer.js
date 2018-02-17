import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube';

export class YoutubePlayer extends Component {
  constructor(props) {
    super(props);
    this.style = styles.youtubePlayer;
  }

  render() {
    // if (this.setState.isReady) {
    return (<YouTube
      videoId={this.props.youtubeId} // The YouTube video ID
      play={false} // control playback of video with true/false
      hidden={false} // control visiblity of the entire view
      playsInline // control whether the video should play inline
      loop={false} // control whether the video should loop when ended
      apiKey={this.props.apiKey}
      /* eslint-disable react/no-unused-state */
      onReady={() => { this.setState({ isReady: true }); }}
      onChangeState={(e) => { this.setState({ status: e.state }); }}
      onChangeQuality={(e) => { this.setState({ quality: e.quality }); }}
      onError={(e) => { this.setState({ error: e.error }); }}
      onProgress={(e) => { this.setState({ currentTime: e.currentTime, duration: e.duration }); }}
      /* eslint-disable react/no-unused-state */
      style={this.style}
    />);
  }
}

YoutubePlayer.propTypes = {
  youtubeId: PropTypes.string.isRequired,
  apiKey: PropTypes.string,
};

const styles = StyleSheet.create({
  youtubePlayer: {
    alignSelf: 'stretch',
    height: 250,
    backgroundColor: 'black',
    marginBottom: 20,
  },
});

YoutubePlayer.defaultProps = { apiKey: '1' };
export default YoutubePlayer;
