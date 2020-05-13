const HOST_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://justfoodserver-env.eba-ajm3vhxu.us-west-2.elasticbeanstalk.com';

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
