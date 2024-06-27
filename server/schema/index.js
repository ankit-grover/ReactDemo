import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = mergeTypeDefs(loadFilesSync(`${__dirname}/*.graphql`));

export { typeDefs };
