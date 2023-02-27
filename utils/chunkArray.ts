// chunks array into chunks of maximum size
// evenly distributes items among the chunks
export default function chunkArray<T>(items: T[], maxChunkSize: number): T[][] {
  if (maxChunkSize < 1) throw new Error('maxChunkSize must be gte 1')
  if (items.length <= maxChunkSize) return [items]

  const numChunks: number = Math.ceil(items.length / maxChunkSize)
  const chunkSize = Math.ceil(items.length / numChunks)

  // return [...Array(numChunks).keys()].map(ix => items.slice(ix * chunkSize, ix * chunkSize + chunkSize))
  // console.log(numChunks)
  // console.log(Array(numChunks))
  const arr = []
  for (let i = 0; i < numChunks; i++) {
    arr.push(i)
  }
  return arr.map(ix => items.slice(ix * chunkSize, ix * chunkSize + chunkSize))
}
