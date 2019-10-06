# Idelic Safety Suite API

This API is to help JavaScript applications run api calls against Idelic's servers.

## To create a new API:

All APIs must mirror the server they come from exactly.  This includes:
- the folder structure relative to the URL
- the TypeScript types relative to the request / response bodies and query params

No logic can be run inside the API functions, they are simply to translate from JavaScript / Immutable types to the format that the server expects.

1. Identify folder / file to create API in (based on the URL)
2. Create required request body, response body, and query param types
3. Create function signatures for normal and Immutable objects
4. Make the last argument of each API call `apiOptions: ApiOptions = {}`
5. Setup Immutable transformers to run based on `apiOptions.useImmutable`
6. Build API object and call `runApi` with it
7. Ensure the method, url root, route and request options are all correct
8. Pass through the apiOptions as is
9. For every new folder, add an `index.ts` for exporting in it
10. For every new file, add an `export * from './fileName.ts'` in its sibling `index.ts`

### To identify the correct folder:

Look for patterns in the URL and put grouped APIs together based on those patterns.
Eg, the following would all go in the `src/api/notifications.ts` file.
```
GET /api/1.0/notifications
GET /api/1.0/notifications/<id>
POST /api/1.0/notifications
...etc
```

Eg, the following would all go in the `src/api/models/documents.ts` file.
```
GET /api/models/<modelId>/documents
GET /api/models/documemnts/<documentId>/content
POST /api/models/<modelId>/documents
PUT /api/models/documents
```

If in doubt, ask in the PR!  Or take a look through the related server code to see how they structured it.

