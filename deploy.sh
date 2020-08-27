# set -e

# yarn build-wp

# rm -rf production

# mkdir production

cd build

# cp ../build prod -r

cp ../{.gitignore,.npmignore} ./

cp ../deploy/* ./ -r

cp ../README.md ./

git init

git add -A

git commit -m "deploy"

git push -f git@github.com:Gammaalpha/react-enhanced-components.git master:production

cd ..

# rm -rf production/
