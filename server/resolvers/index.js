import { mergeResolvers } from '@graphql-tools/merge';

import categoryResolvers from './category.js';
import productResolvers from './product.js';
import jobResolvers from './job.js';
import postResolvers from './post.js'; 

const resolversArray = [categoryResolvers, productResolvers, jobResolvers, postResolvers];
const resolvers = mergeResolvers(resolversArray);

export default resolvers;
