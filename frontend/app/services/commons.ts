export const isThisAGoodSpot = async (formData: FormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SELF_API}/api/spot_analysis`, {
    method: 'POST',
    body: formData,
  })

  return await response.json()
}
