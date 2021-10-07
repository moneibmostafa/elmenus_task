Lint Setup

1.  install eslint plugin in vscode
2.  install prettier code formatter plugin vscode
3.  press control comma t open global settings vscode
4.  search "format on save" --> make sure Format On Save is ticked
5.  search for "prettier" --> tick "Prettier: Single Quote"
6.  run "npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node"
7.  for nodejs apps run "npx install-peerdeps --dev eslint-config-airbnb-base"
8.  for react apps remove -base from 7) command

9.  create .prettierrc file at project root
10. if not installed --> install eslint globally "sudo npm i -g eslint"
11. run "eslint --init" at project root
12. configure settings u want
