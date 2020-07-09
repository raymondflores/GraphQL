import ApolloBoost, {
  gql,
  ApolloClient,
  InMemoryCache,
  HttpLink
} from 'apollo-boost';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000'
});
const client = new ApolloClient({
  cache,
  link
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

const getPosts = gql`
  query {
    posts {
      title
      author {
        name
      }
    }
  }
`;

client
  .query({
    query: getUsers
  })
  .then(response => {
    let html = '';

    response.data.users.forEach(user => {
      html += `
        <div>
          <h3>${user.name}</h3>
        </div>
      `;
    });

    document.getElementById('users').innerHTML = html;
  });

client
  .query({
    query: getPosts
  })
  .then(response => {
    let html = '';

    response.data.posts.forEach(post => {
      html += `
        <div>
          <h3>${post.title} by ${post.author.name}</h3>
        </div>
      `;
    });

    document.getElementById('posts').innerHTML = html;
  });
