set -e

# yarn build

rm -rf gh-pages

mkdir gh-pages

cp -R ./build/. ./gh-pages

cd gh-pages

git init

git add -A

git commit -m "deploy"

git push -f git@github.com:Gammaalpha/react-enhanced-components.git main:gh-pages

cd ..

rm -rf gh-pages/
