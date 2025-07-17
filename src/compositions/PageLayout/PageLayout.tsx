'use client'

import React from 'react'

import { GlobalModalsRegistrar } from 'compositions/modals'

import { Content, Footer } from './components'
import { useKycModal } from 'src/contexts/KycModal/KycModalContext'
import KycModal from 'compositions/modals/Attestaion/KycModal'


const PageLayout: React.CFC = (props) => {
  let { children } = props
  const { isOpen, closeModal } = useKycModal()

  return (
    <>
      <Content>
        <div className="flex-1">{children}</div>
        <Footer />
        <GlobalModalsRegistrar />
      </Content>
      <div id="modals" />
      <KycModal open={isOpen} onClose={closeModal} />

    </>
  )
}

export default PageLayout
