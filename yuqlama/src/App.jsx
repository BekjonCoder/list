import React from 'react'
import { Toaster } from 'sonner'
import Item from './item'
import Form from './Form'

const App = () => {
  return (
    <>
    <Toaster position='bottom-right' richColors/>
    <Form/>
    <Item/>
    </>
  )
}

export default App