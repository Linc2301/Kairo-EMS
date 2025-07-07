"use client";
import { Button, Typography, Box  } from '@mui/material';

import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function Contact() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block font-semibold mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block font-semibold mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
        
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <h3 className="text-xl font-semibold mb-4">Get in touch with us</h3>
          
          <p className="mb-6 text-gray-700">
            Whether you have a question, a suggestion, or just want to say hello, feel free to reach out. 
            Our team is always ready to assist you and will respond as soon as possible.
          </p>
          
          <div className="space-y-4">
            <div>
                <div className="flex items-center space-x-2">
      <span className="material-icons-outlined">{<MarkEmailUnreadIcon/>}</span>
      <h4 className="font-semibold">Email Address</h4> </div>
              <p className="text-gray-700">kairo@gmail.com</p>
              <p className="text-gray-700">business-kairo@gmail.com</p>
            </div>
            
            <div>
                 <div className="flex items-center space-x-2">
      <span className="material-icons-outlined">{<AddIcCallIcon/>}</span>
      <h4 className="font-semibold">Phone Number</h4> </div>
              <p className="text-gray-700">09774234382</p>
              <p className="text-gray-700">09774234382</p>
            </div>
            
            <div>
                <div className="flex items-center space-x-2">
      <span className="material-icons-outlined">{<FmdGoodIcon/>}</span>
      <h4 className="font-semibold">Location</h4> </div>
              <p className="text-gray-700">Yangon, MICT Park</p>
              <p className="text-gray-700">Hlaing, MICT Park</p>
            </div>
            
            <div>
                <div className="flex items-center space-x-2">
      <span className="material-icons-outlined">{<AccessTimeFilledIcon/>}</span>
      <h4 className="font-semibold">Work Day</h4> </div>
              <p className="text-gray-700">Mon-Fri : 9:00 - 17:00</p>
              <p className="text-gray-700">Sat-Sun : 10:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
    
