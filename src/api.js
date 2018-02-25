import { ToastAndroid } from 'react-native';

const siteUrl = 'https://litealloy.com/';

module.exports = function api(path = 'workouts/random') {
  const url = [siteUrl, 'api/v1/', path, '.json'].join('');
  return fetch(url).then(response => response.json()).then(json => json)
    .catch(() => {
      ToastAndroid.show("Sorry, couldn't get a proper workout", ToastAndroid.SHORT);
    });
};
