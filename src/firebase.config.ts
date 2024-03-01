const admin = require("firebase-admin");
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

const { privateKey } = JSON.parse(private_key!);

// const serviceAccount = {
//   type,
//   project_id,
//   private_key_id,
//   // private_key,
//   client_email,
//   client_id,
//   auth_uri,
//   token_uri,
//   auth_provider_x509_cert_url,
//   client_x509_cert_url,
//   universe_domain,
// };

export const initialize_firebase = () => {
  // admin.initializeApp({
  //   credential: admin.credential.cert({
  //     projectId: project_id,
  //     clientEmail: client_email,
  //     privateKey
  //   }),
  //   databaseURL: databaseUrl,
  // });
};

export { admin };
