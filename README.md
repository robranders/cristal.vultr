# Cristal Express server

## Generate key pair

```bash
openssl genrsa -out <client_name>_private.pem 2048

openssl rsa -in <client_name>_private.pem -outform PEM -pubout -out <client_name>_public.pem
```

## Database

### Time series data

Articles

-   [Stackexchange - How to store time series data](https://dba.stackexchange.com/questions/107207/how-to-store-time-series-data)

-   [Medium - How to efficiently store and query time-series data](https://medium.com/@neslinesli93/how-to-efficiently-store-and-query-time-series-data-90313ff0ec20#:~:text=Timescale%20is%20an%20extension%20built,retrieval%20when%20performing%20range%20queries.)
