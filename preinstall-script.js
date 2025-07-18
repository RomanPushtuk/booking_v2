/**
 * Do NOT allow using `npm` or `yarn` as package manager.
 */
if (process.env.npm_execpath.indexOf('pnpm') === -1) {
  console.error("You must use 'pnpm' to install dependencies: \n");
  process.exit(1);
}
