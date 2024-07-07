export const extractJsonFromString = (input: string): Record<string, any> => {
  const regex = /{([^{}]*)}/
  const match = input.match(regex)
  if (match) {
    try {
      let jsonString = `{${match[1]}}`

      // Detect if the JSON string needs quotes added
      if (!/"/.test(jsonString)) {
        jsonString = `{${match[1]
          .split(',')
          .map((kv) => {
            const [key, value] = kv.split(':').map((s) => s.trim())
            return `"${key}": ${value}`
          })
          .join(',')}}`
      }

      return JSON.parse(jsonString)
    } catch (e) {
      console.error('Failed to parse JSON', e)
      return {
        error: 'Failed to parse JSON',
        input,
      }
    }
  } else {
    return {}
  }
}
