# 🏋️ Contributing to Gym-SaaS

Welcome to the development team! To maintain high code quality and ensure the stability of our production environment, we follow a standard **Pull Request (PR) workflow**. Direct pushes to the `main` branch are blocked.

---

## 🚀 Development Workflow

### 1. Sync Your Local Repository
Before starting any new task, ensure your local `main` branch is up to date with the latest changes from the server.
```bash
git checkout main
git pull origin main
2. Create a Feature Branch
We use a branching strategy to keep work organized. Create a branch with a descriptive name using the following prefixes:

feature/ (for new features)

fix/ (for bug fixes)

docs/ (for documentation changes)

refactor/ (for code cleanup)

Bash
# Example
git checkout -b feature/add-payment-gateways
3. Commit Your Changes
Write clear and concise commit messages. This helps everyone understand the history of the project.

Bash
git add .
git commit -m "feat: integrate Stripe for membership payments"
4. Push to GitHub
Push your branch to the remote repository.

Bash
git push origin feature/add-payment-gateways
🔍 Pull Request (PR) Process
Once your code is pushed, follow these steps to merge it into main:

Open the PR: Go to the GitHub repository and click "Compare & pull request."

Describe Your Changes: Clearly explain what you did and why. Mention any related issues.

Request a Review: Tag at least one other developer to review your code.

Pass Status Checks: Ensure all automated builds and tests pass.

Resolve Comments: If a reviewer asks for changes or starts a conversation, you must address the feedback and "Resolve" the conversation in GitHub before merging.

The Merge: Once you have at least 1 Approval, use the Squash and Merge option to keep our git history clean.

🛠 Coding Standards & Rules
No Secrets: Never commit .env files or hardcoded API keys.

Linting: Please run the linter before committing to ensure the style matches the rest of the project.

Clean Up: After your PR is merged, delete your local and remote feature branches to keep the repo tidy.