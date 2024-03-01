
import admin from "firebase-admin";
require("dotenv").config();
const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  universe_domain,
  databaseUrl,
} = process.env;

const serviceAccount = {
  type: `"${type}"`,
  project_id: `"${project_id}"`,
  private_key_id: `"${private_key_id}"`,
  private_key: `"${private_key}"`,
  client_email: `"${client_email}"`,
  client_id: `"${client_id}"`,
  auth_uri: `"${auth_uri}"`,
  token_uri: `"${token_uri}"`,
  auth_provider_x509_cert_url: `"${auth_provider_x509_cert_url}"`,
  client_x509_cert_url: `"${client_x509_cert_url}"`,
  universe_domain: `"${universe_domain}"`,
};

export const initialize_firebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: databaseUrl,
  });
};

export { admin };
