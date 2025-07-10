'use client'

import type { ReactNode } from 'react'
import React, { createContext, useContext, useState } from 'react'
import { useAccount } from 'wagmi'
import { useKycVerification } from 'src/hooks/useKycVerification'


type Attestation = {
  id: string
  attester: string
  recipient: string
  schemaId: string
  time: number
  data: string
}

type KycVerificationResult = {
  isVerified: boolean
  country: string
  flag: boolean
  attestations: Attestation[]
}

type KycModalContextType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  kycVerification?: KycVerificationResult
  kycLoading: boolean
}

const KycModalContext = createContext<KycModalContextType | undefined>(undefined)

export const useKycModal = () => {
  const context = useContext(KycModalContext)

  if (!context) {
    throw new Error('useKycModal must be used within a KycModalProvider')
  }

  return context
}

export const KycModalProvider = ({ children }: { children: ReactNode }) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const { address } = useAccount()
  //   '0xac838A3000715b2074DF56F82c3ecb177F331813'
  const { data: kycVerification, isLoading: kycLoading } = useKycVerification(address)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <KycModalContext.Provider value={{ isOpen, openModal, closeModal, kycVerification, kycLoading }}>
      {children}
    </KycModalContext.Provider>
  )
}
