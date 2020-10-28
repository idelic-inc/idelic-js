## New API

If no new routes are added, remove this section from the PR description.

What routes are being added?
- `GET /api/1.1/exampleRoute`
  - Request Body: `ExampleRequest`
  - Query Params: `ExampleQuery`
  - Response Body: `EmptyResponse`

Checklist
- [ ] Add "New Routes" label to the PR
- [ ] Identify folder / file to create API in (based on the URL)
- [ ] Create required request body, response body, and query param types
- [ ] Create function signatures for normal and Immutable objects
- [ ] Make the last argument of each API call `apiOptions: ApiOptions = {}`
- [ ] Setup Immutable transformers to run based on `apiOptions.useImmutable`
- [ ] Build API object and call `runApi` with it
- [ ] Ensure the method, url root, route and request options are all correct
- [ ] Pass through the apiOptions as is
- [ ] For every new folder, add an `index.ts` for exporting in it
- [ ] For every new file, add an `export * from './fileName.ts'` in its sibling `index.ts`

## Updated API

If no existing routes are updated, remove this section from the PR description.

What routes are being updated?
- `GET /api/1.1/exampleRoute`

Checklist
- [ ] If the route is changed, is the file it is in still valid?
- [ ] If the request body, response body, or query params are updated, are they used anywhere else and are those still valid?
- [ ] If a function signature changes (or the types that go into it), is it backwards compatible, or will this require a breaking change?
 - If requires a breaking change, then label this PR with the "Breaking Changes" label

