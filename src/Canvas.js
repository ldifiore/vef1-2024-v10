import {useRef} from 'react';

const Canvas = props => {
    const ref = useRef();

    const canvas = ref.current;
    const c = canvas.getContext('2d');

    return <canvas ref={ref} {...props}/>
}

export default Canvas;