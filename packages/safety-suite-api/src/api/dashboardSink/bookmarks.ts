import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';
import {
  CreateDashboardBookmarksResponse,
  DashboardBookmark,
  DashboardBookmarksQuery,
  GetDashboardBookmarksResponse,
  InputDashboardBookmark
} from './types';

/**
 * Gets the saved dashboard bookmarks for the current user in a specific customer.
 *
 * @param query Object containing the alias of the customer the bookmarks belong to.
 * @param apiOptions Optional options for runApi.
 * @returns Object containing customer alias and array of bookmarks.
 */
export const getDashboardBookmarks = (
  query: DashboardBookmarksQuery,
  apiOptions: ApiOptions = {}
): Request<GetDashboardBookmarksResponse> =>
  runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/dashboard-bookmarks',
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Saves a dashboard bookmark for the current user in a specific customer.
 *
 * @param body Dashboard bookmark object.
 * @param query Object containing the alias of the customer the bookmarks belong to.
 * @param apiOptions Optional options for runApi.
 * @returns Object containing customer alias and newly created bookmark.
 */
export const createDashboardBookmark = (
  body: InputDashboardBookmark,
  query: DashboardBookmarksQuery,
  apiOptions: ApiOptions = {}
): Request<CreateDashboardBookmarksResponse> =>
  runApi({
    method: 'POST',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/dashboard-bookmarks',
    apiOptions,
    requestOptions: {
      body,
      query
    }
  });

/**
 * Bulk updates dashboard bookmarks for the current user in a specific customer.
 *
 * @param body Array of dashboard bookmark objects to update.
 * @param query Object containing the alias of the customer the bookmarks belong to.
 * @param apiOptions Optional options for runApi.
 * @returns Object containing customer alias and array of updated bookmarks.
 */
export const updateDashboardBookmarks = (
  body: DashboardBookmark[],
  query: DashboardBookmarksQuery,
  apiOptions: ApiOptions = {}
): Request<GetDashboardBookmarksResponse> =>
  runApi({
    method: 'PUT',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/dashboard-bookmarks',
    apiOptions,
    requestOptions: {
      body,
      query
    }
  });

/**
 * Deletes a specific dashboard bookmark for the current user in a specific customer.
 *
 * @param id ID of the bookmark to delete.
 * @param query Object containing the alias of the customer the bookmarks belong to.
 * @param apiOptions Optional options for runApi.
 * @returns ID of the deleted bookmark.
 */
export const deleteDashboardBookmark = (
  id: number,
  query: DashboardBookmarksQuery,
  apiOptions: ApiOptions = {}
): Request<number> =>
  runApi({
    method: 'DELETE',
    urlRoot: 'dashboardSinkUrlRoot',
    route: `/api/dashboard-bookmarks/${id}`,
    apiOptions,
    requestOptions: {
      query
    }
  });
