import { Component, Input, HostBinding } from '@angular/core';
import { Config } from '@geoplatform/client';

@Component({
    selector: 'gp-app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {

    @Input() appName : string = "Application";
    @HostBinding('class') class = 'o-header'

    public portalUrl : string = Config.portalUrl || 'https://www.geoplatform.gov';


}
