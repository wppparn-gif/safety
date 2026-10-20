// คัดลอกค่าจาก Firebase Console > Project settings > Your apps > Web app
// API key ของ Firebase Web SDK ไม่ใช่รหัสลับ; ความปลอดภัยขึ้นอยู่กับ Auth และ Firestore Rules
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_API_KEY",
  authDomain: "REPLACE_WITH_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_WITH_PROJECT_ID",
  storageBucket: "REPLACE_WITH_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "REPLACE_WITH_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_APP_ID"
};
