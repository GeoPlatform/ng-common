# Selected Items Component

This component is useful for displaying a list of selected items, usually in concert with a set of search results.


## Bindings
- `selected` - the Array of `Item` instances that are currently selected
- `onEvent`  - a method to invoke upon a selection event


## Configuring Actions

In addition to the default action, clearing all selections, more actions can be
incorporated via transclusion as follows:

```javascript
<gp-selected-items [selected]="selected" (onEvent)="onSelectionEvent($event)">

    //wrap custom actions with an element containing the 'actions' key
    <div actions>

        //all actions should be defined using bootstrap list-group-item html

        <div class="list-group-item d-flex flex-justify-between flex-align-center">
            <div class="flex-1">Custom Action A</div>    
            <button type="button" class="btn btn-link" (click)="doCustomActionA()">
                <span class="fas fa-plus-circle t-fg--success"></span>
            </button>
        </div>

        <div class="list-group-item d-flex flex-justify-between flex-align-center">
            <div class="flex-1">Custom Action B</div>    
            <button type="button" class="btn btn-link" (click)="doCustomActionB()">
                <span class="fas fa-plus-circle t-fg--success"></span>
            </button>
        </div>

    </div>

</gp-selected-items>
```
