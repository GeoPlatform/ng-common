import { ItemTypes } from '@geoplatform/client';
var GP_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
var AGOL_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/AGOLMap';
var GeoPlatformResultsItemAdapter = /** @class */ (function () {
    function GeoPlatformResultsItemAdapter() {
    }
    GeoPlatformResultsItemAdapter.prototype.getId = function (item) { return item.id; };
    GeoPlatformResultsItemAdapter.prototype.getLabel = function (item) {
        return item.label || item.title ||
            item.prefLabel || "Untitled Item";
    };
    ;
    GeoPlatformResultsItemAdapter.prototype.getDescription = function (item) { return item.description; };
    ;
    GeoPlatformResultsItemAdapter.prototype.getAuthorName = function (item) { return item.createdBy; };
    ;
    GeoPlatformResultsItemAdapter.prototype.getEditorName = function (item) { return item.lastModifiedBy; };
    ;
    GeoPlatformResultsItemAdapter.prototype.getCreatedDate = function (item) { return item.created; };
    ;
    GeoPlatformResultsItemAdapter.prototype.getModifiedDate = function (item) { return item.modified; };
    ;
    GeoPlatformResultsItemAdapter.prototype.getIconClass = function (item) {
        var type = item.type.replace(/^[a-z]+\:/i, '').toLowerCase();
        return 'icon-' + type;
    };
    GeoPlatformResultsItemAdapter.prototype.getTypeLabel = function (item) {
        if (ItemTypes.SERVICE === item.type && !!item.serviceType)
            return item.serviceType.label || "Service";
        if (ItemTypes.MAP === item.type) {
            var resTypes = item.resourceTypes || [];
            if (~resTypes.indexOf(GP_MAP_RESOURCE_TYPE))
                return 'GeoPlatform Map';
            if (~resTypes.indexOf(AGOL_MAP_RESOURCE_TYPE))
                return 'ArcGIS Online Map';
            return "Map";
        }
        if (ItemTypes.CONTACT === item.type)
            return 'Contact';
        return item.type.replace(/^[a-z]+\:/i, '');
    };
    return GeoPlatformResultsItemAdapter;
}());
export { GeoPlatformResultsItemAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9pdGVtL2l0ZW0tYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQU8sU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFrQnJELElBQU0sb0JBQW9CLEdBQUcsdURBQXVELENBQUM7QUFDckYsSUFBTSxzQkFBc0IsR0FBRyxnREFBZ0QsQ0FBQztBQUVoRjtJQUVJO0lBQWUsQ0FBQztJQUVoQiw2Q0FBSyxHQUFMLFVBQU8sSUFBVSxJQUFjLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsZ0RBQVEsR0FBUixVQUFVLElBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQ3hCLElBQUksQ0FBQyxTQUFTLElBQUksZUFBZSxDQUFDO0lBQzdDLENBQUM7SUFBQSxDQUFDO0lBQ0Ysc0RBQWMsR0FBZCxVQUFnQixJQUFVLElBQWUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDcEUscURBQWEsR0FBYixVQUFlLElBQVUsSUFBZ0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDbEUscURBQWEsR0FBYixVQUFlLElBQVUsSUFBZ0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDdkUsc0RBQWMsR0FBZCxVQUFnQixJQUFVLElBQWUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7SUFDaEUsdURBQWUsR0FBZixVQUFpQixJQUFVLElBQWMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7SUFFakUsb0RBQVksR0FBWixVQUFjLElBQVU7UUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdELE9BQU8sT0FBTyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsb0RBQVksR0FBWixVQUFjLElBQVU7UUFDcEIsSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3JELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO1FBQy9DLElBQUksU0FBUyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO2dCQUFHLE9BQU8saUJBQWlCLENBQUM7WUFDdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7Z0JBQUcsT0FBTyxtQkFBbUIsQ0FBQztZQUMzRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTCxvQ0FBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEl0ZW0sSXRlbVR5cGVzIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXI8VD4ge1xuICAgIGdldElkKCBpdGVtIDogVCApICAgICAgICAgICA6IHN0cmluZztcbiAgICBnZXRMYWJlbCggaXRlbSA6IFQgKSAgICAgICAgOiBzdHJpbmc7XG4gICAgZ2V0RGVzY3JpcHRpb24oIGl0ZW0gOiBUICkgIDogc3RyaW5nO1xuICAgIGdldEF1dGhvck5hbWUoIGl0ZW0gOiBUICkgICA6IHN0cmluZztcbiAgICBnZXRFZGl0b3JOYW1lKCBpdGVtIDogVCApICAgOiBzdHJpbmc7XG4gICAgZ2V0Q3JlYXRlZERhdGUoIGl0ZW0gOiBUICkgIDogc3RyaW5nO1xuICAgIGdldE1vZGlmaWVkRGF0ZSggaXRlbSA6IFQgKSA6IHN0cmluZztcbiAgICBnZXRJY29uQ2xhc3MoIGl0ZW0gOiBUICkgICAgOiBzdHJpbmc7XG4gICAgZ2V0VHlwZUxhYmVsKCBpdGVtIDogVCApICAgIDogc3RyaW5nO1xufVxuXG5cblxuXG5jb25zdCBHUF9NQVBfUkVTT1VSQ0VfVFlQRSA9ICdodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3Blbm1hcC9HZW9wbGF0Zm9ybU1hcCc7XG5jb25zdCBBR09MX01BUF9SRVNPVVJDRV9UWVBFID0gJ2h0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L29udC9vcGVubWFwL0FHT0xNYXAnO1xuXG5leHBvcnQgY2xhc3MgR2VvUGxhdGZvcm1SZXN1bHRzSXRlbUFkYXB0ZXIgaW1wbGVtZW50cyBTZWFyY2hSZXN1bHRzSXRlbUFkYXB0ZXI8SXRlbT4ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgZ2V0SWQoIGl0ZW06IEl0ZW0gKSA6IHN0cmluZyB7IHJldHVybiBpdGVtLmlkOyB9XG4gICAgZ2V0TGFiZWwoIGl0ZW06IEl0ZW0gKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpdGVtLmxhYmVsIHx8IGl0ZW0udGl0bGUgfHxcbiAgICAgICAgICAgICAgIGl0ZW0ucHJlZkxhYmVsIHx8IFwiVW50aXRsZWQgSXRlbVwiO1xuICAgIH07XG4gICAgZ2V0RGVzY3JpcHRpb24oIGl0ZW06IEl0ZW0gKSAgOiBzdHJpbmcgeyByZXR1cm4gaXRlbS5kZXNjcmlwdGlvbjsgfTtcbiAgICBnZXRBdXRob3JOYW1lKCBpdGVtOiBJdGVtICkgICA6IHN0cmluZyB7IHJldHVybiBpdGVtLmNyZWF0ZWRCeTsgfTtcbiAgICBnZXRFZGl0b3JOYW1lKCBpdGVtOiBJdGVtICkgICA6IHN0cmluZyB7IHJldHVybiBpdGVtLmxhc3RNb2RpZmllZEJ5OyB9O1xuICAgIGdldENyZWF0ZWREYXRlKCBpdGVtOiBJdGVtICkgIDogc3RyaW5nIHsgcmV0dXJuIGl0ZW0uY3JlYXRlZDsgfTtcbiAgICBnZXRNb2RpZmllZERhdGUoIGl0ZW06IEl0ZW0gKSA6IHN0cmluZyB7IHJldHVybiBpdGVtLm1vZGlmaWVkOyB9O1xuXG4gICAgZ2V0SWNvbkNsYXNzKCBpdGVtOiBJdGVtICkge1xuICAgICAgICBsZXQgdHlwZSA9IGl0ZW0udHlwZS5yZXBsYWNlKC9eW2Etel0rXFw6L2ksICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gJ2ljb24tJyArIHR5cGU7XG4gICAgfVxuXG4gICAgZ2V0VHlwZUxhYmVsKCBpdGVtOiBJdGVtICkge1xuICAgICAgICBpZiggSXRlbVR5cGVzLlNFUlZJQ0UgPT09IGl0ZW0udHlwZSAmJiAhIWl0ZW0uc2VydmljZVR5cGUgKVxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2VydmljZVR5cGUubGFiZWwgfHwgXCJTZXJ2aWNlXCI7XG4gICAgICAgIGlmKCBJdGVtVHlwZXMuTUFQID09PSBpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIGxldCByZXNUeXBlcyA9IGl0ZW0ucmVzb3VyY2VUeXBlcyB8fCBbXTtcbiAgICAgICAgICAgIGlmKCB+cmVzVHlwZXMuaW5kZXhPZihHUF9NQVBfUkVTT1VSQ0VfVFlQRSkgKSByZXR1cm4gJ0dlb1BsYXRmb3JtIE1hcCc7XG4gICAgICAgICAgICBpZiggfnJlc1R5cGVzLmluZGV4T2YoQUdPTF9NQVBfUkVTT1VSQ0VfVFlQRSkgKSByZXR1cm4gJ0FyY0dJUyBPbmxpbmUgTWFwJztcbiAgICAgICAgICAgIHJldHVybiBcIk1hcFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBJdGVtVHlwZXMuQ09OVEFDVCA9PT0gaXRlbS50eXBlKSByZXR1cm4gJ0NvbnRhY3QnO1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlLnJlcGxhY2UoL15bYS16XStcXDovaSwgJycpO1xuICAgIH1cblxufVxuIl19