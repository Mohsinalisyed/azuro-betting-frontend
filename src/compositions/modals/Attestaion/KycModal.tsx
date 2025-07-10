// components/KycModal.tsx
'use client'

import { Overlay } from 'components/layout'
import { Icon } from 'components/ui'
import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

const KycModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null

  return (
    <Overlay>
      <div className="m-auto -wd:mb-0 z-[99] h-56 w-full wd:max-w-[22.25rem]">
            <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-bg-l0 p-6 rounded-lg shadow-lg text-center max-w-sm w-full relative">
                   <button
          onClick={onClose}
          className="bg-brand-500 text-white py-2 px-4 rounded text-black absolute top-0 right-0"
        >
          x
        </button>
        <h2 className="text-xl font-bold mb-4">KYC Verification</h2>
        <p className="text-green-600 font-medium">✅ User is KYC Verified</p>
     
      </div>
    </div>
      </div>
    </Overlay>
  )
}

export default KycModal
