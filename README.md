# GitHub Tools [![Codacy Badge](https://api.codacy.com/project/badge/Grade/96c93ff943a64cd4ae4ae7d031646272)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=vobys/github-tools&amp;utm_campaign=Badge_Grade)

Very simple tool made in javascript to batch creation of GitHub issues and copy labels from one repo to another.

## Configure

1.  Edit the `config.js` file and enter a valid GitHub account.
2.  Edit the `issues.json` file by adding the issues's JSONs to array. For example:

```json
[
  {
    "id": 1,
    "title": "Example 01",
    "body": "Example 01 description goes here.",
    "milestone": 1,
    "ignoredAttribute": {}
  },
  {
    "id": 2,
    "title": "Example 02",
    "body": "Example 02 description goes here.",
    "milestone": 1,
    "ignoredAttribute": {}
  },
  {
    "id": 3,
    "title": "Example 03",
    "body": "Example 03 description goes here.",
    "milestone": 1,
    "ignoredAttribute": {}
  }
]
```

For more details see the [GitHub API documentation](https://developer.github.com/v3/issues/#create-an-issue).

## Usage

To create the issues reported in the `issues.json` file, run the following command:

```bash
$ npm run createIssues
```

To copy the labels from one repository (`fromRepo`) to another (`toRepo`), run the following command:

```bash
$ npm run copyLabels
```
