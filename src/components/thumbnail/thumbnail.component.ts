import {
    Component, OnInit, Input, Directive, HostBinding
} from '@angular/core';
import {
    DomSanitizer, SafeResourceUrl, SafeUrl
} from '@angular/platform-browser';

import { Config, ItemTypes, Item } from "@geoplatform/client";





interface Thumbnail {
    url ?: string;
    contentData ?: string;
    width ?: number;
    height ?: number;
    mediaType ?: string;
}



@Directive({
    selector: 'img[fallback]',
    host: {
        '(error)':'onImgError()',
        '(load)': 'onImgLoad()',
        '[src]':'src'
     }
})
export class ImageFallbackDirective {
    @Input() src : string;
    @Input() fallback : string = `/assets/img-404.png`;
    @HostBinding('class') className
    onImgError() { this.src = this.fallback; }
    onImgLoad() { this.className = 'is-image-loaded'; }
}



@Component({
  selector: 'gp-item-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.less']
})
export class ThumbnailComponent implements OnInit {

    @Input() item : Item;

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
    }

    getThumbnailUrl() {
        if(this.item.thumbnail && this.item.thumbnail.url)
            return this.item.thumbnail.url;
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    }

    getBackgroundImage() {
        if(!this.item || !this.item.thumbnail) {
            return this.getFallbackBackgroundImage();
        }

        let thumbnail = this.item.thumbnail;
        let type = thumbnail.mediaType || 'image/png';

        if(thumbnail.contentData) {
            let content = thumbnail.contentData;
            return this.sanitizer.bypassSecurityTrustStyle(`url(data:${type};base64,${content})`);
        }
    }

    getFallbackBackgroundImage() {
        let url = this.getFallbackUrl();
        return `url(${url})`;
    }

    isEmpty() {
        return !this.item || !this.item.thumbnail ||
            ( !this.item.thumbnail.url && !this.item.thumbnail.contentData );
    }

    hasURL() {
        return this.item.thumbnail && !!this.item.thumbnail.url;
    }

    hasContentData() {
        return this.item.thumbnail && !!this.item.thumbnail.contentData && !this.item.thumbnail.url;
    }

    getFallbackUrl() {
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    }
}
