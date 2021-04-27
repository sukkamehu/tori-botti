# tori-botti 🤖
Finds automatically new articles from Tori based on search title & sends automatically reports to emails.

### Download source
```git clone https://github.com/sukkamehu/tori-botti.git```

### Installation
```npm install```

### Running
Basic terminal mode
```node app```
Run as daemon in Unix based systems (MacOS, Linux, etc.)
```nohup node app.js >> app.log 2>&1 &```

### Configuration
Settings.json in root contains configuration
```
{
  "searching_for": "nojatuoli",
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
