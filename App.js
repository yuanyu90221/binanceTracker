import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {Provider} from 'mobx-react';
import stores from './stores';

const Navigator = StackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen}
}, {
  mode: 'modal',
  headerMode: 'none'
});

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <SafeAreaView style={styles.safeArea}>
          <Navigator style={styles.navigator}/>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#272C36',
  },
  navigator:{
    backgroundColor: '#272C36',
  }
});
