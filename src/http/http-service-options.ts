import { OutgoingHttpHeaders } from "http";

export interface HttpServiceOptions {
    defaultUrl?: string;
    defaultAllowRedirect?: boolean;
    defaultHeaders?: OutgoingHttpHeaders;
    defaultMethod?: string;
    defaultPostData?: string;
}