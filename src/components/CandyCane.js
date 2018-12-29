import React, { Component } from 'react';
import { TimelineMax, Power0 } from "gsap/TweenMax";

import { ReactComponent as CandyCane } from '../svg/candy-cane.svg';

class CandyCaneWrap extends Component {
    constructor(props) {
        super(props);

        this.candyCane = React.createRef();

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

        let svg = this.candyCane.current.querySelector('svg');

        const t1 = new TimelineMax({
            repeat: -1,
            repeatDelay: 2,
        });

        t1.to(svg, .1, {
            rotation: 10,
            ease: Power0.easeNone,
        })
        .to(svg, .2, {
            rotation: -10,
            ease: Power0.easeNone,
        })
        .to(svg, .1, {
            rotation: 0,
            ease: Power0.easeNone,
        })
    }

    render() {
        return(
            <div ref={this.candyCane}>
                <CandyCane />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <CandyCaneWrap ref={ref} {...props} />);