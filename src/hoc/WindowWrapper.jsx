import React, { useRef } from 'react'
import useWindowStore from '@/store/widow'

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);
        return <section id={windowKey} ref={ref} style={{zIndex}} className='absolute'>
            <Component {...props}/>
        </section>
    }
  
    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
}

export default WindowWrapper