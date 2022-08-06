/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import XAxis from '../components/XAxis';
import YAxis from '../components/YAxis';

const {height, width} = Dimensions.get('screen');

type Cell =
  | 'B_pawn'
  | 'W_pawn'
  | '-1'
  | 'B_rook'
  | 'B_knight'
  | 'B_bishop'
  | 'B_king'
  | 'B_queen'
  | 'W_rook'
  | 'W_knight'
  | 'W_bishop'
  | 'W_king'
  | 'W_queen';

const opening_names = [
  'Kings Pawn',
  'Queens Pawn',
  'Reti',
  'English',
  'Kings Fianchetto',
];

const CELL_HEIGHT = height * 0.068;
const CELL_WIDTH = (width - 40) / 8;

const board = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
];

const initial: Cell[][] = [
  [
    'B_rook',
    'B_knight',
    'B_bishop',
    'B_king',
    'B_queen',
    'B_bishop',
    'B_knight',
    'B_rook',
  ],
  [
    'B_pawn',
    'B_pawn',
    'B_pawn',
    'B_pawn',
    'B_pawn',
    'B_pawn',
    'B_pawn',
    'B_pawn',
  ],
  ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
  ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
  ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
  ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
  [
    'W_pawn',
    'W_pawn',
    'W_pawn',
    'W_pawn',
    'W_pawn',
    'W_pawn',
    'W_pawn',
    'W_pawn',
  ],
  [
    'W_rook',
    'W_knight',
    'W_bishop',
    'W_king',
    'W_queen',
    'W_bishop',
    'W_knight',
    'W_rook',
  ],
];

const openings = [
  {from: {i: 6, j: 4}, to: {i: 4, j: 4}}, // Kings Pawn
  {from: {i: 6, j: 3}, to: {i: 4, j: 3}}, // Queens Pawn
  {from: {i: 7, j: 6}, to: {i: 5, j: 5}}, // Reti
  {from: {i: 6, j: 2}, to: {i: 4, j: 2}}, // English
  {from: {i: 6, j: 6}, to: {i: 4, j: 6}}, // Kings_Fianchetto
];

export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<Cell[][]>([]);
  const [currentMove, setCurrentMove] = useState('');

  function getImage(value: Cell): null | ImageSourcePropType {
    switch (value) {
      case 'B_pawn':
        return require('../assets/images/chess/chess_piece_2_black_pawn.png');
      case 'W_pawn':
        return require('../assets/images/chess/chess_piece_2_white_pawn.png');
      case 'B_rook':
        return require('../assets/images/chess/chess_piece_2_black_rook.png');
      case 'B_knight':
        return require('../assets/images/chess/chess_piece_2_black_knight.png');
      case 'B_bishop':
        return require('../assets/images/chess/chess_piece_2_black_bishop.png');
      case 'B_king':
        return require('../assets/images/chess/chess_piece_2_black_king.png');
      case 'B_queen':
        return require('../assets/images/chess/chess_piece_2_black_queen.png');
      case 'W_rook':
        return require('../assets/images/chess/chess_piece_2_white_rook.png');
      case 'W_knight':
        return require('../assets/images/chess/chess_piece_2_white_knight.png');
      case 'W_bishop':
        return require('../assets/images/chess/chess_piece_2_white_bishop.png');
      case 'W_king':
        return require('../assets/images/chess/chess_piece_2_white_king.png');
      case 'W_queen':
        return require('../assets/images/chess/chess_piece_2_white_queen.png');
      default:
        return null;
    }
  }

  useEffect(() => {
    onReset();
  }, []);

  function getCopy(matrix: any[][]) {
    const tempBoard = matrix.map(function (arr) {
      return arr.slice();
    });
    return tempBoard;
  }

  function onChange() {
    // Get random number from 0 to 5
    const random = Math.floor(Math.random() * 5);

    const tempBoard = getCopy(initial);
    const {from, to} = openings[random];

    tempBoard[to.i][to.j] = tempBoard[from.i][from.j];
    tempBoard[from.i][from.j] = '-1';
    setCurrentMove(opening_names[random]);
    setCurrentBoard([...tempBoard]);
  }

  function onReset() {
    const tempBoard = getCopy(initial);
    setCurrentMove('');
    setCurrentBoard([...tempBoard]);
  }

  return (
    <View style={styles.container}>
      <XAxis />
      <View style={styles.row}>
        <YAxis />
        <View style={styles.board}>
          {currentBoard.length > 0 &&
            currentBoard[0].length > 0 &&
            board.map((el, i) => {
              return el.map((nl, j) => {
                console.log(board);
                const img = getImage(currentBoard[i][j]);
                return (
                  <View
                    style={[styles.cell, nl ? styles.white : styles.black]}
                    key={i + j}>
                    {!img ? null : (
                      <Image
                        resizeMethod="scale"
                        resizeMode="stretch"
                        style={styles.image}
                        source={img}
                      />
                    )}
                  </View>
                );
              });
            })}
        </View>
        <YAxis position="RIGHT" />
      </View>
      <XAxis />

      <Button title="Random" onPress={onChange} />
      <Button title="Reset" onPress={onReset} />

      {currentMove !== '' ? (
        <View style={styles.moveContainer}>
          <Text style={styles.move}>{currentMove}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width, height: height * 0.7},
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  yAxisLabelContainer: {
    justifyContent: 'center',
    height: CELL_HEIGHT,
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
    color: 'white',
  },

  yAxis: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 20,
    backgroundColor: '#333',
  },
  yAxisRight: {
    left: undefined,
    right: 0,
  },
  cell: {
    height: CELL_HEIGHT,
    width: CELL_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  black: {backgroundColor: 'black'},
  white: {backgroundColor: 'white'},
  image: {height: '95%', width: '95%'},
  moveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
  },
  move: {fontSize: 16, color: '#333'},
});
