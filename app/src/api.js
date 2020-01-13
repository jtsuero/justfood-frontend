const HOST_URL = 'http://localhost:8000'

class Api {

  getPhotos = (lat, long) => {
   return fetch(`${HOST_URL}/places/?long=${long}&lat=${lat}&limit=5`,
     {
       method: 'get',
       mode: 'cors',
       headers: {'Content-Type': 'application/json'},
     })
      .then((res) => res.json());
  }

}

export default new Api();
