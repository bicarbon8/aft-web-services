import { HttpService } from "../../src/http/http-service";
import { HttpRequest } from "../../src/http/http-request";
import { HttpResponse } from "../../src/http/http-response";
import { HttpMethod } from "../../src/http/http-method";

describe('HttpService', () => {
    it('can send GET request', async () => {
        let request: HttpRequest = new HttpRequest();
        request.method = HttpMethod.GET;

        spyOn<any>(HttpService.instance, 'request').and.returnValue({});
        let mockResponse: HttpResponse = new HttpResponse();
        mockResponse.statusCode = 200;
        let expectedData: string = '{"foo": "bar"}';
        mockResponse.data = expectedData;
        spyOn<any>(HttpService.instance, 'response').and.returnValue(mockResponse);

        let response: HttpResponse = await HttpService.instance.performRequest(request);

        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual(expectedData);
    });

    it('can send POST request', async () => {
        let request: HttpRequest = new HttpRequest();
        request.method = HttpMethod.POST;
        request.postData = '{"hello":"world"}';

        spyOn<any>(HttpService.instance, 'request').and.returnValue({});
        let mockResponse: HttpResponse = new HttpResponse();
        mockResponse.statusCode = 200;
        let expectedData: string = '{"foo": "bar"}';
        mockResponse.data = expectedData;
        spyOn<any>(HttpService.instance, 'response').and.returnValue(mockResponse);

        let response: HttpResponse = await HttpService.instance.performRequest(request);

        expect(response.statusCode).toEqual(200);
        expect(response.data).toEqual(expectedData);
    });
});