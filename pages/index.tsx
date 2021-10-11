import type { NextPage } from "next"
import { useEffect } from "react"
import Nav from "./home/Nav"
import Projects from "./home/Projects"
import PageContainer from "./PageContainer"

const Home: NextPage = () => {
  useEffect(() => {
    showSecretMessage()
  }, [])

  return (
    <PageContainer title="Dylan Byars · Software Engineer">
      <main className="home min-h-screen p-3 font-mono bg-black text-grey-lightest">
        <header className="relative md:flex md:flex-col md:items-end">
          <h1 className="font-thin text-3xl md:text-5xl mb-2">Dylan Byars</h1>
          <h3 className="font-thin md:text-2xl md:mb-4">software engineer</h3>
        </header>

        <Projects />

        <Nav />
      </main>
    </PageContainer>
  )
}

export default Home

function showSecretMessage() {
  console.log(`TODO`)
}
