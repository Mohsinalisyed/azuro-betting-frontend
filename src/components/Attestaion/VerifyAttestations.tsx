// components/VerifyAttestations.tsx

import { useAttestations } from 'src/hooks/useAttestations'


export default function VerifyAttestations() {
  const { data, isLoading, error } = useAttestations()
  console.log(data, 'Response Of Attestation Api!')

  if (isLoading) {
    return <p className="hidden">Loading...</p>
  }

  if (error) {
    return <p className="hidden">Error loading attestations</p>
  }

  return (
    <div className="hidden">Kyc</div>
  )
}
