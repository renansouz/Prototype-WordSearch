import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

class WordSearchGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridLetras: this.gerarGridAleatorio(),
      listaPalavras: [
        "ááááááá",
        "óóóóóóó",
        "úúúúúúú",
        "ííííííí",
        "ééééééé",
      ],
      palavrasEncontradas: [],
      
    };
  }

  gerarGridAleatorio = () => {
    const gridSizeX = 17; // Tamanho do grid horizontal
    const gridSizeY = 12; // Tamanho do grid vertical
    const grid = [];

    for (let i = 0; i < gridSizeX; i++) {
      const row = [];
      for (let j = 0; j < gridSizeY; j++) {
        row.push("");
      }
      grid.push(row);
    }

    return grid;
  };

  preencherGridComLetrasAleatorias = () => {
    const { gridLetras } = this.state;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras possíveis

    for (let i = 0; i < gridLetras.length; i++) {
      for (let j = 0; j < gridLetras[i].length; j++) {
        if (gridLetras[i][j] === "") {
          // Preencher com letra aleatória
          const randomIndex = Math.floor(Math.random() * alphabet.length);
          gridLetras[i][j] = alphabet[randomIndex];
        }
      }
    }

    this.setState({ gridLetras });
  };

  adicionarPalavraAoGrid = (palavra) => {
    const { gridLetras } = this.state;
    const gridSize = gridLetras.length;

    const directions = ["horizontal", "vertical"];
    const selectedDirection =
      directions[Math.floor(Math.random() * directions.length)];

    if (selectedDirection === "horizontal") {
      let x, y;
      do {
        x = Math.floor(Math.random() * (gridSize - palavra.length + 1));
        y = Math.floor(Math.random() * gridSize);
      } while (!this.ehPosicaoValida(gridLetras, palavra, x, y, "horizontal"));

      for (let i = 0; i < palavra.length; i++) {
        gridLetras[y][x + i] = palavra[i];
      }
    } else {
      let x, y;
      do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * (gridSize - palavra.length + 1));
      } while (!this.ehPosicaoValida(gridLetras, palavra, x, y, "vertical"));

      for (let i = 0; i < palavra.length; i++) {
        gridLetras[y + i][x] = palavra[i];
      }
    }

    this.setState({ gridLetras });
  };

  ehPosicaoValida = (grid, palavra, x, y, direcao) => {
    const gridSize = grid.length;

    if (direcao === "horizontal") {
      for (let i = 0; i < palavra.length; i++) {
        if (grid[y][x + i] !== "" && grid[y][x + i] !== palavra[i]) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < palavra.length; i++) {
        if (grid[y + i][x] !== "" && grid[y + i][x] !== palavra[i]) {
          return false;
        }
      }
    }

    return true;
  };

  componentDidMount() {
    this.state.listaPalavras.forEach((palavra) => {
      this.adicionarPalavraAoGrid(palavra);
    });

    this.preencherGridComLetrasAleatorias();
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
          palavrasEncontradas: [
            ...prevState.palavrasEncontradas,
            palavraEncontrada,
          ],
        }),
        () => {
          if (
            this.state.palavrasEncontradas.length ===
            this.state.listaPalavras.length
          ) {
            Alert.alert("Parabéns!", "Você encontrou todas as palavras.");
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
        x + i * dx.every((val) => val === dx[0]) <
          this.state.gridLetras[0].length &&
        y + i * dy.every((val) => val === dy[0]) >= 0 &&
        y + i * dy.every((val) => val === dy[0]) <
          this.state.gridLetras.length &&
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
        <View style={styles.grid}>
          {this.state.gridLetras.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <TouchableOpacity
                  key={columnIndex}
                  style={[
                    styles.cell,
                    this.state.palavrasEncontradas.includes(cell) &&
                      styles.foundCell,
                  ]}
                  onPress={() => this.handleCellClick(columnIndex, rowIndex)}
                >
                  <Text>{cell}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  foundCell: {
    backgroundColor: "green",
  },

  foundWord: {
    textDecorationLine: "line-through",
    color: "green",
  },
});

export default WordSearchGame;