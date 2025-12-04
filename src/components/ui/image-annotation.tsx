import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Pencil, Square, Circle, Trash2, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Annotation {
  id: string;
  type: 'text' | 'arrow' | 'box' | 'circle';
  x: number;
  y: number;
  text?: string;
  width?: number;
  height?: number;
}

interface ImageAnnotationProps {
  imageUrl: string;
  onClose: () => void;
  onSave?: (annotations: Annotation[]) => void;
}

export function ImageAnnotation({ imageUrl, onClose, onSave }: ImageAnnotationProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedTool, setSelectedTool] = useState<'text' | 'arrow' | 'box' | 'circle' | null>(null);
  const [editingAnnotation, setEditingAnnotation] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: selectedTool,
      x,
      y,
      width: selectedTool === 'box' ? 20 : undefined,
      height: selectedTool === 'box' ? 20 : undefined,
    };

    if (selectedTool === 'text') {
      setEditingAnnotation(newAnnotation.id);
      setTextInput('');
    }

    setAnnotations([...annotations, newAnnotation]);
    setSelectedTool(null);
  };

  const handleSaveText = () => {
    if (editingAnnotation && textInput.trim()) {
      setAnnotations(annotations.map(ann => 
        ann.id === editingAnnotation ? { ...ann, text: textInput } : ann
      ));
      setEditingAnnotation(null);
      setTextInput('');
    }
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(ann => ann.id !== id));
  };

  const handleSaveAll = () => {
    if (onSave) {
      onSave(annotations);
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-white" />
          </Button>
          <h3 className="text-white font-semibold">Annotate Image</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-800"
            onClick={handleSaveAll}
          >
            <Check className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-center gap-2 p-3 bg-gray-900/90 border-b border-gray-700">
        <Button
          variant={selectedTool === 'text' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTool('text')}
          className={cn(
            'text-white',
            selectedTool === 'text' && 'bg-blue-600 hover:bg-blue-700'
          )}
        >
          <Type className="h-4 w-4 mr-1" />
          Text
        </Button>
        <Button
          variant={selectedTool === 'arrow' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTool('arrow')}
          className={cn(
            'text-white',
            selectedTool === 'arrow' && 'bg-blue-600 hover:bg-blue-700'
          )}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Arrow
        </Button>
        <Button
          variant={selectedTool === 'box' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTool('box')}
          className={cn(
            'text-white',
            selectedTool === 'box' && 'bg-blue-600 hover:bg-blue-700'
          )}
        >
          <Square className="h-4 w-4 mr-1" />
          Box
        </Button>
        <Button
          variant={selectedTool === 'circle' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTool('circle')}
          className={cn(
            'text-white',
            selectedTool === 'circle' && 'bg-blue-600 hover:bg-blue-700'
          )}
        >
          <Circle className="h-4 w-4 mr-1" />
          Circle
        </Button>
      </div>

      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div
          ref={imageRef}
          onClick={handleImageClick}
          className="relative max-w-full max-h-full cursor-crosshair"
          style={{ cursor: selectedTool ? 'crosshair' : 'default' }}
        >
          <img
            src={imageUrl}
            alt="Annotate"
            className="max-w-full max-h-full object-contain rounded-lg"
            draggable={false}
          />

          {/* Annotations */}
          {annotations.map((annotation) => (
            <div
              key={annotation.id}
              className="absolute"
              style={{
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {annotation.type === 'text' && annotation.text && (
                <div className="relative group">
                  <div className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-semibold shadow-lg whitespace-nowrap">
                    {annotation.text}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnnotation(annotation.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {annotation.type === 'arrow' && (
                <div className="relative group">
                  <svg width="60" height="60" className="drop-shadow-lg">
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="10"
                        refX="5"
                        refY="5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
                      </marker>
                    </defs>
                    <line
                      x1="5"
                      y1="5"
                      x2="50"
                      y2="50"
                      stroke="#ef4444"
                      strokeWidth="3"
                      markerEnd="url(#arrowhead)"
                    />
                  </svg>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnnotation(annotation.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {annotation.type === 'box' && (
                <div className="relative group">
                  <div
                    className="border-4 border-blue-500 bg-blue-500/20"
                    style={{
                      width: `${annotation.width}%`,
                      height: `${annotation.height}%`,
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnnotation(annotation.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {annotation.type === 'circle' && (
                <div className="relative group">
                  <div className="w-16 h-16 rounded-full border-4 border-red-500 bg-red-500/20" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnnotation(annotation.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Text Input Modal */}
      <AnimatePresence>
        {editingAnnotation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4"
          >
            <div className="max-w-md mx-auto">
              <p className="text-white text-sm mb-2">Enter annotation text:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveText()}
                  placeholder="Type your note..."
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <Button
                  size="sm"
                  onClick={handleSaveText}
                  disabled={!textInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingAnnotation(null);
                    setTextInput('');
                    handleDeleteAnnotation(editingAnnotation);
                  }}
                  className="text-white hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
