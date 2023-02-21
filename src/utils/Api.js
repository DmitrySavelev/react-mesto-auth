import { configApi } from "./constants.js";

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;//https://mesto.nomoreparties.co/v1/cohort-54/
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error('ошибка');
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  editProfile(infoData) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(infoData)
    })
      .then(this._handleResponse)

  }

  addNewCard(cardsData) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardsData)
    })
      .then(this._handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    const selectMethod = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: `${selectMethod}`,
      headers: this._headers,
    })
      .then(this._handleResponse)
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._handleResponse)
  }

}

export const api = new Api(configApi);