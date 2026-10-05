# Repo Publish — Phase B transport (2026-10-06)

Everything below is one-time. The local repo is fully prepared: commits
made, secrets audited (clean), heavy data gitignored (~28 GB PSI raw +
1.5 GB anchor frames excluded), MIT license, stack-neutral (developer
selects, D8).

## Publish (Elias, ~5 minutes)

1. Install the GitHub CLI (one time):

   ```bash
   sudo pacman -S github-cli        # CachyOS/Arch
   gh auth login                    # follow the browser prompt
   ```

2. Optional but recommended — match GitHub's default branch name:

   ```bash
   cd /home/elias/Codes/NSAC
   git branch -m master main
   ```

3. Create the private repo and push everything:

   ```bash
   gh repo create gravifire --private --source=. --remote=origin --push
   ```

4. Invite the team (repeat per member, needs their GitHub username):

   ```bash
   gh api -X PUT repos/{owner}/gravifire/collaborators/<USERNAME> -f permission=push
   ```

5. Set your real git identity so future commits don't say `elias@local`
   (already set repo-locally to match the scaffold commit):

   ```bash
   git config user.email "<your-github-noreply-email>"
   ```

## Post-publish checks

- Fresh clone on the team device, then:

  ```bash
  cd Gravifier_research/R7_HANDOVER && python3 verify_bundle.py
  # expect 40/40 PASS
  ```

- `git ls-files | wc -l` on the clone — no `psidata/PSI-98/`, no
  `evidence_store/anchors/`, no `download_log.tsv`.

## Fallback (no GitHub CLI)

- Web: create an empty private repo named `gravifire` at github.com/new,
  then `git remote add origin git@github.com:<user>/gravifire.git && git push -u origin main`.
- No git host at all: `git archive --format=tar.gz -o /tmp/gravifire.tar.gz HEAD`
  ships the exact committed tree (~60 MB) via any file channel.

## What is deliberately NOT in the repo

Raw PSI data (re-downloadable via `psidata/download.py`), the 118,938-frame
anchor extraction (27 selected frames ship in the R7 bundle), any
credential (none exist in the tree — audited 2026-10-06), and any framework
choice (D8 is the developer's).
