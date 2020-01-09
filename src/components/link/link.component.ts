import { Component, OnInit, Input } from '@angular/core';
import { Config, ItemTypes } from "@geoplatform/client";

import { ItemHelper } from '../../item-helper';

@Component({
  selector: 'gp-resource-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less']
})
export class ResourceLinkComponent implements OnInit {

    @Input() item : any;
    // @Input() icon : any;
    @Input() external : boolean = false;    //open link in new window/tab
    @Input() label : string;
    @Input() showIcon : boolean = true;

    public portalUrl : string;


    constructor() { }

    ngOnInit() {
        if(Config.portalUrl) this.portalUrl= Config.portalUrl;
        else {
            this.portalUrl = Config.ualUrl.replace("sit-ual",'sit')
                .replace("stg-ual","stg").replace("ual","www");
        }
    }

    hasIcon() : boolean {
        return this.showIcon;
    }

    getIcon() : string {
        return ItemHelper.getIcon(this.item);
    }

    getLabel() : string {
        return this.label || ItemHelper.getLabel(this.item);
    }

    getType() : string {
        return ItemHelper.getTypeKey(this.item);
    }

    getIconClass() : string {
        let type = ItemHelper.getTypeLabel(this.item);
        if("Contact" === type) type = 'vcard';
        if("Product" === type) type = 'imageproduct';
        return 'icon-' + type.toLowerCase();
    }

}
