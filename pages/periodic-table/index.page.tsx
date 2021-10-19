import { default as classNames, default as classnames } from "classnames"
import Fuse from "fuse.js"
import produce from "immer"
import React, { useEffect, useState } from "react"
import PageContainer from "../../components/PageContainer"
import ElementBlock, { Placeholder } from "./ElementBlock"
import rawElementData, { ElementData, groups } from "./elementData"
import Modal from "./Modal"

const fuse = new Fuse(rawElementData, {
  threshold: 0.45,
  includeMatches: true,
  keys: [
    // "atomicNumber",
    // "groupBlock",
    "name",
    "standardState",
    "symbol",
    // "yearDiscovered",
  ],
})

const PeriodicTable = () => {
  const [elementData, setElementData] = useState<
    (ElementData & { matches: any })[]
  >(rawElementData as any) // TODO: type properly
  const [activeElement, setActiveElement] = useState<ElementData>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [matches, setMatches] = useState<Fuse.FuseResult<ElementData>[]>()

  useEffect(() => {
    const results = fuse.search(searchTerm)
    setMatches(results)
    const updatedElementData = produce(rawElementData as any, (draft: any) => {
      results.map(({ item, matches }) => {
        draft[item.atomicNumber - 1].matches = matches
      })
    })
    setElementData(updatedElementData as any)
  }, [searchTerm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearActiveElement = () => setActiveElement(undefined)

  const renderElement = (element: number) => {
    const data = elementData[element - 1]
    return (
      <ElementBlock
        className={classNames({ "opacity-20": searchTerm && !data.matches })}
        key={element}
        element={data}
        setActiveElement={setActiveElement}
      />
    )
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Escape": // BUG: this doesn't work
        clearActiveElement()
        break
      case "Enter":
        if (matches?.length === 1) {
          setActiveElement(matches[0].item)
        }
        break
      default:
        return
    }
  }

  return (
    <PageContainer title="Periodic Table of the Elements · Dylan Byars">
      <div
        className="relative min-h-screen flex flex-col justify-center items-center p-4"
        onKeyUp={handleKeyUp}
      >
        <input
          value={searchTerm}
          onChange={handleInputChange}
          className="z-10 hidden sm:block border border-black text-xl -mb-6 md:mb-6 md:text-5xl xl:-mb-8 xl:text-6xl p-2 w-1/3 text-center"
          placeholder="neon, Au, liquid"
          tabIndex={1}
        />
        <div
          className={classnames([
            "flex flex-col transform rotate-90 landscape:rotate-0",
            { blur: activeElement },
          ])}
        >
          <div className="flex pb-6">
            {groups.slice(0, -2).map((group, i) => (
              <div key={group[0]} className="flex flex-col justify-end">
                {group.map(renderElement)}
                {i === 2 && (
                  // group 3 has 2 placeholder elements that point to the lanthanides and actinides
                  <>
                    <Placeholder
                      className={classNames({ "opacity-20": searchTerm })}
                    >
                      57-71
                    </Placeholder>
                    <Placeholder
                      className={classNames({ "opacity-20": searchTerm })}
                    >
                      89-103
                    </Placeholder>
                  </>
                )}
              </div>
            ))}
          </div>
          <div>
            {groups.slice(-2).map((group) => (
              <div className="flex justify-end" key={group[0]}>
                {group.map(renderElement)}
              </div>
            ))}
          </div>
        </div>
        {activeElement && (
          <Modal element={activeElement} closeModal={clearActiveElement} />
        )}
      </div>
    </PageContainer>
  )
}

export default PeriodicTable
