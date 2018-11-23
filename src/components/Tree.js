import React, { Component } from 'react';
import { TweenMax, TimelineMax } from "gsap/TweenMax";
import styled from 'styled-components';

import { ReactComponent as Tree } from '../svg/tree.svg';

class TreeContainer extends Component {
    constructor(props) {
        super(props);

        this.tree = React.createRef();

        this.state = {
            animating: false
        }
    }

    componentDidUpdate() {
        // if(this.props.animate && !this.state.animating) {
        //     this.wave();
        // }
    }

    wave = () => {
        let leftArm = this.snowman.current.querySelector('#left-arm'),
            rightArm = this.snowman.current.querySelector('#right-arm');

        const t1 = new TimelineMax({
            repeat: -1,
        });
        const t2 = new TimelineMax({
            repeat: -1
        });

        t1.set(rightArm, {
            rotation: 4,
            transformOrigin: 'right bottom'
        })
            .to(rightArm, .5, {
                rotation: 4,
            })
            .to(rightArm, .5, {
                rotation: -4,
            })
            .to(rightArm, .5, {
                rotation: 4,
            });

        t2.set(leftArm, {
            rotation: 4,
            transformOrigin: 'left bottom'
        })
            .to(leftArm, .5, {
                rotation: 4,
            })
            .to(leftArm, .5, {
                rotation: -4,
            })
            .to(leftArm, .5, {
                rotation: 4,
            });
    }

    render() {
        return(
            <TreeWrap ref={this.tree}>
                <Tree />
            </TreeWrap>
        );
    }
}

const TreeWrap = styled.div`
    
`;

export default React.forwardRef((props, ref) => <TreeContainer ref={ref} {...props} />);
