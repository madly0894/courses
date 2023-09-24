import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { PostRequest, PostResponse } from '../types';

interface InitialPostState {
   posts: PostResponse[];
}

interface PostCreatorState extends InitialPostState {
   addPost: (post: PostRequest) => void;
   updatePost: (post: PostResponse) => void;
   removePost: (postId: number) => void;
}

const usePostStore = create(
   devtools(
      persist(
         immer<PostCreatorState>((set, get, api) => ({
            posts: [],
            addPost: post =>
               set(state => {
                  state.posts.unshift({ id: state.posts.length + 1, ...post });
               }),
            updatePost: post =>
               set(state => {
                  const postIndex = state.posts.findIndex(item => item.id === post.id);
                  state.posts[postIndex].title = post.title;
                  state.posts[postIndex].description = post.description;
               }),
            removePost: postId =>
               set(state => {
                  const postIndex = state.posts.findIndex(item => item.id === postId);
                  state.posts.splice(postIndex, 1);
               }),
         })),
         {
            name: 'posts',
            storage: createJSONStorage(() => sessionStorage),
         },
      ),
      {
         enabled: true,
      },
   ),
);

export default usePostStore;
