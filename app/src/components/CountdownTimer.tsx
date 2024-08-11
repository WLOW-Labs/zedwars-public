import { Fragment, useEffect, useState } from "react"

export const CountdownTimer = ({ dateTo }: { dateTo: number }) => {
  const calculateSecondsDiff = (d1: number, d2: number) => {
    return Math.max(Math.floor((d1 - d2) / 1000), 0)
  }

  const [sDiff, setSDiff] = useState<number>(calculateSecondsDiff(dateTo, Date.now()))

  useEffect(() => {
    const timer = setInterval(() => {
      setSDiff(calculateSecondsDiff(dateTo, Date.now()))
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [dateTo])

  // Show leading zero for single digit values
  const formatTime = (t: number) => `0${t}`.split('').slice(-2).join('')

  return (
    <Fragment>
      {formatTime(Math.floor(sDiff / 60))}:{formatTime(sDiff % 60)}
    </Fragment>
  )
}