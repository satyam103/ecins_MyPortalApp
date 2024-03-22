import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getDataParamUrl(method, urlType, profile = false) {
  const authDetails = await AsyncStorage.getItem('authDetails');
  const authResponse = JSON.parse(authDetails);
  const profile_uuid = authResponse.profile_uuid;
  const access_token = authResponse.access_token;
  // console.log(access_token)
  const organizationDetails = await AsyncStorage.getItem('organizationDetails');
  const organizationResponse = JSON.parse(organizationDetails);

  const selectedOrganization = await AsyncStorage.getItem('selectedOrg');
  const selectedOrgResponse = JSON.parse(selectedOrganization);

  for (let organization of organizationResponse) {
    if (organization.uuid == selectedOrgResponse.uuid) {
      organisation_uuid = organization.uuid;
    }
  }

  if (organisation_uuid == '' || organisation_uuid === undefined) {
    organisation_uuid = organizationResponse[0].uuid;
  }
  // https://myportal360.ecdesk-us.org/api/organisations/+organisation_uuid+/profile/+profile_uuid+/tasks
  let url = '';
  if (profile) {
    url =
      global.ApiUrl +
      '/api/organisations/' +
      organisation_uuid +
      '/profile/' +
      profile_uuid +
      '/' +
      urlType;
  } else if (urlType == 'journals') {
    url =
      global.ApiUrl +
      '/api/organisations/' +
      organisation_uuid +
      '/journals/' +
      profile_uuid;
  } else if (urlType == 'calendar') {
    url =
      global.ApiUrl +
      '/api/organisations/' +
      organisation_uuid +
      '/calendar/' +
      profile_uuid;
  } else if (urlType == 'articles') {
    url =
      global.ApiUrl +
      '/api/organisations/' +
      organisation_uuid +
      '/articles/' +
      profile_uuid;
  } else if (urlType == 'settings') {
    url = global.ApiUrl + '/api/settings/' + profile_uuid;
  } else {
    url =
      global.ApiUrl + '/api/organisations/' + organisation_uuid + '/' + urlType;
  }

  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);
  myHeaders.append('Cookie', 'logged_in=1');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  // console.log(url,"=====================================================")
  const data = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response, 'hello resp', url, '========', requestOptions);
      return response;
    })
    .catch((error) => {
      console.error(error, 'error get utility');
    });
  return data;
}

export async function postDataUrl(method, urlType, formData, profile = false) {
  const authDetails = await AsyncStorage.getItem('authDetails');
  const authResponse = JSON.parse(authDetails);
  const profile_uuid = authResponse.profile_uuid;
  const access_token = authResponse.access_token;

  const organizationDetails = await AsyncStorage.getItem('organizationDetails');
  const organizationResponse = JSON.parse(organizationDetails);

  const selectedOrganization = await AsyncStorage.getItem('selectedOrg');
  const selectedOrgResponse = JSON.parse(selectedOrganization);

  for (let organization of organizationResponse) {
    if (organization.uuid == selectedOrgResponse.uuid) {
      organisation_uuid = organization.uuid;
    }
  }

  if (organisation_uuid == '' || organisation_uuid === undefined) {
    organisation_uuid = organizationResponse[0].uuid;
  }

  let url = '';
  if (profile) {
    url =
      global.ApiUrl +
      '/api/organisations/' +
      organisation_uuid +
      '/profile/' +
      profile_uuid +
      '/' +
      urlType;
  } else if (urlType == 'journals') {
    url =
      global.ApiUrl +
      '/api/organisations/' +
      organisation_uuid +
      '/journals/' +
      profile_uuid +
      '/store';
  } else if (urlType == 'settings') {
    url = global.ApiUrl + '/api/settings/' + profile_uuid;
  } else {
    url = global.ApiUrl + '/api/profiles/' + profile_uuid + '/' + urlType;
  }

  var raw = JSON.stringify(formData);
  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);
  myHeaders.append('Cookie', 'logged_in=1');

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const data = await fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error, 'post utility error');
    });
  return data;
}

export async function getArticleDataUrl(urlType) {
  const authDetails = await AsyncStorage.getItem('authDetails');
  const authResponse = JSON.parse(authDetails);
  const profile_uuid = authResponse.profile_uuid;
  const access_token = authResponse.access_token;

  const organizationDetails = await AsyncStorage.getItem('organizationDetails');
  const organizationResponse = JSON.parse(organizationDetails);

  const selectedOrganization = await AsyncStorage.getItem('selectedOrg');
  const selectedOrgResponse = JSON.parse(selectedOrganization);

  for (let organization of organizationResponse) {
    if (organization.uuid == selectedOrgResponse.uuid) {
      organisation_uuid = organization.uuid;
    }
  }

  if (organisation_uuid == '' || organisation_uuid === undefined) {
    organisation_uuid = organizationResponse[0].uuid;
  }

  let url = '';
  url =
    global.ApiUrl +
    '/api/organisations/' +
    organisation_uuid +
    '/articles/' +
    profile_uuid +
    '/' +
    urlType;

  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + access_token);
  myHeaders.append('Cookie', 'logged_in=1');

  var getRequestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const data = await fetch(url, getRequestOptions)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error, 'get artical utility');
    });
  return data;
}
