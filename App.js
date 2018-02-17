import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Linking,
  ToastAndroid,
} from 'react-native';

import { YoutubePlayer } from './src/components/YoutubePlayer';

// import HTMLView from 'react-native-htmlview';
const siteUrl = 'https://litealloy.com/';
// const siteUrl = 'http://10.0.2.2:3000/';
const defaultWorkoutData = { name: '', instructions: '', youtubeId: 'qHuEd3KVAwk' };
const api = require('./src/api.js');

export default class App extends Component {
  static getYoutubeKey() {
    return api(siteUrl, 'youtube/key');
  }

  static getWorkoutFromApi() {
    return api(siteUrl, 'workouts/random');
  }

  static workoutState(data) {
    const responseData = data || defaultWorkoutData;
    return {
      id: responseData.id,
      name: responseData.name,
      instructions: responseData.instructions,
      youtubeId: responseData.youtube_id, // api has keys in snake case
    };
  }

  constructor(props) {
    super(props);
    this.state = { workout: defaultWorkoutData, btnDisabled: false };
    this.loadWorkout = this.loadWorkout.bind(this);
    this.openLink = this.openLink.bind(this);
  }

  componentDidMount() {
    this.constructor.getYoutubeKey().then((data) => {
      this.constructor.getWorkoutFromApi().then((wData) => {
        this.setState({ workout: this.constructor.workoutState(wData), youtubeKey: data.key });
      });
    });
  }

  loadWorkout() {
    this.setState({ btnDisabled: true });
    this.constructor.getWorkoutFromApi().then((data) => {
      this.setState({
        workout: this.constructor.workoutState(data),
        btnDisabled: false,
      });
    });
  }

  openLink() {
    if (!this.state.workout.id) { return null; }
    const url = [siteUrl, 'workouts', this.state.workout.id].join('/');
    return Linking.openURL(url).catch(err => ToastAndroid.show(`An error occurred${err}`, ToastAndroid.SHORT));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.header} onPress={this.openLink}>
            {this.state.workout.name}
          </Text>
          <Text style={styles.instructions}>{this.state.workout.instructions}</Text>

          <YoutubePlayer apiKey={this.state.youtubeKey} youtubeId={this.state.workout.youtubeId} />

          <Button
            title="another workout"
            color="#6698FF"
            onPress={this.loadWorkout}
            disabled={this.state.btnDisabled}
          >
            Sign In
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#6698FF',
  },
  content: {
    paddingBottom: 10,
  },
  header: {
    fontSize: 22,
    marginTop: 10,
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
    color: '#6698FF',
  },
  instructions: {
    padding: 10,
    margin: 10,
  },
});
