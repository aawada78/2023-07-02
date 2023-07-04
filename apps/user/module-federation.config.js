module.exports = {
  name: 'user',
  exposes: {
    './Module': 'apps/user/src/app/remote-entry/entry.module.ts',
  },
};
