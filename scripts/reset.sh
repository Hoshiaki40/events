#!/bin/bash

npx prisma migrate reset --skip-seed --skip-generate
npx prisma generate
npx prisma format
npx prisma db push
pnpm db:seed
# npx prisma studio