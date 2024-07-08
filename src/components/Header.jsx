import { Link } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition, Menu } from '@headlessui/react'
import {
  Bars3Icon,
  ShareIcon,
  WifiIcon,
  ComputerDesktopIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChatBubbleOvalLeftEllipsisIcon, BookmarkIcon } from '@heroicons/react/20/solid'
import logofastfood from "../assets/logo-fast-food.png"


import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";


const products = [
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: ComputerDesktopIcon },
  { name: 'Instagram', href: 'https://www.facebook.com/', icon: ShareIcon },
  { name: 'WhatsApp', href: 'https://www.facebook.com/', icon: WifiIcon },

]
const callsToAction = [
  { name: 'Ver Publicaciones FB', href: 'https://www.facebook.com/', icon: BookmarkIcon },
  { name: 'Enviar Mensaje', href: 'https://www.facebook.com/', icon: ChatBubbleOvalLeftEllipsisIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>

      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src={logofastfood} alt="Logo Meganet" width="120" height="100" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className=' hidden lg:flex lg:gap-x-12'>

            <Link to="/" className="text-md font-bold leading-6 text-gray-800 hover:text-orange-500 transition-colors">
              Inicio
            </Link>

            <Link to="https://www.facebook.com/" className="text-md font-bold leading-6 text-gray-800 hover:text-orange-500 transition-colors">
              Nosotros
            </Link>

            <Link to="/" className="text-md font-bold leading-6 text-gray-800 hover:text-orange-500 transition-colors">
              Precio
            </Link>
            <Link to="/" className="text-md font-bold leading-6 text-gray-800 hover:text-orange-500 transition-colors">
              Ayuda
            </Link>
          </div>


          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
            
                <Link to="login" className="text-sm leading-6 font-bold text-orange-500 p-2 hover:text-orange-600">
                  Iniciar Sesión <span aria-hidden="true">&rarr;</span>
                </Link>
              

            <Link to="login/registrar" className="text-sm leading-6 font-bold bg-orange-500 p-2 text-white rounded-md hover:bg-orange-600">
              Regístrate
            </Link>

          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-[999]" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-[999] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src={logofastfood}
                  alt="logofastfood2023"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setShowDialog(false)}
                  >
                    Inicio
                  </Link>
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Redes Sociales
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products, ...callsToAction].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>




                  <Link
                    to="https://www.facebook.com/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setShowDialog(false)}
                  >
                    Nosotros
                  </Link>

                </div>
                <div className="py-6 flex flex-col">

                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full text-orange-700 items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7  hover:bg-gray-50">
                          Iniciar Sesión <span aria-hidden="true">&rarr;</span>
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">

                          <Link
                            to="login"
                            className=" block rounded-lg px-3 py-2.5 pl-6  text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={() => setShowDialog(false)}
                          >
                            Login
                          </Link>

                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>


                </div>

              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  )
}
