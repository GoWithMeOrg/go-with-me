This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### макет
https://www.figma.com/file/xHLRXNJzmKnedPXXOYNSCO/GWM-prototype?type=design&t=BpljJQLDle34bOcu-6
аналог фигмы для dev mode: https://pixso.net/


### вначале
```
git fetch
git merge
git pull
```
fetch - узнать появились ли изменения в репозитории. убедиться, что у меня последняя версия кода.
merge - попытка взять изменения (если нет конфликтов)

```
npm i
npm run dev
```
создались зависимости из package.json, создалась папка node_modules и файл package-lock.json
если все получилось, то сайт можно посмотреть в браузере: http://localhost:3000

далее нужно создать новую ветку и переключиться на нее
```
git checkout -b nameNewVetki
```
чтобы узнать на какой ветке находишься git branch текущая будет отмечена звездочкой *


### как закоммитить
```
git status 
git add . 
git status 
git commit -m "add/update/return file.js" 
git push --set-upstream origin ksyushinaVetka
```
потом надо создать пулл-реквест