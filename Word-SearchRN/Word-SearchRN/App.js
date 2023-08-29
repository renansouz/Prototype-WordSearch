import React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";

const Grid = ({ gridLetras, selecaoAtual, selecao, click }) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {gridLetras.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.map((letra, j) => (
            <Text
              key={j}
              style={[
                {
                  fontSize: 20,
                  textAlign: "center",
                  backgroundColor: letra.ehFixa ? "white" : "transparent",
                },
                letra.palavraEstaCirculada && {
                  backgroundColor: selecaoAtual.cor,
                },
                letra.palavraEstaCirculada && selecaoAtual.indiceInicialX === i && selecaoAtual.indiceInicialY === j && {
                  backgroundColor: selecaoAtual.cor,
                  borderRadius: 20,
                },
              ]}
              onPress={() => click({ i, j })}
            >
              {letra.letra}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  linha: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100% / 6",
    borderRadius: 10,
  },
});

const App = () => {
  const [gridLetras, setGridLetras] = React.useState([
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X"],
    ["Y", "Z", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9", "10"],
  ]);

  const [selecaoAtual, setSelecaoAtual] = React.useState({
    indiceInicialX: undefined,
    indiceInicialY: undefined,
    posicaoInicialX: undefined,
    posicaoInicialY: undefined,
    cor: "rgba(256, 20, 20, 0.3)",
  });

  const click = (posicao) => {
    setSelecaoAtual({
      ...selecaoAtual,
      indiceInicialX: posicao.i,
      indiceInicialY: posicao.j,
      posicaoInicialX: posicao.x,
      posicaoInicialY: posicao.y,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Grid gridLetras={gridLetras} selecaoAtual={selecaoAtual} click={click} />
    </View>
  );
};

export default App;
