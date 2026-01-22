const mongoose = require('mongoose');
require('dotenv').config();

const OnlineUniversity = require('../models/OnlineUniversity');
const OnlineCourse = require('../models/OnlineCourse');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/scholarship_db';

// Universities data
const universities = [
    {
        name: "Jain Deemed To Be University",
        slug: "jain-university",
        availableCourses: ["BBA", "B.Com", "M.Com", "MBA", "MCA", "M.A"],
        priceRange: "₹ 20,000 - 65,000",
        bannerImage: "/uploads/images/Jain Deemed To Be University/banner.png",
        order: 1
    },
    {
        name: "Sharda Online University",
        slug: "sharda-university",
        availableCourses: ["BBA", "BCA", "BA", "MBA", "MCA", "M.Com"],
        priceRange: "₹ 17,500 - 50,000",
        bannerImage: "/uploads/images/Sharda Online University/sharda_banner.png",
        order: 2
    },
    {
        name: "Vignan's Online University",
        slug: "vignan-university",
        availableCourses: ["BBA", "BCA", "MCA", "MBA"],
        priceRange: "₹ 22,500 - 27,500",
        bannerImage: "/uploads/images/Vignan's Online University/vignan's_banner.png",
        order: 3
    }
];

// All courses organized by university
const courses = [
    // ============= JAIN UNIVERSITY =============
    {
        title: "ONLINE | MBA",
        degree: "MBA",
        specializations: "Accounting & Finance + 16 Specializations",
        scholarship: "Scholarship- Guaranteed Upto ₹50,000*",
        duration: "2 YEARS",
        image: "/uploads/images/Jain Deemed To Be University/mba.png",
        universitySlug: "jain-university",
        order: 1
    },
    {
        title: "ONLINE | MCA",
        degree: "MCA",
        specializations: "Cyber Security, data Analytics & Computer Science",
        scholarship: "Scholarship- Guaranteed Upto ₹50,000*",
        duration: "2 YEARS",
        image: "/uploads/images/Jain Deemed To Be University/mca.png",
        universitySlug: "jain-university",
        order: 2
    },
    {
        title: "ONLINE | M.com",
        degree: "M.Com",
        specializations: "International Finance(ACCA, UK), Accounting and Finance",
        scholarship: "Scholarship- Guaranteed Upto ₹50,000*",
        duration: "2 YEARS",
        image: "/uploads/images/Jain Deemed To Be University/mcom.png",
        universitySlug: "jain-university",
        order: 3
    },
    {
        title: "ONLINE | MA",
        degree: "MA",
        specializations: "English, Public Policy & Economics",
        scholarship: "Scholarship- Guaranteed Upto ₹20,000*",
        duration: "2 YEARS",
        image: "/uploads/images/Jain Deemed To Be University/ma.png",
        universitySlug: "jain-university",
        order: 4
    },
    {
        title: "ONLINE | BBA",
        degree: "BBA",
        specializations: "Marketing, Finance & Human Resource Management",
        scholarship: "Scholarship- Guaranteed Upto ₹30,000*",
        duration: "3 YEARS",
        image: "/uploads/images/Jain Deemed To Be University/bba.png",
        universitySlug: "jain-university",
        order: 5
    },
    {
        title: "ONLINE | BCA",
        degree: "BCA",
        specializations: "Accounting & Finance",
        scholarship: "Scholarship- Guaranteed ₹50,000",
        duration: "3 YEARS",
        image: "/uploads/images/Jain Deemed To Be University/bca.png",
        universitySlug: "jain-university",
        order: 6
    },

    // ============= SHARDA UNIVERSITY =============
    {
        title: "ONLINE | MBA",
        degree: "MBA",
        specializations: "Hospital & Heath Care Management + 10 Specializations",
        scholarship: "Scholarship- Guaranteed ₹20,000",
        duration: "2 YEARS",
        image: "/uploads/images/Sharda Online University/online-mba-sharda-confirmscholarship.com_.png",
        universitySlug: "sharda-university",
        order: 1
    },
    {
        title: "ONLINE | MCA",
        degree: "MCA",
        specializations: "Data Science",
        scholarship: "Scholarship- Guaranteed ₹20,000",
        duration: "2 YEARS",
        image: "/uploads/images/Sharda Online University/online-mca-sharda-confirmscholarship.com_.png",
        universitySlug: "sharda-university",
        order: 2
    },
    {
        title: "ONLINE | M.Com",
        degree: "M.Com",
        specializations: "International Finance ( Accredited by ACCA, UK)",
        scholarship: "Scholarship- Guaranteed ₹34,000",
        duration: "2 YEARS",
        image: "/uploads/images/Sharda Online University/online-m.com-sharda-confirmscholarship.com_.png",
        universitySlug: "sharda-university",
        order: 3
    },
    {
        title: "ONLINE | BBA",
        degree: "BBA",
        specializations: "International Finance (Accredited by ACCA, UK)",
        scholarship: "Scholarship- Guaranteed ₹50,000",
        duration: "3 YEARS",
        image: "/uploads/images/Sharda Online University/online-bba-sharda-confirmscholarship.com_.png",
        universitySlug: "sharda-university",
        order: 4
    },
    {
        title: "ONLINE | BCA",
        degree: "BCA",
        specializations: "General",
        scholarship: "Scholarship- Guaranteed ₹20,000",
        duration: "3 YEARS",
        image: "/uploads/images/Sharda Online University/online-bca-sharda-confirmscholarship.com_.png",
        universitySlug: "sharda-university",
        order: 5
    },
    {
        title: "ONLINE | BA(HONS.)",
        degree: "BA(HONS.)",
        specializations: "Political Science",
        scholarship: "Scholarship- Guaranteed ₹20,000",
        duration: "3 YEARS",
        image: "/uploads/images/Sharda Online University/online-bahons.sharda-confirmscholarship.com_.png",
        universitySlug: "sharda-university",
        order: 6
    },

    // ============= VIGNAN UNIVERSITY =============
    {
        title: "ONLINE | MBA",
        degree: "MBA",
        specializations: "Business Analytics, +3 specializations",
        scholarship: "Scholarship- Guaranteed ₹20,000",
        duration: "2 YEARS",
        image: "/uploads/images/Vignan's Online University/online-mba-vignan-confirmscholarship.com_.png",
        universitySlug: "vignan-university",
        order: 1
    },
    {
        title: "ONLINE | MCA",
        degree: "MCA",
        specializations: "CS & IT | DATA SCIENCE",
        scholarship: "Scholarship- Guaranteed ₹20,000",
        duration: "2 YEARS",
        image: "/uploads/images/Vignan's Online University/online-mca-vignan-confirmscholarship.com_.png.png",
        universitySlug: "vignan-university",
        order: 2
    },
    {
        title: "ONLINE | BBA",
        degree: "BBA",
        specializations: "General",
        scholarship: "Scholarship- Guaranteed ₹18,000",
        duration: "3 YEARS",
        image: "/uploads/images/Vignan's Online University/online-bba-vignan-confirmscholarship.com_.png",
        universitySlug: "vignan-university",
        order: 3
    },
    {
        title: "ONLINE | BCA",
        degree: "BCA",
        specializations: "CS & IT",
        scholarship: "Scholarship- Guaranteed ₹18,000",
        duration: "3 YEARS",
        image: "/uploads/images/Vignan's Online University/online-bca-vignan-confirmscholarship.com_.png",
        universitySlug: "vignan-university",
        order: 4
    }
];

async function seedDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        console.log('🗑️  Clearing existing online course data...');
        await OnlineUniversity.deleteMany({});
        await OnlineCourse.deleteMany({});
        console.log('✅ Existing data cleared');

        // Insert universities
        console.log('🎓 Inserting universities...');
        await OnlineUniversity.insertMany(universities);
        console.log(`✅ Inserted ${universities.length} universities`);

        // Insert courses
        console.log('📚 Inserting online courses...');
        await OnlineCourse.insertMany(courses);
        console.log(`✅ Inserted ${courses.length} courses`);

        console.log('\n🎉 Online Courses seeded successfully!');
        console.log(`   - ${universities.length} universities`);
        console.log(`   - ${courses.length} courses`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
