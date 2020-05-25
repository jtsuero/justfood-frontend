const HOST_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://justfoodapi.com';

class Api {
  getBusinesses = searchParams => {
    return fetch(
      `${HOST_URL}/restaurants/?long=${searchParams.longitude}&lat=${searchParams.latitude}&keyword=${searchParams.keyword}&radius=${searchParams.radius}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      },
    ).then(res => res.json());
  };

  getBusinessPhotos = photoreference => {
    return fetch(
      `${HOST_URL}/restaurants/photos/?photoreference=${photoreference}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      },
    )
      .then(res => res.text())
      .catch(err => console.log(err));
  };

  getBusiness = businessId => {
    return fetch(`${HOST_URL}/restaurants/place/?businessId=${businessId}`, {
      method: 'get',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  getYelpLink = attributes => {
    return fetch(
      `${HOST_URL}/places/yelp/?name=${attributes.name}&address1=${attributes.address1}&city=${attributes.city}&state=${attributes.state}&zip_code=${attributes.zip}&phone=${attributes.phone}&lat=${attributes.lat}&lng=${attributes.lng}`,
      {
        method: 'get',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
      },
    ).then(res => res.json());
  };
}

export default new Api();
