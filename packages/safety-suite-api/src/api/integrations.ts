import {Id} from '../baseTypes';

export function getProData(proNumber: string) {
  return {
    method: 'GET',
    url: '/api/integrations/proData',
    options: {
      query: {proNumber}
    }
  };
}

export function getCustomerStore(id: Id) {
  return {
    method: 'GET',
    url: '/api/integrations/customerStore',
    options: {
      query: {id}
    }
  };
}
