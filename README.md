# Ocean Trip V2

一個以 iPhone 優先設計的「海生館親子兩日旅行」靜態網站，包含兩日行程、景點與海灘卡片、LocalStorage 打包清單、預算、深色模式與 Google 地圖。

## 開發

```bash
pnpm install
pnpm exec next dev
```

## GitHub Pages

推送到 `main` 後，GitHub Actions 會輸出靜態網站並部署到 Pages。首次使用時，請在 GitHub repository 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。

若要使用正式 Google Maps Embed API，請在 repository secrets 新增 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`；未設定時會以 Google Maps 的查詢嵌入作為安全備援。

請把 `.env.example` 的 `NEXT_PUBLIC_SITE_URL` 改成實際 Pages URL，讓社群分享的封面連結正確指向本站。
