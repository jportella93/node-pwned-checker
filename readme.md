# Node pwned checker
Find if your password is in a cracked passwords list. Locally, without sending your password to a server.

## Usage
1. Download the latest SHA-1 pwned passwords list (ordered by prevalence) from https://haveibeenpwned.com/Passwords.

2. Install node modules:
```shell
$ npm i
```

3. Run the main script passing the password list and the password to check as env variables:
```shell
$ PASSWORDS_FILE='./pwned-passwords-sha1-ordered-by-count-v4.txt' PASSWORD='correcthorsebatterystaple' npm run main
```

4. See if your password has been pwned.
