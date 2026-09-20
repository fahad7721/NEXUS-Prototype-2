import { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, FileText, Loader2, X } from 'lucide-react';
import { validateDocumentFile } from '../utils/validation';

export interface UploadedDocumentMeta {
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageKey: string;
  verifiedAt: string;
}

interface SecureFileUploadProps {
  label: string;
  isRequired?: boolean;
  value?: UploadedDocumentMeta | null;
  onUploadSuccess: (meta: UploadedDocumentMeta) => void;
  onClear?: () => void;
  documentCategory?: string;
  hint?: string;
}

export function SecureFileUpload({
  label,
  isRequired = true,
  value,
  onUploadSuccess,
  onClear,
  documentCategory = 'CNIC_BFORM',
  hint = 'PDF, JPG, or PNG (Max 5MB)'
}: SecureFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Simulated Secure Pre-signed URL Upload Workflow
  const handleProcessFile = async (file: File) => {
    setLocalError(null);

    // 1. Client-side MIME type and size isolation check
    const validation = validateDocumentFile(file);
    if (!validation.valid) {
      setLocalError(validation.error || 'Invalid file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(15);

      // Step A: Request mock pre-signed storage URL
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(50);

      // Step B: Direct streaming upload simulation to storage bucket
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storageKey = `s3://sadiq-nexus-vault/${documentCategory.toLowerCase()}/${Date.now()}_${sanitizedName}`;

      await new Promise((resolve) => setTimeout(resolve, 300));
      setUploadProgress(100);

      // Successfully uploaded & verified
      const meta: UploadedDocumentMeta = {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        storageKey,
        verifiedAt: new Date().toISOString()
      };

      onUploadSuccess(meta);
    } catch (err: any) {
      setLocalError('Failed to upload file to secure storage. Please retry.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleProcessFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-300">
          {label} {isRequired && <span className="text-purple-400">*</span>}
        </label>
        <span className="text-[10px] text-zinc-400">{hint}</span>
      </div>

      {/* When already successfully uploaded */}
      {value ? (
        <div className="flex items-center justify-between p-3 bg-[#120c1d] border border-purple-800/60 rounded-xl">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-purple-900/40 text-purple-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-white truncate max-w-[220px] sm:max-w-sm">
                {value.fileName}
              </div>
              <div className="text-[10px] text-purple-300 flex items-center gap-2">
                <span>{formatFileSize(value.fileSize)}</span>
                <span>&bull;</span>
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Verified Scan Attached
                </span>
              </div>
            </div>
          </div>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
              title="Remove and upload different file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* Unified Styled Input Group */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`flex items-center gap-3 p-3 bg-[#160f24] border border-dashed rounded-xl transition-all ${
            isDragOver
              ? 'border-purple-400 bg-[#1c1230]'
              : 'border-purple-700/50 hover:border-purple-500'
          }`}
        >
          {isUploading ? (
            <Loader2 className="w-5 h-5 text-purple-400 flex-shrink-0 animate-spin" />
          ) : (
            <Upload className="w-5 h-5 text-purple-400 flex-shrink-0" />
          )}

          <div className="flex-1 min-w-0">
            {isUploading ? (
              <div className="space-y-1">
                <div className="text-xs text-purple-300 flex items-center justify-between">
                  <span>Encrypting & streaming to secure storage...</span>
                  <span className="font-mono text-[10px]">{uploadProgress}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                onChange={handleInputChange}
                className="block w-full text-xs text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer focus:outline-none"
              />
            )}
          </div>
        </div>
      )}

      {/* Validation or Upload Error */}
      {localError && (
        <div className="text-[11px] text-red-400 flex items-center gap-1.5 mt-1 bg-red-950/30 px-2.5 py-1 rounded-lg border border-red-900/40">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{localError}</span>
        </div>
      )}
    </div>
  );
}
