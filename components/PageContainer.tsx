import Head from "next/head"
import type { FC, PropsWithChildren } from "react"

const PageContainer: FC<
  PropsWithChildren<{ title: string; className?: string }>
> = ({ children, title, className }) => {
  return (
    <main className={className}>
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="TODO:" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </main>
  )
}

export default PageContainer
