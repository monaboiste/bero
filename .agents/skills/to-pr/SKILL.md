---
name: to-pr
description: >
  Create a GitHub Pull Request from the current branch.
  Use only when the user explicitly invokes the the skill or explicitly asks to run it.
compatibility: >
  Requires GitHub CLI (gh) authenticated with the target repository.
---

# Pull Request Generator

Create a pull request for the current Git repository with `git` and `gh`.

## Arguments

- Accept no arguments for a regular pull request.
- Accept `--draft` to create a draft pull request.
- Reject unknown arguments and briefly show the supported usage:
  - `/to-pr`
  - `/to-pr --draft`

## Preconditions

1. Read the current branch with `git branch --show-current`.
2. Do not create a PR from a detached HEAD or from the repository's default branch.
3. Determine the default/base branch using `gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name'`.
4. Check whether a PR already exists for the current branch with `gh pr view --json url,state,title 2>/dev/null`. If one
   exists, return its URL and do not create a duplicate.
5. Check `git status --short`. Warn about uncommitted changes because they will not be included. Continue using
   committed changes unless the user asks to stop. before pushing unless the user explicitly requested the complete
   create-and-push flow.

## Gather Change Context

Fetch remote metadata without changing working files:

```bash
git fetch origin <base-branch>
```

Inspect the complete branch delta against the merge base:

```bash
git log --oneline --decorate origin/<base-branch>..HEAD
git diff --stat origin/<base-branch>...HEAD
git diff --name-status origin/<base-branch>...HEAD
git diff origin/<base-branch>...HEAD
```

Use the diff itself as the primary source of truth. Use commit messages to understand intent, not as a substitute for
reviewing the changes. For a very large diff, inspect changed files selectively, prioritizing public behavior,
configuration, migrations, tests, and risky code paths.

Summarize:

- the user-visible or architectural change;
- why the change appears necessary;
- notable implementation decisions;
- tests added or modified;
- cleanup, refactoring, renames, or organizational changes;
- compatibility, migration, rollout, or review risks.

Do not invent motivations or test results. Clearly label anything inferred from the code.

## Prepare the pull request body

1. Read `.github/pull_request_template.md`.
2. Use the template as the exact structure of the pull request body. If no template exists, summarize all changes
   bullet-point format.
3. Fill it using the collected branch context.
4. Preserve headings, comments, checklists, and formatting from the template.
5. Remove or leave optional sections empty only when the template explicitly allows it.
6. Do not invent additional sections unless explicitly specified.

## Infer the Pull Request Title Convention

Inspect recent commit subjects from both the base branch and the current branch:

```bash
git log -n 30 --pretty=format:'%s' origin/<base-branch>
git log --pretty=format:'%s' origin/<base-branch>..HEAD
```

Infer the dominant repository convention. Examples:

- Conventional Commits: `type(scope): concise description`
- Ticket prefix: `ABC-123: concise description`
- Imperative sentence: `Add support for ...`

If Conventional Commits dominate, use a valid type such as `feat`, `fix`, `refactor`, `test`, `docs`, `build`, `ci`,
`chore`, or `perf`. Reuse a scope only when the changed area makes it clear. Do not add a scope merely to imitate one
isolated commit.

Keep the title concise, specific, and representative of the whole PR. Do not blindly copy the latest commit subject when
the branch contains multiple concerns.

## Find a Related GitHub Issue

Search for evidence in this order:

1. Issue number in the branch name, such as `123`, `issue-123`, or `feature/123-description`.
2. References in branch commit messages or changed documentation.
3. Open issues whose title and content closely match the branch changes, using `gh issue list` or `gh issue view`.

Validate every candidate with:

```bash
gh issue view <number> --json number,title,state,url,body
```

Link an issue only when the relationship is well supported.

- Use `Closes #<number>` only when the PR fully resolves the issue.
- Use `Related to #<number>` or the template's equivalent when the relationship is partial or informational.
- Do not attach an issue based only on a weak keyword match.
- If several issues are plausible, present them to the user instead of choosing arbitrarily.
- If no related issue exists, omit the reference or write `None`, according to the template.

## Propose Before Creating

Present:

1. Base and head branches.
2. Proposed PR title.
3. Proposed PR body in a Markdown code block.
4. Related issue and whether it will use `Closes` or `Related to`.
5. Whether the PR will be a draft.
6. Any warnings, including uncommitted files, missing tests, or inferred details.

Ask for approval or edits before running a GitHub write command. Skip this additional confirmation only when the user
explicitly asked to create the PR without review.

## Create the Pull Request

Write the approved body to a temporary file to avoid shell-quoting errors:

```bash
body_file="$(mktemp)"
cat > "$body_file" <<'PR_BODY'
<approved body>
PR_BODY
```

Create the PR:

```bash
gh pr create \
  --base <base-branch> \
  --head <head-branch> \
  --title '<approved title>' \
  --body-file "$body_file"
```

For `--draft`, add the `--draft` flag.

Always remove the temporary file after the command, including after failure.

Do not use `--fill`, because the title and body must follow the analyzed repository conventions and template.

## Final Response

After successful creation, return the pull request URL reported by `gh pr create`. Keep the response brief and include:

- the linked PR title;
- whether it is draft or ready for review;
- the base branch;
- the direct GitHub URL.

If creation fails, report the relevant `gh` error and do not claim that the PR was created.
