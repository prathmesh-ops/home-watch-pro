import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Scan, Home, Users, Phone, Mail, MapPin, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Crack Detection Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Scan className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    AI Crack Detection Module
                  </h3>
                  <p className="text-blue-200 text-sm">
                    Latest scan detected <span className="font-bold text-white">23 cracks</span> across all properties
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <Badge className="bg-red-500/20 text-red-300 border-red-400 mb-2">
                    3 Critical
                  </Badge>
                  <p className="text-xs text-blue-200">Last updated: 2 hours ago</p>
                </div>
                <Button
                  onClick={() => navigate('/crack-detection')}
                  className="bg-white hover:bg-gray-100 text-gray-900"
                >
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-white">HomeWatch Pro</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Advanced property monitoring and insurance management platform powered by AI.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Agent Portal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Agent Portal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/agent/dashboard')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/agent/clients')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Manage Clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/agent/properties')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/agent/renewals')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Renewals
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links - Homeowner Portal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Homeowner Portal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/properties')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  My Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/capture')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Scan className="h-4 w-4" />
                  Upload Photos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/inventory')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Inventory
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>123 Insurance Blvd<br />Austin, TX 78701</span>
              </li>
              <li>
                <a href="tel:+15125550123" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  (512) 555-0123
                </a>
              </li>
              <li>
                <a href="mailto:support@homewatchpro.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@homewatchpro.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 HomeWatch Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
