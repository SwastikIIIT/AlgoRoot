"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutGrid, 
  Users, 
  Database, 
  Cpu, 
  ArrowRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import AnimatedGridContainer from './GridBackground';


export default function HomeComponent(){
  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Seamless user data exploration and profile management.',
      href: '/algo-root/details'
    },
    {
      icon: Database,
      title: 'Data Insights',
      description: 'Advanced analytics and comprehensive user insights.',
      href: '/algo-root/analytics'
    },
    {
      icon: Cpu,
      title: 'Advanced Algorithms',
      description: 'Powerful algorithmic solutions for complex problems.',
      href: '/algo-root/algorithms'
    }
  ]

  return (
    <AnimatedGridContainer>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
            AlgoRoot: 
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligent Data Solutions
            </span>
          </h1>
          
          <p className="text-lg text-neutral-700 dark:text-neutral-200 max-w-xl">
            Empowering your data management with cutting-edge algorithms, 
            comprehensive user insights, and seamless exploration.
          </p>
          
          <div className="flex space-x-4">
            <Link href="/algo-root/details">
              <Button  
                size="lg" 
                className="cursor-pointer group bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200"
              >
                <div className='flex items-center space-x-2 gap-2'>
                  Get Started 
                  <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-neutral-400 dark:border-neutral-600 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="grid grid-cols-1 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-700/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <feature.icon 
                  className="w-10 h-10 text-blue-600 dark:text-blue-400" 
                />
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300">
                {feature.description}
              </p>
              <Link 
                href={feature.href} 
                className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                Explore <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </AnimatedGridContainer>
  )
}