export const imgUrl = (url: string) => process.env.REACT_APP_API_URL + 'static/' + url

// interface IQueries {
//   [key: string]: number | string
// }

// TODO: BIND INTERFACE
export const concatUrlWithQueries = (url: string, queries?: any) =>
  queries
    ? url +
      '?' +
      Object.keys(queries)
        .map((key) => key + '=' + queries[key])
        .join('&')
    : url
