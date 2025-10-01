# 🌐 Deployment Guide

This guide covers deploying the College Dashboard application to popular hosting platforms.

## Table of Contents
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Database (MongoDB Atlas)](#database-mongodb-atlas)
- [Environment Variables](#environment-variables)

---

## Database (MongoDB Atlas)

**Set this up first before deploying backend!**

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (Free tier available)

### 2. Configure Database Access
1. Go to **Database Access**
2. Add a new database user
3. Set username and password (save these!)
4. Grant **Read and Write** permissions

### 3. Configure Network Access
1. Go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
4. Or add specific IPs for better security

### 4. Get Connection String
1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/college-dashboard?retryWrites=true&w=majority`

---

## Backend Deployment (Render)

### 1. Prepare Backend for Deployment

Update `backend/server.js` to handle production:
```javascript
const PORT = process.env.PORT || 5000;
```

### 2. Deploy to Render

1. Go to [Render](https://render.com/)
2. Sign up/Login with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name:** `college-dashboard-api`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### 3. Add Environment Variables

In Render dashboard, add:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/college-dashboard
NODE_ENV=production
PORT=5000
```

### 4. Deploy

- Click **Create Web Service**
- Wait for deployment (5-10 minutes)
- Note your backend URL: `https://college-dashboard-api.onrender.com`

### 5. Seed Database

After deployment, use Render Shell or run locally:
```bash
# Update seed.js to use production MongoDB URI
node seed.js
```

---

## Frontend Deployment (Vercel)

### 1. Prepare Frontend

Update `frontend/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up/Login with GitHub
3. Click **Add New** → **Project**
4. Import your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3. Add Environment Variables

In Vercel project settings → Environment Variables:
```
VITE_API_URL=https://college-dashboard-api.onrender.com/api
```

### 4. Deploy

- Click **Deploy**
- Wait for build (2-5 minutes)
- Your app will be live at: `https://your-project.vercel.app`

---

## Frontend Deployment (Netlify)

### Alternative to Vercel

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up/Login with GitHub
3. Click **Add new site** → **Import an existing project**
4. Connect GitHub repository
5. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`

### Environment Variables

In Netlify site settings → Environment variables:
```
VITE_API_URL=https://college-dashboard-api.onrender.com/api
```

---

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/college-dashboard
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database is seeded with sample data
- [ ] Backend is deployed and accessible
- [ ] Backend health check works: `https://your-api.onrender.com/api/health`
- [ ] Frontend is deployed
- [ ] Frontend can connect to backend API
- [ ] Test all features:
  - [ ] View colleges
  - [ ] Search and filters work
  - [ ] Add to favorites
  - [ ] Submit reviews
  - [ ] Dark mode toggle

---

## Troubleshooting

### Backend Issues

**Render free tier sleeps after inactivity:**
- First request may take 30-60 seconds
- Consider upgrading or using a cron job to keep it awake

**Database connection timeout:**
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Frontend Issues

**API calls failing:**
- Check CORS configuration in backend
- Verify `VITE_API_URL` is correct
- Check browser console for errors

**Build fails:**
- Ensure all dependencies are in `package.json`
- Check Node version compatibility
- Review build logs for specific errors

---

## Custom Domain (Optional)

### Vercel
1. Go to project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to service settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## Monitoring & Maintenance

### Render
- View logs in dashboard
- Set up health checks
- Monitor usage

### Vercel/Netlify
- Analytics available in dashboard
- Automatic deployments on git push
- Preview deployments for pull requests

---

## Cost Considerations

**Free Tier Limits:**
- **MongoDB Atlas:** 512MB storage
- **Render:** 750 hours/month, sleeps after 15 min inactivity
- **Vercel:** 100GB bandwidth/month
- **Netlify:** 100GB bandwidth/month

**Upgrade if needed:**
- More storage/bandwidth
- Always-on backend
- Custom domains
- Better performance

---

**Your app is now live! 🎉**

Share your deployment URLs:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com`
