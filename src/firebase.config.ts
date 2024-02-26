import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
require("dotenv").config();
// const {
//   type,
//   project_id,
//   private_key_id,
//   private_key,
//   client_email,
//   client_id,
//   auth_uri,
//   token_uri,
//   auth_provider_x509_cert_url,
//   client_x509_cert_url,
//   universe_domain,
// } = process.env;

const serviceAccount = {
  "type": "service_account",
  "project_id": "fabric-app-c8fde",
  "private_key_id": "a01b5f20ee82444cad511b15e0317424a33f3eb9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0gSHVrCky9Dct\nEEkesYXMtafC4ThdXscb6wjauvutiTV2ffcktH9KW+uTogTLaWQuYnygsWtj4fLC\nHmE70yPxIRYWJpOgs2l1t+ueE+j+srTMHY3HYKfJ5mbdLSBYIMAL9Rd4eeu9XgRs\nhEgRec4YnvzEggCk7bO8kVlF1/DdFMuA3Z7p8ck/ewN6tSRJN6H06xIYX0U+OPkZ\nWCPN1mmipIDFW9hYUNHLmB0blY/9B8cSJ2a57QWliozCT/R6jUZTGR/7x1E3Spfb\n0GKKbEtZ+ZhtYgV19RV8TE7UqyqoDoFhKns2v5CyEimqO+abKR+slrBF6Ea3yM9R\nMGeM9bAfAgMBAAECggEAG0MprhELmUOOFdimLTmYwNDASXckwTgbEIS7g0scehsF\ndSO/W87bLuBFQLixdVuHTa4trpjoDwpFqmYA6j07P3nE0Tb7CG7bQx6yj989S0Kz\nJeUM0Ivbq8CIfBK1wORpZ8+ZFObX4R5obU9pZyJOK3p6fjTjDgX3e0fkrjTYOeZf\nLAOFM5pQtsJH6umMKYSMXNCf8yv3eZYDDnKFNzeH0baSI9F/ossjSf0j4JjGRd0s\n6FRrEVy8KVObWCbaPEOlg4t/3K8XkO1P/rglLIPJWMeLPNyl7mpWNs5tIf9V7hBN\nJ9k0s5e67C9GfAmM2W608Z/D9+7bcdI59d5t6ocqKQKBgQDvMR8q8+ZDsOLHJqLi\n0hREUky6cVUZHSBL76INvcPr02Z+66HkURFuWpz/mOH2fg4+1ylbN3IVhyu9DJ8a\nHFOL6sDPFOYWo35on/gMXQf/FguUpEfj7KUMxPTY83GrYE3PdSEmNJz62C6WOg7w\n7llWT6mGN1fL4L3axby2din9ZQKBgQDBMESiCX07nOoMaqelkg09IiPwbh4Ykjvy\nCpMaMvNeZ9c5HAoo4nWI4QRGMyOQSh3VFzT1fR+B7qr4D+m0/Abnk5rOx9qlALoQ\nsosws7vJha0ZLlLubff0V1JklXFUGs45agFnXhwbNhXRpdCAqbYCPFRTKTDCjIx9\nulk9UaqRMwKBgGCkGTKyjrOE0WujeaZpONUN54Bg8AAQm47yyCgDJxiuNjhLngJw\nmrlalRpUO9/quHi9WDFJqqd2EL72TYYwMbVTaQmCKSC2eAlvsLnWELgIwS8SXRWC\n9IC/Ryos2h1i8K1EZttX4KEdHV2HIahItQHBd/4JeEigijTNNd0GyxpdAoGAcnKO\n5lOqzisaeLqikLLihun30pLZ34KaYryjAu1WQgJQfXPADRKDwNBVQOVA11UhMUEr\nTZePl+D1hjmfIWoBCSXnm0LIo+G3WPb9AKApyqwXrQhFdxzMvQMSO6ZQ2ht7OoYz\nSLJ3AiPbbzTFPcPMoKxu5ElNqqOrAzznay07WAMCgYEAggF5SvXq383Z6AiGqSC+\nCTBKZ9wmHa5+6m5f2wyefWMGVwK4s7OZkDZwx3IAdCTZjzXhKZbh59HNtPVA/BZL\n39Bpvf+7NgOvgnZA01/yiziFIif7LYB8D/yebQxuyFafxZtJ6mz8c5eadXNtGoDD\nSN2koiHJGGiRM7+KRjmx+5E=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-amo6o@fabric-app-c8fde.iam.gserviceaccount.com",
  "client_id": "116123419653466301012",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-amo6o%40fabric-app-c8fde.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

export const initialize_firebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://test.firebaseio.com",
  });
};

export {admin}
