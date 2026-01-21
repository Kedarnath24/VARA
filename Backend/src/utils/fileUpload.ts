import { supabaseAdmin } from '../config/supabase';
import { v4 as uuidv4 } from 'uuid';

export const uploadToSupabase = async (
  file: Express.Multer.File,
  bucket: string,
  folder: string
): Promise<string> => {
  const fileExt = file.originalname.split('.').pop();
  const fileName = `${folder}/${uuidv4()}.${fileExt}`;

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

export const deleteFromSupabase = async (
  bucket: string,
  filePath: string
): Promise<void> => {
  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
};
