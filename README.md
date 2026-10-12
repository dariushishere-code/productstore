# Product Recommendation System (React)

سیستم پیشنهاد محصول با ویژگی‌های پیشرفته – تمرین HomeWork Front-end (React basic)

## ویژگی‌های پیاده‌سازی‌شده

### ویژگی‌های اصلی
1. **دریافت محصولات از FakeStoreAPI** – `https://fakestoreapi.com/products`
2. **نمایش محصولات مشابه** بر اساس دسته‌بندی هنگام انتخاب یک محصول
3. **فیلتر محدوده قیمت** (اسلایدر ۰ تا ۱۰۰۰ دلار)
4. **جستجو بر اساس نام محصول با Debounce** (۴۰۰ میلی‌ثانیه)
5. **ذخیره داده‌ها در LocalStorage** برای بارگذاری سریع‌تر (کش ۳۰ دقیقه‌ای)
6. **دسته‌بندی محصولات** بر اساس category

### ویژگی‌های پیشرفته (چالش‌ها)
6. **سبد خرید** – اضافه و حذف محصولات + نمایش تعداد
7. **ذخیره وضعیت در LocalStorage** – سبد خرید، فیلترها و جستجو بعد از رفرش حفظ می‌شوند
8. آماده برای دیپلوی روی **Vercel** یا **GitHub Pages**

## اجرا

```bash
npm install
npm run dev
```

## بیلد برای پروداکشن

```bash
npm run build
npm run preview
```

## دیپلوی روی Vercel

1. پروژه را به GitHub پوش کنید
2. به [vercel.com](https://vercel.com) بروید و پروژه را ایمپورت کنید
3. Framework Preset: Vite
4. Deploy

یا با CLI:

```bash
npm i -g vercel
vercel
```

## ساختار پروژه

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── Filters.jsx
│   ├── Cart.jsx
│   └── ProductDetail.jsx
├── hooks/
│   ├── useDebounce.js
│   └── useLocalStorage.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Git Workflow (طبق تمرین)

برای هر قسمت branch جداگانه ایجاد کنید و در نهایت `final` branch شامل کد کامل باشد:

```bash
git checkout -b feature/fetch-api
# ... پیاده‌سازی دریافت API
git checkout -b feature/similar-products
# ...
git checkout -b feature/price-filter
# ...
git checkout -b feature/search-debounce
# ...
git checkout -b feature/localstorage-cache
# ...
git checkout -b feature/category-filter
# ...
git checkout -b feature/shopping-cart
# ...
git checkout -b feature/persist-state
# ...
git checkout -b final
# کد نهایی
```
