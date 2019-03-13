const api = 'localhost:5001';

let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  Accept: 'application/json'
};

export const getAll = () => {
  fetch(`${api}/contacts`, { headers })
    .then(response => response.json())
    .then(response => response.contacts);
}

export const add = contact => {
  fetch(`${api}/contacts`, {
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  }).then(response => response.json());
}

export const remove = id => {
  fetch(`${api}/contact/${id}`, {
    method: 'delete',
    headers
  }).then(response => response.json()).then(response => response.contact);
}
