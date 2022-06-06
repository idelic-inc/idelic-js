import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';
import {
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
 * Gets the default non-editable dashboard bookmarks for a specific customer.
 *
 * @param query Object containing the alias of the customer the bookmarks belong to.
 * @param apiOptions Optional options for runApi.
 * @returns Object containing customer alias and array of bookmarks.
 */
export const getDefaultDashboardBookmarks = (
  query: DashboardBookmarksQuery,
  apiOptions: ApiOptions = {}
): Request<GetDashboardBookmarksResponse> =>
  runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/dashboard-bookmarks/default',
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
): Request<DashboardBookmark> =>
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
 * Updates a specific dashboard bookmark for the current user in a specific customer.
 *
 * @param body Dashboard bookmark object to update.
 * @param query Object containing the alias of the customer the bookmark belongs to.
 * @param apiOptions Optional options for runApi.
 * @returns Object containing customer alias and updated bookmark.
 */
export const updateDashboardBookmark = (
  body: DashboardBookmark,
  query: DashboardBookmarksQuery,
  apiOptions: ApiOptions = {}
): Request<DashboardBookmark> =>
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
 * @returns Nothing.
 */
export const deleteDashboardBookmark = (
  id: number,
  query: DashboardBookmarksQuery,
  apiOptions: ApiOptions = {}
): Request<never> =>
  runApi({
    method: 'DELETE',
    urlRoot: 'dashboardSinkUrlRoot',
    route: `/api/dashboard-bookmarks/${id}`,
    apiOptions,
    requestOptions: {
      query
    }
  });
