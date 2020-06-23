# set -e

yarn build-wp

rm -rf production

mkdir production

cd production

cp ../build prod -r

cp ../{.gitignore,.npmignore} ./

cp ../deploy/* ./ -r

git init

git add -A

git commit -m "deploy"

git push -f git@github.com:Gammaalpha/react-enhanced-table.git master:production

cd ..

rm -rf production/
