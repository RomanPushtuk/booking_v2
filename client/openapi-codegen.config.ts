import {
  generateSchemaTypes,
  generateFetchers,
} from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';
export default defineConfig({
  booking: {
    from: {
      relativePath: 'openapi.yaml',
      source: 'file',
    },
    outputDir: 'src/queries',
    to: async (context) => {
      const filenamePrefix = 'booking';
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
