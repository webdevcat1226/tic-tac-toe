import React from "react";
import ReactDom from 'react-dom';

import './index.css';

interface SquareProps {
    value: any;
    squareCellClick: any;
}

interface BoardProps {
    squares: Array<object>;
    onClick: any;
}

interface BoardState {
    squares: any;
    xIsNext: boolean;
}

interface GameProps {

}

type HistoryType = {
    squares: Array<object>
}

interface GameState {
    history: HistoryType[],
    xIsNext: boolean,
}

function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.squareCellClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component <BoardProps, BoardState> {
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
            xIsNext: true,
        };
    }

    private handleClick(i: any) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? ['X'] : ['O'];
        this.setState({
            history: [...this.state.history, { squares }],
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
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
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares: Array<object>) {
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