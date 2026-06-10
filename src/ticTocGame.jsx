
import React, { useState } from 'react';

export default function TicTacToe() {
  // Initialize board state with 9 empty spaces
//   const [board, setBoard] = useState(Array(9).fill(null));


  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);

  
  // Track whose turn it is (true for 'X', false for 'O')
  const [isXNext, setIsXNext] = useState(true);

  // All 8 possible winning combinations on a 3x3 grid
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

   // Helper function to calculate game status
  const calculateWinner = (squares) => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Returns 'X' or 'O'
      }
    }
    return null;
  };
 const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

   // Handle box clicks
  const handleClick = (index) => {
    // Block if square is filled or game has ended
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  // Reset state variables to restart game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

   // Determine message header string
  let statusMessage;
  if (winner) {
    statusMessage = `Winner: ${winner}`;
  } else if (isDraw) {
    statusMessage = "Game Status: It's a Draw!";
  } else {
    statusMessage = `Next Player: ${isXNext ? 'X' : 'O'}`;
  }
   return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tic Tac Toe</h1>
      <div style={styles.status}>{statusMessage}</div>
      
      <div style={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            style={{
              ...styles.square,
              color: value === 'X' ? '#3b82f6' : '#ef4444'
            }}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button style={styles.resetBtn} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

// Inline styles for rapid setup without extra CSS files
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    marginTop: '50px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#1e293b',
    marginBottom: '10px',
  },
  status: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#475569',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 100px)',
    gridTemplateRows: 'repeat(3, 100px)',
    gap: '6px',
    backgroundColor: '#cbd5e1',
    padding: '6px',
    borderRadius: '8px',
  },
  square: {
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  resetBtn: {
    marginTop: '25px',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};