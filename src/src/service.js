import axios from "axios";
import config from './config';

class Service {
  constructor() {
    if (!Service._instance) {
      let service = axios.create({
        baseURL: config.api
      });
      if (localStorage._token) {
        service.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage._token}`;
      }
      service.interceptors.response.use(this.handleSuccess, this.handleError);
      this.service = service;
      Service._instance = this;
    }
    return Service._instance;
  }

  addHeaderAuthorization() {
    this.service.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage._token}`;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = error => {
    switch (error.response.status) {
      case 401:
      case 400:
      case 422:
        break;
      default:
        this.redirectTo(document, "/404");
        break;
    }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path, params) {
    return this.service.request({
      method: "GET",
      url: path,
      responseType: "json",
      params: params
    });
  }

  put(path, payload) {
    return this.service.request({
      method: "PUT",
      url: path,
      responseType: "json",
      data: payload
    });
  }

  post(path, payload) {
    return this.service.request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload
    });
  }

  delete(path) {
    return this.service.delete(path);
  }
}

const instance = new Service();
Object.freeze(instance);

export default instance;

//         'Content-Type': 'multipart/form-data'

// headers: {
//   Authorization: `Bearer ${localStorage._token}`
// }
