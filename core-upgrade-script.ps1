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
  
  if (Test-Path "package.json") {
    # Read package.json content
    $packageJson = Get-Content "package.json" -Raw
    
    if ($packageJson -match '"@banch0u/core-project-test-repository":\s*"file:.yalc/@banch0u/core-project-test-repository"') {
      Write-Host "Found yalc reference in package.json - removing it..." -ForegroundColor Yellow
      
      $updatedContent = $packageJson -replace '"@banch0u/core-project-test-repository":\s*"file:.yalc/@banch0u/core-project-test-repository",?\r?\n?', ''
      $updatedContent | Set-Content "package.json" -NoNewline
      
      Write-Host "Updated package.json" -ForegroundColor Green
    }
    else {
      Write-Host "No yalc reference found in package.json" -ForegroundColor Green
    }
  }
  else {
    Write-Host "package.json not found in $folder" -ForegroundColor Red
    continue
  }
  
  npm i @banch0u/core-project-test-repository
  git add .
  git commit -m "pkg upgrade"
  git push
}

Set-Location "C:\Users\fikre\repos\core-project-test-repository"