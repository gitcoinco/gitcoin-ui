# Gitcoin UI

## Developing

### Importing ShadCN components

ShadCN requires import aliases to work, which, unfortunately, are different than the ones we use for storybook. If you want to add or update ShadCN components, visit these two files and update the path variables.

the files are:

```
tsconfig.json
tsconfig.node.json
```

and within those files, the paths definition:

```
    "paths": {
      "@/*": ["./lib/*"]
      // Swap this line with the above if you need to import more ShadCN components
      // "@/*": ["./src/*"]

    },
```

needs to look like:

```
    "paths": {
      // "@/*": ["./lib/*"]
      // Swap this line with the above if you need to import more ShadCN components
      "@/*": ["./src/*"]

    },
```
