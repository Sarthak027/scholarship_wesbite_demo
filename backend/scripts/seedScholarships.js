const mongoose = require('mongoose');
require('dotenv').config();

const ScholarshipCategory = require('../models/ScholarshipCategory');
const Scholarship = require('../models/Scholarship');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship_db';

// All 9 categories with their data
const categories = [
    {
        name: "Management",
        slug: "management",
        description: "Explore MBA and BBA scholarships from top business schools across India. Secure your future in leadership with guaranteed financial support.",
        banner: "/uploads/images/management_scholarship/management_logo.jpg",
        order: 1
    },
    {
        name: "Engineering",
        slug: "engineering",
        description: "Innovative engineering scholarships for future technology leaders. Apply for B.Tech scholarships across India.",
        banner: "/uploads/images/Engineering/engineering_scholarship_banner.jpeg",
        order: 2
    },
    {
        name: "Computer Application",
        slug: "computer-application",
        description: "Scholarships for BCA, MCA and other computer application programs. Join the digital revolution.",
        banner: "/uploads/images/computer application/Computer-Application_banner.webp",
        order: 3
    },
    {
        name: "Designing",
        slug: "designing",
        description: "Empowering creative minds with scholarships for design programs. Unlock your potential in creative fields.",
        banner: "/uploads/images/Designing/Designing_banner.webp",
        order: 4
    },
    {
        name: "Commerce",
        slug: "commerce",
        description: "Financial assistance for students pursuing commerce and accounting degrees.",
        banner: "/uploads/images/commerce/commerce_banner.webp",
        order: 5
    },
    {
        name: "Health Science",
        slug: "health-science",
        description: "Support for future healthcare professionals through dedicated scholarships.",
        banner: "/uploads/images/health_science/Health-Science_banner.webp",
        order: 6
    },
    {
        name: "Law",
        slug: "law",
        description: "Legal studies scholarships for aspiring attorneys and legal consultants.",
        banner: "/uploads/images/law/law_logo.png",
        order: 7
    },
    {
        name: "Pharmacy",
        slug: "pharmacy",
        description: "Financial aid for student pharmacists and pharmaceutical researchers.",
        banner: "/uploads/images/Pharmacy/pharmacy_banner.png",
        order: 8
    },
    {
        name: "Hotel Management",
        slug: "hotel-management",
        description: "Hospitality and hotel management scholarships for future leaders in the industry.",
        banner: "/uploads/images/hotel management/hotelmanagement_logo.png",
        order: 9
    }
];

// All scholarships organized by category
const scholarships = [
    // ============= MANAGEMENT =============
    // MBA Scholarships
    { college: "NOIDA International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/NOIDA International University_mba.webp", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Lexicon MILE", location: "Pune, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "PGDM", image: "/uploads/images/management_scholarship/Lexicon MILE.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Pune Business School", location: "Pune, India", scholarship: "Scholarship- Guaranteed ₹50,000", course: "MBA", image: "/uploads/images/management_scholarship/Pune Business School_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Alliance School of Business", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "PGDM", image: "/uploads/images/management_scholarship/Alliance School of Business_pgdm.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/cmr_university_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Assam Downtown University", location: "Guwahati, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "MBA", image: "/uploads/images/management_scholarship/Assam Downtown University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "GIMS", location: "Greater Noida, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "PGDM", image: "/uploads/images/management_scholarship/GIMS_pgdm.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "IILM University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/iILM University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "XIME", location: "Delhi, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "MBA", image: "/uploads/images/management_scholarship/XIME_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "AJEENKYA D Y Patil University", location: "Pune, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "MBA", image: "/uploads/images/management_scholarship/AJEENKYA D Y Patil University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "G D Goenka University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "MBA", image: "/uploads/images/management_scholarship/g d gOENKA University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "NSHM", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/NSHM_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Acharya Institute", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/Acharya Institute_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Chanakya University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/chanakya University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "SAGE University", location: "Indore, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "MBA", image: "/uploads/images/management_scholarship/SAGE University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Shri Ramswaroop Memorial University", location: "Barabanki, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/Shri Ramswaroop Memorial University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "RAYAT BAHRA University", location: "Mohali, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/RAYAT BAHRA university_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Malla Reddy University", location: "Hyderabad, India", scholarship: "Scholarship- Guaranteed ₹90,000*", course: "MBA", image: "/uploads/images/management_scholarship/malla reddy university_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "JECRC University", location: "Jaipur, India", scholarship: "Scholarship- Guaranteed ₹90,000*", course: "MBA", image: "/uploads/images/management_scholarship/jECRC University_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Hierank Business School", location: "Noida, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/hIERANK Business School_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    { college: "Delhi Technical Campus", location: "Delhi, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "MBA", image: "/uploads/images/management_scholarship/Delhi Technical Campus_mba.png", categorySlug: "management", sectionTitle: "MBA Scholarships" },
    // BBA Scholarships
    { college: "NSHM", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹25,000*", course: "BBA", image: "/uploads/images/management_scholarship/NSHM_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "NOIDA International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹25,000*", course: "BBA", image: "/uploads/images/management_scholarship/NOIDA International University_bba.webp", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "MIT University", location: "Shillong, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/mIT University_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "JAGSoM", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/JAGSoM_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "IILM University", location: "Delhi, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/IILM University_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "EAST POINT", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹25,000*", course: "BBA", image: "/uploads/images/management_scholarship/EAST POINT_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "Assam Downtown University", location: "Guwahati, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/Assam downtown University_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "Ajeenkya D Y Patil University", location: "Pune, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/Ajeenkya D Y Patil University_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/CMR University_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "Bangalore Integrated Management Academy", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/Bangalore Integrated Management Academy_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "TIPS Global Institute", location: "Coimbatore, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/TIPS Global Institute_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "Hindustan College of Arts & Science", location: "Coimbatore, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/Hindustan College of Arts & Science_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },
    { college: "Jaipur National University", location: "Jaipur, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BBA", image: "/uploads/images/management_scholarship/jaipur National University_bba.png", categorySlug: "management", sectionTitle: "BBA Scholarships" },

    // ============= ENGINEERING =============
    { college: "NOIDA International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹1,00,000", course: "B.Tech", image: "/uploads/images/Engineering/NOIDA International University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹1,00,000", course: "B.Tech", image: "/uploads/images/Engineering/CMR University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Assam Downtown University", location: "Guwahati, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Assam Downtown University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "EAST POINT", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/EAST POINT_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Chandigarh Group of Colleges", location: "Mohali, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Chandigarh Group of Colleges_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "IILM University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹1,00,000", course: "B.Tech", image: "/uploads/images/Engineering/IILM University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Pimpri Chinchwad University", location: "Pune, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Pimpri Chinchwad University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Chanakya University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Chanakya University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Sapthagiri University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Sapthagiri University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Sage University", location: "Indore, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Sage University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Vivekananda Global University", location: "Jaipur, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Vivekananda Global University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Takshashila University", location: "Villupuram, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Takshashila University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Sushant University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹1,00,000*", course: "B.Tech", image: "/uploads/images/Engineering/Sushant University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Shri Ramswaroop Memorial University", location: "Lucknow, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Shri Ramswaroop Memorail University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Rayat Bahra University", location: "Mohali, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Rayat Bahra University_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Impact College of Engineering", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Impact College of Engineering_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },
    { college: "Delhi Technical Campus", location: "Greater Noida, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "B.Tech", image: "/uploads/images/Engineering/Delhi Technical Campus_btech.png", categorySlug: "engineering", sectionTitle: "B.Tech Scholarships" },

    // ============= COMPUTER APPLICATION =============
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹20,000", course: "BCA", image: "/uploads/images/computer application/CMR University_bca.png", categorySlug: "computer-application", sectionTitle: "BCA Scholarships" },
    { college: "NSHM", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "BCA", image: "/uploads/images/computer application/NSHM_bca.png", categorySlug: "computer-application", sectionTitle: "BCA Scholarships" },

    // ============= DESIGNING =============
    { college: "NOIDA International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "B.Design", image: "/uploads/images/Designing/NOIDA International University_bdesign.png", categorySlug: "designing", sectionTitle: "B.Design Scholarships" },
    { college: "Parul University", location: "Vadodara, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "B.Design", image: "/uploads/images/Designing/Parul University_bdesign.png", categorySlug: "designing", sectionTitle: "B.Design Scholarships" },
    { college: "MIT University", location: "Shillong, India", scholarship: "Scholarship- Guaranteed ₹20,000*", course: "B.Design", image: "/uploads/images/Designing/MIT University_bdesign.png", categorySlug: "designing", sectionTitle: "B.Design Scholarships" },
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹50,000*", course: "B.Design", image: "/uploads/images/Designing/cMR University_bdesign.png", categorySlug: "designing", sectionTitle: "B.Design Scholarships" },
    { college: "Sage University", location: "Indore, India", scholarship: "Scholarship- Guaranteed ₹25,000*", course: "B.Design", image: "/uploads/images/Designing/sAGE University_bdesign.png", categorySlug: "designing", sectionTitle: "B.Design Scholarships" },
    { college: "Assam Downtown University", location: "Guwahati, India", scholarship: "Scholarship- Guaranteed ₹20,000", course: "B.Design", image: "/uploads/images/Designing/Assam Downtown University_bdesign.png", categorySlug: "designing", sectionTitle: "B.Design Scholarships" },

    // ============= COMMERCE =============
    { college: "NOIDA International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹10,000*", course: "B.Com", image: "/uploads/images/commerce/NOIDA International University_bcom.png", categorySlug: "commerce", sectionTitle: "B.Com Scholarships" },
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹10,000*", course: "B.Com", image: "/uploads/images/commerce/cMR university_bcom.png", categorySlug: "commerce", sectionTitle: "B.Com Scholarships" },
    { college: "Royal Global University", location: "Guwahati, India", scholarship: "Scholarship- Guaranteed ₹10,000*", course: "B.Com", image: "/uploads/images/commerce/royal global university_bcom.png", categorySlug: "commerce", sectionTitle: "B.Com Scholarships" },

    // ============= HEALTH SCIENCE =============
    { college: "Noida International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹10,000*", course: "BPT", image: "/uploads/images/health_science/Noida International University_bpt.webp", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "NSHM", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹10,000*", course: "B.Sc", image: "/uploads/images/health_science/NSHM_bsc.png", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "Noida International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹15,000", course: "B.Sc", image: "/uploads/images/health_science/Noida International University_bsc.webp", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "Sapthagiri University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹15,000", course: "B.Sc", image: "/uploads/images/health_science/Sapthagiri University_bsc.png", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "Parul University", location: "Vadodara, India", scholarship: "Scholarship- Guaranteed ₹15,000", course: "B.Sc", image: "/uploads/images/health_science/Parul University_bsc.png", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "Pimpri Chinchwad University", location: "Pune, India", scholarship: "Scholarship- Guaranteed ₹15,000", course: "B.Sc", image: "/uploads/images/health_science/Pimpri Chinchwad University_bsc.png", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "NSHM", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹15,000", course: "B.Sc", image: "/uploads/images/health_science/NSHM_bsc2.png", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "Chandigarh Group of Colleges", location: "Mohali, India", scholarship: "Scholarship- Guaranteed ₹15,000", course: "B.Sc", image: "/uploads/images/health_science/Chandigarh Group of Colleges_bsc.png", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹15,000", course: "B.Sc", image: "/uploads/images/health_science/cMR university_bsc.png", categorySlug: "health-science", sectionTitle: "BPT & B.Sc Scholarships" },

    // ============= LAW =============
    { college: "K.R.Mangalam University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹25,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/K.R.Mangalam University_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "CMR University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹25,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/cMR university_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Chanakya University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹25,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/Chanakya University_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Chandigarh Group of Colleges", location: "Mohali, India", scholarship: "Scholarship- Guaranteed ₹10,000*", course: "BBA LLB", image: "/uploads/images/law/Chandigarh Group of Colleges_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Parul University", location: "Vadodara, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BBA LLB", image: "/uploads/images/law/Parul University_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Maharishi Markandeshwar University", location: "Ambala, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/Maharishi Markandeshwar University_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Amity University", location: "Jaipur, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/Amity University_ba.webp", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Subharti University", location: "Meerut, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/Subharti University_ba.webp", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "IILM University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/IILM University_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "EAST POINT", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/EAST pOINT_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Guru Kashi University", location: "Bathinda, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/Guru Kashi University_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "Brainware University", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/Brainware University_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },
    { college: "AI Universal University", location: "Mumbai, India", scholarship: "Scholarship- Guaranteed ₹75,000*", course: "BA.LLB/BBA.LLB", image: "/uploads/images/law/AI UNIVERSAL UNIVERSITY_ba.png", categorySlug: "law", sectionTitle: "BA.LLB & BBA.LLB Scholarships" },

    // ============= PHARMACY =============
    { college: "NOIDA International University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹20,000", course: "B.Pharma", image: "/uploads/images/Pharmacy/Noida International University_bphm.png", categorySlug: "pharmacy", sectionTitle: "B.Pharma Scholarships" },
    { college: "East Point group of institutions", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹20,000", course: "B.Pharma", image: "/uploads/images/Pharmacy/east Point group of institutions_bphm.png", categorySlug: "pharmacy", sectionTitle: "B.Pharma Scholarships" },
    { college: "Sapthagiri University", location: "Bangalore, India", scholarship: "Scholarship- Guaranteed ₹20,000", course: "B.Pharma", image: "/uploads/images/Pharmacy/sapthagiri university_bphm.png", categorySlug: "pharmacy", sectionTitle: "B.Pharma Scholarships" },

    // ============= HOTEL MANAGEMENT =============
    { college: "mOCAHM", location: "Shillong, India", scholarship: "Scholarship- Guaranteed ₹1,00,000*", course: "Hotel Management", image: "/uploads/images/hotel management/mOCAHM_hm.png", categorySlug: "hotel-management", sectionTitle: "B.Sc & Hotel Management Scholarships" },
    { college: "Subharti University", location: "Meerut, India", scholarship: "Scholarship- Guaranteed ₹50,000", course: "Hotel Management", image: "/uploads/images/hotel management/Subharti University_hm.webp", categorySlug: "hotel-management", sectionTitle: "B.Sc & Hotel Management Scholarships" },
    { college: "IILM University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹50,000", course: "Hotel Management", image: "/uploads/images/hotel management/IILM University_hm.webp", categorySlug: "hotel-management", sectionTitle: "B.Sc & Hotel Management Scholarships" },
    { college: "NSHM", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹50,000", course: "B.Sc Culinary Science", image: "/uploads/images/hotel management/NSHM_hm.png", categorySlug: "hotel-management", sectionTitle: "B.Sc & Hotel Management Scholarships" },
    { college: "K R Mangalam University", location: "Delhi NCR, India", scholarship: "Scholarship- Guaranteed ₹50,000", course: "Hotel Management", image: "/uploads/images/hotel management/K R Mangalam University_hm.webp", categorySlug: "hotel-management", sectionTitle: "B.Sc & Hotel Management Scholarships" },
    { college: "Brainware University", location: "Kolkata, India", scholarship: "Scholarship- Guaranteed ₹50,000", course: "Hotel Management", image: "/uploads/images/hotel management/Brainware University_hm.webp", categorySlug: "hotel-management", sectionTitle: "B.Sc & Hotel Management Scholarships" }
];

async function seedDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await ScholarshipCategory.deleteMany({});
        await Scholarship.deleteMany({});
        console.log('✅ Existing data cleared');

        // Insert categories
        console.log('📁 Inserting categories...');
        await ScholarshipCategory.insertMany(categories);
        console.log(`✅ Inserted ${categories.length} categories`);

        // Insert scholarships
        console.log('🎓 Inserting scholarships...');
        await Scholarship.insertMany(scholarships);
        console.log(`✅ Inserted ${scholarships.length} scholarships`);

        console.log('\n🎉 Database seeded successfully!');
        console.log(`   - ${categories.length} categories`);
        console.log(`   - ${scholarships.length} scholarships`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
