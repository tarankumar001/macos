import { useRef } from 'react';
import { dockApps } from './constants/dockApps';
import { Tooltip } from 'react-tooltip';

const Dock = () => {
  const dockRef = useRef(null)
  const toggleApp = (app) => {
    // TODO: implement app toggling logic
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, name, icon, canOpen })}
            >
              <img src={`/images/${icon}`} alt={name} loading="lazy" className={canOpen ?"" : "opacity-60"} />
            </button>
          </div>
        ))}
      </div>
      <Tooltip id="dock-tooltip" place='top' className='tooltip'/>
    </section>
  )
}

export default Dock;