import { NextResponse } from 'next/server';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(request as any, (err, fields, files) => {
      if (err) {
        reject(NextResponse.json({ message: 'Error parsing form data' }, { status: 500 }));
      }

      const { full_name, phone_number, fin_number } = fields as Record<string, string>;
      const { upload_image } = files as Record<string, File>;

      if (!fin_number || !upload_image) {
        resolve(NextResponse.json({ message: "'finNumber' or 'upload_image' is missing." }, { status: 400 }));
      }

      const hashedFin = crypto.createHash('sha256').update(fin_number).digest('hex');
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
      const filePath = path.join(uploadsDir, upload_image.originalFilename || 'upload');

      fs.renameSync(upload_image.filepath, filePath);

      console.log('Saving to DB:', {
        hashedFin,
        full_name,
        phone_number,
        status: 'pending',
        timestamp: new Date(),
      });

      resolve(NextResponse.json({ message: 'Form submitted successfully!' }));
    });
  });
}
