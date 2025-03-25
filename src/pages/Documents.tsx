
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FileText, Trash2, Download, AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import FileUpload from '@/components/FileUpload';
import Header from '@/components/Header';

interface FileObject {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  size: number;
  path: string;
}

const Documents = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileObject | null>(null);
  
  const fetchFiles = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .storage
        .from('verification_documents')
        .list(user.id, { sortBy: { column: 'created_at', order: 'desc' } });
      
      if (error) {
        throw error;
      }
      
      // Transform the data to match our FileObject interface
      const fileObjects = data.map(file => ({
        id: file.id,
        name: file.name.split('_').slice(1).join('_'), // Remove timestamp prefix
        created_at: file.created_at,
        updated_at: file.updated_at || file.created_at,
        size: file.metadata?.size || 0,
        path: `${user.id}/${file.name}`
      }));
      
      setFiles(fileObjects);
    } catch (error: any) {
      console.error('Error fetching files:', error);
      toast({
        title: "Failed to load documents",
        description: error.message || "There was a problem loading your documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFiles();
    }
  }, [isAuthenticated, user?.id]);

  const handleUploadComplete = () => {
    fetchFiles();
  };

  const handleDeleteFile = async () => {
    if (!selectedFile || !user) return;
    
    try {
      const { error } = await supabase
        .storage
        .from('verification_documents')
        .remove([selectedFile.path]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "File deleted",
        description: "The document has been successfully deleted"
      });
      
      // Remove the file from our local state
      setFiles(files.filter(file => file.id !== selectedFile.id));
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast({
        title: "Delete failed",
        description: error.message || "There was a problem deleting your document",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedFile(null);
    }
  };

  const handleDownloadFile = async (file: FileObject) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('verification_documents')
        .download(file.path);
      
      if (error) {
        throw error;
      }
      
      // Create a download link and trigger the download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download failed",
        description: error.message || "There was a problem downloading your document",
        variant: "destructive"
      });
    }
  };

  const confirmDelete = (file: FileObject) => {
    setSelectedFile(file);
    setDeleteDialogOpen(true);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Verification Documents</h1>
            <p className="text-muted-foreground mt-2">
              Upload and manage documents related to supplier verification
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
              <Card>
                <CardContent className="pt-6">
                  <FileUpload onUploadComplete={handleUploadComplete} />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Documents</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchFiles}
                  disabled={loading}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full" />
                </div>
              ) : files.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      No documents found. Upload your first document to get started.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {files.map((file) => (
                    <Card key={file.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center p-4">
                          <FileText className="h-10 w-10 text-primary mr-4" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.name}</p>
                            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                              <span>{formatBytes(file.size)}</span>
                              <span>Uploaded: {formatDate(file.created_at)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownloadFile(file)}
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => confirmDelete(file)}
                              title="Delete"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this document? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedFile && (
              <div className="flex items-center p-2 bg-muted rounded">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteFile}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;
