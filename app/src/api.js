const HOST_URL = 'http://localhost:8000'

class Api {

  getBusinesses = (lat, long) => {
    return fetch(`${HOST_URL}/restaurants/?long=${long}&lat=${lat}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json());
  }

  getYelpLink = (name, address1, city, state, zip, phone, lat, lng) => {
    return fetch(`${HOST_URL}/places/yelp/?name=${name}&address1=${address1}&city=${city}&state=${state}&zip_code=${zip}&phone=${phone}&lat=${lat}&lng=${lng}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json());
  }

}

export default new Api();
