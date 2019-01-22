const cuid = require("cuid");
const examplePostId = cuid();
// initial data
let postsLists = [
  {
    id: examplePostId,
    author: "Anonymous",
    title: "EA newest game",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's " +
      "standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make " +
      "a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, " +
      "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing " +
      "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions " +
      "of Lorem Ipsum."
  }
];

let commentsList = [
  {
    id: 1,
    postId: examplePostId,
    author: "Anonymous",
    content: "This is by far the best blog post for this game."
  },
  {
    id: 2,
    postId: examplePostId,
    author: "Anonymous",
    content: "A 5 stars post"
  }
];

module.exports = { postsLists, commentsList };
