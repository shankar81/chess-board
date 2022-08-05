import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

const CELL_WIDTH = (width - 40) / 8;

const alphaNumbers = Array(8)
  .fill(1)
  .map((el, idx) => idx + 65);
const alphaChars = alphaNumbers.map(el => String.fromCharCode(el));

export default function XAxis() {
  return (
    <View style={styles.xAxis}>
      {alphaChars.map((el, idx) => {
        return (
          <View key={idx} style={styles.xAxisLabelContainer}>
            <Text style={styles.center}>{el}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  xAxis: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#333',
    paddingVertical: 5,
  },
  xAxisLabelContainer: {
    width: CELL_WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
    color: 'white',
  },
});
