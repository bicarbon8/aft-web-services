import { IInitialiseOptions } from "aft-core";
import { HttpMethod } from "./http-method";
import { OutgoingHttpHeaders } from "http";

export class HttpRequest implements IInitialiseOptions {
    url: string = 'http://127.0.0.1';
    allowAutoRedirect: boolean = true;
    headers: OutgoingHttpHeaders = {};
    method: string = HttpMethod.GET;
    postData: string;
}