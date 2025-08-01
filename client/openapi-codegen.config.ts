import {
  generateReactQueryComponents,
  generateSchemaTypes,
  // generateFetchers,
} from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';
export default defineConfig({
  booking: {
    from: {
      relativePath: '../backend/src/gateway/swagger/BookingYml.openapi.yaml',
      source: 'file',
    },
    outputDir: 'src/queries',
    to: async (context) => {
      const filenamePrefix = 'booking';
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      // await generateFetchers(context, {
      //   filenamePrefix,
      //   schemasFiles,
      // });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
