import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import styled from 'styled-components';

import Timer from './Timer';
import Quit from './Quit';

import { padSeconds } from '../helpers';

class TopBar extends Component {
    state = {
        timer: null,
        time: {
            minutes: 0,
            seconds: 0,
        }
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.props.clearInterval(this.state.timer);
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.completed && this.props.completed) {
            this.setState({
                timer: null
            });

            this.props.setTimeout(() => {
                this.props.onStop(this.state.time.minutes + ':' + padSeconds(this.state.time.seconds));
            }, 1500);
        }
    }

    startTimer = () => {
        this.setState({
            time: {
                minutes: 0,
                seconds: 0,
            },
            timer: this.props.setInterval(() => this.addSecond(), 1000)
        });
    }

    addSecond = () => {
        this.setState(prev => {
            let addMinute = prev.time.seconds === 59;

            let time = {
                ...prev.time,
                seconds: addMinute ? 0 : prev.time.seconds + 1,
            }

            if(addMinute) {
                time.minutes = prev.time.minutes + 1;
            }

            return {
                time
            };
        });
    }

    render() {
        return(
            <StyledDiv>
                <Timer
                    {...this.state.time}
                    completed={this.state.completed}
                />
                <Quit onClick={this.props.onStop} />
            </StyledDiv>
        )
    }
}

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 0;
    margin-bottom: 25px;
`;

export default ReactTimeout(TopBar);