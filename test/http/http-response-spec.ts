import { HttpResponse } from "../../src/http/http-response";

describe('HttpResponse', () => {
    it('can deserialise to Typed JavaScript object', () => {
        let response: HttpResponse = new HttpResponse();
        response.data = '{"foo":"bar", "baz":2}';

        let foo: Foo = response.dataAs<Foo>();

        expect(foo).not.toBeNull();
        expect(foo.foo).toEqual('bar');
        expect(foo.baz).toEqual(2);
    });

    // TODO: move to using ts-serializer in the future?
    it('attempts to deserialise wrong Type', () => {
        let response: HttpResponse = new HttpResponse();
        response.data = '{"foo":"bar", "baz":2}';

        let bar: Bar = response.dataAs<Bar>();

        expect(bar).not.toBeNull();
        expect(bar.bar).toBeUndefined();
        expect(bar.baz).not.toBeUndefined(); // equal to 2 which is wrong type
    });
});

class Foo {
    foo: string;
    baz: number;
}

class Bar {
    bar: number;
    baz: Foo;
}