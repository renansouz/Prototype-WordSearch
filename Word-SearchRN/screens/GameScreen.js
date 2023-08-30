import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Grid from '../components/Grid';
import WordList from '../components/WordList';

const GameScreen = () => {
  // Dados de exemplo para a grade e lista de palavras
  const gridData = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y'],
  ];

  const wordListData = ['ABCD', 'GHI', 'KLMN', 'PQRS', 'VWXY'];

  return (
    <View style={styles.container}>
      <Grid data={gridData} />
      <WordList words={wordListData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;