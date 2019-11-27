/*
request: RequestInfo { 
  method: enum('GET' | 'POST' | 'PUT' | 'DELTE',
  headers: new Headers({Authorization: ACCESS_TOKEN}),
  mode: 'cors' as RequestMode,
  cache: 'default' as RequestCache,
}
*/

const URL_API = "http://35.195.25.70/api.php";

const http = <T>(request: RequestInfo): Promise<T> => {
  return new Promise((resolve, reject) => {
    let response: Response;
    fetch(request)
      .then(res => {
        response = res;
        return res.json();
      })
      .then(body => {
        if (response.ok) {
          resolve(body);
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
/*
export const get = async <T>(
  path: string,
  args: RequestInit = {
    method: "get"
  }
): Promise<T> => await http(new Request(URL_API(path), { ...args }));
*/
export const post = async <T>(
  body: any,
  args: RequestInit = {
    method: "post",
    body: JSON.stringify(body)
  }
): Promise<T> => await http(new Request(URL_API, args));
/*
export const put = async (path: string, body: {}): Promise<Response> =>
  await http(
    new Request(URL_API(path), {
      method: "put",
      body: JSON.stringify(body)
    })
  );

export const del = async (
  path: string,
  args: RequestInit = {
    method: "delete"
  }
): Promise<Response> => await http(new Request(URL_API(path), args));
*/
