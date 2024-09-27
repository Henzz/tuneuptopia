import axios from 'axios';
import environment from '../environment/enviroment';

const token = localStorage.getItem('token');
// const BASEURL = environment.DEV_URL;
const BASEURL = environment.PRO_URL;

const http = axios.create({
  baseURL: `${BASEURL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const filteredForm = (data: any) => {
  console.log('filtering form: ', data);
  // Create a new object to store the filtered key-value pairs
  const filteredFormData: { [key: string]: any } = {};

  // Iterate over the FormData object and only add non-empty values
  for (const [key, value] of Object.entries(data)) {
    console.log('old data: ', key, value);
    if (
      !value ||
      value == undefined ||
      value == 'undefined' ||
      value == '' ||
      value == null ||
      value == 'null'
    ) {
      continue; // Skip this iteration if the value is empty
    } else {
      // filteredFormData.append(key, value);
      filteredFormData[key] = value;
    }
  }

  for (const [key, value] of Object.entries(filteredFormData)) {
    console.log('new data: ', key, value);
  }

  return filteredFormData;
};

export { http, filteredForm };
