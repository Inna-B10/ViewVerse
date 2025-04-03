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
bun add framer-motion
bun add react-hook-form
bun add js-cookie
bun add -D @types/js-cookie
bun add react-google-recaptcha
bun add -D @types/react-google-recaptcha
bun add react-hot-toast
bun add @reduxjs/toolkit react-redux
bun add jose
bun add html-react-parser
```

### ToDo

---

- [x] root layout
- [x] UI menu/nav/sidebar
- [x] metadata
- [x] UI video card
- [x] fonts (b.a VideoCard title)
- [x] Home page (ISR):
  - [x] trending videos
  - [x] explore(recommended) videos
- [x] Search
- [x] сократить название канала, если слишком длинное
- [x] Page 404
- [x] game videos
- [x] VideoCard animations
- [x] UI field, button
- [x] UI login/registration form
- [x] Integrate recaptcha
- [x] log out button
- [x] user's avatar (channel avatar || default)
- [x] email confirmation
- [x] axios interceptors
- [x] test tokens
- [x] Middleware / verify token
- [x] FIX! redirect after logout(special on pages with auth)
- [x] Profile settings
  - [x] UI form
  - [x] functions: update text fields, upload avatar/header
- [x] channel page:
  - [x] subscribe button
  - [x] banner
  - [x] section my subscriptions

---

- [ ] FIXME logout on ChannelPage, Subscriptions (should redirect to home/auth)
- [ ] [FIXME] SUBSCRIPTIONS/STUDIO linkS do not see/remember isShowedSidebar
- [ ] [FIXME] no SUBSCRIPTIONS link not logged in (or disabled)
- [ ] sort/group videos on SubscriptionsPage
- [ ] button colors
- [ ] password reset option
- [ ] videoPage:
  - [x] similar videos block
  - [ ] styling
  - [x] collapse description of video
  - [ ] player:
    - [ ] current time
    - [ ] make progress bar clickable
    - [ ] video may not have quality options
    - [x] volume button
    - [x] implement theater mode
    - [ ] style @media: theater mode+open side bar
- [ ] ?component SidebarSubscriptions is needed?
- [ ] UI block's heading/loader
  - [x] heading
  - [ ] SkeletonLoader:
    - [x] static count
    - [ ] count depends on @media
- [ ] media query:sideBar на мобилах изначально скрыт, при открытии - поверх контента
<!-- - [ ] меню кнопка?, 1 колонка
- [ ] 540 - меню скрыто, 2 колонки
- [ ] 768 - меню скрыто, 3 колонки
- [ ] 1024 - меню открыто, 3 колонки
- [ ] 1280 - меню открыто, 4 колонки -->
- [ ] getTrendingVideos (2раза, на главной + трендинг). Так это серверный компонент?

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
