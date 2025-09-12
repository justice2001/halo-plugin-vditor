# Repository Guidelines

## Project Structure & Modules
- Backend (Java/Gradle): `src/main/java/top/mczhengyi/vditor/**`.
- Resources: `src/main/resources/` (plugin.yaml, extensions, static assets, built console at `resources/console`).
- Console (Vue 3 + TS): `console/src/**` built to `src/main/resources/console` via rsbuild.
- Scripts: `download_dist.sh|.bat` fetch Vditor `dist/` into `src/main/resources/static`.

## Build, Test, and Dev Commands
- Backend build: `./gradlew build` (Windows: `./gradlew.bat build`). Runs frontend build first, then compiles Java.
- Install console deps: `./gradlew pnpmInstall` or `./gradlew installDepsForUI`.
- Console dev (watch): `pnpm -C console dev` or `rsbuild build --env-mode=development --watch`.
- Console build only: `pnpm -C console build`.
- Fetch Vditor dist: macOS/Linux `./download_dist.sh`; Windows `./download_dist.bat` (requires 7-Zip in PATH).
- Tests: `./gradlew test` (JUnit Platform). Currently no test files.

## Coding Style & Naming
- Global `.editorconfig`: LF, 4-space indent, max line length 120 (Java 100). Java 17.
- Java: packages `top.mczhengyi.vditor.*`; classes PascalCase (e.g., `VditorMdePlugin`), methods camelCase.
- Frontend: Vue 3 + TS. Use ESLint and Prettier (2-space indent, `printWidth=120`). Prefer PascalCase component files (e.g., `VditorMde.vue`), kebab-case utility files (e.g., `config-utils.ts`).

## Testing Guidelines
- Backend: place tests under `src/test/java/**`, name classes `*Tests.java`. Use JUnit 5 (`useJUnitPlatform`). Run with `./gradlew test`.
- Frontend: no test framework configured; add lightweight unit tests only if necessary and aligned with maintainers.

## Commit & Pull Request Guidelines
- Commit style: concise, imperative subject; use prefixes when helpful (`feat:`, `fix:`, `chore:`). Reference issues (e.g., `#123`).
- PRs must include: scope/summary, linked issue, screenshots or GIFs for UI changes, and clear test/verification notes.
- Keep changes focused; avoid unrelated refactors in the same PR.

## Security & Configuration Tips
- Do not load untrusted custom renderers; front-end injection executes code.
- For Windows asset download, install 7-Zip and ensure `7z` is in PATH.
- Halo dev: set `halo.plugin.runtime-mode=development` and add plugin path via `fixedPluginPath` in your Halo config when testing locally.

