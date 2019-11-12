import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";
import { TestLog, TestLogOptions } from "aft-core";
import { HttpMethod } from "./http-method";
import * as http from 'http';
import * as https from 'https';

export class HttpService {
    logger: TestLog = new TestLog(new TestLogOptions('aft-web-services.HttpService'));

    async performRequest(r: HttpRequest): Promise<HttpResponse> {
        this.logger.trace("issuing '" + r.method + "' request to '" + r.url + "' with post body '" + r.postData + "' and headers '" + JSON.stringify(r.headers) +"'.");
        
        let message: http.IncomingMessage = await this.request(r);

        let resp: HttpResponse = await this.response(message, r);

        this.logger.trace("received response of '" + resp.data + "' and headers '" + JSON.stringify(resp.headers) +"'.");
        return resp;
    }

    private async request(r: HttpRequest): Promise<http.IncomingMessage> {
        let message: http.IncomingMessage = await new Promise<http.IncomingMessage>((resolve, reject) => {
            try {
                let client = (r.url.includes('https://')) ? https : http;
                let req: http.ClientRequest = client.request(r.url, {
                    headers: r.headers,
                    method: r.method
                }, resolve);
                if (r.method == HttpMethod.POST || r.method == HttpMethod.UPDATE) {
                    if (r.postData) {
                        req.write(r.postData);
                    }
                }
                req.end(); // close the request
            } catch (e) {
                reject(e);
            }
        });
        return message;
    }

    private async response(r: http.IncomingMessage, req: HttpRequest): Promise<HttpResponse> {
        r.setEncoding('utf8');

        // handle 302 redirect response if enabled
        if (r.statusCode == 302 && req.allowAutoRedirect) {
            let req: HttpRequest = new HttpRequest();
            req.url = r.headers.location;
            req.headers['Cookie'] = '';
            for (var header in r.headers) {
                if (Object.prototype.hasOwnProperty.call(r.headers, header)) {
                    if (header.toLocaleLowerCase() == 'set-cookie') {
                        req.headers['Cookie'] += r.headers[header] + '; ';
                    }
                }
            }
            let message: http.IncomingMessage = await this.request(req);
            return await this.response(message, req);
        } else {
            let response: HttpResponse = new HttpResponse();
            response.statusCode = r.statusCode;
            response.headers = r.headers;
            await new Promise<any>((resolve, reject) => {
                try {
                    r.on('data', (chunk) => {
                        if (!response.data) {
                            response.data = '';
                        }
                        response.data += chunk;
                    });
                    r.on('end', resolve);
                } catch (e) {
                    reject(e);
                }
            });
            return response;
        }
    }
}

export module HttpService {
    export var instance: HttpService = new HttpService();
}