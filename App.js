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

import KeepAwake from 'react-native-keep-awake';
import { WebViewPlayer } from './src/components/WebViewPlayer';
import { api } from './src/api';

const siteUrl = 'https://litealloy.com/';
const defaultWorkoutData = { name: '', instructions: '', youtubeId: '' }; // qHuEd3KVAwk

export default class App extends Component {
  static workoutState(data) {
    const responseData = data || defaultWorkoutData;
    return {
      id: responseData.id,
      name: responseData.name,
      instructions: responseData.instructions,
      youtubeId: responseData.youtube_id, // api has keys in snake case
    };
  }

  state = { workout: defaultWorkoutData, btnDisabled: false };

  componentDidMount() {
    this.loadWorkout();
  }

  loadWorkout = async() => {
    this.setState({ btnDisabled: true });
    const data = await api('workouts/random');
    this.setState({
      workout: this.constructor.workoutState(data),
      btnDisabled: false,
    });
  }

  openLink = () => {
    if (!this.state.workout.id) { return null; }
    const url = [siteUrl, 'workouts', this.state.workout.id].join('/');
    return Linking.openURL(url).catch(err => ToastAndroid.show(`An error has occurred - ${err}`, ToastAndroid.SHORT));
  }

  render() {
    return (
      <ScrollView>
        <KeepAwake />
        <View style={styles.content}>
          <Text style={styles.header} onPress={this.openLink}>
            {this.state.workout.name}
          </Text>
          <Text style={styles.instructions}>{this.state.workout.instructions}</Text>

          <WebViewPlayer youtubeId={this.state.workout.youtubeId} />

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
