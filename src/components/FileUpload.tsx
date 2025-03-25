
import React, { useState } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface FileUploadProps {
  onUploadComplete?: (filePath: string) => void;
  bucketName?: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
}

const FileUpload = ({
  onUploadComplete,
  bucketName = 'verification_documents',
  acceptedFileTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp',
  maxSizeMB = 50
}: FileUploadProps) => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setError(null);
    
    if (!selectedFile) return;
    
    // Validate file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !isAuthenticated || !user) {
      setError('Please login and select a file first');
      return;
    }

    try {
      setUploading(true);
      
      // Since onUploadProgress is not supported, we'll use a simulated progress approach
      // Start a timer to simulate progress while upload is in progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          // Only increment progress up to 90% while waiting for actual completion
          return prev < 90 ? prev + 5 : prev;
        });
      }, 300);
      
      // Create a folder path using the user's ID
      const folderPath = `${user.id}/${new Date().getTime()}_${file.name}`;
      
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(folderPath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      // Clear the interval and set progress to 100% when upload completes
      clearInterval(progressInterval);
      setProgress(100);
      
      if (uploadError) {
        throw uploadError;
      }
      
      toast({
        title: "Upload successful",
        description: "Your document has been uploaded"
      });
      
      if (onUploadComplete && data?.path) {
        onUploadComplete(data.path);
      }
      
      // Reset state after a brief delay to show the 100% completion
      setTimeout(() => {
        setFile(null);
        setProgress(0);
      }, 1000);
      
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setError(error.message || 'Failed to upload file');
      toast({
        title: "Upload failed",
        description: error.message || 'There was a problem uploading your document',
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setProgress(0);
    setError(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-muted">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-center">
          Please log in to upload verification documents
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!file ? (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-muted hover:border-primary/50 transition-colors">
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept={acceptedFileTypes}
          />
          <label 
            htmlFor="file-upload" 
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          >
            <Upload className="w-10 h-10 text-muted-foreground mb-2" />
            <p className="text-base font-medium">Click to select a file</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports: {acceptedFileTypes.replace(/\./g, ' ')}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max size: {maxSizeMB}MB
            </p>
          </label>
        </div>
      ) : (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FileText className="w-6 h-6 mr-2 text-primary" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!uploading && (
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {uploading && (
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-right">{progress}%</p>
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-2 bg-destructive/10 rounded text-destructive text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              onClick={handleUpload} 
              disabled={uploading}
              className="flex items-center"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
