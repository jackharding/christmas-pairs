import React, { Component } from 'react';
import _ from 'lodash';

import Item from './Item';
import Board from './Board';

import CandyCane from './CandyCane';
import GingerbreadMan from './GingerbreadMan';
import Mistletoe from './Mistletoe';
import Robin from './Robin';
import Santa from './Santa';
import Snowflake from './Snowflake';
import Snowman from './Snowman';
import Tree from './Tree';

import { chunkArray } from '../helpers';

const gifts = [
    {
        value: 'candyCane',
        component: CandyCane
    },
    {
        value: 'gingerbreadMan',
        component: GingerbreadMan
    },
    {
        value: 'mistletoe',
        component: Mistletoe
    },
    {
        value: 'robin',
        component: Robin
    },
    {
        value: 'santa',
        component: Santa
    },
    {
        value: 'snowflake',
        component: Snowflake
    },
    {
        value: 'tree',
        component: Tree
    },
    {
        value: 'snowman',
        component: Snowman
    },
]

const makeGameItems = (items, hard) => {
    items = items.map(item => ({
        uid: item.value,
        value: item.value,
        Component: item.component,
        active: false,
        removed: false
    }));

    items = [...items, ...items.map(item => ({
        ...item,
        uid: item.uid + 'pair'
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
                    uid: randomItem[0].uid,
                },
            };
        });
    }

    items = _.shuffle(items);

    let obj = {};

    items.forEach(item => {
        obj[item.uid] = item;
    });

    return obj;
}

class Game extends Component {
    state = {
        items: {},
        guesses: [],
        remaining: null
    }

    componentDidMount() {
        this.setItems();
    }

    componentWillUnmount() {
        this.setItems(true);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.guesses.length !== prevState.guesses.length && this.state.guesses.length > 1) {
            this.checkForMatches(this.state.guesses);
        }

        if(prevState.remaining !== 0 && this.state.remaining === 0) {
            this.props.onComplete();
        }
    }

    setItems = (reset) => {
        const items = reset ? [] : makeGameItems(gifts, this.props.hard);

        this.setState({
            items,
            remaining: Object.keys(items).length / 2,
        });
    }

    checkForMatches = (guesses) => {
        let matches = 0,
            items = { ...this.state.items };

        let guessChunks = chunkArray(guesses, 2);

        guessChunks.forEach(gr => {
            // If the first/second items are a match, set removed key to true
            if(gr[0] === gr[1]) {

                items[gr[0]].removed = true;
                items[gr[0] + 'pair'].removed = true;
                matches++;

            } else {
                // Set the incorrect guesses to be inactive again
                Object.entries(items).forEach(item => {
                    items[item[0]].active = false
                });
            }
        });

        guesses = guessChunks.filter(chunk => chunk.length < 2);
        guesses = guesses.length ? guesses[0] : [];

        this.setState(prev => ({
            items,
            guesses,
            remaining: matches ? prev.remaining - matches : prev.remaining
        }));
    }

    turnItem = (guess) => {
        if(guess.active) return;

        let { hard } = this.props;

        let value = guess.value;
        if(hard) {
            value = guess.controls.value;
        }

        let items = { ...this.state.items };

        if(hard) {
            items[guess.controls.uid].active = true;
        } else {
            items[guess.uid].active = true;
        }

        // Set active key to true and add guess to end of guesses array
        this.setState({
            items,
            guesses: [...this.state.guesses, value]
        });
    }

    render() {
        return(
            <Board>
                { Object.entries(this.state.items).map(item => {
                    return(
                        <Item
                            {...item[1]}
                            onClick={() => this.turnItem(item[1])}
                            hard={this.props.hard}
                            key={item[1].uid}
                        />
                    );
                }) }
            </Board>
        );
    }
}

export default Game;