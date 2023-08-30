import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordList = ({ words }) => {
  return (
    <View style={styles.wordListContainer}>
      {words.map((word, index) => (
        <Text key={index} style={styles.word}>
          {word}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wordListContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  word: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default WordList;