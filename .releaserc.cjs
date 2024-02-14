/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        releaseRules: [
          { type: "chore", release: "patch" },
          { type: "refactor", release: "patch" },
        ],
      },
    ],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/exec",
      {
        prepareCmd: "make build",
      },
    ],
    [
      // update version field in package.json
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      // commit package.json
      "@semantic-release/git",
      {
        assets: ["package.json"],
      },
    ],
    [
      // create a GitHub release with built assets
      "@semantic-release/github",
      {
        assets: [
          {
            path: "./dist/installr",
            label: "installr-${nextRelease.version}",
          },
        ],
      },
    ],
  ],
};
