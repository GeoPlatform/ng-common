

import {
    Item, Asset,
    Map, Layer, Service, Dataset, Gallery, Community, Concept,
    ConceptScheme, Organization, Contact,
    ItemTypes
} from '@geoplatform/client';

import { ItemHelper } from './item-helper';


const Visibilities : any = {
    PUBLIC : 'public',
    PRIVATE : 'private'
};

const Statuses : any = {
    SUBMITTED : 'submitted'
};



function createItem(type, opts ?: {[key:string]:any}) : any {
    return Object.assign({
        type:           type,
        uri:            null,
        label:          "New Item",
        description:    "This item needs a description",
        resourceTypes:  [],
        createdBy:      null,
        lastModifiedBy: null
    }, opts||{});
}

function createAsset(type, opts ?: {[key:string]:any}) : any {
    let options : {[key:string]:string} = Object.assign({
        keywords        : [],
        alternateTitles : [],
        purpose         : null,
        themes          : [],
        contacts        : [],
        publishers      : [],
        contributors    : [],
        distributions   : [],
        classifiers     : {},
        landingPage     : null,
        status          : Statuses.SUBMITTED,
        visibility      : Visibilities.PUBLIC,
        identifiers     : [] as string[],
        extent          : { minx: -179, miny: -89, maxx: 179, maxy: 89 },
        temporal        : { startDate: null, endDate: null },
        statistics      : { numViews: 0, numLikes: 0 },
        usedBy          : [],
        related         : [],
        rights          : []
    }, opts||{});
    let item = createItem(type, options);
    return item as Asset;
}



function createMap() : Map {
    let obj = createAsset(ItemTypes.MAP, {
        layers      : [],
        baseLayer   : null,
        annotations : {},
        thumbnail   : {
            label       : null,
            url         : null,
            contentData : null,
            width       : 0,
            height      : 0
        }
    });
    return obj as Map;
}


function createLayer( service ?: Service ) : Map {
    let services = service ? [service] : [];
    let obj = createAsset(ItemTypes.LAYER, {
        subLayers   : [],
        parentLayer : null,
        services    : services,
        layerName   : null,
        layerType   : null,
        legend      : null
    });
    return obj as Map;
}

function createService() : Service {
    let obj = createAsset(ItemTypes.SERVICE, {
        datasets    : [],
        serviceType : null,
        href        : null
    });
    return obj as Service;
}

function createDataset() : Dataset {
    let obj = createAsset(ItemTypes.DATASET, { services : [] });
    return obj as Dataset;
}

function createGallery() : Gallery {
    let obj = createAsset(ItemTypes.GALLERY, { items : [] });
    return obj as Gallery;
}

function createCommunity() : Community {
    let obj = createAsset(ItemTypes.COMMUNITY);
    return obj as Community;
}

function createConcept() : Concept {
    let obj = createItem(ItemTypes.CONCEPT, { scheme : null });
    return obj as Concept;
}

function createConceptScheme() : ConceptScheme {
    let obj = createItem(ItemTypes.CONCEPT_SCHEME);
    return obj as ConceptScheme;
}


function createOrg() : Organization {
    let obj = createItem(ItemTypes.ORGANIZATION, { subOrgOf : null });
    return obj as Organization;
}

function createContact() : Contact {
    let obj = createItem(ItemTypes.CONTACT, {
        fullName : null,
        email    : null,
        tel      : null,
        fax      : null,
        address  : {
            street1: null,
            street2: null,
            city:    null,
            state:   null,
            zip:     null
        }
    });
    return obj as Contact;
}






function defaultArrayValue(item, property) {
    if(!item || !property) return;
    if( item[property] === null || item[property] === undefined ||
        typeof(item[property]) === 'undefined' )
        item[property] = [];
}

function defaultToNullValue(item, property) {
    if(!item || !property) return;
    if( typeof(item[property]) === 'undefined' )
        item[property] = null;
}



export class ItemFactory {

    static create(type) {
        switch(type) {
            case ItemTypes.MAP : return createMap();
            case ItemTypes.LAYER : return createLayer();
            case ItemTypes.SERVICE : return createService();
            case ItemTypes.DATASET : return createDataset();
            case ItemTypes.GALLERY : return createGallery();
            case ItemTypes.COMMUNITY: return createCommunity();
            case ItemTypes.CONCEPT : return createConcept();
            case ItemTypes.CONCEPT_SCHEME: return createConceptScheme();
            case ItemTypes.ORGANIZATION: return createOrg();
            case ItemTypes.CONTACT: return createContact();
            default: return null;
        }
    }

    static fix(item) {

        defaultArrayValue(item, 'resourceTypes');

        if(ItemHelper.isAsset(item)) {
            defaultArrayValue(item, 'keywords');
            defaultArrayValue(item, 'alternateTitles');
            defaultArrayValue(item, 'themes');
            defaultArrayValue(item, 'contacts');
            defaultArrayValue(item, 'publishers');
            defaultArrayValue(item, 'contributors');
            defaultArrayValue(item, 'distributions');
            defaultArrayValue(item, 'identifiers');
            defaultArrayValue(item, 'usedBy');
            defaultArrayValue(item, 'related');
            defaultArrayValue(item, 'accessRights');

            defaultToNullValue(item, 'purpose');
            defaultToNullValue(item, 'landingPage');
            defaultToNullValue(item, 'status');
            defaultToNullValue(item, 'visibility');

            if(!item.temporal) {
                item.temporal = {startDate: null, endDate: null};
            }
            if(!item.extent) {
                item.extent = { minx: -179, miny: -89, maxx: 179, maxy: 89 };
            }
        }
    }

}
