// hooks/useAttestations.ts

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "src/lib";

type Attestation = {
  id: string;
  attester: string;
  recipient: string;
  schemaId: string;
  time: string;
  data: string;
};

const fetchAttestations = async (recipient: string): Promise<Attestation[]> => {
  const response = await axiosInstance.get(`/verify?recipient=${recipient}`)
  return response.data
}

export const useAttestations = (recipient: string) => {
  return useQuery({
    queryKey: ['attestations', recipient],
    queryFn: () => fetchAttestations(recipient),
    enabled: !!recipient, // avoid calling it with null/undefined
    retry: false,
  })
}
