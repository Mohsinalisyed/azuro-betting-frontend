// components/KycModal.tsx
'use client'

import React from 'react'
import { Overlay } from 'components/layout'
import { Icon } from 'components/ui'


type Props = {
  open: boolean
  onClose: () => void
}

const KycModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) {
    return null
  }

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
            <h2 className="text-xl font-bold mb-4">KYC Verification Failed</h2>
            <p className="text-brand-70 font-medium">
              User is <span className="text-red-500 font-semibold">KYC Unverified</span>. <br />
              To complete verification, please attest using both required schemas:
              <br />
              <a
                href="https://base.easscan.org/attestation/attestWithSchema/0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block mt-1"
              >
                👉 Attest to Boolean Schema (Verified Flag)
              </a>
              <a
                href="https://base.easscan.org/schema/view/0x1801901fabd0e6189356b4fb52bb0ab855276d84f7ec140839fbd1f6801ca065"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block"
              >
                👉 Attest to Country Schema (e.g., GB)
              </a>
            </p>

          </div>
        </div>
      </div>
    </Overlay>
  )
}

export default KycModal
