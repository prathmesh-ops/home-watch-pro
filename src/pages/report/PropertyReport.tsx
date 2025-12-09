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
  Maximize2,
  DollarSign
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
          url: "https://www.a1concrete.com/hubfs/Imported_Blog_Media/types-of-concrete-cracks.jpeg",
          notes: "Garage and driveway - minor cracks detected",
          damageAnalysis: {
            detected: true,
            type: "Crack",
            severity: "Low",
            confidence: 87
          }
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJy-n-lNCpNsvKobtcq0dT2f-heWsvOkLTQ&s",
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
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lzqYwlY2NYRPm0FYBe-OyX5LZzwfcuuGxQ&s",
          notes: "Roof inspection - no damage detected",
          damageAnalysis: {
            detected: false,
            type: null,
            severity: null,
            confidence: null
          }
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmPuqbnE3dORwyAmsEonwcAvbL0qn_i8G59Q&s",
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
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                <div className="relative w-24 h-24">
                  {/* Progress Ring */}
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={propertyData.conditionScore >= 85 ? "#22c55e" : propertyData.conditionScore >= 70 ? "#eab308" : "#ef4444"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(propertyData.conditionScore / 100) * 251.2} 251.2`}
                      initial={{ strokeDasharray: "0 251.2" }}
                      animate={{ strokeDasharray: `${(propertyData.conditionScore / 100) * 251.2} 251.2` }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </svg>
                  
                  {/* Score Number */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                      className="text-2xl font-black text-gray-900"
                    >
                      {propertyData.conditionScore}
                    </motion.span>
                    <span className="text-xs text-gray-600 font-medium">SCORE</span>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <Badge className={cn("text-xs font-medium", getConditionBadgeColor(propertyData.conditionScore))}>
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
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Home className="w-8 h-8 text-blue-600" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div className="text-sm text-blue-600 font-medium mb-2">Property Type</div>
                <div className="text-xl font-bold text-blue-900">{propertyData.type}</div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
                <div className="text-sm text-emerald-600 font-medium mb-2">Year Built</div>
                <div className="text-xl font-bold text-emerald-900">{propertyData.yearBuilt}</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Maximize2 className="w-8 h-8 text-purple-600" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
                <div className="text-sm text-purple-600 font-medium mb-2">Square Feet</div>
                <div className="text-xl font-bold text-purple-900">{propertyData.squareFootage}</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 text-amber-600" />
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                </div>
                <div className="text-sm text-amber-600 font-medium mb-2">Condition</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-amber-900">{propertyData.conditionLabel}</span>
                  <Badge className={cn("text-xs", getConditionBadgeColor(propertyData.conditionScore))}>
                    {propertyData.conditionScore}/100
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Homeowner/Client Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Homeowner / Client Details</h3>
              <p className="text-gray-600">Property owner and contact information</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Full Name</div>
                    <div className="text-lg font-semibold text-gray-900">{propertyData.owner.name}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Email Address</div>
                    <div className="text-lg font-semibold text-gray-900">{propertyData.owner.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Phone Number</div>
                    <div className="text-lg font-semibold text-gray-900">{propertyData.owner.phone}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-lg">Linked Insurance Agent</h4>
                  <p className="text-blue-700 text-sm">Professional Representative</p>
                </div>
              </div>
              <div className="bg-white/70 rounded-xl p-4">
                <div className="text-xl font-bold text-blue-900 mb-2">{propertyData.owner.agent}</div>
                <div className="flex items-center gap-2 text-blue-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Verified Agent</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Insurance Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Insurance Details</h3>
              <p className="text-gray-600">Policy information and coverage details</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-emerald-600 font-medium">Insurance Company</div>
                    <div className="text-lg font-bold text-emerald-900">{propertyData.insurance.company}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Policy Number</div>
                    <div className="text-lg font-bold text-blue-900">{propertyData.insurance.policyNumber}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-600 font-medium">Coverage Amount</div>
                    <div className="text-2xl font-bold text-green-900">{propertyData.insurance.coverage}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-orange-600 font-medium">Deductible</div>
                    <div className="text-lg font-bold text-orange-900">{propertyData.insurance.deductible}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-purple-600 font-medium">Policy Status</div>
                    <div className="flex items-center gap-2">
                      <Badge className={propertyData.insurance.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                        {propertyData.insurance.status}
                      </Badge>
                      <span className="text-lg font-bold text-purple-900">Coverage Active</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Policy Period</div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-gray-900">Effective: {propertyData.insurance.effectiveDate}</div>
                      <div className="text-sm font-semibold text-gray-900">Expires: {propertyData.insurance.expiryDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Property Photo Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Property Photo Timeline</h3>
              <p className="text-gray-600">Chronological history of property documentation</p>
            </div>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-indigo-300 to-gray-200"></div>
            
            <div className="space-y-12">
              {propertyData.photoTimeline.map((timelineEntry, entryIndex) => (
                <div key={entryIndex} className="relative flex gap-8">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    {entryIndex < propertyData.photoTimeline.length - 1 && (
                      <div className="absolute top-16 left-8 w-0.5 h-12 bg-indigo-200"></div>
                    )}
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {new Date(timelineEntry.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">
                          {new Date(timelineEntry.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h4>
                        <div className="ml-auto">
                          <Badge className="bg-indigo-100 text-indigo-800">
                            {timelineEntry.photos.length} Photos
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {timelineEntry.photos.map((photo, photoIndex) => (
                          <motion.div
                            key={photoIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * photoIndex }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedPhoto(photo)}
                          >
                            <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                              <img
                                src={photo.url}
                                alt={`Property photo ${photoIndex + 1}`}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              
                              {/* Damage Indicator */}
                              {photo.damageAnalysis.detected && (
                                <div className="absolute top-3 right-3">
                                  <Badge className={getDamageSeverityColor(photo.damageAnalysis.severity)}>
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    {photo.damageAnalysis.type}
                                  </Badge>
                                </div>
                              )}
                              
                              {/* AI Confidence */}
                             
                              
                              {/* Photo Number */}
                              <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                {photoIndex + 1}
                              </div>
                            </div>
                            
                            <div className="mt-3 p-4 bg-white rounded-xl border border-gray-100">
                              <p className="text-sm text-gray-700 font-medium">{photo.notes}</p>
                              {photo.damageAnalysis.detected && (
                                <div className="mt-3 flex items-center gap-2">
                                  <Badge className={getDamageSeverityColor(photo.damageAnalysis.severity)}>
                                    {photo.damageAnalysis.type}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {photo.damageAnalysis.severity} severity
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 5: Detailed AI Damage Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Detailed AI Damage Analysis</h3>
              <p className="text-gray-600">Automated damage detection and severity assessment</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {propertyData.photoTimeline.flatMap(entry => entry.photos)
              .filter(photo => photo.damageAnalysis.detected)
              .map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={photo.url}
                          alt="Damage analysis"
                          className="w-32 h-32 object-cover rounded-xl border-2 border-red-200"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className={cn("mb-3", getDamageSeverityColor(photo.damageAnalysis.severity))}>
                            {photo.damageAnalysis.type}
                          </Badge>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="font-medium">Severity:</span>
                            <span className={cn("font-bold text-lg",
                              photo.damageAnalysis.severity === 'High' ? 'text-red-600' :
                              photo.damageAnalysis.severity === 'Medium' ? 'text-orange-600' :
                              'text-yellow-600'
                            )}>
                              {photo.damageAnalysis.severity}
                            </span>
                          </div>
                        </div>
                        
                        
                      </div>
                      
                      <div className="bg-white/70 rounded-xl p-4 mb-4">
                        <p className="text-gray-700 font-medium">{photo.notes}</p>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">Automated Detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600">AI-Powered Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">Real-time Processing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            
            {propertyData.photoTimeline.flatMap(entry => entry.photos).filter(photo => photo.damageAnalysis.detected).length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">No Damage Detected</h4>
                <p className="text-gray-600 max-w-md mx-auto">
                  AI analysis shows the property is in excellent condition with no detected damage or maintenance concerns.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Property Status: Excellent</span>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Section 6: Property Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Property Summary</h3>
              <p className="text-gray-600">Comprehensive analysis and recommendations</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Condition Score Trend */}
            <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-lg">Condition Score Trend</h4>
                  <p className="text-blue-700 text-sm">Property health over time</p>
                </div>
              </div>
              <div className="space-y-3">
                {propertyData.aiAnalysis.conditionScoreTrend.map((point, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/70 rounded-lg px-4 py-3">
                    <span className="text-sm font-medium text-blue-700">{point.date}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: `${point.score}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-blue-900 min-w-[3rem] text-right">{point.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>+4 points improvement</span>
                </div>
              </div>
            </div>
            
            {/* Maintenance Suggestions */}
            <div className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-orange-900 text-lg">Maintenance Suggestions</h4>
                  <p className="text-orange-700 text-sm">Recommended actions</p>
                </div>
              </div>
              <div className="space-y-3">
                {propertyData.aiAnalysis.maintenanceSuggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white/70 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm text-orange-800 font-medium leading-relaxed">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weather Risks */}
            <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <CloudRain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-purple-900 text-lg">Weather Risks</h4>
                  <p className="text-purple-700 text-sm">Seasonal considerations</p>
                </div>
              </div>
              <div className="space-y-3">
                {propertyData.aiAnalysis.weatherRisks.map((risk, index) => (
                  <div key={index} className="bg-white/70 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          {risk.type === 'Hail' && <CloudRain className="w-4 h-4 text-purple-600" />}
                          {risk.type === 'Heavy Rain' && <CloudRain className="w-4 h-4 text-blue-600" />}
                          {risk.type === 'Snow/Ice' && <Zap className="w-4 h-4 text-cyan-600" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-purple-900">{risk.type}</div>
                          <div className="text-xs text-purple-600">{risk.season}</div>
                        </div>
                      </div>
                      <Badge className={cn("text-xs font-medium",
                        risk.risk === 'Low' ? 'bg-green-100 text-green-800 border-green-200' :
                        risk.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      )}>
                        {risk.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="bg-white/70 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Next Inspection: {propertyData.aiAnalysis.reinspectionTimeline}</span>
                  </div>
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
                      {selectedPhoto.damageAnalysis.severity} severity 
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
