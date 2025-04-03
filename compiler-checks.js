// compiler-checks.js
const { ESLint } = require("eslint");

async function runLint() {
  const eslint = new ESLint({
    extensions: [".js", ".jsx"],
  });

  const results = await eslint.lintFiles(["src"]);

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  const hasErrors = results.some(r => r.errorCount > 0);

  if (hasErrors) {
    console.error('\x1b[31m%s\x1b[0m', "❌ ESLint errors found:\n");
    console.error(resultText);
    process.exit(1); // ❌ stop dev/build if issues exist
  } else {
    console.log("\x1b[32m%s\x1b[0m", "✅ Lint passed with no errors.");
  }
}

runLint().catch((error) => {
  console.error("Failed to run ESLint:", error);
  process.exit(1);
});
