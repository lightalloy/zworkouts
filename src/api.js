import { ToastAndroid } from 'react-native';

const siteUrl = 'https://litealloy.com/';

export const api = async(path = 'workouts/random') => {
  try {
    const url = [siteUrl, 'api/v1/', path, '.json'].join('');
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    ToastAndroid.show("Sorry, couldn't get a proper workout", ToastAndroid.SHORT);
    return {};
  }
};

export default { api };
