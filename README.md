# Project name: ViewVerse

<!--VideoVibe (ViewVibe), VideoVerse (ViewVerse), StreamSpark, Tubex, Vidberry  -->

The video platform (kind of like YouTube).

Uses Next.js v15, React+React-dom v19, tailwind, sass, typescript.

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Start

First, install and run the development server:

```bash
powershell -c "irm bun.sh/install.ps1|iex"
bun dev
```

### Dependencies

```
bun add sass
bun add -D @trivago/prettier-plugin-sort-imports prettier
bun add lucide-react
bun add clsx
bun add path-to-regexp
bun add axios
bun add @tanstack/react-query
bun add dayjs
bun add tailwind-merge
```

### ToDo

---

- [x] root layout
- [x] UI menu/nav/sidebar
- [ ] UI block's heading/loader
  - [x] heading
  - [ ] SkeletonLoader:
    - [x] static count
    - [ ] count depends on @media
- [ ] metadata
  - [ ] проверить в будущем нужно ли переносить page.tsx в папку public
- [x] UI video card
- [ ] fonts (b.a VideoCard title)
- [ ] sideBar на мобилах изначально скрыт, при открытии - поверх контента, убрать flex column у
      просмотров и даты
- [x] Home page (ISR):
  - [x] trending videos
  - [x] explore(recommended) videos
- [ ] Search

<!--
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
