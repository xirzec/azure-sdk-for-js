param (
  [Parameter(mandatory = $true)]
  $ArtifactPath,
  $NpmDevopsFeedRegistry = "https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-js@local/npm/registry/"
)

Set-StrictMode -Version 3
if (!(Test-Path -Path $ArtifactPath))
{
  Write-Error "Incorrect path to api-extractor artifacts. Path: $($ArtifactPath)"
  exit 1
}


$apiviewParser = "@azure-tools/ts-genapi@2.0.5"
Write-Host "Installing $($apiviewParser)"
npm install $apiviewParser --registry $NpmDevopsFeedRegistry
$installedPath = npm ls @azure-tools/ts-genapi -p
if (!(Test-Path -Path $installedPath))
{
  Write-Host "@Azure-tools/ts-genapi is not installed to $($installedPath)"
  exit 1
}

Write-Host "Setting working directory to $($installedPath)"
Set-Location $installedPath

$apiFiles = @(Get-ChildItem -Path $ArtifactPath -Recurse -Filter "*.api.json")
foreach ($apiPkgFile in $apiFiles)
{
  $apiFilePath = $apiPkgFile.FullName
  $FileName = Split-Path -Leaf $apiFilePath
  $OutDirectory = Split-Path -Path $apiFilePath
  $OutFileName = "$($FileName.split('_')[0])_js.json"
  $OutFilePath = Join-Path -Path $OutDirectory $OutFileName
  Write-Host "Converting api-extractor file $($apiFilePath) to APIview code file $($OutFilePath)"
  node ./dist/export.js $apiFilePath $OutFilePath
}
