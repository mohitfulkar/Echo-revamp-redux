# Optimized Coding Rules

## Guidelines for Writing Optimized Code

### 1. *No Code in the Main Method*
   - The main method should only serve as an entry point to your application.
   - Delegate all processing logic to other methods or classes.
   - Keep the main method clean and minimal, such as:
     ```java
     public class Main {
         public static void main(String[] args) {
             Application.run(args);
         }
     }
     ```

### 2. *Modular Code*
   - Break down functionality into smaller, reusable methods or classes.
   - Follow the Single Responsibility Principle (SRP).

### 3. *Avoid Redundant Code*
   - Reuse existing methods or utilities wherever possible.
   - Leverage libraries and frameworks to avoid reinventing the wheel.

### 4. *Optimize Loops and Iterations*
   - Avoid nested loops where possible; replace them with optimized algorithms.
   - Use stream APIs or parallel processing for large data sets when appropriate.

### 5. *Efficient Data Structures*
   - Choose the right data structure based on the problem's requirements (e.g., HashMap for fast lookups, ArrayList for dynamic arrays).
   - Avoid using overly complex data structures for simple tasks.

### 6. *Lazy Initialization*
   - Initialize objects only when they are required.
   - Avoid unnecessary memory allocation.

### 7. *Error Handling*
   - Use proper exception handling to avoid unexpected crashes.
   - Always log errors with meaningful messages to aid debugging.

### 8. *Use Constants and Enums*
   - Replace magic numbers and string literals with constants or enums for better readability and maintainability.

### 9. *Code Reviews and Testing*
   - Perform regular code reviews to identify inefficiencies.
   - Write unit tests to ensure functionality and performance.

### 10. *Adopt Design Patterns*
   - Use design patterns (e.g., Singleton, Factory, Observer) where applicable to improve code scalability and readability.

### 11. *Avoid Premature Optimization*
   - Focus on writing clean, maintainable code first; optimize only when necessary.
   - Use profiling tools to identify bottlenecks.

### 12. *Use Logging, Not Printing*
   - Use logging frameworks (e.g., Log4j, SLF4J) instead of System.out.println for better control over log levels and outputs.

### 13. *Follow Coding Standards*
   - Adhere to language-specific best practices and style guides.
   - Use tools like Checkstyle or ESLint to enforce consistency.

## Benefits of These Rules
- Improved maintainability and readability.
- Better performance and scalability.
- Easier debugging and testing.
- Enhanced collaboration and code sharing.

---

Following these rules will ensure that your codebase remains clean, efficient, and scalable over time.

## 🚫 Direct Merge to Main Policy

### Purpose
The `main` branch is the primary branch of this repository, representing the stable and production-ready version of the codebase. To maintain its integrity, **direct merges into `main` are not allowed.**

### Why This Policy Exists
1. **Code Quality:** Ensures that all changes are reviewed and tested before being integrated.
2. **Collaboration:** Encourages team members to follow structured workflows for proposing and discussing changes.
3. **Stability:** Prevents accidental disruptions to the production environment.

### Workflow
Follow these steps to contribute changes to the project:

#### 1. **Create a Feature Branch**
   - Always start by creating a new branch from `main`.
   - Use a descriptive name for the branch. Examples:
     - `add-user-authentication`
     - `bugfix/fix-login-issue`
     - `hotfix/update-readme`

   ```bash
   git checkout main
   git pull origin main
   git checkout -b your-branch-name
   ```

#### 2. **Make Changes**
   - Commit changes with meaningful commit messages.
   - Follow the project's coding standards and conventions.

   ```bash
   git add .
   git commit -m "Descriptive message about the changes"
   ```

#### 3. **Push and Create a Pull Request (PR)**
   - Push your branch to the remote repository.

   ```bash
   git push origin your-branch-name
   ```

   - Open a Pull Request from your branch into `main`.
   - Add reviewers to the PR and include a clear description of your changes.

#### 4. **Code Review and Approval**
   - Address any feedback provided by reviewers.
   - Ensure all CI/CD checks pass before requesting approval.

#### 5. **Merge Approved PRs**
   - Once your PR is approved and passes all checks, it will be merged into `main` by a designated team member or automation.

### Rules
- **Never directly push to `main`.**
- **All changes must go through a Pull Request and be reviewed.**
- **Keep `main` deployable at all times.**

### Enforcing the Policy
- Git branch protections are enabled for `main` to prevent direct pushes.
- Automated checks, including CI pipelines, ensure code quality.
- A minimum of one (or more) reviews is required before merging.

### Exceptions
In case of emergencies, such as production-critical hotfixes:
1. Obtain explicit approval from a project lead.
2. Document all changes made directly to `main`.

---
