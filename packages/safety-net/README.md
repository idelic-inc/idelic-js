# @idelic/safety-net

> Idelic library for making cancellable network requests

## Installing

Using npm:

```sh
npm install --save @idelic/safety-net
```

Using yarn:

```sh
yarn add @idelic/safety-net
```

## Example Usage

`GET` request:

```ts
// Start the request
const nameRequest = request<never, string>('GET', 'https://example.com/name');

// Access the promise
nameRequest.response
  .then((response: string) => {
    /* Handle response */
  })
  .catch(error => {
    if (!error.wasCancelled) {
      /* Handle error */
    }
  });

// Cancel the request
nameRequest.cancel();
```

`POST` request:

```ts
const nameRequest = request<{name: string}, string>(
  'POST',
  'https://example.com/name',
  {body: {name: 'name'}}
);
```

Authenticated request:

```ts
// Auth token
const token = 'token';

const nameRequest = request<{name: string}, string>(
  'POST',
  'https://example.com/name',
  {body: {name: 'name'}, headers: {Authorization: `Bearer ${token}`}}
);
```
