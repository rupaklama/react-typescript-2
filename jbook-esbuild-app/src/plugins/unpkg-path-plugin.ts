import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  // this object is a plugin that works inside of es build
  return {
    name: 'unpkg-path-plugin',
    // This setup function is going to be call automatically by es build with a single ARGument - build
    // This build arg here represents the entire bundling process of finding some file, loading it up,
    // parsing it, transpiling it & joining bunch of files together.
    setup(build: esbuild.PluginBuild) {
      // onResolve event func is to locate the file index.js - first one to get bundle
      // actual path to particular file for ES build locate
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // filter is an object with regular expression
        // regular expression is how we can control when onResolve & onLoad actually executed
        // we might have different version of onResolve & onLoad that should run with different kind of files
        // for different features. We can control onResolve & onLoad execution by using filter regular expression.
        console.log('onResole', args);
        // namespace is use very similar how filter is use. It allows us to say here is a set of files and
        // we might want to apply some onResolve & onLoad functions to only those specific files.
        return { path: args.path, namespace: 'a' };
      });

      // load up the index.js file instead of file system in our hard drive
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        // serving this file to es build
        // es build will try to parse this file & tries to parse any 'import/require/export' statements
        // then es build will repeat above two steps (onResolve & onLoad)
        // once again for the file we are trying to import. ES build will resolve & load the file.
        if (args.path === 'index.js') {
          // to fetch module from unpkg.com
          return {
            loader: 'jsx',
            contents: `
      
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }
        // else {
        //   // here's the code you are looking for, don't go to our file system in our hard drive
        //   return {
        //     loader: 'jsx',
        //     contents: 'export default "hi there!"',
        //   };
        // }
      });
    },
  };
};
