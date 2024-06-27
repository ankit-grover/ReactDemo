import fetch from 'node-fetch';

const API_URL = 'https://jsonplaceholder.typicode.com';

const resolvers = {
  Query: {
    posts: async () => {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    },
    post: async (_, { id }) => {
      const response = await fetch(`${API_URL}/posts/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch post with id ${id}`);
      }
      return response.json();
    },
  },
  Mutation: {
    addPost: async (_, { userId, title, body }) => {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      return response.json();
    },
  },
};

export default resolvers;
