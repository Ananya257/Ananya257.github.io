
import React from 'react.js'
//const React = require("react.js")

import { useSpring, animated, interpolate } from './node_modules/react-spring'
//const { useSpring, animated, interpolate } = require("./node_modules/react-spring")
import { useGesture } from 'react-with-gesture'
//const useGesture = require("./node_modules/react-with-gesture")



var NewComponent = React.createClass({
    render : function() {
        const [bind, { delta, down }] = useGesture()
        const { x, bg, size } = useSpring({
            x: down ? delta[0] : 0,
            bg: `linear-gradient(120deg, ${delta[0] < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`,
            size: down ? 1.1 : 1,
            immediate: name => down && name === 'x'
        })
        const avSize = x.interpolate({ map: Math.abs, range: [50, 300], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' })
        return (
            <animated.div {...bind()} className="item" style={{ background: bg }}>
                <animated.div className="av" style={{ transform: avSize, justifySelf: delta[0] < 0 ? 'end' : 'start' }} />
                <animated.div className="fg" style={{ transform: interpolate([x, size], (x, s) => `translate3d(${x}px,0,0) scale(${s})`) }}>
                </animated.div>
            </animated.div>
        )
    }
});


React.render(< NewComponent ></NewComponent>, document.getElementById('root'))

