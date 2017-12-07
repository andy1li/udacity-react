import { schema,  } from 'normalizr';

export const post = new schema.Entity('posts');
export const posts = new schema.Array(post);

export const comment = new schema.Entity('comments');
export const comments = new schema.Array(comment);