@echo off
cd /d D:\SomiaWebsite

echo Clearing Vite and Babel caches...
rmdir /s /q node_modules\.vite 2>nul
rmdir /s /q node_modules\.cache 2>nul

echo Building...
call npm run build

for %%f in (dist\assets\index-*.js) do set JSFILE=%%f
echo JS file: %JSFILE%

echo Copying files to repo root...
copy /y dist\index.html index.html

for %%f in (assets\index-*.js) do git rm --cached "%%f" 2>nul
for %%f in (assets\index-*.css) do git rm --cached "%%f" 2>nul

for %%f in (dist\assets\index-*.js) do copy /y "%%f" "assets\"
for %%f in (dist\assets\index-*.css) do copy /y "%%f" "assets\"

echo Staging and pushing...
git add index.html assets\
git commit -m "Deploy: Coming Soon section - cache-busted build"
git push origin main

echo Done! Check somiaasim26.github.io/#/blog in 1-2 minutes.
pause
