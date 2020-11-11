# Cristal Express server

## Generate key pair

```bash
openssl genrsa -out <client_name>_private.pem 2048

openssl rsa -in <client_name>_private.pem -outform PEM -pubout -out <client_name>_public.pem
```
