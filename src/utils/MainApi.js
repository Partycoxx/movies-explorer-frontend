class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((res) => Promise.reject(res.message));
    }
  }

  registerUser(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => this._response(res));
  }

  loginUser(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => this._response(res));
  }

  getCurrentUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => this._response(res));
  }

  updateCurrentUserData(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userData),
    }).then((res) => this._response(res));
  }
}

export const mainApiRequest = new MainApi({
  baseUrl: "https://api.locomotive.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});
