## ⚙️ Setup & Run Project

### 1️⃣ Requirements

Make sure you have installed:

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn
- dotenv & dotenv-expand

---

### 2️⃣ Install Dependencies

```bash
npm install
```

### Env Config

```
# Base configs
PORT=5050

# Mongoose configs
MONGOOSE_SECRET_USERNAME=mongodb_your_username
MONGOOSE_SECRET_KEY=mongodb_secret_key
MONGOOSE_SECRET_URL=mongodb+srv://${MONGOOSE_SECRET_USERNAME}:${MONGOOSE_SECRET_KEY}@<cluster_config>
```

| Variable                     | Description         |
| ---------------------------- | ------------------- |
| `PORT`                     | Basic port          |
| `MONGOOSE_SECRET_USERNAME` | MongoDB username    |
| `MONGOOSE_SECRET_KEY`      | MongoDB secret key  |
| `MONGOOSE_SECRET_URL`      | MongoDB confgig url |

### Run the Application

#### Development mode

```
npm run dev 
```
