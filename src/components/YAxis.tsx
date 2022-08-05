import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const {height} = Dimensions.get('screen');

const CELL_HEIGHT = height * 0.068;

type YAxisProps = {
  position?: 'RIGHT' | 'LEFT';
};

export default function YAxis({position = 'LEFT'}: YAxisProps) {
  return (
    <View style={[styles.yAxis, position === 'RIGHT' && styles.yAxisRight]}>
      {Array(8)
        .fill(1)
        .map((el, idx) => {
          return (
            <View key={idx} style={styles.yAxisLabelContainer}>
              <Text style={styles.center}>{8 - idx}</Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  yAxisLabelContainer: {
    justifyContent: 'center',
    height: CELL_HEIGHT,
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
    color: 'white',
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 20,
    backgroundColor: '#333',
  },
  yAxisRight: {
    left: undefined,
    right: 0,
  },
});
