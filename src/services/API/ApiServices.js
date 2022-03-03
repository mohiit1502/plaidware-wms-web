// REST API SERVICES
export default {
  post: (API, slug, payload, headers) => headers ? API.post(slug, payload, {headers}) : API.post(slug, payload),
  get: (API, slug) => API.get(slug),
  delete: (API, slug) => {
    return API.delete(slug);
  },
  patch: (API, slug, payload) => {
    return API.patch(slug, payload);
  }
};
