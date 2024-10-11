import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
const initialBoardSetup = () => {
  const emptyRow = Array(8).fill(null);
  const pawnRow = Array(8).fill("P"); // Pawns for the demo

  return [
    ["R", "N", "B", "Q", "K", "B", "N", "R"], // Black major pieces
    pawnRow, // Black pawns
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow, // Empty rows
    pawnRow.map((pawn) => (pawn ? "p" : null)), // White pawns
    ["r", "n", "b", "q", "k", "b", "n", "r"], // White major pieces
  ];
};
function App() {
  const [board, setBoard] = useState(initialBoardSetup());
  const [selectedPiece, setSelectedPiece] = useState<any>(null);
  const [highlightedSquares, setHighlightedSquares] = useState<any[]>([]);

  // Click a square to select/move a piece
  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
      // Move piece
      const [fromRow, fromCol] = selectedPiece;
      const newBoard = [...board];
      newBoard[row][col] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;
      setBoard(newBoard);
      setSelectedPiece(null);
      setHighlightedSquares([]);
    } else if (board[row][col]) {
      // Select piece
      setSelectedPiece([row, col]);
      highlightPossibleMoves(row, col);
    }
  };

  // Highlight squares where the selected piece can move (for simplicity, only pawns for now)
  const highlightPossibleMoves = (row: number, col: number) => {
    const piece = board[row][col];
    let moves = [];

    if (piece === "p" && row > 0) {
      // Simple rule for white pawn movement
      if (!board[row - 1][col]) moves.push([row - 1, col]);
    } else if (piece === "P" && row < 7) {
      // Simple rule for black pawn movement
      if (!board[row + 1][col]) moves.push([row + 1, col]);
    }

    setHighlightedSquares(moves);
  };

  const renderSquare = (row: number, col: number) => {
    const isBlack = (row + col) % 2 === 1;
    const position = `${String.fromCharCode(97 + col)}${8 - row}`;
    const piece = board[row][col];
    const isHighlighted = highlightedSquares.some(
      ([highlightRow, highlightCol]) =>
        highlightRow === row && highlightCol === col
    );

    return (
      <div
        className={`square ${isBlack ? "black" : "white"} ${
          isHighlighted ? "highlighted" : ""
        }`}
        key={position}
        onClick={() => handleSquareClick(row, col)}
      >
        <span className="position">{position}</span>
        {piece && <span className="piece">{piece}</span>}
      </div>
    );
  };

  const renderRow = (row: number) => {
    return (
      <div className="row" key={row}>
        {Array.from({ length: 8 }, (_, col) => renderSquare(row, col))}
      </div>
    );
  };

  return (
    <div className="chessboard">
      {Array.from({ length: 8 }, (_, row) => renderRow(row))}
    </div>
  );
}

export default App;
