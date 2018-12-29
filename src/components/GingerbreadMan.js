import React, { Component } from 'react';
import { TweenMax } from "gsap/TweenMax";

import { ReactComponent as GingerbreadMan } from '../svg/gingerbread-man.svg';

class GingerbreadManWrap extends Component {
    constructor(props) {
        super(props);

        this.gingerbreadMan = React.createRef();

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

        let svg = this.gingerbreadMan.current.querySelector('svg');

        TweenMax.fromTo(svg, .3, {
            y: '0%',
        }, {
            y: '-10%',
            repeat: -1,
            yoyo: true,
        });

        TweenMax.fromTo(svg, .6, {
            rotation: 10
        }, {
            rotation: -10,
            yoyo: true,
            repeat: -1
        })
    }

    render() {
        return(
            <div ref={this.gingerbreadMan}>
                <GingerbreadMan />
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <GingerbreadManWrap ref={ref} {...props} />);