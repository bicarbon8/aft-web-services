import { IncomingHttpHeaders } from "http";

export class HttpResponse {
    headers: IncomingHttpHeaders = {};
    data: string;
    statusCode: number = 200;
    dataAs<T>(): T {
        // TODO: move to using ts-serializer in the future
        // TODO: support XML deserialisation
        return JSON.parse(this.data) as T;
    }
}