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

  getYelpLink = (attributes) => {
    return fetch(`${HOST_URL}/places/yelp/?name=${attributes.name}&address1=${attributes.address1}&city=${attributes.city}&state=${attributes.state}&zip_code=${attributes.zip}&phone=${attributes.phone}&lat=${attributes.lat}&lng=${attributes.lng}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => res.json());
  }

}

export default new Api();
