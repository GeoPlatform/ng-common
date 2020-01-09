
import { Item,ItemTypes } from '@geoplatform/client';


export interface SearchResultsItemAdapter<T> {
    getId( item : T )           : string;
    getLabel( item : T )        : string;
    getDescription( item : T )  : string;
    getAuthorName( item : T )   : string;
    getEditorName( item : T )   : string;
    getCreatedDate( item : T )  : string;
    getModifiedDate( item : T ) : string;
    getIconClass( item : T )    : string;
    getTypeLabel( item : T )    : string;
}




const GP_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
const AGOL_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/AGOLMap';

export class GeoPlatformResultsItemAdapter implements SearchResultsItemAdapter<Item> {

    constructor() {}

    getId( item: Item ) : string { return item.id; }
    getLabel( item: Item ) : string {
        return item.label || item.title ||
               item.prefLabel || "Untitled Item";
    };
    getDescription( item: Item )  : string { return item.description; };
    getAuthorName( item: Item )   : string { return item.createdBy; };
    getEditorName( item: Item )   : string { return item.lastModifiedBy; };
    getCreatedDate( item: Item )  : string { return item.created; };
    getModifiedDate( item: Item ) : string { return item.modified; };

    getIconClass( item: Item ) {
        let type = item.type.replace(/^[a-z]+\:/i, '').toLowerCase();
        return 'icon-' + type;
    }

    getTypeLabel( item: Item ) {
        if( ItemTypes.SERVICE === item.type && !!item.serviceType )
            return item.serviceType.label || "Service";
        if( ItemTypes.MAP === item.type) {
            let resTypes = item.resourceTypes || [];
            if( ~resTypes.indexOf(GP_MAP_RESOURCE_TYPE) ) return 'GeoPlatform Map';
            if( ~resTypes.indexOf(AGOL_MAP_RESOURCE_TYPE) ) return 'ArcGIS Online Map';
            return "Map";
        }
        if( ItemTypes.CONTACT === item.type) return 'Contact';
        return item.type.replace(/^[a-z]+\:/i, '');
    }

}
