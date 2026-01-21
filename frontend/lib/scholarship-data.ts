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
        description: "Innovative engineering scholarships for future technology leaders.",
        sections: []
    },
    {
        id: "computer-application",
        title: "Computer Application",
        slug: "computer-application",
        description: "Scholarships for BCA, MCA and other computer application programs.",
        sections: []
    },
    {
        id: "designing",
        title: "Designing",
        slug: "designing",
        description: "Empowering creative minds with scholarships for design programs.",
        sections: []
    },
    {
        id: "commerce",
        title: "Commerce",
        slug: "commerce",
        description: "Financial assistance for students pursuing commerce and accounting degrees.",
        sections: []
    },
    {
        id: "health-science",
        title: "Health Science",
        slug: "health-science",
        description: "Support for future healthcare professionals through dedicated scholarships.",
        sections: []
    },
    {
        id: "law",
        title: "Law",
        slug: "law",
        description: "Legal studies scholarships for aspiring attorneys and legal consultants.",
        sections: []
    },
    {
        id: "pharmacy",
        title: "Pharmacy",
        slug: "pharmacy",
        description: "Financial aid for student pharmacists and pharmaceutical researchers.",
        sections: []
    },
    {
        id: "hotel-management",
        title: "Hotel Management",
        slug: "hotel-management",
        description: "Hospitality and hotel management scholarships for future leaders in the industry.",
        sections: []
    }
];
