import { HttpService } from "../../src/http/http-service";
import { HttpRequest } from "../../src/http/http-request";
import { HttpResponse } from "../../src/http/http-response";
import { HttpMethod } from "../../src/http/http-method";
import { HttpServiceOptions } from "../../src/http/http-service-options";

describe('HttpService', () => {
    it('will set default request values if not passed in to performRequest', async () => {
        let svc: HttpService = new HttpService();
        let actual: HttpRequest;
        spyOn<any>(svc, 'request').and.callFake((req: HttpRequest) => {
            actual = req;
        });
        spyOn<any>(svc, 'response').and.returnValue({});

        await svc.performRequest();

        expect(actual).toBeDefined();
        expect(actual.url).toBe('http://127.0.0.1');
        expect(actual.headers).toEqual({});
        expect(actual.allowAutoRedirect).toBe(true);
        expect(actual.method).toBe(HttpMethod.GET);
        expect(actual.postData).toBeUndefined();
    });

    it('can override default request values via constructor options if not passed in to performRequest', async () => {
        let options: HttpServiceOptions = {
            defaultUrl: 'https://fake.url/test',
            defaultHeaders: {"Authorization": "basic a098dfasd09/=="},
            defaultAllowRedirect: true,
            defaultMethod: HttpMethod.DELETE,
            defaultPostData: 'some-fake-post-data'
        };
        let svc: HttpService = new HttpService(options);
        let actual: HttpRequest;
        spyOn<any>(svc, 'request').and.callFake((req: HttpRequest) => {
            actual = req;
        });
        spyOn<any>(svc, 'response').and.returnValue({});

        await svc.performRequest();

        expect(actual).toBeDefined();
        expect(actual.url).toBe(options.defaultUrl);
        expect(actual.headers).toBe(options.defaultHeaders);
        expect(actual.allowAutoRedirect).toBe(options.defaultAllowRedirect);
        expect(actual.method).toBe(options.defaultMethod);
        expect(actual.postData).toBe(options.defaultPostData);
    });

    it('can send GET request', async () => {
        let svc: HttpService = new HttpService();
        let request: HttpRequest = {
            url: 'http://127.0.0.1',
            method: HttpMethod.GET
        };

        spyOn<any>(svc, 'request').and.returnValue({});
        let mockResponse: HttpResponse = new HttpResponse({
            statusCode: 200,
            data: '{"foo": "bar"}'
        });
        spyOn<any>(svc, 'response').and.returnValue(mockResponse);

        let response: HttpResponse = await svc.performRequest(request);

        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual(mockResponse.data);
    });

    it('can send POST request', async () => {
        let svc: HttpService = new HttpService();
        let request: HttpRequest = {
            url: 'http://127.0.0.1',
            method: HttpMethod.POST,
            postData: '{"hello":"world"}'
        };

        spyOn<any>(svc, 'request').and.returnValue({});
        let mockResponse: HttpResponse = new HttpResponse({
            statusCode: 200,
            data: '{"foo": "bar"}'
        });
        spyOn<any>(svc, 'response').and.returnValue(mockResponse);

        let response: HttpResponse = await svc.performRequest(request);

        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual(mockResponse.data);
    });
});