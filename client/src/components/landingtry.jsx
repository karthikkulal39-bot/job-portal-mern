import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Browse Jobs",
      description: "Explore thousands of job opportunities from top companies worldwide",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Easy Application",
      description: "Apply to jobs with just a few clicks and track your progress",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Find roles that match your skills and accelerate your career",
    },
  ];

  const stats = [
    { label: "Active Jobs", value: "5000+" },
    { label: "Companies", value: "1000+" },
    { label: "Successful Hires", value: "50K+" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-purple-300">Welcome to Your Career Journey</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Find Your Dream Job
            </span>
            <span className="block text-white mt-2">In Minutes, Not Days 🚀</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of opportunities from top companies, apply instantly, and track your applications — all in one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => navigate("/signup")}
              className="px-8 py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              onClick={() => navigate("/jobs")}
              className="px-8 py-6 text-base font-semibold bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Browse Jobs
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-12 border-t border-white/10">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-gray-400 text-lg">Everything you need to land your next opportunity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/5 border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-12 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of job seekers who found their perfect role
            </p>
            <Button
              onClick={() => navigate("/signup")}
              className="px-12 py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Space */}
      <div className="h-16"></div>
    </div>
  );
};

export default LandingPage;
