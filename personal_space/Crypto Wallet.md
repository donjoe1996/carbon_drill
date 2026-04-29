---
title: Personal Crypto Wallet
tags:
  - Finance
created: 2026-04-29
---
> [!Passphrase]  
	>- The Passphrase is an advanced security feature that allows users to create hidden wallets under the mnemonic phrase.
	>- It serves as second-factor protection of the mnemonic phrase and is the ultimate protection against physical attacks such as the 5 dollar wrench attack.
	>- If somebody compromised your physical copy of the mnemonic phrase, they still would not be able to access your Passphrase-protected wallet unless they know the Passphrase.
	>- When you set a Passphrase in the wallet, it will create a brand-new and empty wallet under the mnemonic phrase.
	>- **Remember your Passphrase tightly.** Once your Passphrase is lost or forgotten, it will result in permanent loss of your assets stored in that Passphrase. No one can help to retrieve your assets back. 
	>- [**Passphrase**](https://safepalsupport.zendesk.com/hc/en-us/articles/360057783771-Passphrase?input_string=passpharse)



> [!Seed Phrase]  
>- A Mnemonic Phrase is also called Seed Phrase or Recovery Backup for a decentralized wallet. It is a list of words and proof of ownership of your crypto assets. Once someone gets hold of your mnemonic phrase, they can practically take full control of your assets.
>- **The mnemonic phrase is a private key that is not encrypted.** If someone did get hold oyour mnemonic phrase, it is equivalent to taking control of your crypto assets.
 >- [**Mnemonic Phrase (Seed Phrase/Recovery Backup)**](https://safepalsupport.zendesk.com/hc/en-us/articles/360057232772-Mnemonic-Phrase-Seed-Phrase-Recovery-Backup)


## 1. Metamask
- seedphrase: seedphrase split into two parts. First part in [google drive](https://docs.google.com/document/d/1DDFq3x2bxBiaJDVWG5qVgw7wvnD_ADlkb_nerHAxHxA/edit?usp=drive_link), second one in bitwarden.
- notes:
## 2. Safepal
- seedphrase: [google drive](https://drive.google.com/drive/folders/1Gq-nJLeLTGtrovSIoaGVXT9q0TEDgTRt?hl=id) and bitwarden
- PIN: 231126
- passphrase to switch from main to branch: qwerty
- wallet structure:
	-  **1. name: main-KAJ**
		- generated from: Mnemonic/seed phrase
		- Switch to main from branch wallet:
		- Open safepall hardwallet → settings → passphrase → set passphrase → no → input PIN (231126)

	- **2. name: branch-0C6**
		- generated from: Mnemonic/seed phrase + passphrase (qwerty)
		- Switch to branch wallet from main:
			- Open safepall hardwallet → settings → passphrase → set passphrase → yes → input PIN (231126) → enter passphrase (qwerty)