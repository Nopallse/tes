// Import modul yang diperlukan
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
import indexRouter from "./routes/index.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import bodyParser from "body-parser";


dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.static(path.join(process.cwd(), 'assets')));
app.use('/preline', express.static(path.join(process.cwd(), '/node_modules/preline/dist')));
app.use('/sweet', express.static(path.join(process.cwd(), '/node_modules/sweetalert2/dist')));

app.use('/images', express.static(path.join(process.cwd(), 'public/images')));
app.use('/data', express.static(path.join(process.cwd(), 'public/data')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gunakan router yang sesuai
app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/admin', adminRouter);

// Middleware untuk menentukan status login pengguna
app.use((req, res, next) => {
  // Cek apakah refreshToken ada di cookie
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    // Jika ada, anggap pengguna sudah login
    res.locals.userLoggedIn = true;
  } else {
    // Jika tidak, anggap pengguna belum login
    res.locals.userLoggedIn = false;
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
