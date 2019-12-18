
import { TrackingService } from '@geoplatform/client';
import { RPMService      } from '@geoplatform/rpm/src/iRPMService'


let trackingServiceInst : TrackingService;

export function TrackingServiceFactory ( rpm : RPMService ) {
    if(!trackingServiceInst) {
        trackingServiceInst = new TrackingService({ provider: rpm });
    }
    return trackingServiceInst;
}
