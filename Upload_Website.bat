@echo off
title LIGHTINGSKY Website Upload

cd /d "%~dp0"

echo ============================
echo LIGHTINGSKY WEBSITE UPLOAD
echo ============================

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo This folder is not a Git repository.
    echo Open this script from your cloned LIGHTINGSKY website repository.
    pause
    exit /b 1
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo No GitHub origin is configured.
    set /p repo=Enter the correct LIGHTINGSKY GitHub repository URL: 
    if "%repo%"=="" (
        echo Repository URL was not entered.
        pause
        exit /b 1
    )
    git remote add origin "%repo%"
)

git add .

set /p msg=Enter Commit Message: 
if "%msg%"=="" set msg=Update LIGHTINGSKY website

git commit -m "%msg%"
if errorlevel 1 (
    echo Commit did not complete. Check whether there are changes to commit.
    pause
    exit /b 1
)

git branch -M main
git push -u origin main

echo.
echo LIGHTINGSKY upload finished. Check the Git output above for success.
pause
