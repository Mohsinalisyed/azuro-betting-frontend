// app/api/verify/route.js
import { AbiCoder } from 'ethers'


export async function GET(req) {
  const recipient = '0xac838A3000715b2074DF56F82c3ecb177F331813'

  const query = `
    query {
      attestations(
        where: { recipient: { equals: "${recipient}" } }
      ) {
        id
        attester
        recipient
        schemaId
        time
        data
      }
    }
  `

  try {
    const response = await fetch('https://base.easscan.org/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const json = await response.json()

    console.log('GraphQL response:', JSON.stringify(json, null, 2))

    const attestations = json?.data?.attestations ?? []

    const countrySchemaId = '0x1801901fabd0e6189356b4fb52bb0ab855276d84f7ec140839fbd1f6801ca065'

    const countryAttestation = attestations.find(
      (att) => att.schemaId.toLowerCase() === countrySchemaId.toLowerCase()
    )

    if (countryAttestation) {
      const encodedData = countryAttestation.data
      const abiCoder = new AbiCoder()
      const [ countryCode ] = abiCoder.decode([ 'string' ], encodedData)
      console.log('User verified country:', countryCode)
    }
    else {
      console.log('No country attestation found.')
    }

    return new Response(JSON.stringify(attestations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  catch (error) {
    console.error('Error fetching attestations:', error)

    return new Response(JSON.stringify({ error: 'Failed to fetch attestations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
