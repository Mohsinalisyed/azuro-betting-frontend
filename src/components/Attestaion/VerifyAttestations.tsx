// components/VerifyAttestations.tsx

import { useAttestations } from 'src/hooks/useAttestations'


export default function VerifyAttestations() {
  const { data, isLoading, error } = useAttestations()
  console.log(data, 'Response Of Attestation Api!')

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return console.log(error, 'Error in Attestation Api!')
  }

  return (
    <div className="hidden">Kyc</div>
  )
}
