## New API Checklist:

- [] Identify folder / file to create API in (based on the URL)
- [] Create required request body, response body, and query param types
- [] Create function signatures for normal and Immutable objects
- [] Make the last argument of each API call `apiOptions: ApiOptions = {}`
- [] Setup Immutable transformers to run based on `apiOptions.useImmutable`
- [] Build API object and call `runApi` with it
- [] Ensure the method, url root, route and request options are all correct
- [] Pass through the apiOptions as is
- [] For every new folder, add an `index.ts` for exporting in it
- [] For every new file, add an `export * from './fileName.ts'` in its sibling `index.ts`

