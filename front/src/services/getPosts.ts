const BASE_URL = 'http://localhost:3300';

export const getAllPosts = async() => {
  const response = await fetch(`${process.env.BASE_URL }/posts`);
  if (!response.ok) throw new Error('Unable to fetch posts');
  return response.json();
};

export const getPostById = async(id:string) => {
  const response = await fetch(
    `${ BASE_URL }/posts/${ id }`,
  );
  if (!response.ok) throw new Error('Unable to fetch post.');
  return response.json();

};

export const getPostsBySearch = async(search:string) => {
  const response = await fetch(`${ BASE_URL }/posts?search=${ search }`);
  if (!response.ok) throw new Error('Unable to fetch posts');
  return response.json();
};
