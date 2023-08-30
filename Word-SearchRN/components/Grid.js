import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Grid = ({ data }) => {
  return (
    <View style={styles.gridContainer}>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter, colIndex) => (
            <View key={colIndex} style={styles.cell}>
              <Text style={styles.letter}>{letter}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 18,
  },
});

export default Grid;