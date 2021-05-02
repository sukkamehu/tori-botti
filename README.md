# tori-botti 🤖
Finds automatically new listings in Tori.fi based on search title. Upon findings automatic HTML report of items to email(s) is sent.

### Download source
```git clone https://github.com/sukkamehu/tori-botti.git```

### Installation
```npm install```

### Running
```node app``` for basic terminal mode
<br />
```nohup node app.js >> app.log 2>&1 &``` to run as daemon in Unix based systems (MacOS, Linux, etc.)

### Configuration
Settings.json in root contains configuration. You may search multiple items easily by following https://tuki.tori.fi/hc/fi/articles/202419842-Hakuohjeita tutorial.
```
{
  "searching_for": "nojatuoli tai peräkärry ei keinutuoli",
  "region": "koko_suomi",
  "check_interval_mins": 30,
  "report_emails": ["mail1@gmail.com","mail2@hotmail.com"],
  "email_service": {
    "host": "mail.ee",
    "secure": true,
    "port": 465,
    "auth": {
      "user": "demo@mail.ee",
      "pass": "passu"
    }
  }
}
