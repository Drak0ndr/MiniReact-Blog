export const ROUTES = {
   "/": () =>  import("/src/pages/Home/Home.jsx"),
   '/login': () =>  import('/src/pages/Login/Login.jsx'),
   '/registration': () =>  import('/src/pages/Register/Register.jsx'),
   '/profile': () =>  import('/src/pages/Profile/Profile.jsx'),
   '/communities': () =>  import('/src/pages/Communities/Communities.jsx'),
   '/communities/:id': () =>  import('/src/pages/Community/Community.jsx'),
   '/post/create': () =>  import('/src/pages/CreatePost/CreatePost.jsx'),
   '/post/:id': () =>  import('/src/pages/Post/Post.jsx'),
   '/authors':() =>  import('/src/pages/Authors/Authors.jsx')
};
