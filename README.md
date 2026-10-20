# StockFlow — ระบบเบิก–จ่ายอุปกรณ์แบบเรียลไทม์

เว็บภาษาไทย (HTML/CSS/JavaScript) ใช้ Firebase Authentication + Cloud Firestore และเผยแพร่ด้วย GitHub Pages

## เปิดใช้งาน
1. ไปที่ https://console.firebase.google.com/ สร้าง Project ใหม่
2. ที่ **Build > Authentication > Sign-in method** เปิด **Email/Password** แล้วไปที่ **Users > Add user** สร้างบัญชีสำหรับผู้ใช้งาน
3. ที่ **Build > Firestore Database** สร้างฐานข้อมูลแบบ production mode แล้วไป **Rules** วางเนื้อหาไฟล์ `firestore.rules` และกด Publish
4. ไปที่ **Project settings > Your apps > Web** ลงทะเบียน Web app แล้วคัดลอกค่า `firebaseConfig` ใส่ในไฟล์ `firebase-config.js` (แทนค่า REPLACE_ ทุกจุด)
5. ใน **Authentication > Settings > Authorized domains** เพิ่ม `<username>.github.io` หากยังไม่มี
6. สร้าง GitHub repository ใหม่ แล้วอัปโหลดไฟล์ทั้งหมด รวมถึง `.github/workflows/deploy.yml` (ต้องเปิดการแสดง hidden files ตอนอัปโหลด)
7. GitHub Repository > **Settings > Pages > Build and deployment > Source: GitHub Actions**; push ไป branch `main`
8. เข้าเว็บ `https://<username>.github.io/<repository>/` หลัง GitHub Actions deploy เสร็จ

## ทดลองบนเครื่อง
เนื่องจากโปรเจกต์ใช้ ES modules ต้องเปิดผ่าน HTTP server ไม่ใช่ดับเบิลคลิก `index.html`:
```bash
python -m http.server 8000
```
เปิด `http://localhost:8000` และเพิ่ม `localhost` ใน Firebase Authorized domains หากจำเป็น

## ความสามารถ
- รายการอุปกรณ์ + จำนวนขั้นต่ำ + แถบสถานะ
- รับเข้า/เบิกด้วย Firestore transactions (ตรวจสอบยอดซ้ำอีกครั้งระหว่างบันทึก)
- ฟังการเปลี่ยนแปลงแบบ realtime ผ่าน onSnapshot
- Login email/password, ประวัติพร้อมชื่อผู้ทำรายการ, ส่งออก CSV 200 รายการล่าสุด

## ข้อควรระวังด้านความปลอดภัย
- **ต้นแบบสำหรับทีมที่เชื่อถือร่วมกัน:** ผู้ใช้ที่ผ่านการยืนยันอีเมลทุกคนสามารถเพิ่มอุปกรณ์และปรับจำนวนคงเหลือได้ ไม่ใช่สิทธิ์แบบผู้ดูแล/ผู้เบิก
- Rules ปัจจุบันตรวจโครงสร้างข้อมูลและป้องกันการติดสต็อกลบในตัวแอป แต่ **ยังไม่รับประกันเชิงเซิร์ฟเวอร์ว่าการปรับยอดสต็อกทุกครั้งจะตรงกับประวัติ** หากมีผู้แก้ไขข้อมูลผ่าน SDK เอง หากใช้งานจริงที่ต้องตรวจสอบย้อนหลังอย่างเข้มงวด ควรย้ายรายการเบิก–จ่ายไป Cloud Functions และกำหนด role-based access control + security rules ที่เข้มงวด
- ไม่เปิด Firestore rules แบบ `allow read, write: if true` ขณะใช้งานจริง
- ไฟล์ config ของ Firebase Web SDK เปิดเผยต่อ browser ได้ตามปกติ; ห้ามนำ Firebase Admin private keys/Service Account keys ไปลง GitHub
- การส่งออก CSV เป็นเพียง **200 รายการล่าสุด** ตามการโหลดบนหน้าจอ ไม่ใช่ประวัติทั้งหมด
- การเพิ่มสินค้าเริ่มต้นไม่มี transaction log แยก ให้เริ่มต้นยอดเป็น 0 และใช้ฟังก์ชันรับเข้า หากต้องการประวัติเคลื่อนไหวครบ
- Firestore คิดค่าบริการตามปริมาณใช้งาน/แผนบริการ

## โครงสร้างไฟล์
- `index.html` — หน้าจอ
- `style.css` — ดีไซน์ responsive
- `app.js` — Firebase + การจัดการสต็อก
- `firebase-config.js` — จุดกรอกค่าการเชื่อมต่อ
- `firestore.rules` — กฎการเข้าถึงข้อมูล
- `.github/workflows/deploy.yml` — deploy บน GitHub Pages
