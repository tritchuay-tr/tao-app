# เต๋าแห่งวัน · 道德經
PWA — ทำงานได้ offline, ติดตั้งบน home screen ได้

## โครงสร้างไฟล์
```
tao-pwa/
├── index.html        ← แอปหลัก (HTML + CSS + JS + ข้อมูล 81 บท)
├── manifest.json     ← บอก browser ว่านี่คือ PWA
├── sw.js             ← Service Worker (offline + cache)
├── icons/
│   ├── icon-192.png  ← App icon (Android, PWA)
│   ├── icon-512.png  ← App icon (Splash screen)
│   └── icon.svg      ← Vector source
└── README.md
```

## วิธี Deploy บน GitHub Pages (ฟรี)

### ขั้นตอนที่ 1 — สร้าง GitHub account
ไปที่ github.com → Sign up (ถ้ายังไม่มี)

### ขั้นตอนที่ 2 — สร้าง Repository ใหม่
1. กด New repository
2. ตั้งชื่อ: `tao-app` (หรือชื่ออื่นก็ได้)
3. เลือก Public
4. กด Create repository

### ขั้นตอนที่ 3 — อัปโหลดไฟล์
วิธีง่ายที่สุด — ลากไฟล์ทั้งหมดใส่ GitHub:
1. เปิด repository ที่สร้าง
2. กด "uploading an existing file"
3. ลากไฟล์ทุกไฟล์ในโฟลเดอร์นี้ใส่
4. กด Commit changes

### ขั้นตอนที่ 4 — เปิด GitHub Pages
1. ไปที่ Settings → Pages
2. Source: Deploy from a branch
3. Branch: main → / (root)
4. กด Save
5. รอ 1-2 นาที

### ขั้นตอนที่ 5 — URL ของแอป
```
https://[username].github.io/tao-app/
```
แชร์ URL นี้ให้คนอื่น หรือเปิดในมือถือแล้วกด "Add to Home Screen"

---

## วิธีติดตั้งบนมือถือ

### iPhone (Safari)
1. เปิด URL ใน Safari
2. กดปุ่ม Share (กล่องมีลูกศรขึ้น)
3. เลือก "Add to Home Screen"
4. กด Add

### Android (Chrome)
1. เปิด URL ใน Chrome
2. กดเมนู 3 จุด
3. เลือก "Add to Home screen"
4. กด Add

---

## ต้องการ Custom Domain?
แทนที่ URL จะเป็น github.io สามารถใช้ domain ตัวเองได้
เช่น taodaithailand.com
ค่าใช้จ่าย: domain ~300-500 บาท/ปี (ไม่มีค่า hosting เพิ่ม)
