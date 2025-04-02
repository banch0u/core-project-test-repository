const { ESLint } = require("eslint");
const path = require("path");

async function runLint() {
  const eslint = new ESLint({
    cwd: __dirname, // 👈 force ESLint to use the current folder where .eslintrc.js lives
  });
  const results = await eslint.lintFiles(["src/**/*.js"]);

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  const hasErrors = results.some(r => r.errorCount > 0);
  if (hasErrors) {
    console.error('\x1b[31m%s\x1b[0m', "❌ ESLint errors found:\n");
    console.error(resultText);
    process.exit(1);
  } else {
    console.log("\x1b[32m%s\x1b[0m", "✅ Lint passed");
  }
}

runLint().catch((error) => {
  console.error("Failed to run linting:", error);
  process.exit(1);
});
