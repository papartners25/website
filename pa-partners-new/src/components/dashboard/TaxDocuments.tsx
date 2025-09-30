import { TaxDocument } from '@/lib/investor-types';
import { FileText, Download, FileCheck, Clock } from 'lucide-react';

interface TaxDocumentsProps {
  documents: TaxDocument[];
}

export default function TaxDocuments({ documents }: TaxDocumentsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'k1':
        return <FileText size={20} className="text-blue-400" />;
      case '1099':
        return <FileText size={20} className="text-purple-400" />;
      case 'year-end-statement':
        return <FileCheck size={20} className="text-green-400" />;
      case 'distribution-summary':
        return <FileText size={20} className="text-amber-400" />;
      default:
        return <FileText size={20} className="text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">Available</span>;
      case 'pending':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">Pending</span>;
      case 'amended':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">Amended</span>;
      default:
        return null;
    }
  };

  if (documents.length === 0) {
    return (
      <div className="surface rounded-xl p-8 shadow-card text-center">
        <Clock size={48} className="mx-auto text-slate-600 mb-3" />
        <h3 className="text-lg font-medium text-white mb-2">No Tax Documents Available</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Tax documents (K-1s, 1099s) will be available here each year, typically by March 15th.
        </p>
      </div>
    );
  }

  // Group documents by year
  const documentsByYear = documents.reduce((acc, doc) => {
    if (!acc[doc.year]) {
      acc[doc.year] = [];
    }
    acc[doc.year].push(doc);
    return acc;
  }, {} as Record<number, TaxDocument[]>);

  const years = Object.keys(documentsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-6">
      {years.map((year) => (
        <div key={year} className="surface rounded-xl shadow-card">
          <div className="p-5 border-b border-white/5">
            <h3 className="text-lg font-semibold text-white">Tax Year {year}</h3>
            <p className="text-sm text-slate-400 mt-0.5">
              {documentsByYear[Number(year)].length} document(s)
            </p>
          </div>

          <div className="p-5 space-y-3">
            {documentsByYear[Number(year)].map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 rounded-lg bg-white/5">
                    {getDocumentIcon(doc.documentType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-white truncate">
                        {doc.documentName}
                      </p>
                      {getStatusBadge(doc.status)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>Uploaded {formatDate(doc.uploadDate)}</span>
                      <span>•</span>
                      <span>{formatFileSize(doc.fileSize)}</span>
                      {doc.propertyName && (
                        <>
                          <span>•</span>
                          <span>{doc.propertyName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="ml-4 flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                  disabled={doc.status === 'pending'}
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="surface rounded-xl p-5 shadow-card">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-400/10">
            <FileCheck size={20} className="text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white mb-1">Tax Document Schedule</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Schedule K-1 forms are typically available by March 15th. We&apos;ll send you an email notification 
              when your documents are ready to download. If you need assistance with tax preparation, 
              please contact our investor relations team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
