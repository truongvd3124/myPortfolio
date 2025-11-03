import React, { useState, useEffect } from 'react';

// Import flag SVGs
import flagAndorra from '../../assets/flags/Flag-Andorra--Streamline-Twemoji-Emoji.svg';
import flagBulgaria from '../../assets/flags/Flag-Bulgaria--Streamline-Twemoji-Emoji.svg';
import flagChad from '../../assets/flags/Flag-Chad--Streamline-Twemoji-Emoji.svg';
import flagColombia from '../../assets/flags/Flag-Colombia--Streamline-Twemoji-Emoji.svg';
import flagCzechia from '../../assets/flags/Flag-Czechia--Streamline-Twemoji-Emoji.svg';
import flagFaroeIslands from '../../assets/flags/Flag-Faroe-Islands--Streamline-Twemoji-Emoji.svg';
import flagFinland from '../../assets/flags/Flag-Finland--Streamline-Twemoji-Emoji.svg';
import flagGuinea from '../../assets/flags/Flag-Guinea--Streamline-Twemoji-Emoji.svg';
import flagHungary from '../../assets/flags/Flag-Hungary--Streamline-Twemoji-Emoji.svg';
import flagIndonesia from '../../assets/flags/Flag-Indonesia--Streamline-Twemoji-Emoji.svg';
import flagIraq from '../../assets/flags/Flag-Iraq--Streamline-Twemoji-Emoji.svg';
import flagLuxembourg from '../../assets/flags/Flag-Luxembourg--Streamline-Twemoji-Emoji.svg';
import flagMali from '../../assets/flags/Flag-Mali--Streamline-Twemoji-Emoji.svg';
import flagMoldova from '../../assets/flags/Flag-Moldova--Streamline-Twemoji-Emoji.svg';
import flagMonaco from '../../assets/flags/Flag-Monaco--Streamline-Twemoji-Emoji.svg';
import flagNetherlands from '../../assets/flags/Flag-Netherlands--Streamline-Twemoji-Emoji.svg';
import flagNorway from '../../assets/flags/Flag-Norway--Streamline-Twemoji-Emoji.svg';
import flagPhilippines from '../../assets/flags/Flag-Philippines--Streamline-Twemoji-Emoji.svg';
import flagPoland from '../../assets/flags/Flag-Poland--Streamline-Twemoji-Emoji.svg';
import flagRomania from '../../assets/flags/Flag-Romania--Streamline-Twemoji-Emoji.svg';
import flagSenegal from '../../assets/flags/Flag-Senegal--Streamline-Twemoji-Emoji.svg';
import flagSweden from '../../assets/flags/Flag-Sweden--Streamline-Twemoji-Emoji.svg';
import flagVenezuela from '../../assets/flags/Flag-Venezuela--Streamline-Twemoji-Emoji.svg';
import flagYemen from '../../assets/flags/Flag-Yemen--Streamline-Twemoji-Emoji.svg';

// Games Grid Component
const GamesGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Memory Game */}
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                    Memory
                </h3>
                <div className="flex-1">
                    <MemoryGame />
                </div>
            </div>

            {/* 2048 Game */}
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                    2048
                </h3>
                <div className="flex-1">
                    <Game2048 />
                </div>
            </div>

            {/* Tic Tac Toe */}
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
                    Tic Tac Toe
                </h3>
                <div className="flex-1">
                    <TicTacToe />
                </div>
            </div>
        </div>
    );
};

// Sudoku Game Component
const SudokuGame: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [time, setTime] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (gameStarted && !isComplete) {
            const timer = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameStarted, isComplete]);

    useEffect(() => {
        initializeGame();
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameStarted || isComplete) return;
            
            // Handle number input (1-9)
            if (e.key >= '1' && e.key <= '9') {
                const num = parseInt(e.key);
                handleNumberInput(num);
            }
            
            // Handle cell navigation with arrow keys
            if (selectedCell) {
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        if (selectedCell.row > 0) {
                            setSelectedCell({row: selectedCell.row - 1, col: selectedCell.col});
                        }
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (selectedCell.row < 8) {
                            setSelectedCell({row: selectedCell.row + 1, col: selectedCell.col});
                        }
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (selectedCell.col > 0) {
                            setSelectedCell({row: selectedCell.row, col: selectedCell.col - 1});
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (selectedCell.col < 8) {
                            setSelectedCell({row: selectedCell.row, col: selectedCell.col + 1});
                        }
                        break;
                    case 'Backspace':
                    case 'Delete':
                        e.preventDefault();
                        handleNumberInput(0);
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStarted, isComplete, selectedCell]);

    const generateRandomSudoku = () => {
        const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        
        // Fill diagonal 3x3 boxes first (easier to ensure validity)
        for (let box = 0; box < 9; box += 3) {
            fillBox(emptyBoard, box, box);
        }
        
        // Fill remaining cells
        solveSudoku(emptyBoard);
        
        // Remove some numbers to create puzzle
        const puzzle = emptyBoard.map(row => [...row]);
        const cellsToRemove = 40 + Math.floor(Math.random() * 10); // Remove 40-50 numbers
        
        let removed = 0;
        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
                removed++;
            }
        }
        
        return puzzle;
    };

    const fillBox = (board: number[][], row: number, col: number) => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        
        let index = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[row + i][col + j] = numbers[index++];
            }
        }
    };

    const shuffleArray = (array: number[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const solveSudoku = (board: number[][]): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }
        
        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }
        
        // Check 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        
        return true;
    };

    const initializeGame = () => {
        const newBoard = generateRandomSudoku();
        setBoard(newBoard);
        setTime(0);
        setGameStarted(false);
        setIsComplete(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const handleCellClick = (row: number, col: number) => {
        if (!gameStarted || isComplete) return;
        setSelectedCell({row, col});
    };

    const handleNumberInput = (num: number) => {
        if (!selectedCell || !gameStarted || isComplete) return;
        
        const newBoard = [...board];
        newBoard[selectedCell.row][selectedCell.col] = num;
        setBoard(newBoard);
        
        // Check if board is complete
        if (isValidSudoku(newBoard)) {
            setIsComplete(true);
            setGameStarted(false);
        }
    };

    const isValidSudoku = (board: number[][]) => {
        // First check if all cells are filled (no zeros)
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) return false;
            }
        }
        
        // Check rows
        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                const num = board[row][col];
                if (seen.has(num)) return false;
                seen.add(num);
            }
        }
        
        // Check columns
        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                const num = board[row][col];
                if (seen.has(num)) return false;
                seen.add(num);
            }
        }
        
        // Check 3x3 boxes
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const seen = new Set();
                for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
                    for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
                        const num = board[row][col];
                        if (seen.has(num)) return false;
                        seen.add(num);
                    }
                }
            }
        }
        
        return true;
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative">
            <div className="text-center">
                <div className="text-cyan-200 mb-4 text-sm">
                    Time: {formatTime(time)}
                </div>

                <div className="bg-slate-800 p-1 rounded-xl border-2 border-cyan-500/30 mb-3 inline-block">
                    <div className="grid grid-cols-9 gap-1">
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    className={`w-8 h-8 text-sm rounded border transition-all duration-200 flex items-center justify-center ${
                                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                                            ? 'bg-cyan-600 text-white border-cyan-400'
                                            : cell !== 0
                                            ? 'bg-slate-700 text-cyan-300 border-slate-600'
                                            : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                                    }`}
                                >
                                    {cell === 0 ? '' : cell}
                                </button>
                            ))
                        )}
                    </div>
                </div>


                <div className="mt-6">
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Exit
                    </button>
                </div>

                {isComplete && (
                    <div className="text-green-400 font-bold mb-6">
                        🎉 Congratulations! You solved the Sudoku in {formatTime(time)}!
                    </div>
                )}
            </div>

            {/* Play Overlay */}
            {!gameStarted && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <button
                        onClick={startGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                    >
                        Play
                    </button>
                </div>
            )}
        </div>
    );
};

// Tic Tac Toe (X O) Game Component
const TicTacToe: React.FC = () => {
    const emptyBoard: (null | 'X' | 'O')[] = Array(9).fill(null);
    const [squares, setSquares] = useState<(null | 'X' | 'O')[]>(emptyBoard);
    const [gameStarted, setGameStarted] = useState(false);
    const [draggedPiece, setDraggedPiece] = useState<{type: 'X' | 'O', from: 'pool' | number} | null>(null);
    
    // Track pieces in pool (available pieces)
    const [xPool, setXPool] = useState(3);
    const [oPool, setOPool] = useState(3);
    
    // Track positions on board
    const [xPositions, setXPositions] = useState<number[]>([]);
    const [oPositions, setOPositions] = useState<number[]>([]);

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(Boolean);

    const handlePoolMouseDown = (type: 'X' | 'O') => {
        if (!gameStarted || winner) return;
        if (type === 'X' && xPool === 0) return;
        if (type === 'O' && oPool === 0) return;
        setDraggedPiece({type, from: 'pool'});
    };

    const handleBoardMouseDown = (index: number) => {
        if (!gameStarted || !squares[index] || winner) return;
        setDraggedPiece({type: squares[index] as 'X' | 'O', from: index});
    };

    const handleBoardMouseUp = (index: number) => {
        if (!gameStarted || winner || !draggedPiece) return;
        
        // Cannot drop on occupied cell
        if (squares[index] !== null) {
            setDraggedPiece(null);
            return;
        }
        
        const nextSquares = squares.slice();
        const pieceType = draggedPiece.type;
        
        // Case 1: Moving from pool to board
        if (draggedPiece.from === 'pool') {
            nextSquares[index] = pieceType;
            
            if (pieceType === 'X') {
                setXPool(prev => prev - 1);
                const newPositions = [...xPositions, index];
                setXPositions(newPositions);
            } else {
                setOPool(prev => prev - 1);
                const newPositions = [...oPositions, index];
                setOPositions(newPositions);
            }
        }
        // Case 2: Moving from board to board
        else {
            const fromIndex = draggedPiece.from;
            nextSquares[index] = pieceType;
            nextSquares[fromIndex] = null;
            
            if (pieceType === 'X') {
                const newPositions = xPositions.filter(p => p !== fromIndex);
                setXPositions([...newPositions, index]);
            } else {
                const newPositions = oPositions.filter(p => p !== fromIndex);
                setOPositions([...newPositions, index]);
            }
        }
        
        setSquares(nextSquares);
        setDraggedPiece(null);
    };

    const resetGame = () => {
        setSquares(emptyBoard);
        setXPool(3);
        setOPool(3);
        setXPositions([]);
        setOPositions([]);
        setGameStarted(false);
        setDraggedPiece(null);
    };

    useEffect(() => {
        const handleMouseUp = (e: MouseEvent) => {
            if (!draggedPiece || !gameStarted || winner) {
                if (draggedPiece) setDraggedPiece(null);
                return;
            }
            
            // Find the board cell that was dropped on
            const target = e.target as HTMLElement;
            const boardCell = target.closest('[data-board-cell]') as HTMLElement;
            
            if (boardCell) {
                const index = parseInt(boardCell.dataset.boardIndex || '-1');
                if (index >= 0 && index < 9 && squares[index] === null) {
                    const nextSquares = squares.slice();
                    const pieceType = draggedPiece.type;
                    
                    // Case 1: Moving from pool to board
                    if (draggedPiece.from === 'pool') {
                        nextSquares[index] = pieceType;
                        
                        if (pieceType === 'X') {
                            setXPool(prev => prev - 1);
                            setXPositions(prev => [...prev, index]);
                        } else {
                            setOPool(prev => prev - 1);
                            setOPositions(prev => [...prev, index]);
                        }
                    }
                    // Case 2: Moving from board to board
                    else {
                        const fromIndex = draggedPiece.from as number;
                        nextSquares[index] = pieceType;
                        nextSquares[fromIndex] = null;
                        
                        if (pieceType === 'X') {
                            setXPositions(prev => {
                                const filtered = prev.filter(p => p !== fromIndex);
                                return [...filtered, index];
                            });
                        } else {
                            setOPositions(prev => {
                                const filtered = prev.filter(p => p !== fromIndex);
                                return [...filtered, index];
                            });
                        }
                    }
                    
                    setSquares(nextSquares);
                    setDraggedPiece(null);
                } else {
                    setDraggedPiece(null);
                }
            } else {
                setDraggedPiece(null);
            }
        };

        if (draggedPiece) {
            window.addEventListener('mouseup', handleMouseUp);
            return () => window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [draggedPiece, gameStarted, winner, squares]);

    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative select-none min-h-[400px]">
            {/* X Pool - Top of board */}
            <div className="flex justify-center gap-2 min-h-[56px]">
                {Array(xPool).fill(null).map((_, idx) => (
                    <div
                        key={`x-pool-${idx}`}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            handlePoolMouseDown('X');
                        }}
                        className={`h-14 w-14 rounded-lg border-2 border-cyan-400 bg-cyan-600/20 text-cyan-300 flex items-center justify-center text-2xl font-black cursor-move select-none hover:bg-cyan-600/30 transition-all
                            ${draggedPiece && draggedPiece.from === 'pool' && draggedPiece.type === 'X' ? 'opacity-50 scale-90' : ''}`}
                    >
                        X
                    </div>
                ))}
            </div>

            {/* Game Board 3x3 */}
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-2 max-w-xs p-3 select-none">
                {squares.map((val, idx) => (
                    <div
                        key={idx}
                        data-board-cell
                        data-board-index={idx}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            handleBoardMouseDown(idx);
                        }}
                        className={`h-14 w-14 md:h-16 md:w-16 min-h-[56px] md:min-h-[64px] rounded-lg border-2 flex items-center justify-center text-xl font-black transition-all select-none
                            ${val === 'X' 
                                ? 'bg-cyan-600/20 border-cyan-400 text-cyan-300 hover:bg-cyan-600/30 cursor-move' 
                                : val === 'O' 
                                ? 'bg-purple-600/20 border-purple-400 text-purple-300 hover:bg-purple-600/30 cursor-move' 
                                : 'bg-slate-800 border-slate-600 hover:bg-slate-700 cursor-pointer'}
                            ${draggedPiece && draggedPiece.from !== 'pool' && draggedPiece.from === idx ? 'opacity-50 scale-90' : ''}
                            ${draggedPiece && val === null ? 'border-dashed border-cyan-500' : ''}`}
                    >
                        {val}
                    </div>
                ))}
                </div>
            </div>
            
            {/* O Pool - Bottom of board */}
            <div className="flex justify-center gap-2 min-h-[56px]">
                {Array(oPool).fill(null).map((_, idx) => (
                    <div
                        key={`o-pool-${idx}`}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            handlePoolMouseDown('O');
                        }}
                        className={`h-14 w-14 rounded-lg border-2 border-purple-400 bg-purple-600/20 text-purple-300 flex items-center justify-center text-2xl font-black cursor-move select-none hover:bg-purple-600/30 transition-all
                            ${draggedPiece && draggedPiece.from === 'pool' && draggedPiece.type === 'O' ? 'opacity-50 scale-90' : ''}`}
                    >
                        O
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-3">
                <button onClick={resetGame} className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Exit
                </button>
            </div>

            {/* Start / Result Overlay */}
            {(!gameStarted || winner || isDraw) && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center space-y-4">
                        {(winner || isDraw) && (
                            <div className="text-cyan-200 font-semibold">
                                {winner ? `Winner: ${winner}` : 'Draw!'}
                            </div>
                        )}
                        <button
                            onClick={() => {
                                if (winner || isDraw) {
                                    resetGame();
                                } else {
                                    setGameStarted(true);
                                }
                            }}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                        >
                            {winner || isDraw ? 'Play Again' : 'Play'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

function calculateWinner(sq: (null | 'X' | 'O')[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
        if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    return null;
}

// Memory Game Component - Enhanced
const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<(string | null)[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [bestTime, setBestTime] = useState<number>(0);

    // Flag SVG imports array
    const symbols = [
        flagAndorra,
        flagBulgaria,
        flagChad,
        flagColombia,
        flagCzechia,
        flagFaroeIslands,
        flagFinland,
        flagGuinea,
        flagHungary,
        flagIndonesia,
        flagIraq,
        flagLuxembourg,
        flagMali,
        flagMoldova,
        flagMonaco,
        flagNetherlands,
        flagNorway,
        flagPhilippines,
        flagPoland,
        flagRomania,
        flagSenegal,
        flagSweden,
        flagVenezuela,
        flagYemen,
    ];

    const isGameComplete = matched.length === cards.length;

    useEffect(() => {
        if (gameStarted && !isGameComplete) {
            const timer = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameStarted, isGameComplete]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const cardCount = 24; // 6x8 grid - 24 pairs (48 cards total)
        const selectedSymbols = symbols.slice(0, cardCount);
        const gameCards = [...selectedSymbols, ...selectedSymbols].sort(() => Math.random() - 0.5);
        setCards(gameCards);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setTime(0);
        setGameStarted(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const handleCardClick = (index: number) => {
        if (!gameStarted || flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(prev => prev + 1);
            const [first, second] = newFlipped;
            
            if (cards[first] === cards[second]) {
                setMatched(prev => [...prev, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    useEffect(() => {
        if (isGameComplete && time > 0) {
            setBestTime(prev => prev === 0 ? time : Math.min(prev, time));
            // Stop the timer when game is complete
            setGameStarted(false);
        }
    }, [isGameComplete, time]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };


    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative">
            <div className="text-center">
                <div className="text-cyan-200 mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>Moves: {moves}</div>
                    <div>Time: {formatTime(time)}</div>
                    <div>Matched: {matched.length / 2} / 24</div>
                    <div>Best: {bestTime > 0 ? formatTime(bestTime) : '--:--'}</div>
                </div>

                <div className="grid grid-cols-8 gap-1 my-3 justify-center w-full max-w-md mx-auto">
                    {cards.map((card, index) => (
                        <button
                            key={index}
                            className={`w-10 h-10 rounded-md transition-all duration-300 flex items-center justify-center ${
                                flipped.includes(index) || matched.includes(index)
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                            }`}
                            onClick={() => handleCardClick(index)}
                        >
                            {flipped.includes(index) || matched.includes(index) ? (
                                <img src={card as string} alt="flag" className="w-8 h-8 object-contain" />
                            ) : (
                                '?'
                            )}
                        </button>
                    ))}
                </div>

                {isGameComplete && (
                    <div className="text-green-400 font-bold mb-6">
                        🎉 Congratulations! You won in {moves} moves and {formatTime(time)}!
                    </div>
                )}
                
                <div className="mt-6">
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Exit
                    </button>
                </div>
            </div>

            {/* Play Overlay */}
            {!gameStarted && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <button
                        onClick={startGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                    >
                        Play
                    </button>
                </div>
            )}
        </div>
    );
};

// 2048 Game Component
const Game2048: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setWon(false);
        setGameStarted(false);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const exitGame = () => {
        setGameStarted(false);
    };

    const addRandomTile = (board: number[][]) => {
        const emptyCells: {row: number, col: number}[] = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    emptyCells.push({row, col});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const moveLeft = (board: number[][]) => {
        const newBoard = board.map(row => {
            const filtered = row.filter(cell => cell !== 0);
            const merged = [];
            for (let i = 0; i < filtered.length; i++) {
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    setScore(prev => prev + filtered[i] * 2);
                    if (filtered[i] * 2 === 2048) setWon(true);
                    i++;
                } else {
                    merged.push(filtered[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            return merged;
        });
        return newBoard;
    };

    const moveRight = (board: number[][]) => {
        return board.map(row => {
            const filtered = row.filter(cell => cell !== 0).reverse();
            const merged = [];
            for (let i = 0; i < filtered.length; i++) {
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    setScore(prev => prev + filtered[i] * 2);
                    if (filtered[i] * 2 === 2048) setWon(true);
                    i++;
                } else {
                    merged.push(filtered[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            return merged.reverse();
        });
    };

    const moveUp = (board: number[][]) => {
        const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const moved = moveLeft(transposed);
        return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
    };

    const moveDown = (board: number[][]) => {
        const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        const moved = moveRight(transposed);
        return moved[0].map((_, colIndex) => moved.map(row => row[colIndex]));
    };

    const handleMove = (direction: 'left' | 'right' | 'up' | 'down') => {
        if (gameOver || !gameStarted) return;

        let newBoard: number[][];
        switch (direction) {
            case 'left':
                newBoard = moveLeft(board);
                break;
            case 'right':
                newBoard = moveRight(board);
                break;
            case 'up':
                newBoard = moveUp(board);
                break;
            case 'down':
                newBoard = moveDown(board);
                break;
            default:
                return;
        }

        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
            addRandomTile(newBoard);
            setBoard(newBoard);
            setBestScore(prev => Math.max(prev, score));
        }

        // Check game over
        if (!canMove(newBoard)) {
            setGameOver(true);
        }
    };

    const canMove = (board: number[][]) => {
        // Check for empty cells
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) return true;
            }
        }

        // Check for possible merges
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const current = board[row][col];
                if (
                    (row < 3 && board[row + 1][col] === current) ||
                    (col < 3 && board[row][col + 1] === current)
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    const getTileColor = (value: number) => {
        const colors: {[key: number]: string} = {
            0: 'bg-slate-700',
            2: 'bg-slate-600',
            4: 'bg-slate-500',
            8: 'bg-orange-500',
            16: 'bg-orange-400',
            32: 'bg-orange-300',
            64: 'bg-yellow-500',
            128: 'bg-yellow-400',
            256: 'bg-yellow-300',
            512: 'bg-yellow-200',
            1024: 'bg-yellow-100',
            2048: 'bg-cyan-500'
        };
        return colors[value] || 'bg-cyan-400';
    };

    const getTextColor = (value: number) => {
        return value <= 4 ? 'text-slate-200' : 'text-slate-900';
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only handle arrow keys when game is started and not over
            if (gameOver || !gameStarted) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('right');
                    break;
                case 'ArrowUp':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault(); // Prevent page scroll
                    handleMove('down');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [board, gameOver, gameStarted]);

    return (
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-500/20 relative">
            <div className="text-center">
                <div className="text-cyan-200 mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>Score: {score}</div>
                    <div>Best: {bestScore}</div>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border-2 border-cyan-500/30 mt-1 mb-3 inline-block">
                    <div className="grid grid-cols-4 gap-1">
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-200 ${getTileColor(cell)} ${getTextColor(cell)} ${
                                        cell !== 0 ? 'shadow-lg transform hover:scale-105' : ''
                                    }`}
                                >
                                    {cell === 0 ? '' : cell}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {won && !gameOver && (
                    <div className="text-green-400 font-bold mb-2">
                        🎉 You reached 2048! Keep going!
                    </div>
                )}

                {/* Game over message moved to overlay */}


                <div>
                    <button
                        onClick={initializeGame}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Exit
                    </button>
                </div>
            </div>

            {/* Start / Game Over Overlay */}
            {(!gameStarted || gameOver) && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center space-y-4">
                        {gameOver && (
                            <div className="text-red-400 font-bold">
                                Game Over! Final Score: {score}
                            </div>
                        )}
                        <div className="flex items-center justify-center gap-3">
                            {!gameOver && (
                                <button
                                    onClick={startGame}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                                >
                                    Play
                                </button>
                            )}
                            {gameOver && (
                                <button
                                    onClick={initializeGame}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-bold"
                                >
                                    Exit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Games: React.FC = () => {
    return (
        <section id="games" className="py-12 bg-slate-950">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="relative flex flex-col items-center justify-center mb-12 mt-20">
                    <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto right-1/2 h-32 overflow-visible w-48 sm:w-64 md:w-80 lg:w-[20rem] mt-7 bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                        >
                            <div className="absolute w-[100%] left-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                            <div className="absolute w-20 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                        </div>
                        <div
                            style={{
                                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                            }}
                            className="absolute inset-auto left-1/2 h-32 w-48 sm:w-64 md:w-80 lg:w-[20rem] mt-7 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
                        >
                            <div className="absolute w-20 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                            <div className="absolute w-[100%] right-0 bg-slate-950 h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                        </div>
                        <div className="absolute top-1/2 h-24 w-48 sm:w-64 md:w-80 lg:w-[20rem] translate-y-6 bg-slate-950 blur-2xl"></div>
                        <div className="absolute top-1/2 z-50 h-24 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                        <div className="absolute inset-auto z-50 h-18 w-[18rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
                        <div className="absolute inset-auto z-30 h-18 w-40 -translate-y-[3rem] rounded-full bg-cyan-400 blur-2xl"></div>
                        <div className="absolute inset-auto z-50 h-0.5 w-48 sm:w-64 md:w-80 lg:w-[20rem] -translate-y-[3.5rem] mt-2.5 bg-cyan-400"></div>
                        <div className="absolute inset-auto z-10 h-22 w-full -translate-y-[6rem] bg-slate-950"></div>
                    </div>
                </div>

                <div className="relative z-50">
                    <GamesGrid />
                </div>
            </div>
        </section>
    );
};

export default Games;
