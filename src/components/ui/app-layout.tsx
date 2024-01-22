'use client'

import { type ReactNode } from 'react'


interface LayoutProps {
  header: ReactNode
  leftContent?: ReactNode
  rightContent?: ReactNode
}

export const Layout = ({ header, leftContent, rightContent }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col w-full bg-background">
      <header className="bg-background w-full px-2">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          {header}
          {/* <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="text-lg text-pretty">Goober</span>
                        </a>
                    </div>
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="text-md text-pretty">Log out</span>
                        </a>
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div> */}
        </nav>
      </header>
      <main className="h-full w-full flex p-4 gap-4">
        {leftContent && (
          <div className="h-full w-2/5 max-w-lg flex bg-background">
            <div className="flex-1 flex rounded-lg bg-slate-100">
              {leftContent}
            </div>
          </div>
        )}
        {rightContent && (
          <div className="h-full flex-1 w-auto flex bg-background">
            <div className="flex-1 flex rounded-lg bg-slate-200">
              {rightContent}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
