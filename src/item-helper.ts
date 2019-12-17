import { Injectable } from '@angular/core';
import { Config, ItemTypes } from "@geoplatform/client";

const ASSETS = [
    ItemTypes.DATASET, ItemTypes.SERVICE,   ItemTypes.LAYER,       ItemTypes.MAP,
    ItemTypes.GALLERY, ItemTypes.COMMUNITY, ItemTypes.APPLICATION, ItemTypes.TOPIC,
    ItemTypes.WEBSITE
];

@Injectable()
export class ItemHelper {

    constructor() { }

    /**
     * @param {any} item - either GP item or string type
     * @return {boolean}
     */
    static isAsset(item : any) {
        if(!item) return false;
        let type = null;
        if(typeof(item) === 'string')  type = item as string;
        else if(item.type) type = item.type;
        return type && ASSETS.indexOf(type) >= 0;
    }

    /**
     * @param {any} item - either GP item or string type
     * @return {string} url of icon for the type
     */
    static getIcon(item : any) :string {
        let type = "dataset";
        switch(item.type) {
            case ItemTypes.CONTACT:         type =  'vcard'; break;
            default: type = item.type.replace(/^[a-z]+\:/i, '').toLowerCase();
        }
        return 'icon-' + type;
    }

    /**
     * @param {any} item - either GP item
     * @return {string} label for the item
     */
    static getLabel(item : any) {
        if(!item || !item.type) return 'Unknown type';

        let type = item.type;
        switch(type) {

            case ItemTypes.ORGANIZATION :
            // case ItemTypes.PERSON :
                return item.label || item.name || "Un-titled resource";

            case ItemTypes.CONCEPT :
            case ItemTypes.CONCEPT_SCHEME :
                return item.label || item.prefLabel || "Un-titled resource";

            case ItemTypes.CONTACT :
                let fn = item.fullName || '';
                let pt = item.positionTitle || '';
                let on = item.orgName || '';
                let label = fn + (fn.length?' - ':'') + pt + (pt.length?' - ':'') + on;
                //if none of those fields have been provided, default to email or placeholder
                if(!label.length) label = item.email || 'Untitled Contact';
                return label;

            default: return item.label || item.title || "Un-titled resource";
        }
    }

    /**
     * @param {any} item - either GP item or string type
     * @return {string} label for the item's type
     */
    static getTypeLabel(item:any) {
        if(!item) return 'Unknown Resource Type';

        let type : string = null;
        if(typeof(item) === 'string') type = item as string;
        else if(item.type) type = item.type;
        else return null;

        switch(type) {
            case ItemTypes.DATASET :
            case ItemTypes.SERVICE :
            // case ItemTypes.PERSON :
            case ItemTypes.ORGANIZATION :
            case ItemTypes.CONCEPT :
                return type.replace(/^[a-z]+\:/i, '');
            case ItemTypes.CONCEPT_SCHEME : return "Concept Scheme";
            case ItemTypes.WEBSITE : return "Website";
            case ItemTypes.CONTACT : return "Contact";
            default: return type;   //remainder are unprefixed
        }
    }


    /**
     * @param {any} item - either GP item or string type
     * @return {string} key (plural) for the item's type
     */
    static getTypeKey(item:any) {
        if(!item) return null;

        let type : string = null;
        if(typeof(item) === 'string') type = item as string;
        else if(item.type) type = item.type;
        else return null;

        switch(type) {
            //special plurality
            case ItemTypes.GALLERY : return 'galleries';
            case ItemTypes.COMMUNITY : return 'communities';
            //different name
            case ItemTypes.CONTACT : return 'contacts'; //instead of "vcards"
            //remainder
            default: return type.replace(/^[a-z]+\:/i, '').toLowerCase() + 's';

        }
    }


    /**
     * @param {string} type - item type
     * @return {string} string path to the type's icon
     */
    static determineIconType(type : string) {
        let name = type.replace(/^[a-z]+\:/i, '').toLowerCase();
        return `/assets/icons/${name}.svg`;
    }

    static getItemDetailsUrl(item : any) {
        if(!item || !item.type || !item.id) return null;

        return Config.portalUrl + '/resources/' + this.getTypeKey(item) + '/' + item.id;
    }

}
