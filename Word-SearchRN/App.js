import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';

const generateEmptyGrid = (rows, cols) => {

<<<<<<< HEAD
  const letters = ["A", "B","C","D","E", "F","G", "H","I", "J","K", "L","M", "N", "O", "P","Q", "R","S", "T","U", "V","W", "X","Y", "Z"]


=======
  const gerarLetraAleatoria = () => {
    var indiceLetra = Math.floor(Math.random() * 26);
  
    return String.fromCharCode(65 + indiceLetra);
  }
>>>>>>> f1caa61bf1a73a3912c00fef3061414f5dc311fa
  const wordsToFind = ["REACT", "NATIVE", "JAVASCRIPT", "DEVELOPMENT"];


  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
<<<<<<< HEAD
      letter: letters,
=======
      letter: (gerarLetraAleatoria()),
>>>>>>> f1caa61bf1a73a3912c00fef3061414f5dc311fa
      selected: false,
    }))
  );
};

const App = () => {
  const [grid, setGrid] = useState(generateEmptyGrid(10, 10));
  const [selectedWord, setSelectedWord] = useState('');
  
  useEffect(() => {
    // Função para gerar palavras e preencher o grid
    const generateGrid = () => {
      // Lógica para gerar palavras aleatórias e preencher o grid
      // Você precisa implementar essa lógica de acordo com as suas regras do jogo.
      // Certifique-se de que as palavras não se cruzem e não haja sobreposição.
      // Atualize o estado do grid com as letras geradas.
  
      const newGrid = generateEmptyGrid(10, 10); // Use a função generateEmptyGrid para criar um grid vazio.
  
      // Preencha o grid com letras e palavras aleatórias
      // Certifique-se de atualizar o estado do grid e as palavras do jogo conforme necessário.
  
      return newGrid;
    };
  
    // Inicialize o estado do grid chamando a função de geração
    setGrid(generateGrid());
  
    // Dependências vazias [] garantem que este efeito seja executado apenas uma vez, durante a montagem do componente.
  
    // Adicione qualquer outra lógica necessária aqui, como definir as palavras do jogo e verificar quando todas são encontradas.
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

    if(updatedGrid[row][col].selected){
      setSelectedWord(selectedWord + letter);
    }else {
      setSelectedWord(selectedWord - letter)
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