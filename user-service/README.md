# User service
A mini service for user domain, consists of a REST api application with multiple worker program (WIP)

## REST api
To execute tests
```bash
npm t
```

To start a development build:
```bash
npm run local
```

To perform production build:
```bash
npm run build:rest
```

To execute the production build:
```bash
node -r dotenv/config --enable-source-maps .\dist\rest.js
```


## Kafka worker
Work in progress