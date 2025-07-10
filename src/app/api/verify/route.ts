// app/api/verify/route.js
import { AbiCoder } from 'ethers'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const recipient = searchParams.get('recipient')

  if (!recipient) {
    return new Response(JSON.stringify({ error: 'Missing recipient param' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

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
    const attestations = json?.data?.attestations ?? []

    const countrySchemaId = '0x1801901fabd0e6189356b4fb52bb0ab855276d84f7ec140839fbd1f6801ca065'

    const countryAttestation = attestations.find(
      (att) => att.schemaId.toLowerCase() === countrySchemaId.toLowerCase()
    )

    if (countryAttestation) {
      const abiCoder = new AbiCoder()
      const [countryCode] = abiCoder.decode(['string'], countryAttestation.data)
      console.log('User verified country:', countryCode)
    } else {
      console.log('No country attestation found.')
    }

    return new Response(JSON.stringify(attestations), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching attestations:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch attestations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
