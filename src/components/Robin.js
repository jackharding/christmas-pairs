import React, { Component } from 'react';
import { TimelineMax } from "gsap/all";

import { ReactComponent as Robin } from '../svg/robin.svg';

class RobinWrap extends Component {
    constructor(props) {
        super(props);

        this.robin = React.createRef();

        this.state = {
            animating: false
        }
    }

    componentDidUpdate() {
        if(this.props.animate && !this.state.animating) {
            this.animate();
        }
    }

    animate = () => {
        this.setState({
            animating: true
        });

        let pupil = this.robin.current.querySelector('#pupil'),
            wing = this.robin.current.querySelector('#wing');

        const eyeTimeline = new TimelineMax({
            repeat: -1,
            repeatDelay: 4
        });

        const wingTimeline = new TimelineMax({
            repeat: -1,
            repeatDelay: 3
        });

        eyeTimeline.to(pupil, 1, {
            rotation: -30,
            repeat: -1,
            repeatDelay: 3,
            yoyo: true,
        });

        wingTimeline.to(wing, .1, {
            transformOrigin: 'top right',
            rotation: -4,
            yoyo: true,
            repeat: 3
        });
    }

    render() {
        return(
            <div ref={this.robin}>
                <Robin />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <RobinWrap ref={ref} {...props} />);