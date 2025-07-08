// hooks/useAttestations.ts
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/lib'


type Attestation = {
  id: string;
  attester: string;
  recipient: string;
  schemaId: string;
  time: string;
  data: string;
};

const fetchAttestations = async (): Promise<Attestation[]> => {

  const response = await axiosInstance.get('/verify')
  console.log(response, 'response')

  return response.data
}

export const useAttestations = () => {
  return useQuery({
    queryKey: [ 'attestations' ],
    queryFn: () => fetchAttestations(),
    retry: false,
  })
}
