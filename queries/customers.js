const cuid = require("cuid");
const filter = require("lodash/filter");
const { postsLists, commentsList } = require("../database/seeds");

// get list of posts
const getPosts = () => postsLists;

// get list of comments
const getComments = ({ postId }) => ({
  commentsList: filter(commentsList, { postId })
});

// get a single post
const getPost = ({ id }) => ({
  post: filter(postsLists, { id })[0]
});

// create a post
const createPost = async ({ author, title, content }) => {
  const id = cuid();
  await postsLists.push({
    id,
    author,
    title,
    content
  });
};

// create a comment
const createComment = async ({ postId, author, content }) => {
  const id = cuid();
  await commentsList.push({
    id,
    postId,
    author,
    content
  });
};

module.exports = {
  getPosts,
  getComments,
  getPost,
  createPost,
  createComment
};
