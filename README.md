TODO
- Add auth via JWT token
- Add e2e tests for api

Next steps:

- npm install -D @openapi-codegen/{cli,typescript}
- npx openapi-codegen gen


http://localhost:3000 - frontend
http://localhost:3000/api - backend
http://localhost:3000/analytics - monitoring
http://localhost:3000/api-docs - swagger swagger:123


How to build project

1) From root run - bash build.sh (it is also required for local developemnt)

2) Then make cd ./backend, and pnpm run start


Run migrations 

cd backend
node ./src/migrations/run_migrations.js up
