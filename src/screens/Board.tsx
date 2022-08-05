import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
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

export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<Cell[][]>([
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
  ]);

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

  function onChange() {
    setCurrentBoard([
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
      ['-1', '-1', 'W_pawn', '-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
      [
        'W_pawn',
        'W_pawn',
        '-1',
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
    ]);
  }

  return (
    <View style={styles.container}>
      <XAxis />
      <View style={styles.row}>
        <YAxis />
        <View style={styles.board}>
          {board.map((el, i) => {
            return el.map((nl, j) => {
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
});
