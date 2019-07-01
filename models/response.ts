
import * as Common from './common';

export class VehicleInfoResponse {
    public data: Info[] = null;
    public error: Common.Error[] = null;

    public VehicleInfo(info: Info) {
        if (!this.data) {
            this.data = [];
        }
        this.data.push(info);
    }
}

export class Info {
    public modle: string;
    public msrp: number;
}
