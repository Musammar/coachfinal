
import React from 'react';
import { Button } from '@/components/ui/button';
import LogoSVG from './LogoSVG';
import { Download, Copy } from 'lucide-react';

const LogoExport: React.FC = () => {
  const handleDownloadSVG = () => {
    const svgElement = document.getElementById('exportable-logo');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'coachflow-ai-logo.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  const handleCopySVG = async () => {
    const svgElement = document.getElementById('exportable-logo');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      try {
        await navigator.clipboard.writeText(svgData);
        alert('SVG code copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy SVG code:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">CoachFlow AI Logo Export</h1>
        
        {/* Logo Preview */}
        <div className="bg-white rounded-xl p-8 mb-6 flex items-center justify-center">
          <LogoSVG width={300} height={90} />
        </div>
        
        {/* Exportable SVG (hidden but accessible for download) */}
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <LogoSVG id="exportable-logo" width={400} height={120} />
        </div>
        
        {/* Dark Background Preview */}
        <div className="bg-slate-900 rounded-xl p-8 mb-6 flex items-center justify-center">
          <LogoSVG width={300} height={90} />
        </div>
        
        {/* Different Sizes */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 flex items-center justify-center">
            <LogoSVG width={150} height={45} />
          </div>
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
            <LogoSVG width={200} height={60} />
          </div>
          <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-center">
            <LogoSVG width={250} height={75} />
          </div>
        </div>
        
        {/* Export Options */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleDownloadSVG}
            className="flex-1 bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download SVG
          </Button>
          <Button 
            onClick={handleCopySVG}
            variant="outline"
            className="flex-1 text-white border-white/30 hover:bg-white/10"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy SVG Code
          </Button>
        </div>
        
        {/* Instructions */}
        <div className="mt-6 text-white/80 text-sm space-y-2">
          <p><strong>To convert to PNG:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Download the SVG file using the button above</li>
            <li>Use online converters like cloudconvert.com or convertio.co</li>
            <li>Or use design tools like Figma, Canva, or Adobe Illustrator</li>
            <li>For best quality, export at 2x or 3x resolution</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoExport;
