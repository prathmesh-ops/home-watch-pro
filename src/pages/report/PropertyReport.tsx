import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Camera, 
  Shield, 
  AlertTriangle, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Share2,
  Printer,
  ArrowLeft,
  Home,
  Clock,
  TrendingUp,
  Wrench,
  CloudRain,
  Zap,
  Eye,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Mock data for the report
const propertyData = {
  title: "1234 Oak Street",
  address: "1234 Oak Street, Springfield, IL 62701",
  photo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
  squareFootage: "2,450",
  yearBuilt: "2018",
  type: "Single Family Home",
  conditionScore: 92,
  conditionLabel: "Good",
  owner: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    agent: "Sarah Johnson"
  },
  insurance: {
    company: "State Farm Insurance",
    policyNumber: "POL-2024-123456",
    coverage: "$350,000",
    deductible: "$1,000",
    status: "Active",
    effectiveDate: "Jan 15, 2024",
    expiryDate: "Jan 15, 2025"
  },
  photoTimeline: [
    {
      date: "2024-12-01",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
          notes: "Exterior front view - good condition",
          damageAnalysis: {
            detected: false,
            type: null,
            severity: null,
            confidence: null
          }
        },
        {
          url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
          notes: "Garage and driveway - minor cracks detected",
          damageAnalysis: {
            detected: true,
            type: "Crack",
            severity: "Low",
            confidence: 87
          }
        },
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
          notes: "Backyard and patio - well maintained",
          damageAnalysis: {
            detected: false,
            type: null,
            severity: null,
            confidence: null
          }
        }
      ]
    },
    {
      date: "2024-11-15",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400",
          notes: "Roof inspection - no damage detected",
          damageAnalysis: {
            detected: false,
            type: null,
            severity: null,
            confidence: null
          }
        },
        {
          url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
          notes: "Gutters and downspouts - clear",
          damageAnalysis: {
            detected: false,
            type: null,
            severity: null,
            confidence: null
          }
        }
      ]
    },
    {
      date: "2024-10-20",
      photos: [
        {
          url: "https://plus.unsplash.com/premium_photo-1675630925629-2de5c664c908?q=80&w=400",
          notes: "Storm damage assessment - hail marks on roof",
          damageAnalysis: {
            detected: true,
            type: "Hail Damage",
            severity: "Medium",
            confidence: 92
          }
        }
      ]
    }
  ],
  aiAnalysis: {
    conditionScoreTrend: [
      { date: "2024-10", score: 88 },
      { date: "2024-11", score: 90 },
      { date: "2024-12", score: 92 }
    ],
    maintenanceSuggestions: [
      "Seal minor cracks in driveway within 3 months",
      "Clean gutters before winter season",
      "Inspect roof flashing annually",
      "Check window seals for energy efficiency"
    ],
    reinspectionTimeline: "6 months",
    weatherRisks: [
      { type: "Hail", risk: "Medium", season: "Spring" },
      { type: "Heavy Rain", risk: "Low", season: "Fall" },
      { type: "Snow/Ice", risk: "Medium", season: "Winter" }
    ]
  }
};

export default function PropertyReport() {
  const { id, code } = useParams();
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    // Check if code is provided in URL
    if (code) {
      setAccessCode(code);
      validateAccessCode(code);
    }
  }, [code]);

  const validateAccessCode = (codeToValidate: string) => {
    // Simulate validation - in real app, this would be an API call
    if (codeToValidate && codeToValidate.length >= 4) {
      setIsAuthenticated(true);
      setShowAuthDialog(false);
    }
  };

  const handleAuthSubmit = () => {
    validateAccessCode(accessCode);
  };

  const downloadPDF = () => {
    // Simulate PDF download
    window.print();
  };

  const shareReport = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `Property Report - ${propertyData.title}`,
        text: `View the property report for ${propertyData.title}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Report link copied to clipboard!');
    }
  };

  const getConditionBadgeColor = (score: number) => {
    if (score >= 85) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getDamageSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Report Access</h1>
            <p className="text-gray-600">Enter the access code to view this property report</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="access-code" className="block text-sm font-medium text-gray-700 mb-2">
                Access Code
              </Label>
              <Input
                id="access-code"
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full"
                onKeyPress={(e) => e.key === 'Enter' && handleAuthSubmit()}
              />
            </div>
            
            <Button
              onClick={handleAuthSubmit}
              disabled={!accessCode.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Access Report
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="h-8 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Property Report</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadPDF}
                className="hidden sm:flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareReport}
                className="hidden sm:flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section 1: Property Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8"
        >
          <div className="relative h-64 sm:h-80">
            <img
              src={propertyData.photo}
              alt={propertyData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Condition Score Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{propertyData.conditionScore}</div>
                  <div className="text-sm text-gray-600 font-medium">Condition Score</div>
                  <Badge className={cn("mt-1", getConditionBadgeColor(propertyData.conditionScore))}>
                    {propertyData.conditionLabel}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-3xl font-bold mb-2">{propertyData.title}</h2>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{propertyData.address}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Type</div>
                <div className="font-semibold text-gray-900">{propertyData.type}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Year Built</div>
                <div className="font-semibold text-gray-900">{propertyData.yearBuilt}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Maximize2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Square Feet</div>
                <div className="font-semibold text-gray-900">{propertyData.squareFootage}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Condition</div>
                <div className="font-semibold text-gray-900">{propertyData.conditionLabel}</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Homeowner/Client Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Homeowner / Client Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-semibold text-gray-900">{propertyData.owner.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold text-gray-900">{propertyData.owner.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-semibold text-gray-900">{propertyData.owner.phone}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Linked Agent</span>
              </div>
              <div className="text-blue-800">{propertyData.owner.agent}</div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Insurance Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Insurance Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Insurance Company</div>
                <div className="font-semibold text-gray-900">{propertyData.insurance.company}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Policy Number</div>
                <div className="font-semibold text-gray-900">{propertyData.insurance.policyNumber}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Coverage Summary</div>
                <div className="font-semibold text-green-600 text-lg">{propertyData.insurance.coverage}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Deductible</div>
                <div className="font-semibold text-gray-900">{propertyData.insurance.deductible}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <Badge className={propertyData.insurance.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {propertyData.insurance.status}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600">
                <div>Effective: {propertyData.insurance.effectiveDate}</div>
                <div>Expires: {propertyData.insurance.expiryDate}</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Property Photo Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            Property Photo Timeline
          </h3>
          
          <div className="space-y-8">
            {propertyData.photoTimeline.map((timelineEntry, entryIndex) => (
              <div key={entryIndex}>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <h4 className="font-semibold text-gray-900">
                    {new Date(timelineEntry.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {timelineEntry.photos.map((photo, photoIndex) => (
                    <motion.div
                      key={photoIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * photoIndex }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-gray-200">
                        <img
                          src={photo.url}
                          alt={`Property photo ${photoIndex + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Damage Indicator */}
                        {photo.damageAnalysis.detected && (
                          <div className="absolute top-2 right-2">
                            <Badge className={getDamageSeverityColor(photo.damageAnalysis.severity)}>
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {photo.damageAnalysis.type}
                            </Badge>
                          </div>
                        )}
                        
                        {/* AI Confidence */}
                        {photo.damageAnalysis.detected && (
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            AI Confidence: {photo.damageAnalysis.confidence}%
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{photo.notes}</p>
                        {photo.damageAnalysis.detected && (
                          <div className="mt-2 text-xs">
                            <span className="font-medium">Damage: </span>
                            <span className={cn("font-semibold", 
                              photo.damageAnalysis.severity === 'High' ? 'text-red-600' :
                              photo.damageAnalysis.severity === 'Medium' ? 'text-orange-600' :
                              'text-yellow-600'
                            )}>
                              {photo.damageAnalysis.type} ({photo.damageAnalysis.severity} severity)
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 5: Detailed AI Damage Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Detailed AI Damage Analysis
          </h3>
          
          <div className="space-y-4">
            {propertyData.photoTimeline.flatMap(entry => entry.photos)
              .filter(photo => photo.damageAnalysis.detected)
              .map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={photo.url}
                      alt="Damage analysis"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getDamageSeverityColor(photo.damageAnalysis.severity)}>
                          {photo.damageAnalysis.type}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Severity: {photo.damageAnalysis.severity}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">{photo.notes}</div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>AI Confidence: {photo.damageAnalysis.confidence}%</span>
                        <span>•</span>
                        <span>Automated Detection</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            
            {propertyData.photoTimeline.flatMap(entry => entry.photos).filter(photo => photo.damageAnalysis.detected).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium">No damage detected</p>
                <p className="text-sm">AI analysis shows the property is in good condition</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Section 6: Property Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Property Summary
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Condition Score Trend */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Condition Score Trend
              </h4>
              <div className="space-y-2">
                {propertyData.aiAnalysis.conditionScoreTrend.map((point, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">{point.date}</span>
                    <span className="font-semibold text-blue-900">{point.score}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+4 points improvement</span>
                </div>
              </div>
            </div>
            
            {/* Maintenance Suggestions */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Maintenance Suggestions
              </h4>
              <ul className="space-y-2">
                {propertyData.aiAnalysis.maintenanceSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-orange-800 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Weather Risks */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <CloudRain className="w-4 h-4" />
                Weather Risks
              </h4>
              <div className="space-y-2">
                {propertyData.aiAnalysis.weatherRisks.map((risk, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-purple-700">{risk.type}</span>
                    <Badge className={cn("text-xs",
                      risk.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      risk.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    )}>
                      {risk.risk}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-purple-200">
                <div className="text-sm text-purple-700">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Re-inspection: {propertyData.aiAnalysis.reinspectionTimeline}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              onClick={shareReport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Copy Share Link
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Photo Preview Dialog */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Photo Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={selectedPhoto.url}
                alt="Property photo"
                className="w-full rounded-lg"
              />
              <div className="space-y-2">
                <p className="text-gray-700">{selectedPhoto.notes}</p>
                {selectedPhoto.damageAnalysis.detected && (
                  <div className="flex items-center gap-2">
                    <Badge className={getDamageSeverityColor(selectedPhoto.damageAnalysis.severity)}>
                      {selectedPhoto.damageAnalysis.type}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {selectedPhoto.damageAnalysis.severity} severity • {selectedPhoto.damageAnalysis.confidence}% AI confidence
                    </span>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
