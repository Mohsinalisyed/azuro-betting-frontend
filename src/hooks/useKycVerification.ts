// hooks/useKycVerification.ts
import { useQuery } from '@tanstack/react-query'
import { AbiCoder } from 'ethers'
import { axiosInstance } from 'src/lib'


const countrySchemaId = process.env.NEXT_PUBLIC_COUNTRY_SCHEMA_ID || ''
const booleanSchemaId = process.env.NEXT_PUBLIC_BOOLEAN_SCHEMA_ID || ''

export const useKycVerification = (recipient: string | undefined) => {
  return useQuery({
    queryKey: [ 'kyc-verification', recipient ],
    enabled: !!recipient,
    queryFn: async () => {
      const response = await axiosInstance.get(`/verify?recipient=${recipient}`)
      const attestations = response.data ?? []

      if (!countrySchemaId || !booleanSchemaId) {
        throw new Error('Missing schema IDs in environment variables.')
      }
      const abiCoder = new AbiCoder()

      // Check for country "GB"
      const countryAtt = attestations.find(
        (att) => att.schemaId.toLowerCase() === countrySchemaId.toLowerCase()
      )

      const country = countryAtt
        ? abiCoder.decode([ 'string' ], countryAtt.data)[0]
        : null

      // Check for boolean true
      const booleanAtt = attestations.find(
        (att) => att.schemaId.toLowerCase() === booleanSchemaId.toLowerCase()
      )

      const flag = booleanAtt
        ? abiCoder.decode([ 'bool' ], booleanAtt.data)[0]
        : null

      return {
        isVerified: country !== 'US' && flag === true,
        country,
        flag,
        attestations,
      }
    },
    retry: true,
  })
}

