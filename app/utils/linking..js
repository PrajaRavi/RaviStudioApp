// navigation/LinkingConfiguration.js
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Home: 'home',
      Player: 'player',
      Library: 'library',
    },
  },
};

export default linking;
