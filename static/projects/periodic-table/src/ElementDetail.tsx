import classnames from 'classnames'
import { FunctionComponent, } from 'react'
import { ElementData, } from './elementData'

const ElementDetail: FunctionComponent<{
  element: Pick<ElementData, 'atomicNumber' | 'symbol' | 'name' | 'atomicMass'>
}> = ({ element: { atomicNumber, symbol, name, atomicMass, }, },) => (
  <div className='relative flex flex-col justify-between items-center border border-grey-dark rounded shadow-lg bg-grey-lightest w-32 h-32 p-3 z-20'>
    <div className='self-end'>{atomicNumber}</div>
    <div className='text-3xl'>{symbol}</div>
    <div className={classnames({ 'text-sm': name.length > 10, },)}>{name}</div>
    <div
      className={classnames({ 'text-sm': (atomicMass as string).length > 8, },)}
    >
      {atomicMass}
      <span className='ml-1'>
        A<sub>r</sub>
      </span>
    </div>
  </div>
)

export default ElementDetail
