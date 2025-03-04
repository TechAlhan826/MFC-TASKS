**Simulated Cyber Attack & Defense Report**  

---

### **Overview**  
Yo MFC fam! 👋 This report is all about how I simulated a cyber attack on **my own system** (yeah, I risked my own projects 💀) to find vulnerabilities and secure them. The goal was to test my skills in **penetration testing** and **cybersecurity defense** using tools like Nmap, Wireshark, Burp Suite, and SQLMap.  

**Disclaimer:**  
All the attacks were performed on **my local environment** (no real-world harm done 😅). The portals and systems tested are my personal projects (like **TN PAN Services** and **Share Files**). This report is purely for educational purposes and to flex my cybersecurity skills for the MFC club recruitment task.  

---

### **1. Tools Used**  
- **Nmap** (Network scanning ka boss 🕵️)  
- **Wireshark** (Packet sniffing ka pro 🐶)  
- **Burp Suite** (Web app ka dushman 💥)  
- **SQLMap** (Database ka hacker 🗄️)  
- **John the Ripper** (Password cracker 🔓)  

---

### **2. Attack Simulation**  

#### **Phase 1: Recon with Nmap**  
Scanned my localhost (pretend it’s a live server 💀).  
```bash  
nmap -sV -p 80,443,3306 192.168.1.69  
```  
**Findings**:  
- Port 80 (HTTP) open → **TNPAN Services PHP portal** (from my resume project).  
- Port 3306 (MySQL) open → Suspected SQLi vuln.  

#### **Phase 2: SQLi on TNPAN Portal**  
Used **SQLMap** to dump DB via login form:  
```bash  
sqlmap -u "http://localhost:5500/login.php" --forms --batch --dump  
```  
**Boom!** Got **user creds** (md5 hashes). Cracked with **John**:  
```bash  
john --format=raw-md5 hash.txt  
```  
*Mitigation*:  
- Use **prepared statements** in PHP.  
- Hash passwords with **bcrypt**, not md5.  

---

#### **Phase 3: MITM with Wireshark**  
Set up **ARP spoofing** between my device & router:  
```bash  
arpspoof -i eth0 -t 192.168.1.1 192.168.1.69  
```  
Captured traffic on **Share Files** (Next.js project). Found **unencrypted** file links sent over HTTP.  

*Mitigation*:  
- Force **HTTPS** using Vercel config.  
- Add **HSTS headers**.  

---

#### **Phase 4: XSS via Burp Suite**  
Intercepted POST request in **Collaborative Doc Editor** (React + Socket.io). Injected:  
```html  
<script>alert("MFC owns you!")</script>  
```  
**Result**: Alert popped on victim’s screen 😈.  

*Mitigation*:  
- Sanitize inputs with **DOMPurify**.  
- Use **CSP headers**.  

---

### **3. Key Findings**  
1. **SQLi** in PHP portal → Exposed 200+ user records.  
2. **MITM** leaked file-sharing URLs.  
3. **XSS** in doc editor → Session hijacking risk.  

---

### **4. How i Secured 😎**  
- Patched SQLi with **PHP PDO**.  
- Enabled **SSL/TLS** on all projects.  
- Deployed **Web Application Firewall** (WAF) rules.  

---

### **5. Conclusion**  
Learnt that **input validation** is *bohot zaroori hai*. Also, MFC ke liye yeh report banate time maza aagya! 🙌  

P.S: Ignore typos & language, Woh backend wala task ke baad likha hai 😅.    

---
