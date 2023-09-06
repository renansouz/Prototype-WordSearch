import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

class WordSearchGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridLetras: this.gerarGridAleatorio(),
      listaPalavras: ['HISTORIA', 'CIENCIA', 'MATEMATICA', 'INGLES', 'PORTUGUES'],
      palavrasEncontradas: [],
    };
  }

  gerarGridAleatorio = () => {
    const letrasPossiveis = '';
    const gridSize = 12; // Tamanho do grid
    const grid = [];

    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        const randomIndex = Math.floor(Math.random() * letrasPossiveis.length);
        row.push(letrasPossiveis.charAt(randomIndex));
      }
      grid.push(row);
    }

    return grid;
  };

  adicionarPalavraAoGrid = (palavra) => {
    const { gridLetras } = this.state;
    const gridSize = gridLetras.length;

    // Escolhe aleatoriamente uma direção (horizontal ou vertical)
    const isHorizontal = Math.random() < 0.5 ;

    if (isHorizontal) {
      const y = Math.floor(Math.random() * gridSize);
      const x = Math.floor(Math.random() * (gridSize - palavra.length +1));
      for (let i = 0; i < palavra.length; i++) {
        gridLetras[y][x + i] = palavra[i];
      }
    } else {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * (gridSize - palavra.length + 1));
      for (let i = 0; i < palavra.length; i++) {
        gridLetras[y + i][x] = palavra[i];
      }
    }

    this.setState({ gridLetras });
  };

  componentDidMount() {
    this.state.listaPalavras.forEach((palavra) => {
      this.adicionarPalavraAoGrid(palavra);
    });
  }

  handleCellClick = (x, y) => {
    const letra = this.state.gridLetras[y][x];
    if (!letra) return; // Célula vazia

    const palavraEncontrada = this.state.listaPalavras.find((palavra) =>
      this.palavraContemCoordenada(palavra, x, y)
    );

    if (palavraEncontrada) {
      this.setState(
        (prevState) => ({
          palavrasEncontradas: [...prevState.palavrasEncontradas, palavraEncontrada],
        }),
        () => {
          if (this.state.palavrasEncontradas.length === this.state.listaPalavras.length) {
            Alert.alert('Parabéns!', 'Você encontrou todas as palavras.');
          }
        }
      );
    }
  };

  palavraContemCoordenada = (palavra, x, y) => {
    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

    for (let i = 0; i < palavra.length; i++) {
      if (
        x + i * dx.every((val) => val === dx[0]) >= 0 &&
        x + i * dx.every((val) => val === dx[0]) < this.state.gridLetras[0].length &&
        y + i * dy.every((val) => val === dy[0]) >= 0 &&
        y + i * dy.every((val) => val === dy[0]) < this.state.gridLetras.length &&
        palavra[i] === this.state.gridLetras[y + i * dy[0]][x + i * dx[0]]
      ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Caça-Palavras</Text>
        <View style={styles.grid}>
          {this.state.gridLetras.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <TouchableOpacity
                  key={columnIndex}
                  style={[styles.cell, this.state.palavrasEncontradas.includes(cell) && styles.foundCell]}
                  onPress={() => this.handleCellClick(columnIndex, rowIndex)}
                >
                  <Text>{cell}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.wordList}>
          <Text>Palavras a encontrar:</Text>
          {this.state.listaPalavras.map((palavra, index) => (
            <Text key={index} style={this.state.palavrasEncontradas.includes(palavra) && styles.foundWord}>
              {palavra}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  foundCell: {
    backgroundColor: 'green',
  },
  wordList: {
    marginTop: 20,
  },
  foundWord: {
    textDecorationLine: 'line-through',
    color: 'green',
  },
});

export default WordSearchGame;
