import { getAssetUrl } from "./assets";

export interface ScholarshipEntry {
    college: string;
    location: string;
    scholarship: string;
    image: string;
    course: string;
}

export interface ScholarshipCategory {
    id: string;
    title: string;
    slug: string;
    description: string;
    banner?: string;
    sections: {
        title: string;
        items: ScholarshipEntry[];
    }[];
}

export const scholarshipCategories: ScholarshipCategory[] = [
    {
        id: "management",
        title: "Management",
        slug: "management",
        description: "Explore MBA and BBA scholarships from top business schools across India. Secure your future in leadership with guaranteed financial support.",
        banner: getAssetUrl("/uploads/images/management_scholarship/management_logo.jpg"),
        sections: [
            {
                title: "MBA Scholarships",
                items: [
                    {
                        college: "NOIDA International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/NOIDA International University_mba.webp")
                    },
                    {
                        college: "Lexicon MILE",
                        location: "Pune, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "PGDM",
                        image: getAssetUrl("/uploads/images/management_scholarship/Lexicon MILE.png")
                    },
                    {
                        college: "Pune Business School",
                        location: "Pune, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Pune Business School_mba.png")
                    },
                    {
                        college: "Alliance School of Business",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "PGDM",
                        image: getAssetUrl("/uploads/images/management_scholarship/Alliance School of Business_pgdm.png")
                    },
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/cmr_university_mba.png")
                    },
                    {
                        college: "Assam Downtown University",
                        location: "Guwahati, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Assam Downtown University_mba.png")
                    },
                    {
                        college: "GIMS",
                        location: "Greater Noida, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "PGDM",
                        image: getAssetUrl("/uploads/images/management_scholarship/GIMS_pgdm.png")
                    },
                    {
                        college: "IILM University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/iILM University_mba.png")
                    },
                    {
                        college: "XIME",
                        location: "Delhi, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/XIME_mba.png")
                    },
                    {
                        college: "AJEENKYA D Y Patil University",
                        location: "Pune, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/AJEENKYA D Y Patil University_mba.png")
                    },
                    {
                        college: "G D Goenka University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/g d gOENKA University_mba.png")
                    },
                    {
                        college: "NSHM",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/NSHM_mba.png")
                    },
                    {
                        college: "Acharya Institute",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Acharya Institute_mba.png")
                    },
                    {
                        college: "Chanakya University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/chanakya University_mba.png")
                    },
                    {
                        college: "SAGE University",
                        location: "Indore, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/SAGE University_mba.png")
                    },
                    {
                        college: "Shri Ramswaroop Memorial University",
                        location: "Barabanki, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Shri Ramswaroop Memorial University_mba.png")
                    },
                    {
                        college: "RAYAT BAHRA University",
                        location: "Mohali, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/RAYAT BAHRA university_mba.png")
                    },
                    {
                        college: "Malla Reddy University",
                        location: "Hyderabad, India",
                        scholarship: "Scholarship- Guaranteed ₹90,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/malla reddy university_mba.png")
                    },
                    {
                        college: "JECRC University",
                        location: "Jaipur, India",
                        scholarship: "Scholarship- Guaranteed ₹90,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/jECRC University_mba.png")
                    },
                    {
                        college: "Hierank Business School",
                        location: "Noida, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/hIERANK Business School_mba.png")
                    },
                    {
                        college: "Delhi Technical Campus",
                        location: "Delhi, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "MBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Delhi Technical Campus_mba.png")
                    }
                ]
            },
            {
                title: "BBA Scholarships",
                items: [
                    {
                        college: "NSHM",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹25,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/NSHM_bba.png")
                    },
                    {
                        college: "NOIDA International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹25,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/NOIDA International University_bba.webp")
                    },
                    {
                        college: "MIT University",
                        location: "Shillong, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/mIT University_bba.png")
                    },
                    {
                        college: "JAGSoM",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/JAGSoM_bba.png")
                    },
                    {
                        college: "IILM University",
                        location: "Delhi, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/IILM University_bba.png")
                    },
                    {
                        college: "EAST POINT",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹25,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/EAST POINT_bba.png")
                    },
                    {
                        college: "Assam Downtown University",
                        location: "Guwahati, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Assam downtown University_bba.png")
                    },
                    {
                        college: "Ajeenkya D Y Patil University",
                        location: "Pune, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Ajeenkya D Y Patil University_bba.png")
                    },
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/CMR University_bba.png")
                    },
                    {
                        college: "Bangalore Integrated Management Academy",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Bangalore Integrated Management Academy_bba.png")
                    },
                    {
                        college: "TIPS Global Institute",
                        location: "Coimbatore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/TIPS Global Institute_bba.png")
                    },
                    {
                        college: "Hindustan College of Arts & Science",
                        location: "Coimbatore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/Hindustan College of Arts & Science_bba.png")
                    },
                    {
                        college: "Jaipur National University",
                        location: "Jaipur, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BBA",
                        image: getAssetUrl("/uploads/images/management_scholarship/jaipur National University_bba.png")
                    }
                ]
            }
        ]
    },
    {
        id: "engineering",
        title: "Engineering",
        slug: "engineering",
        description: "Innovative engineering scholarships for future technology leaders. Apply for B.Tech scholarships across India.",
        banner: getAssetUrl("/uploads/images/Engineering/engineering_scholarship_banner.jpeg"),
        sections: [
            {
                title: "B.Tech Scholarships",
                items: [
                    {
                        college: "NOIDA International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹1,00,000",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/NOIDA International University_btech.png")
                    },
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹1,00,000",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/CMR University_btech.png")
                    },
                    {
                        college: "Assam Downtown University",
                        location: "Guwahati, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Assam Downtown University_btech.png")
                    },
                    {
                        college: "EAST POINT",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/EAST POINT_btech.png")
                    },
                    {
                        college: "Chandigarh Group of Colleges",
                        location: "Mohali, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Chandigarh Group of Colleges_btech.png")
                    },
                    {
                        college: "IILM University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹1,00,000",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/IILM University_btech.png")
                    },
                    {
                        college: "Pimpri Chinchwad University",
                        location: "Pune, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Pimpri Chinchwad University_btech.png")
                    },
                    {
                        college: "Chanakya University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Chanakya University_btech.png")
                    },
                    {
                        college: "Sapthagiri University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Sapthagiri University_btech.png")
                    },
                    {
                        college: "Sage University",
                        location: "Indore, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Sage University_btech.png")
                    },
                    {
                        college: "Vivekananda Global University",
                        location: "Jaipur, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Vivekananda Global University_btech.png")
                    },
                    {
                        college: "Takshashila University",
                        location: "Villupuram, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Takshashila University_btech.png")
                    },
                    {
                        college: "Sushant University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹1,00,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Sushant University_btech.png")
                    },
                    {
                        college: "Shri Ramswaroop Memorial University",
                        location: "Lucknow, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Shri Ramswaroop Memorial University_btech.png")
                    },
                    {
                        college: "Rayat Bahra University",
                        location: "Mohali, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Rayat Bahra University_btech.png")
                    },
                    {
                        college: "Impact College of Engineering",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Impact College of Engineering_btech.png")
                    },
                    {
                        college: "Delhi Technical Campus",
                        location: "Greater Noida, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "B.Tech",
                        image: getAssetUrl("/uploads/images/Engineering/Delhi Technical Campus_btech.png")
                    }
                ]
            }
        ]
    },
    {
        id: "computer-application",
        title: "Computer Application",
        slug: "computer-application",
        description: "Scholarships for BCA, MCA and other computer application programs. Join the digital revolution.",
        banner: getAssetUrl("/uploads/images/computer application/Computer-Application_banner.webp"),
        sections: [
            {
                title: "BCA Scholarships",
                items: [
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000",
                        course: "BCA",
                        image: getAssetUrl("/uploads/images/computer application/CMR University_bca.png")
                    },
                    {
                        college: "NSHM",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "BCA",
                        image: getAssetUrl("/uploads/images/computer application/NSHM_bca.png")
                    }
                ]
            }
        ]
    },
    {
        id: "designing",
        title: "Designing",
        slug: "designing",
        description: "Empowering creative minds with scholarships for design programs. Unlock your potential in creative fields.",
        banner: getAssetUrl("/uploads/images/Designing/Designing_banner.webp"),
        sections: [
            {
                title: "B.Design Scholarships",
                items: [
                    {
                        college: "NOIDA International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "B.Design",
                        image: getAssetUrl("/uploads/images/Designing/NOIDA International University_bdesign.png")
                    },
                    {
                        college: "Parul University",
                        location: "Vadodara, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "B.Design",
                        image: getAssetUrl("/uploads/images/Designing/Parul University_bdesign.png")
                    },
                    {
                        college: "MIT University",
                        location: "Shillong, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000*",
                        course: "B.Design",
                        image: getAssetUrl("/uploads/images/Designing/MIT University_bdesign.png")
                    },
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000*",
                        course: "B.Design",
                        image: getAssetUrl("/uploads/images/Designing/cMR University_bdesign.png")
                    },
                    {
                        college: "Sage University",
                        location: "Indore, India",
                        scholarship: "Scholarship- Guaranteed ₹25,000*",
                        course: "B.Design",
                        image: getAssetUrl("/uploads/images/Designing/sAGE University_bdesign.png")
                    },
                    {
                        college: "Assam Downtown University",
                        location: "Guwahati, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000",
                        course: "B.Design",
                        image: getAssetUrl("/uploads/images/Designing/Assam Downtown University_bdesign.png")
                    }
                ]
            }
        ]
    },
    {
        id: "commerce",
        title: "Commerce",
        slug: "commerce",
        description: "Financial assistance for students pursuing commerce and accounting degrees.",
        banner: getAssetUrl("/uploads/images/commerce/commerce_banner.webp"),
        sections: [
            {
                title: "B.Com Scholarships",
                items: [
                    {
                        college: "NOIDA International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹10,000*",
                        course: "B.Com",
                        image: getAssetUrl("/uploads/images/commerce/NOIDA International University_bcom.png")
                    },
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹10,000*",
                        course: "B.Com",
                        image: getAssetUrl("/uploads/images/commerce/cMR university_bcom.png")
                    },
                    {
                        college: "Royal Global University",
                        location: "Guwahati, India",
                        scholarship: "Scholarship- Guaranteed ₹10,000*",
                        course: "B.Com",
                        image: getAssetUrl("/uploads/images/commerce/royal global university_bcom.png")
                    }
                ]
            }
        ]
    },
    {
        id: "health-science",
        title: "Health Science",
        slug: "health-science",
        description: "Support for future healthcare professionals through dedicated scholarships.",
        banner: getAssetUrl("/uploads/images/health_science/Health-Science_banner.webp"),
        sections: [
            {
                title: "BPT & B.Sc Scholarships",
                items: [
                    {
                        college: "Noida International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹10,000*",
                        course: "BPT",
                        image: getAssetUrl("/uploads/images/health_science/Noida International University_bpt.webp")
                    },
                    {
                        college: "NSHM",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹10,000*",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/NSHM_bsc.png")
                    },
                    {
                        college: "Noida International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹15,000",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/Noida International University_bsc.webp")
                    },
                    {
                        college: "Sapthagiri University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹15,000",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/Sapthagiri University_bsc.png")
                    },
                    {
                        college: "Parul University",
                        location: "Vadodara, India",
                        scholarship: "Scholarship- Guaranteed ₹15,000",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/Parul University_bsc.png")
                    },
                    {
                        college: "Pimpri Chinchwad University",
                        location: "Pune, India",
                        scholarship: "Scholarship- Guaranteed ₹15,000",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/Pimpri Chinchwad University_bsc.png")
                    },
                    {
                        college: "NSHM",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹15,000",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/NSHM_bsc2.png")
                    },
                    {
                        college: "Chandigarh Group of Colleges",
                        location: "Mohali, India",
                        scholarship: "Scholarship- Guaranteed ₹15,000",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/Chandigarh Group of Colleges_bsc.png")
                    },
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹15,000",
                        course: "B.Sc",
                        image: getAssetUrl("/uploads/images/health_science/cMR university_bsc.png")
                    }
                ]
            }
        ]
    },
    {
        id: "law",
        title: "Law",
        slug: "law",
        banner: getAssetUrl("/uploads/images/law/law_logo.png"),
        description: "Legal studies scholarships for aspiring attorneys and legal consultants.",
        sections: [
            {
                title: "BA.LLB & BBA.LLB Scholarships",
                items: [
                    {
                        college: "K.R.Mangalam University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹25,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/K.R.Mangalam University_ba.png")
                    },
                    {
                        college: "CMR University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹25,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/cMR university_ba.png")
                    },
                    {
                        college: "Chanakya University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹25,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/Chanakya University_ba.png")
                    },
                    {
                        college: "Chandigarh Group of Colleges",
                        location: "Mohali, India",
                        scholarship: "Scholarship- Guaranteed ₹10,000*",
                        course: "BBA LLB",
                        image: getAssetUrl("/uploads/images/law/Chandigarh Group of Colleges_ba.png")
                    },
                    {
                        college: "Parul University",
                        location: "Vadodara, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BBA LLB",
                        image: getAssetUrl("/uploads/images/law/Parul University_ba.png")
                    },
                    {
                        college: "Maharishi Markandeshwar University",
                        location: "Ambala, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/Maharishi Markandeshwar University_ba.png")
                    },
                    {
                        college: "Amity University",
                        location: "Jaipur, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/Amity University_ba.webp")
                    },
                    {
                        college: "Subharti University",
                        location: "Meerut, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/Subharti University_ba.webp")
                    },
                    {
                        college: "IILM University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/IILM University_ba.png")
                    },
                    {
                        college: "EAST POINT",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/EAST pOINT_ba.png")
                    },
                    {
                        college: "Guru Kashi University",
                        location: "Bathinda, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/Guru Kashi University_ba.png")
                    },
                    {
                        college: "Brainware University",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/Brainware University_ba.png")
                    },
                    {
                        college: "AI Universal University",
                        location: "Mumbai, India",
                        scholarship: "Scholarship- Guaranteed ₹75,000*",
                        course: "BA.LLB/BBA.LLB",
                        image: getAssetUrl("/uploads/images/law/AI UNIVERSAL UNIVERSITY_ba.png")
                    }
                ]
            }
        ]
    },
    {
        id: "pharmacy",
        title: "Pharmacy",
        slug: "pharmacy",
        banner: getAssetUrl("/uploads/images/Pharmacy/pharmacy_banner.png"),
        description: "Financial aid for student pharmacists and pharmaceutical researchers.",
        sections: [
            {
                title: "B.Pharma Scholarships",
                items: [
                    {
                        college: "NOIDA International University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000",
                        course: "B.Pharma",
                        image: getAssetUrl("/uploads/images/Pharmacy/Noida International University_bphm.png")
                    },
                    {
                        college: "East Point group of institutions",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000",
                        course: "B.Pharma",
                        image: getAssetUrl("/uploads/images/Pharmacy/east Point group of institutions_bphm.png")
                    },
                    {
                        college: "Sapthagiri University",
                        location: "Bangalore, India",
                        scholarship: "Scholarship- Guaranteed ₹20,000",
                        course: "B.Pharma",
                        image: getAssetUrl("/uploads/images/Pharmacy/sapthagiri university_bphm.png")
                    }
                ]
            }
        ]
    },
    {
        id: "hotel-management",
        title: "Hotel Management",
        slug: "hotel-management",
        banner: getAssetUrl("/uploads/images/hotel management/hotelmanagement_logo.png"),
        description: "Hospitality and hotel management scholarships for future leaders in the industry.",
        sections: [
            {
                title: "B.Sc & Hotel Management Scholarships",
                items: [
                    {
                        college: "mOCAHM",
                        location: "Shillong, India",
                        scholarship: "Scholarship- Guaranteed ₹1,00,000*",
                        course: "Hotel Management",
                        image: getAssetUrl("/uploads/images/hotel management/mOCAHM_hm.png")
                    },
                    {
                        college: "Subharti University",
                        location: "Meerut, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000",
                        course: "Hotel Management",
                        image: getAssetUrl("/uploads/images/hotel management/Subharti University_hm.webp")
                    },
                    {
                        college: "IILM University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000",
                        course: "Hotel Management",
                        image: getAssetUrl("/uploads/images/hotel management/IILM University_hm.webp")
                    },
                    {
                        college: "NSHM",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000",
                        course: "B.Sc Culinary Science",
                        image: getAssetUrl("/uploads/images/hotel management/NSHM_hm.png")
                    },
                    {
                        college: "K R Mangalam University",
                        location: "Delhi NCR, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000",
                        course: "Hotel Management",
                        image: getAssetUrl("/uploads/images/hotel management/K R Mangalam University_hm.webp")
                    },
                    {
                        college: "Brainware University",
                        location: "Kolkata, India",
                        scholarship: "Scholarship- Guaranteed ₹50,000",
                        course: "Hotel Management",
                        image: getAssetUrl("/uploads/images/hotel management/Brainware University_hm.webp")
                    }
                ]
            }
        ]
    }
];
