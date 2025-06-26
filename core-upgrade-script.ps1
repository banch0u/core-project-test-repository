$folders = @(
  "C:\Users\fikre\repos\account\frontend",
  "C:\Users\fikre\repos\archive\frontend",
  "C:\Users\fikre\repos\contract\frontend",
  "C:\Users\fikre\repos\docflow\frontend",
  "C:\Users\fikre\repos\hr\frontend",
  "C:\Users\fikre\repos\lab\frontend",
  "C:\Users\fikre\repos\transport-frontend"
)

foreach ($folder in $folders) {
  Write-Host "`nProcessing: $folder" -ForegroundColor Cyan
  Set-Location $folder

  git checkout dev
  git pull
  npm i @banch0u/core-project-test-repository
  git add .
  git commit -m "pkg upgrade"
  git push
}
Set-Location "C:\Users\fikre\repos\core-project-test-repository"