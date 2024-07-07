export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const image = formData.get('image') as File

    // Convert to base64
    if (!image) {
      return new Response('No image found in form data', { status: 400 })
    }

    const buffer = await image.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    // Call the AI service
    console.log('Analyzing image...')
    const response = await fetch(`${process.env.NEXT_PUBLIC_AI_API}/analyze`, {
      method: 'POST',
      body: JSON.stringify({ image: base64 }),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log('Analysis done')

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: response.status })
  } catch (error) {
    console.error('Error during analysis:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
