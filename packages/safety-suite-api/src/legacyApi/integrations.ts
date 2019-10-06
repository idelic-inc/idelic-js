import {Id} from '../types';
import {LegacyApi} from './types';

export function getProData(proNumber: string): LegacyApi {
  return {
    method: 'GET',
    route: '/api/integrations/proData',
    requestOptions: {
      query: {proNumber}
    }
  };
}

export function getCustomerStore(id: Id): LegacyApi {
  return {
    method: 'GET',
    route: '/api/integrations/customerStore',
    requestOptions: {
      query: {id}
    }
  };
}
