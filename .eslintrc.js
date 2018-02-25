module.exports = {
    "extends": "airbnb",
    "rules": {
      "no-use-before-define": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "env": {
      "node": true,
      "es6": true,
      "browser": true
    },
    "globals": {
      "fetch": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
      "sourceType": "module"
    }
  };
