export const calculateRidePrice = ({
  distanceMeters,
  durationSeconds,
}: {
  distanceMeters: number
  durationSeconds: number
}) => {
  // Price parameters
  const basePrice = 5 // $5
  const distanceRate = 1 / 1000 // $1 per km
  const durationRate = 0.25 / 60 // $0.25 per minute

  // Calculate price based on distance and duration
  const distanceCost = distanceMeters * distanceRate
  const durationCost = durationSeconds * durationRate

  // Calculate total cost
  const totalCost = basePrice + distanceCost + durationCost

  return Number(totalCost.toFixed(2)) * 100
}
