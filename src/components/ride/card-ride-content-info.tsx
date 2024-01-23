import { CardContent } from '@/components/ui/card'
import { formatSecondsToText, kmFormatter, moneyFormatter } from '@/lib/utils'
import { Ride } from '@/types'
import { format } from 'date-fns'

const CardRideContentInfo = ({
  ride,
  showDriverInfo = true,
  showRiderInfo = true,
}: {
  ride: Ride
  showRiderInfo?: boolean
  showDriverInfo?: boolean
}) => {
  return (
    <CardContent>
      <div>
        {!!ride?.acceptedAt && (
          <>
            <span className="text-sm text-slate-500">
              Started at {format(ride.acceptedAt, 'MMMM dd, yyyy h:mm a')}
            </span>
            <br />
          </>
        )}
        {!!ride?.completedAt && (
          <>
            <span className="text-sm text-slate-500">
              Completed at {format(ride.completedAt, 'MMMM dd, yyyy h:mm a')}
            </span>
            <br />
          </>
        )}
        {!!ride?.cancelledAt && (
          <>
            <span className="text-sm text-slate-500">
              Canceled at {format(ride.cancelledAt, 'MMMM dd, yyyy h:mm a')}
            </span>
            <br />
          </>
        )}
        <span className="text-sm text-slate-500">
          Est. duration: {formatSecondsToText(ride.estDuration)}
        </span>
        <br />
        <span className="text-sm text-slate-500">
          Est. distance: {kmFormatter.format(ride.distance / 1000)}
        </span>
      </div>
      {(showDriverInfo || showRiderInfo) && (
        <div className="mt-4">
          {showDriverInfo && (
            <div className="w-full flex justify-between">
              {!!ride.driver?.name && (
                <span className="text-sm text-slate-500">
                  Driver {ride.driver!.name}
                </span>
              )}
              {!!ride.driver?.car && (
                <span className="text-sm text-slate-500">
                  Card model: {ride.driver!.car}
                </span>
              )}
            </div>
          )}
          {showRiderInfo && (
            <div>
              <span className="text-sm text-slate-500">
                Requested by {ride.rider.name}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex justify-start mt-4">
        <span className="text-lg text-green-600">
          {moneyFormatter.format(ride.price / 100)}
        </span>
      </div>
    </CardContent>
  )
}

export default CardRideContentInfo
