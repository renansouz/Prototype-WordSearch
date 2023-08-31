import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';

const generateEmptyGrid = (rows, cols) => {


  // const letters = ["A", "B","C","D","E", "F","G", "H","I", "J","K", "L","M", "N", "O", "P","Q", "R","S", "T","U", "V","W", "X","Y", "Z"]


  const gerarLetraAleatoria = () => {
    var indiceLetra = Math.floor(Math.random() * 26);
  
    return String.fromCharCode(65 + indiceLetra);
  }


  const wordsToFind = ["REACT", "NATIVE", "JAVASCRIPT", "DEVELOPMENT"];




  var contX = 0
  var contY = 0

  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({

      if(){},


      letter: (gerarLetraAleatoria()),
      selected: false,
    })),
  );
};

const App = () => {
  const [grid, setGrid] = useState(generateEmptyGrid(10, 10));
  const [selectedWord, setSelectedWord] = useState('');
  
  useEffect(() => {
    // Função para gerar palavras e preencher o grid
    const generateGrid = () => {

  
      const newGrid = generateEmptyGrid(10, 10); // Use a função generateEmptyGrid para criar um grid vazio.
  

  
      return newGrid;
    };
  
    // Inicialize o estado do grid chamando a função de geração
    setGrid(generateGrid());

  }, []);

const handleCellPress = (row, col) => {

  const updatedGrid = [...grid]; //variável responsável por recarregar a grade em sua forma padrão

  // verifica se a célula está ou não selecionada
  if (updatedGrid[row][col].selected) {
    updatedGrid[row][col].selected = false;
  } else {
    updatedGrid[row][col].selected = true;

    
    // Atualizar a palavra selecionada com a letra da célula
    const letter = updatedGrid[row][col].letter;



    if(updatedGrid[row][col].selected == true){
      setSelectedWord(selectedWord + letter);
    }else{
      
    }
  }

  // Atualiza a grade puxando a const criada acima
  setGrid(updatedGrid);
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
      {}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555'
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
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCell: {
    backgroundColor: 'yellow',
  },
});

export default App;