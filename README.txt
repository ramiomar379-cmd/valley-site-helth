موقع وزارة الصحة - مدينة فالي
==============================

الملفات:
  index.html                       الموقع نفسه ولوحة التحرير
  netlify/functions/content.mjs    حفظ المحتوى على السيرفر (الكود من ADMIN_CODE)
  package.json                     مكتبة التخزين

الخطوات (مرة واحدة):
1) ارفع هذا المجلد كما هو على مستودع GitHub جديد (Add file > Upload files).
   تأكد أن مسار الدالة: netlify/functions/content.mjs
2) في Netlify: Add new site > Import an existing project > اختر المستودع > Deploy.
3) Site configuration > Environment variables > Add variable:
      ADMIN_CODE = REX-473
4) Deploys > Trigger deploy (لإعادة النشر بعد إضافة المتغير).
5) افتح الموقع، اضغط "دخول المسؤولين" في أسفل الصفحة، واكتب الكود.

التعديل لاحقًا: كل تعديل يُحفظ تلقائيًا ويظهر للجميع بعد تحديث الصفحة.
