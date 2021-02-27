// import url from "./URL";

// flatten 
export function flattenProducts(data) {
  return data.map((item) => {
    // claudinary
    let image = item.image.url;
    // return { ...item, image };
    // local set up no deployment
    // let image = `${url}${item.image.url}`;
    return { ...item, image };
  });
};
// helper function
export function featuredProducts(data) {
  return data.filter(item => item.featured === true );
};
// OR
// export function featuredProducts(data) {
//   return data.filter(item => { return item.featured === true });
// };

