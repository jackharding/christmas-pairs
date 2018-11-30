import React, { Component, Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';

import Game from './components/Game';
import TopBar from './components/TopBar';
import HomeScreen from './components/HomeScreen';

import global from './styles/global';

const Styles = createGlobalStyle(global);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hard: false,
            playing: false,
            completed: false,
        }
    }

    startGame = () => {
        this.setState({
            playing: true
        });
    }

    stopGame = () => {
        this.setState({
            playing: false
        });
    }

    completeGame = () => {
        this.setState({
            completed: true,
            playing: false,
        });
    }

    changeDifficulty = (hard) => {
        this.setState({
            hard
        });
    }

    render() {
        let {
            completed,
            playing,
            hard,
        } = this.state;

        return (
            <div className="App">
                { playing ?
                    <Fragment>
                        <TopBar
                            playing={playing}
                            onStop={this.stopGame}
                            completed={completed}
                        />

                        <Game
                            hard={hard}
                            onComplete={this.completeGame}
                        />
                    </Fragment>
                    :
                    <HomeScreen
                        onStart={this.startGame}
                        onDifficultyChange={this.changeDifficulty}
                        hard={hard}
                    />
                }

                <Styles />
            </div>
        );
    }
}

export default App;