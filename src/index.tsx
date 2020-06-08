import React from "react";
import ReactDom from 'react-dom';

import './index.css';

interface SquareProps {
    value: any;
    squareCellClick: any;
}

interface BoardProps {
    squares: string[];
    onClick: any;
}

interface GameProps {

}

type HistoryType = {
    squares: string[]
}

interface GameState {
    history: HistoryType[],
    stepNumber: number,
    xIsNext: boolean,
}

function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.squareCellClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component <BoardProps> {
    renderSquare(i: any) {
        return <Square
            value={this.props.squares[i]}
            squareCellClick={() =>
                this.props.onClick(i)
            }
        />
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)} {this.renderSquare(1)} {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)} {this.renderSquare(4)} {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)} {this.renderSquare(7)} {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component <GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i: any) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: [...history, {squares}],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i: any) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares: string[]) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ==========================================

ReactDom.render(
    <Game/>,
    document.getElementById('root')
);