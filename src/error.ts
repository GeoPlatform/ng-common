
import { Item } from "@geoplatform/client";

/**
 *
 */
export class GPError extends Error {

    private _label: string;
    private _code: number;
    private _item : Item;

    public get label() { return this._label; }
    public set label(value: string) { this._label = value; }

    public get code() { return this._code; }
    public set code(value: number) { this._code = value; }

    public get item() { return this._item; }
    public set item(value : Item) { this._item = value; }


    constructor(
        message: string,
        label ?: string,
        code ?: number,
        item ?: Item
    ) {
        super(message);
        this.label = label;
        this.code  = code;
        this.item  = item;
    }

    static from(error : Error) : GPError {
        if(error instanceof GPError)
            return error as GPError;

        let gpe = new GPError(error.message);
        gpe.label = "An error occurred";
        gpe.code = 500;
        return gpe;
    }

}
