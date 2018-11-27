import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import _ from 'lodash';

import Board from './components/Board';
import Item from './components/Item';

import Snowman from './components/Snowman';
import Tree from './components/Tree';
import { ReactComponent as CandyCane } from './svg/candy-cane.svg';
import { ReactComponent as Misletoe } from './svg/misletoe.svg';

const items = [
    {
        value: 'tree',
        component: Tree
    },
    {
        value: 'snowman',
        component: Snowman
    },
    // {
    //     value: 'candycane',
    //     component: CandyCane
    // },
    // {
    //     value: 'misletoe',
    //     component: Misletoe
    // },
];

const makeGameItems = (items, hard) => {
    items = items.map(item => ({
        key: item.value,
        value: item.value,
        Component: item.component,
        active: false,
        removed: false
    }));

    items = [...items, ...items.map(item => ({
        ...item,
        key: item.key + 'pair'
    }))];


    if(hard) {
        // Make it control another random item
        let ogItems = [...items];

        items = items.map(item => {
            let randomItem = Math.floor(Math.random() * ogItems.length);
            randomItem = ogItems.splice(randomItem, 1);

            return {
                ...item,
                controls:  {
                    value: randomItem[0].value,
                    key: randomItem[0].key,
                },
            };
        });
    }

    return _.shuffle(items);
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hard: false,
            playing: false,
            items: [],
            guesses: [],
            time: {
                minutes: 0,
                seconds: 0,
            }
        }
    }

    startGame = () => {
        this.setState({
            playing: true,
            items: makeGameItems(items, this.state.hard)
        });

        this.startTimer();
    }

    startTimer = () => {
        this.props.setTimeout(this.addSecond, 10);
    }

    stopTimer = () => {
        this.props.clearTimeout(this.addSecond);
    }

    addSecond = () => {
        this.setState(prev => {
            let addMinute = prev.time.seconds === 59;

            let obj = {
                ...prev.time,
                seconds: addMinute ? 0 : prev.time.seconds + 1,
            }

            if(addMinute) {
                obj.minutes = prev.time.minutes + 1;
            }

            return obj;
        });
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.state.guesses.length !== prevState.guesses.length && this.state.guesses.length > 1) {
            this.checkForMatch(this.state.guesses);
        }
    }

    compareItems = (a, b, key) => {
        if(this.state.hard) {
            return a.controls[key] === b[key];
        } else {
            return a[key] === b[key];
        }
    }

    checkForMatch = (guesses) => {
        let items;

        // If the first/second items are a match, set removed key to true
        if(guesses[0] === guesses[1]) {
            items = this.state.items.map(item => {
                let obj = {
                    ...item
                }

                if(item.value === guesses[0]) {
                    obj.removed = true;
                }

                return obj;
            })
        } else {
            // Set the incorrect guesses to be inactive again
            items = this.state.items.map(item => {
                let obj = {
                    ...item
                }

                if(item.value === guesses[0] || item.value === guesses[1]) {
                    obj.active = false;
                }

                return obj;
            })
        }

        this.setState({
            items,
            guesses: [...guesses].slice(2, guesses.length)
        });
    }

    turnItem = (guess) => {
        if(guess.active) return;

        let { hard } = this.state;

        let value = guess.value;
        if(hard) {
            value = guess.controls.value;
        }

        // Set active key to true and add guess to end of guesses array
        this.setState({
            items: this.state.items.map(item => {
                let obj = {
                    ...item
                }

                let matchesGuess = guess.key === item.key;
                if(hard) {
                    matchesGuess = guess.controls.key === item.key;
                }

                if(matchesGuess) {
                    obj.active = true;
                }

                return obj;
            }),
            guesses: [...this.state.guesses, value]
        });
    }

    render() {
        let { playing } = this.state;

        return (
            <div className="App">
                { playing &&
                    <Board>
                        { this.state.items.map(item => {
                            return(
                                <Item
                                    key={item}
                                    onClick={() => this.turnItem(item)}
                                    {...item}
                                />
                            );
                        }) }
                    </Board>
                }

                <button onClick={this.startGame}>start it</button>
            </div>
        );
    }
}

export default ReactTimeout(App);