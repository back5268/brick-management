module.exports = {
  apps: [
    {
      name: 'dev',
      script: './src/index.js',
      watch: true,
      exec_interpreter: './node_modules/.bin/babel-node',
      exec_mode: 'fork',
      max_memory_restart: '500M',
      max_restarts: 10,
      node_args: '--max-old-space-size=4096',
      env: {
        PORT: 3003,
        SERVER_HOST: 3003,
        MONGODB_URI: 'mongodb+srv://bachtv150902:1509back@cluster0.rahsnb7.mongodb.net/brick-management',
        REDIS_PORT: 17342,
        REDIS_HOST: 'redis-17342.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com',
        REDIS_PASSWORD: 'Z0SycgzP21QDA5wMAz1X6pO7gzb0V3uQ',
        JWT_SECRET_TOKEN: 'ef5e51c44b915c7166786a910c5ce0daa6b39c63',
        SESSION_SECRET_TOKEN: 'ef5e51c44b915c7166786a910c5ce0daa6b39c63',
        NODEMAILER_USERNAME: 'bachtv150902@gmail.com',
        NODEMAILER_PASSWORD: 'zsuk ggcu eewf jghr',
        FIREBASE_PROJECT_ID: 'hrmz-ef595',
        FIREBASE_PRIVATE_KEY_ID: 'ef5e51c44b915c7166786a910c5ce0daa6b39c63',
        FIREBASE_PRIVATE_KEY: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpgaeXZJYp+qs0
R6/TnSkcjbC2dymYFQSikJfAnw3VxsYGntidHoonH6muOiSEv3YWi2fgzLVdXFkr
ao8KMUM2KeaNvr5r4qsCzhh7DxvPXlnmjr2byw6ACC8nqyJh7Dfz7CrVl//52jJI
j777CbzIjAcqQybuz48UXPTfcpBM8nZHKc1xQmHbs5qBnqhTgdFsHfkiPmPbHLdU
FgU81oD2Ws2JKSHdOe6XUZ6I5yNNCS9Ui+u7yWMCq3UEvCwtyvZCkgedjb5zk/QT
JkFn/mPA7dCukyrQObrzcsOCkTjgj1QFkdZWODUnHvnTHPH1XQbdIWZDoX7nd0C1
1vUscF07AgMBAAECggEAPJScj4SBEJ7ImmY2hmRoYY6YRhY/lN2KKwmPWuXdnXYt
pwcVds4H5SSxUZXxIEqHS1ZmeVbgSO4s5lHurl9d3JlMD4PI7aj0oouC/1QuhcX8
TmTcijYfyA1kwQIuRx4T/0b8JhttfmAH0ZwiTvkzcd9t3iJi4z3mLopscAGzZfQ6
8ghshhC0lBhZAeKTnCHFCtX/ogLwUG6CjWqQOwi2ilHi5ROFJ4Z9eli9ec1mvZVK
Hv6yJ1PgOwsrR/i7s02Hrw2n7tcCkl932o2plo4JNILPcDz6dW9HnY6911glApYm
Tt3mS/cF+KhqdN92jCOX/O57K8p1P6R94PVknt3mSQKBgQDWBOimFHL4sNhuHjou
x+ZAqtZYFVzJqyM18GVppsPonrRZIiQm2/6jc2YpE3JGNMJRcSJDibQGsTJ2WhIa
N15zF1M3lGV0bqcOvbCDb8zme7SvmVxXHIpPupABzrwitkJ5RNJWscKdD/Xt/R/g
oscoHy0g85jztUIeCzpTWhtX6QKBgQDKwYP0iivXZS14/eB6MYE+swyG/Qm16XKL
z8hwMypPx64XmVzGo+sFRM4CwzHvdlkckRvhQldLDN5FXRdFodYyZz1yUyx1s27y
Bd61gIocEolkSfCUcoq2BWibnJXLZJS1DmxBqtEhdqHViiYEOk27oVRpkwOvYK7u
C8/TZrO5gwKBgDQzdE9182kHMXMCemyIo3eoc6l+ZGhoDqmMXh/75hLqCtEmy6yS
wjQ55HQmYxwOqErXDmVsw/VR6R4G8B1m3emyicCnuGtCxgqJZ/FXJqIdEEA4ZtZ0
hqPVvGREeYz56ZLMn4U3zGEk0HZg5BKVgYAewpIj+G2RC3Rqhqpn8v1pAoGAahEJ
4qdVf/yh6SWGhOXY4t/vsb41kkBpd9Je3LMnc0zWOeo0qoWdsMfprXBHcynKPDN9
Dj4SRGSa8lZckkSzNPLlJiV0oK4ZX+rKMtDnbwATd69md4HkJox1yNIFWr1nPcAp
ycB+Xq8cwgTfFl8ZwwoGiqQpzVkaqdTsB382jdkCgYEAoqKjXRrpmtpasIQK+dwU
/lb2mfHZlCiIYDhqN2ZMrMqL+eYlJ+3K07ZU3Nn81CzkEIVkdV3It9w/yW1WeuIM
pYWbfZBv5di3iGJEmWWNEn+9iBivgJq1afuTOquOf5QY855MbC8vS/1K3sU4I4ho
dPLHulsDH2XWdEboAWzZX3M=
-----END PRIVATE KEY-----`,
        FIREBASE_CLIENT_EMAIL: 'firebase-adminsdk-ntfeq@hrmz-ef595.iam.gserviceaccount.com',
        FIREBASE_CLIENT_ID: '106886429787974823091',
        FIREBASE_AUTH_URI: 'https://accounts.google.com/o/oauth2/auth',
        FIREBASE_TOKEN_URI: 'https://oauth2.googleapis.com/token',
        FIREBASE_AUTH_PROVIDER_X509_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
        FIREBASE_CLIENT_X509_CERT_URL:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ntfeq%40hrmz-ef595.iam.gserviceaccount.com',
        FIREBASE_UNIVERSE_DOMAIN: 'googleapis.com',
        FIREBASE_STORAGE_BUCKET: 'gs://hrmz-ef595.appspot.com'
      }
    }
  ]
};
