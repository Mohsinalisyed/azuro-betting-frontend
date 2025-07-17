'use client'

import React from 'react'

import { useKycModal } from 'src/contexts/KycModal/KycModalContext'
import { GlobalModalsRegistrar } from 'compositions/modals'

import KycModal from 'compositions/modals/Attestaion/KycModal'
import { Content, Footer } from './components'


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
