require('es6-promise').polyfill();
require('isomorphic-fetch');
import { defaultsDeep } from 'lodash';
import config from '../config';
import { stringify } from 'query-string';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  if (response.json) {
    error.response = response.json();
  }
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(
    config.apiServer + url,
    defaultsDeep(options, {
      headers: {
        openId:
          http.config.openId ||
          typeof window === 'object' ||
          localStorage.getItem('openId')
      }
    })
  )
    .then(checkStatus)
    .then(parseJSON);
}

function getMethod(url, queryParam, options = {}) {
  const queryStr = queryParam ? `?${stringify(queryParam)}` : '';
  return request(url + queryStr, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });
}

function deleteMethod(url, queryParam, options = {}) {
  const queryStr = queryParam ? `?${stringify(queryParam)}` : '';
  return request(url + queryStr, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });
}

function putMethod(url, data = {}, options = {}) {
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options,
    body: JSON.stringify(data)
  });
}

function postMethod(url, data = {}, options = {}) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    ...options,
    body: JSON.stringify(data)
  });
}

function uploadMethod(url, data = new FormData(), options = {}) {
  return request(url, {
    method: 'POST',
    ...options,
    body: data
  });
}

export const http = {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
  upload: uploadMethod,
  config: {}
};
