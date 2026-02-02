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


# 🏋️ دليل المساهمة في مشروع Gym-SaaS

أهلاً بك في الفريق! لضمان جودة الكود واستقرار المشروع، نتبع نظام عمل صارم يعتمد على الـ **Pull Request (PR)**. يرجى ملاحظة أن الدفع المباشر (Direct Push) لفرع `main` مغلق تماماً.

---

## 🚀 نظام العمل (Workflow)

### 1. تحديث المشروع محلياً
قبل البدء في أي مهمة جديدة، تأكد أن فرع `main` عندك يحتوي على آخر التحديثات من السيرفر.
```bash
git checkout main
git pull origin main
2. إنشاء فرع جديد (Branch)
لا تعمل أبداً على فرع main مباشرة. قم بإنشاء فرع جديد باسم وصفي للمهمة مع استخدام الاختصارات التالية:

feature/ (للميزات الجديدة)

fix/ (لإصلاح الأخطاء)

docs/ (لتعديل الملفات التوضيحية)

refactor/ (لتحسين الكود وتنسيقه)

Bash
# مثال
git checkout -b feature/add-payment-gateways
3. تسجيل التغييرات (Commit)
اكتب رسائل الـ Commit بشكل واضح ومختصر يشرح ما قمت به.

Bash
git add .
git commit -m "feat: integrate Stripe for membership payments"
4. رفع الكود (Push)
ارفع الفرع الخاص بك إلى GitHub.

Bash
git push origin feature/add-payment-gateways
🔍 خطوات الـ Pull Request (PR)
بمجرد رفع الكود، اتبع الخطوات التالية لدمجه في الـ main:

فتح الـ PR: اذهب لصفحة المشروع على GitHub واضغط على "Compare & pull request".

شرح التغييرات: اكتب وصفاً واضحاً لما قمت بتعديله ولماذا، واذكر أي Issues مرتبطة.

طلب المراجعة (Review): قم بعمل Tag لزميل واحد على الأقل لمراجعة الكود.

تجاوز الاختبارات: تأكد من نجاح الـ Builds والاختبارات التلقائية (إن وجدت).

حل النقاشات: في حال وجود ملاحظات من المراجعين، يجب الرد عليها أو تعديل الكود و"إغلاق النقاش" (Resolve conversation) قبل الدمج.

الدمج (Merge): بعد الحصول على موافقة واحدة (1 Approval) على الأقل، استخدم خيار Squash and Merge للحفاظ على نظافة سجل الـ Git.

🛠 معايير الكود وقواعد عامة
السرية: لا ترفع ملفات .env أو أي مفاتيح API خاصة إطلاقاً.

التنسيق (Linting): يرجى التأكد من تشغيل الـ Linter قبل الـ Commit لتوحيد شكل الكود مع باقي الفريق.

النظافة: بعد دمج الـ PR، قم بحذف الفرع (Branch) الخاص بك سواء محلياً أو من على GitHub.