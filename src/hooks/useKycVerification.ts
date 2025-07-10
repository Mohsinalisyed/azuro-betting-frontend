// hooks/useKycVerification.ts
import { useQuery } from '@tanstack/react-query'
import { AbiCoder } from 'ethers'
import { axiosInstance } from 'src/lib'

const countrySchemaId = '0x1801901fabd0e6189356b4fb52bb0ab855276d84f7ec140839fbd1f6801ca065'
const booleanSchemaId = '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9'

export const useKycVerification = (recipient: string) => {
  return useQuery({
    queryKey: ['kyc-verification', recipient],
    enabled: !!recipient,
    queryFn: async () => {
      const response = await axiosInstance.get(`/verify?recipient=${recipient}`)
      const attestations = response.data ?? []

      const abiCoder = new AbiCoder()

      // Check for country "GB"
      const countryAtt = attestations.find(
        (att) => att.schemaId.toLowerCase() === countrySchemaId.toLowerCase()
      )

      const country = countryAtt
        ? abiCoder.decode(['string'], countryAtt.data)[0]
        : null

      // Check for boolean true
      const booleanAtt = attestations.find(
        (att) => att.schemaId.toLowerCase() === booleanSchemaId.toLowerCase()
      )

      const flag = booleanAtt
        ? abiCoder.decode(['bool'], booleanAtt.data)[0]
        : null

      return {
        isVerified: country === 'GB' && flag === true,
        country,
        flag,
        attestations,
      }
    },
    retry: false,
  })
}

