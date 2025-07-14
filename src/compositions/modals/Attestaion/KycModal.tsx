'use client'

import React from 'react'
import { useAccount } from 'wagmi'
import { Overlay } from 'components/layout'
import { useKycVerification } from 'src/hooks/useKycVerification'


type Props = {
  open: boolean
  onClose: () => void
}

const KycModal: React.FC<Props> = ({ open, onClose }) => {
  const { address } = useAccount()
  const { data: kycVerification } = useKycVerification(address)

  if (!open) {
    return null
  }

  const hasCountry = !!kycVerification?.country
  const hasBoolean = !!kycVerification?.flag
  const isUS = kycVerification?.country === 'US'
  const countrySchemaId = process.env.NEXT_PUBLIC_COUNTRY_SCHEMA_ID || ''
  const booleanSchemaId = process.env.NEXT_PUBLIC_BOOLEAN_SCHEMA_ID || ''

  return (
    <Overlay>
      <div className="m-auto z-[99] h-56 w-full wd:max-w-[22.25rem]">
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-bg-l0 p-6 rounded-lg shadow-lg text-center max-w-sm w-full relative">
            <button
              onClick={onClose}
              className="bg-brand-500 text-white py-2 px-4 rounded absolute top-0 right-0"
            >
              x
            </button>

            <h2 className="text-xl font-bold mb-4">KYC Verification</h2>

            {
              !address ? (
                <p>Please connect your wallet to check your KYC status.</p>
              ) : isUS ? (
                <div>
                  <p className="text-red-500 font-medium">
                  Users from your region are not allowed to access this platform.
                  </p>
                  <a
                    href={`https://base.easscan.org/attestation/attestWithSchema/${countrySchemaId }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline underline-offset-4 block mt-2"
                  >
                  Verify Country of Residence
                  </a>
                </div>
              ) : hasCountry && hasBoolean ? (
                <p className="text-green-600 font-medium">✅ Your wallet is fully KYC verified.</p>
              ) : (
                <p className="text-brand-70 font-medium">
                User <span className="text-red-500 font-semibold">KYC Unverified</span>.<br />
                To play our games, please verify your wallet by completing the following attestations:
                  <br />

                  {
                    !hasBoolean && (
                      <a
                        href={`https://base.easscan.org/attestation/attestWithSchema/${booleanSchemaId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-4 block mt-2"
                      >
                    Verify Identity Status
                      </a>
                    )
                  }

                  {
                    !hasCountry && (
                      <a
                        href={`https://base.easscan.org/attestation/attestWithSchema/${countrySchemaId }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-4 block mt-2"
                      >
                    Verify Country of Residence
                      </a>
                    )
                  }
                </p>
              )
            }
          </div>
        </div>
      </div>
    </Overlay>
  )
}

export default KycModal
