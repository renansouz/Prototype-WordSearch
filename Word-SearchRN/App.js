import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const generateEmptyGrid = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      letter: '',
      selected: false,
    }))
  );
};

const App = () => {
  const [grid, setGrid] = useState(generateEmptyGrid(10, 10));
  const [selectedWord, setSelectedWord] = useState('');
  
  useEffect(() => {
    // Your word generation and grid updating logic here
    // You'll need to adapt the logic from your JavaScript code to work with React Native state
  }, []);

  const handleCellPress = (row, col) => {
    // Handle cell selection logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.cell,
                  cell.selected && styles.selectedCell,
                ]}
                onPress={() => handleCellPress(rowIndex, colIndex)}
              >
                <Text>{cell.letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <Text>Selected Word: {selectedWord}</Text>
      {/* Add other UI elements and game information here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCell: {
    backgroundColor: 'yellow',
  },
});

export default App;