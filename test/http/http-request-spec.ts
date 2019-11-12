import { HttpRequest } from "../../src/http/http-request";

describe('HttpRequest', () => {
    it('can set the url property', () => {
        let request: HttpRequest = new HttpRequest();

        expect(request.url).toEqual('http://127.0.0.1'); // default value

        let expectedUrl: string = 'http://some.fake.ie';
        request.url = expectedUrl;

        expect(request.url).toEqual(expectedUrl);
    });
});