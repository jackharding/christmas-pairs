import React, { Component } from 'react';
import { TweenMax, TimelineMax } from "gsap/TweenMax";
import styled from 'styled-components';

import { ReactComponent as SnowyLad } from '../svg/snowman.svg';

class Snowman extends Component {
    constructor(props) {
        super(props);

        this.snowman = React.createRef();

        this.state = {
            animating: false
        }
    }

    componentDidUpdate() {
        if(this.props.animate && !this.state.animating) {
            this.wave();
        }
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
            <SnowmanWrap ref={this.snowman}>
                <SnowyLad />
            </SnowmanWrap>
        );
    }
}

const SnowmanWrap = styled.div`
    
`;

export default React.forwardRef((props, ref) => <Snowman ref={ref} {...props} />);
