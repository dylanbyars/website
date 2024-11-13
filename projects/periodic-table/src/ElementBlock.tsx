import classNames from 'classnames'
import { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction, useRef, useState, } from 'react'
import { ElementData, } from './elementData'
import ElementDetail from './ElementDetail'

const groupBlockStyles: any = {
  nonmetal: 'bg-yellow-lightest',
  'noble gas': 'bg-blue-lighter',
  'alkali metal': 'bg-grey-light',
  'alkaline earth metal': 'bg-red-lighter',
  metalloid: 'bg-orange-lighter',
  halogen: 'bg-blue-lightest',
  metal: 'bg-pink-lighter',
  'transition metal': 'bg-teal-lightest',
  lanthanoid: 'bg-indigo-lightest',
  actinoid: 'bg-green-lightest',
  'probably metal': 'bg-grey-lightest',
  'probably noble gas': 'bg-grey-lighter',
}

const blockStyles =
  'flex justify-center items-center w-element__portrait h-element__portrait landscape:w-element landscape:h-element m-px'

const ElementBlock: FunctionComponent<{
  element: ElementData & { matches: any }
  setActiveElement: Dispatch<SetStateAction<ElementData | undefined>> // TODO: it feels weird to be this explicit
  className?: string
}> = ({ element, setActiveElement, className, },) => {
  const [isHovered, setIsHovered,] = useState(false,)
  const [offsetX, setOffsetX,] = useState({},)
  const [offsetY, setOffsetY,] = useState({},)

  const elementRef = useRef(null,) as any // TODO this is lazy

  const handleMouseOver = () => {
    setIsHovered(true,)

    const elementPosition = elementRef.current!.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const offsetX = elementPosition.x > viewportWidth / 2
      ? { left: '-8rem', }
      : { right: '-8rem', }

    const offsetY = elementPosition.y > viewportHeight / 2
      ? { top: '-8rem', }
      : { bottom: '-8rem', }

    setOffsetX(offsetX,)
    setOffsetY(offsetY,)
  }

  const handleMouseLeave = () => {
    setIsHovered(false,)
    setOffsetX({},)
    setOffsetY({},)
  }

  return (
    <button
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseLeave}
      className={classNames([
        blockStyles,
        groupBlockStyles[element.groupBlock],
        { ['border-4 border-black']: element.matches, },
        { ['border border-grey-dark']: !element.matches, },
        'relative lg:items-end',
        className,
      ],)}
      ref={elementRef}
      onClick={() => setActiveElement(element,)}
      tabIndex={element.atomicNumber}
    >
      <small className='hidden lg:block absolute top-0.5 right-1.5'>
        {element.atomicNumber}
      </small>
      <div className='hidden text-sm landscape:block md:text-base lg:text-lg lg:mb-0.5 xl:text-2xl'>
        {element.symbol}
      </div>
      {isHovered && (
        <div className='absolute' style={{ ...offsetY, ...offsetX, }}>
          <ElementDetail element={element} />
        </div>
      )}
    </button>
  )
}

export default ElementBlock

export const Placeholder: FunctionComponent<
  PropsWithChildren<{ className?: string }>
> = ({ className, children, },) => (
  <div
    className={classNames([blockStyles, 'border border-grey-dark', className,],)}
  >
    <small className='hidden md:block'>{children}</small>
  </div>
)
