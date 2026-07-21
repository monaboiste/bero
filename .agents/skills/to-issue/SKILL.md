---
name: to-issue
description: >
  Create well-structured GitHub issues, reuse existing labels, and publish
  them directly using the GitHub CLI.
  Use only when the user explicitly invokes the the skill or explicitly asks to run it.
compatibility: >
  Requires GitHub CLI (gh) authenticated with the target repository.
---

# GitHub Project Issue Generator

## What I do

- Generate concise, well-structured GitHub issues.
- Create issues directly using the GitHub CLI (`gh issue create`).
- Reuse existing repository labels whenever possible.
- Apply one **Type** label and one or more **Area** labels.
- Produce clear titles and concise descriptions.
- Always explain the value of solving the issue.
- Avoid introducing new labels unless there is no suitable existing one.

## Workflow

1. Determine whether enough information exists to create the issue.
2. If essential information is missing, ask only for the minimum required detail.
3. Retrieve available labels:

   ```sh
   gh label list --limit 100
   ```

4. Select labels using these rules:
    - exactly one Type label
    - zero or more existing Area labels
    - reuse existing labels whenever possible
    - never invent a label if a close existing one already fits

5. Generate:

    - Title
    - Description
    - Value

6. Create the issue:

   ```sh
   gh issue create \
     --title "<title>" \
     --body "<generated body>" \
     --label "<label1>" \
     --label "<label2>"
   ```

7. Return:
    - issue number
    - issue URL
    - labels that were applied

## Issue format

### Title

Use a short imperative title.

Examples:

- Add dark mode toggle
- Fix broken image loading
- Refactor authentication service

### Body

```md
## Description

...

## Value

...
```

Keep the description concise. Always explain why the work is worth doing.

## Label selection

Always prefer existing repository labels.

Choose exactly one Type label:

- feature
- enhancement
- bug
- refactor
- chore

Choose any matching existing Area labels, for example:

- area:ui
- area:backend
- area:api
- area:architecture
- area:cms
- area:build
- area:i18n
- area:docs

If the repository uses a different naming convention, follow the repository convention instead of these examples.

## Rules

- Never create new labels.
- Never suggest new labels unless explicitly requested.
- Reuse existing labels whenever possible.
- Keep issues focused on a single change.
- Avoid implementation details unless they are necessary.
- Explain the expected outcome rather than prescribing the solution.
- Use Markdown.
- Prefer concise wording.
