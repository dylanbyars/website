import classnames from "classnames"
import Fuse from "fuse.js"
import React, { useEffect, useState } from "react"
import PageContainer from "../../components/PageContainer"
import ElementBlock, { Placeholder } from "./ElementBlock"
import {
  groups,
  ElementData,
  elementData as rawElementData,
} from "./elementData"
import Modal from "./Modal"
import produce from "immer"

const fuse = new Fuse(rawElementData, {
  threshold: 0.3,
  includeMatches: true,
  keys: [
    "atomicNumber",
    "groupBlock",
    "name",
    "standardState",
    "symbol",
    "yearDiscovered",
  ],
})

const PeriodicTable = () => {
  const [elementData, setElementData] = useState<
    (ElementData & { matches: any })[]
  >(rawElementData as any) // TODO: type properly
  const [activeElement, setActiveElement] = useState<ElementData>()
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    // setSearchResults(fuse.search(searchTerm))
    console.log(fuse.search(searchTerm))

  }, [searchTerm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearActiveElement = () => setActiveElement(undefined)

  const renderElement = (element: number) => (
    <ElementBlock
      key={element}
      element={elementData[element - 1]}
      setActiveElement={setActiveElement}
    />
  )

  return (
    <PageContainer title="Periodic Table of the Elements · Dylan Byars">
      <div
        className="relative min-h-screen flex flex-col justify-around items-center"
        onKeyUp={(e) => e.key === "Escape" && clearActiveElement()}
      >
        <div
          className={classnames([
            "flex flex-col transform rotate-90 landscape:rotate-0",
            { blur: activeElement },
          ])}
        >
          {/* <h1 className="absolute left-20 mx-auto">Periodic Table of the Elements</h1> */}
          <input
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-black w-1/2 mx-auto text-center"
          />
          <div className="flex pb-6">
            {groups.slice(0, -2).map((group, i) => (
              <div key={group[0]} className="flex flex-col justify-end">
                {group.map(renderElement)}
                {i === 2 && (
                  // group 3 has 2 placeholder elements that point to the lanthanides and actinides
                  <>
                    <Placeholder>57-71</Placeholder>
                    <Placeholder>89-103</Placeholder>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
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
