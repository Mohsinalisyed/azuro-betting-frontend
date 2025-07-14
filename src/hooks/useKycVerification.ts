// hooks/useKycVerification.ts
import { useQuery } from '@tanstack/react-query'
import { AbiCoder } from 'ethers'
import { axiosInstance } from 'src/lib'


const countrySchemaId = process.env.NEXT_PUBLIC_COUNTRY_SCHEMA_ID || ''
const booleanSchemaId = process.env.NEXT_PUBLIC_BOOLEAN_SCHEMA_ID || ''

const TWO_YEARS_IN_SECONDS = 2 * 365 * 24 * 60 * 60

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
      const currentTime = Math.floor(Date.now() / 1000)

      const isExpired = (attTime: number) =>
        currentTime - attTime > TWO_YEARS_IN_SECONDS

      const countryAtt = attestations.find(
        (att) => att.schemaId.toLowerCase() === countrySchemaId.toLowerCase()
      )
      const booleanAtt = attestations.find(
        (att) => att.schemaId.toLowerCase() === booleanSchemaId.toLowerCase()
      )

      const isExpiredCountry = countryAtt ? isExpired(countryAtt.time) : false
      const isExpiredFlag = booleanAtt ? isExpired(booleanAtt.time) : false

      const country =
        countryAtt && !isExpiredCountry
          ? abiCoder.decode([ 'string' ], countryAtt.data)[0]
          : null

      const flag =
        booleanAtt && !isExpiredFlag
          ? abiCoder.decode([ 'bool' ], booleanAtt.data)[0]
          : null

      return {
        isVerified: country !== null && country !== 'US' && flag === true && !isExpiredCountry && !isExpiredFlag,
        country,
        flag,
        attestations,
        isExpiredCountry,
        isExpiredFlag,
      }
    },
    retry: true,
  })
}
