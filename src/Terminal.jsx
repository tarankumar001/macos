import React from 'react'
import WindowWrapper from './hoc/WindowWrapper'
import { techStack } from './components'
import { Check } from 'lucide-react'
import { Flag } from 'lucide-react'

const Terminal = () => {
  return (
    <>
    <div id='window-header'>
        <p>window Controls</p>
        <h2>Tech Stack</h2>

    </div>
    <div className='techstack'>
        <p>
            <span className='font-bold'>
                @Taramkumar % 
            </span>show tech stack
        </p>
        <div className="label">
            <p className='w-32'>Category</p>
            <p>Technologies</p>
        </div>
        <ul className='content'>
            {techStack.map(({category,items}, idx)=>(
                <li key={idx}>
                    <Check className="check" size={20}/>
                    <h3>{category}
                    </h3>
                    <ul>
                        {items.map((item,i)=>(
                            <li key={i}>{item}{i <items.length -1 ?",": ""}</li>
                            
                        ))}
                    </ul>
                    </li>
            ))}
        </ul>
        <div className="footnote">
            <p>
                <Check className="check" size={20}/> 5 of 5 stacks loaded successfully (100%)
            </p>
            <p className='text-balck'>
                <Flag size={15} fill="balck"/>Render time : 6ms
            </p>
        </div>
    </div>
   
    </>
  )
}

const TerminalWindow=WindowWrapper(Terminal,"terminal")

export default TerminalWindow;