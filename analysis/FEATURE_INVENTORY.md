# Feature inventory and initial analysis

This file documents the extracted contents of NewProject.zip and a first-pass mapping to the Spring Boot + PostgreSQL application to be implemented in this branch.

Repository: abhayborde47-del/abc
Branch: feature/springboot-postgresql-react

Summary of contents (selected, representative):
- index.php -> redirects to login.php (app entrypoint)
- login.php, logout.php (authentication pages)
- password_reveal_migration.sql, extra_entry_migration.sql (SQL migration files)
- assets/css/style.css
- assets/js/reveal_password.js
- admin/ (many files): dashboard.php, add.php, save.php, update.php, add_plan_actual.php, edit_plan_actual.php, download_plan_actual.php, attendance_upload.php, download_day_plan.php, history.php, queries.php, delete.php, view.php, etc.
- user/: day_plan.php, add_plan_actual.php, history.php, add_attendance.php, add_product.php, download_history.php, view_plan_actual.php, delete_plan_actual.php, cb_suggestions.php, queries.php, etc.
- Storeuser/: add_shortage.php, queries.php, download_shortage.php, view_shortage.php, save_status.php, etc.
- Adiuser/: dashboard.php, ...

Initial observations and constraints:
1. The PHP app is a file-per-endpoint monolith with SQL embedded in many pages. We will reconstruct the schema by locating SQL statements in the PHP files and using the two SQL dump files as sources of truth. Some SQL may be MySQL-specific and require conversion to PostgreSQL.
2. Authentication appears to be custom session-based. We'll migrate to Spring Security with secure password hashing (BCrypt) and adapt existing roles (admin, user, storeuser, adiuser) to role-based access.
3. File uploads, downloads, and Excel import/exports exist and will be implemented using Spring Boot Multipart support and Apache POI (or similar) for Excel.
4. Static assets and CSS should be ported to the frontend to preserve look-and-feel. We'll extract CSS/JS files from the ZIP and reuse/translate them into the React app.

Planned database mapping approach:
- Step 1: Search all PHP files for SQL statements (SELECT/INSERT/UPDATE/DELETE) and extract column names and table names.
- Step 2: Inspect the SQL migration files in the ZIP and translate DDL to PostgreSQL dialect where needed.
- Step 3: Create Flyway migrations in /backend/src/main/resources/db/migration/ for PostgreSQL.
- Step 4: Implement JPA entities mirroring the tables, and repositories + services.

Immediate next steps (this branch):
1. Extract NewProject.zip into a working workspace and produce a complete list of PHP files and their SQL usage. (Done partially during repo inspection.)
2. Add Spring Boot + Maven backend skeleton and Vite + React frontend skeleton in /backend and /frontend.
3. Build authentication (login/logout) end-to-end with React -> REST -> Spring Security -> PostgreSQL.
4. Iteratively implement modules: admin, user, Storeuser, Adiuser, preserving UI design and workflows.

Notes about testing and verification:
- I will not merge into main or modify the original PHP code. All new code will be committed to feature/springboot-postgresql-react.
- I will document exact steps to run the backend and frontend in the README that will be added to /backend and /frontend and update top-level README with instructions.

Signed-off-by: GitHub Copilot
