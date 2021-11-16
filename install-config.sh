#!/bin/bash
cp ./node_modules/@cactus/srm-component/dist/config/.eslintignore ./
cp ./node_modules/@cactus/srm-component/dist/config/.prettierrc ./
cp ./node_modules/@cactus/srm-component/dist/config/.stylelintrc ./

ERROR='false'
while getopts "p" option; do
  case ${option} in
    p ) #ERROR
      ERROR='true'
    ;;
  esac
done
if ${ERROR}; then
    cp ./node_modules/@cactus/srm-component/dist/config/.eslintrc-error ./.eslintrc
else
    cp ./node_modules/@cactus/srm-component/dist/config/.eslintrc ./.eslintrc
fi