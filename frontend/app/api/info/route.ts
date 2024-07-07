export async function GET(req: any, res: any) {
  const response = {
    message: 'Ride my Spot',
    developer: 'Thomas CARON',
    email: 'tc.caron91@gmail.com',
    github: 'https://github.com/thomas-rooty',
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
