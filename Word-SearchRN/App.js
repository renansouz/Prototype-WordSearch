import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

class WordSearchGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridLetras: this.gerarGridAleatorio(),
      listaPalavras: ["ááááááá", "óóóóóóó", "úúúúúúú", "ííííííí", "ééééééé"],
      palavrasEncontradas: [],
      certos: []

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
        this.state.certos.push([y, x+i])
      }
    } else {
      let x, y;
      do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * (gridSize - palavra.length + 1));
      } while (!this.ehPosicaoValida(gridLetras, palavra, x, y, "vertical"));

      for (let i = 0; i < palavra.length; i++) {
        gridLetras[y + i][x] = palavra[i];
        this.state.certos.push([y+i, x])
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

  coordenadaPalavra(palavra) {
    palavra = this.state.listaPalavras
  }
    verificaCasa(tentativa,certas){
       tentativa = this.state.palavrasEncontradas
       certas = this.state.certos
   
       for (let i = 0; i < certas.length; i++) {
      const currentArray = certas[i];
      if (this.validacao(tentativa, currentArray)) {
        // Aqui você pode aplicar as condições desejadas quando a igualdade é encontrada.
        console.log("palavre é igual a um dos arrays em certos");
        // ... Suas condições e ações aqui ...
        return; // Saia do loop se a igualdade for encontrada
      }
       
      
    }
    // Se o loop terminar sem encontrar uma igualdade, você pode aplicar outras condições.
    console.log("palavre não é igual a nenhum dos arrays em certos");
    // ... Outras condições e ações aqui ...
    }
  
    
  validacao(arr1, arr2){
    if (arr1.length !== arr2.length) {
      return false
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }
  }

  handleCellClick(y,x) {
    this.state.palavrasEncontradas.push([y, x])
    console.log(this.state.palavrasEncontradas)
    console.log(this.state.certos)
    this.verificaCasa()
  }
 


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
                  onPress={() => this.handleCellClick(rowIndex, columnIndex)}
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
