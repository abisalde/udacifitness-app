import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const LoadingApp = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.loading}
        source={require('../assets/img/loading.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 100,
    height: 100,
  },
});

export default LoadingApp;
