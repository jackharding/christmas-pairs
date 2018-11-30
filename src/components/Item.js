import React, { Component, Fragment } from 'react';
import { TweenMax, TimelineLite } from "gsap/TweenMax";
import styled from 'styled-components';
import ReactTimeout from 'react-timeout';

import { ReactComponent as Present } from '../svg/present.svg';

class Item extends Component {
    constructor(props) {
        super(props);

        this.present = React.createRef();
        this.item = React.createRef();

        this.presentTimeline = new TimelineLite({
            paused: true,
            onStart: () => this.setState({ opening: true }),
            onComplete: () => this.setState({
                opening: false,
                closing: true,
            }),
            onReverseComplete: () => this.setState({ closing: false }),
        });
        this.itemTimeline = new TimelineLite({
            paused: true,
            onComplete: () => this.setState({ animateItem: true })
        });

        this.state = {
            open: false,
            opening: false,
            closing: false,
            animateItem: false,
            timelinesSet: false,
            itemPicked: null,
            removed: false,
        }
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.active && this.props.active) {
            this.openPresent(this.props.uid);
        }

        if(prevProps.active && !this.props.active) {
            this.props.setTimeout(() => this.openPresent(this.props.uid, true), 1900);
        }

        if(!prevProps.removed && this.props.removed) {
            this.props.setTimeout(() => this.setState({
                removed: true
            }), 1900);
        }

        if(this.present.current && this.item.current && !this.state.timelinesSet) {
            this.setTimelines();
        }
    }

    componentWillUnmount() {

    }

    setTimelines = () => {
        let bowLeft = this.present.current.querySelector('#bow-left'),
            bowRight = this.present.current.querySelector('#bow-right'),
            bowCenter = this.present.current.querySelector('#bow-center'),
            lidLeft = this.present.current.querySelector('#lid-left'),
            lidRight = this.present.current.querySelector('#lid-right'),
            item = this.item.current;

        this.presentTimeline.to(bowLeft, .4, {
            scaleX: 0,
            scaleY: 0,
            transformOrigin:"right bottom"
        }, 0)
        .to(bowRight, .4, {
            scaleX: 0,
            scaleY: 0,
            transformOrigin:"left bottom"
        }, 0)
        .to(bowCenter, .2, {
            scale: .3,
            transformOrigin: "center bottom"
        }, .2)
        .to(bowCenter, .4, {
            opacity: 0,
            delay: .2
        }, 0)
        .to(lidLeft, .3, {
            delay: .3,
            rotation: -230,
            transformOrigin: "left center"
        }, .3)
        .to(lidRight, .3, {
            delay: .3,
            rotation: 230,
            transformOrigin:"right center"
        }, .3);

        this.itemTimeline.set(item, {
            zIndex: 1,
            opacity: 1
        })
        .to(item, .5, {
            bottom: '79%'
        })
        .set(item, {
            zIndex: 3
        })
        .to(item, .5, {
            bottom: '2%'
        });

        this.setState({
            timelinesSet: true
        });
    }

    openPresent = (uid, reverse) => {
        this.setState(prev => ({
            animateItem: !prev.animateItem,
            open: !prev.open,
        }));

        if(reverse) {
            this.itemTimeline.reverse();
            TweenMax.delayedCall(1, () => this.presentTimeline.reverse())
        } else {
            this.presentTimeline.play();
            this.itemTimeline.delay(1).play();
        }
    }

    render() {
        let {
            Component,
            onClick
        } = this.props;
        console.log(this.props.uid, this.state.open, this.state.opening)

        return(
            <Fragment>
                <PresentWrap
                    ref={this.present}
                    removed={this.state.removed}
                    open={this.state.open}
                    opening={this.state.opening}
                    closing={this.state.closing}
                >
                    <Present onClick={onClick} />

                    <div
                        className="present-item"
                        ref={this.item}
                    >
                        <Component animate={this.state.animateItem} />
                    </div>
                </PresentWrap>
            </Fragment>
        );
    }
}

const PresentWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    transition: opacity .3s;
    opacity: ${({ removed }) => removed ? 0 : 1};
    cursor: pointer;
    
    &:hover {
        animation: ${({ open, opening, closing }) => open || opening || closing ? 'none' : 'shake .1s infinite'};
    }
    
    >svg {
        position: relative;
        z-index: 2;
        width: 100%;
        height: auto;
    }
    
    .present-item {
        display: flex;
        justify-content: center;
        position: absolute;
        left: 50%;
        bottom: 3%;
        transform: translateX(-50%);
        width: 100%;
        height: 71%;
        opacity: 0;
        
        >div {
            width: 60%;
            
            svg {
                width: 100%;
                height: auto;
                max-height: 100%;
            }
        }
    }
    
    @keyframes shake {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(5deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
`;

export default ReactTimeout(Item);