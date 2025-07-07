# 📚 ระบบยืมคืนโน้ตบุ๊ก (Notebook Borrowing System)

ระบบจัดการการยืมและคืนอุปกรณ์โน้ตบุ๊กสำหรับสถาบันการศึกษา พัฒนาด้วย HTML, CSS, JavaScript (ES6+) และ Google Apps Script โดยแยกฝั่ง Frontend (GitHub Pages) และ Backend (Google Apps Script)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ คุณสมบัติหลัก

- 👤 **ระบบผู้ใช้** - ลงทะเบียน, เข้าสู่ระบบ (รองรับ Google Sign-In), จัดการข้อมูลส่วนตัว
- 🖼️ **อัปโหลดรูปโปรไฟล์** - รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB
- 📱 **Responsive Design** - ใช้งานได้ทั้งคอมพิวเตอร์และมือถือ
- 🔒 **ระบบความปลอดภัย** - ข้อมูลเก็บใน Google Sheets อย่างปลอดภัย
- 🌐 **PWA Support** - ติดตั้งเป็น App บนมือถือได้
- 🆓 **ใช้งานฟรี** - ไม่มีค่าใช้จ่าย 100%

## 🚀 Demo

[ดูตัวอย่างการใช้งาน](https://<your-github-username>.github.io/notebook-system/)

## 📋 โครงสร้างไฟล์ในโปรเจกต์

notebook-system/
├── index.html              # หน้าแรก
├── login.html              # หน้าเข้าสู่ระบบ (รองรับ Google Sign-In)
├── register.html           # หน้าลงทะเบียน
├── profile.html            # หน้าข้อมูลผู้ใช้
├── device_management.html  # จัดการอุปกรณ์
├── borrow_record_management.html # จัดการประวัติยืม-คืน
├── user_management.html    # จัดการผู้ใช้ (admin)
├── reports.html            # รายงาน
├── borrow_device.html      # หน้ายืมอุปกรณ์
├── manifest.json           # PWA Manifest
├── sw.js                   # Service Worker
├── README.md               # คู่มือนี้
├── devices.gs              # จัดการอุปกรณ์ (Apps Script)
├── users.gs                # จัดการผู้ใช้ (Apps Script)
├── borrow_records.gs       # จัดการประวัติยืม-คืน (Apps Script)
├── auth.gs                 # ระบบยืนยันตัวตน (Apps Script)
├── main.gs                 # Entry point (Apps Script)
├── utils.gs                # Utilities (Apps Script)
├── drive_manager.gs        # จัดการไฟล์ใน Google Drive (Apps Script)
├── sheets_manager.gs       # จัดการ Google Sheets (Apps Script)
├── rate_limit_service.gs   # ระบบจำกัดอัตราการใช้งาน (Apps Script)
├── otp_service.gs          # ระบบ OTP (Apps Script)
├── tests.gs                # Unit Tests (Apps Script)
└── manifest.json           # Apps Script Manifest

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **File Storage**: Google Drive
- **Hosting**: GitHub Pages
- **Authentication**: Google OAuth2 (Google Sign-In)

## 📦 การติดตั้งและใช้งาน

### 1. ตั้งค่า Google Apps Script (Backend)

1. ไปที่ [script.google.com](https://script.google.com)
2. สร้างโปรเจกต์ใหม่
3. อัปโหลดไฟล์ .gs ทั้งหมด (เช่น devices.gs, users.gs, main.gs ฯลฯ)
4. อัปโหลดไฟล์ manifest.json (แทนที่ของเดิม)
5. บันทึกโปรเจกต์
6. Deploy เป็น Web App:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. กด Deploy และคัดลอก **Web app URL**

### 2. ตั้งค่า Google OAuth2 (Google Sign-In)

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้าง Project ใหม่ (หรือใช้ Project เดิม)
3. ไปที่ **APIs & Services > Credentials**
4. กด **Create Credentials > OAuth client ID**
5. เลือก **Web application**
6. กำหนด **Authorized JavaScript origins** เป็น URL GitHub Pages ของคุณ เช่น:
   - `https://<your-github-username>.github.io`
7. กำหนด **Authorized redirect URIs** เป็น URL หน้าเว็บ เช่น:
   - `https://<your-github-username>.github.io/`
8. กดสร้าง จะได้ **Client ID**

### 3. ตั้งค่า Frontend (GitHub Pages)

1. แก้ไขไฟล์ HTML (เช่น login.html) ให้เพิ่ม Google Sign-In:
   ```html
   <script src="https://accounts.google.com/gsi/client" async defer></script>
   <div id="g_id_onload"
        data-client_id="YOUR_GOOGLE_CLIENT_ID"
        data-callback="handleCredentialResponse">
   </div>
   <div class="g_id_signin" data-type="standard"></div>
   <script>
   function handleCredentialResponse(response) {
     fetch('YOUR_APPS_SCRIPT_API_URL', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ id_token: response.credential })
     })
     .then(res => res.json())
     .then(data => {
       if (data.success) {
         // login สำเร็จ
       } else {
         // login ไม่สำเร็จ
       }
     });
   }
   </script>
   ```
2. แก้ไขตัวแปร `SCRIPT_URL` ในทุกไฟล์ HTML ให้ตรงกับ Web App URL ที่ได้จาก Apps Script
3. อัปโหลดไฟล์ทั้งหมดขึ้น GitHub Repository ของคุณ
4. ไปที่ **Settings > Pages** ใน GitHub Repository
5. เลือก Source: **Deploy from a branch** (main หรือ master)
6. รอระบบ deploy และนำ URL ที่ได้ไปใช้

### 4. ทดสอบระบบ

- เปิดหน้าเว็บ GitHub Pages ที่ deploy แล้ว
- ทดสอบ Google Sign-In และการเชื่อมต่อกับ Apps Script

## 🎯 การใช้งาน

### สำหรับผู้ใช้ทั่วไป
- ลงทะเบียน: กรอกข้อมูลส่วนตัวและอัปโหลดรูปโปรไฟล์
- เข้าสู่ระบบ: ใช้ Google Sign-In (อีเมล Gmail)
- จัดการข้อมูล: แก้ไขข้อมูลส่วนตัวได้ตลอดเวลา

### สำหรับผู้ดูแลระบบ
- ดูข้อมูลใน Google Sheets
- จัดการสิทธิ์ผู้ใช้
- ดูรายงานการใช้งาน

## 📊 โครงสร้างข้อมูล (Google Sheets)

| คอลัมน์ | ประเภท | คำอธิบาย |
|---------|--------|----------|
| id | String | รหัสผู้ใช้ (UUID) |
| titlePrefix | String | คำนำหน้าชื่อ |
| firstName | String | ชื่อจริง |
| lastName | String | นามสกุล |
| position | String | ตำแหน่ง (อาจารย์/นักศึกษา) |
| department | String | สาขาวิชา |
| studentId | String | รหัสนักศึกษา/รหัสตำแหน่ง |
| email | String | อีเมล |
| phone | String | เบอร์โทร |
| profileImageUrl | String | URL รูปโปรไฟล์ |
| userStatus | String | สถานะผู้ใช้ |
| createdAt | Date | วันที่สร้าง |
| updatedAt | Date | วันที่อัปเดตล่าสุด |

## 🔧 การแก้ไขปัญหา

- ตรวจสอบ SCRIPT_URL ว่าถูกต้องหรือไม่
- ตรวจสอบ Google Drive permissions หากรูปภาพไม่แสดง
- ตรวจสอบ Google Apps Script permissions หากข้อมูลไม่บันทึก
- เปิด Developer Tools (F12) ดู Console สำหรับข้อผิดพลาด

## 🔐 ความปลอดภัย

- ข้อมูลเก็บใน Google Sheets ที่ปลอดภัย
- ไม่มีการเก็บรหัสผ่าน (ใช้ Google Sign-In)
- การยืนยันตัวตนผ่านอีเมล Gmail
- ไม่มีการแชร์ข้อมูลกับบุคคลที่สาม

## 📱 PWA Features

- ติดตั้งเป็น App บนมือถือได้
- ทำงานแบบ Offline (บางส่วน)
- โหลดเร็วด้วย Service Worker
- Shortcuts ไปหน้าสำคัญ

## 🎨 การปรับแต่ง

- เปลี่ยนสีธีม: แก้ไขใน Tailwind CSS classes
- เพิ่มสาขาวิชา: แก้ไขใน register.html และ profile.html
- เปลี่ยนโลโก้: แก้ไขใน manifest.json

## 📈 การพัฒนาต่อ

- ระบบแจ้งเตือน
- รายงานสถิติ
- ระบบ QR Code
- การส่งอีเมลอัตโนมัติ
- ระบบจองล่วงหน้า

## 🤝 การมีส่วนร่วม

1. Fork โปรเจกต์
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไป Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request
