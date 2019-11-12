# AFT-Web-Services
provides simplified HTTP REST request and response testing support

## Usage
the `aft-web-services` package supports all standard HTTP methods like `GET`, `POST`, `PUT`, `DELETE` and `UPDATE` via the `HttpMethod` module
### GET
```typescript
// setup request details
let request = new HttpRequest();
request.url = 'https://reqres.in/api/users?page=2';

// perform the actual request and get a response
let response: HttpResponse = await HttpService.instance.performRequest(request);

// deserialise the response into an object
let respObj: ListUsersResponse = response.dataAs<ListUsersResponse>();
```

### POST
```typescript
// setup request details
let request = new HttpRequest();
request.url = 'https://reqres.in/api/users';
request.method = HttpMethod.POST; // default is GET
request.headers[ContentType.CONTENTTYPE_KEY] = ContentType.application_json;
request.postData = JSON.stringify({
    name: "morpheus",
    job: "leader"
});

// perform the actual request and get a response
let response: HttpResponse = await HttpService.instance.performRequest(request);

// deserialise the response into an object
let respObj: CreateUserResponse = response.dataAs<CreateUserResponse>();
```

## Advantages
- using this package automatically logs the request and response details using the `aft-core.TestLog`
- the `aft-web-services` classes rely on asynchronous promises meaning no worrying about callbacks
- built-in support for redirects (HTTP Status Code 302) and http or https requests